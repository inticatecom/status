// Resources
import ky from "ky";
import server from "./http.js";
import dns from "node:dns/promises";
import { logger } from "./util.js";

// Definitions
import * as Types from "./definitions.js";
import * as config from "../config/index.js";
import { getLocalNetwork, getRegion } from "./util.js";

// Settings
const INITIAL_STATE: Types.State = {
  online: false,
  latency: -1,
  lastPinged: new Date(),
  region: "N/A",
};
const DEFAULT_CONFIG: Types.EndpointConfig = {
  okMethods: [200],
  headers: {},
};

// Variables
export const states: Record<string, Types.State> = {};
export let region = "";

/**
 * The main function to call the program.
 */
async function main(): Promise<void> {
  // Initialize states.
  config.endpoints.forEach((endpoint) => {
    states[endpoint.url] = INITIAL_STATE;
  });

  // Set server region.
  const network = await getLocalNetwork();
  if (network) {
    const result = await getRegion(network);

    region = result
      ? `${result.country.iso_code}${
          result.subdivisions[0] && `, ${result.subdivisions[0].iso_code}`
        }`
      : "N/A";
    logger.info(`Region set to: ${region}`);
  } else {
    region = "N/A";
    logger.warn("Could not fetch server region, defaulted to 'N/A'.");
  }

  /**
   * Do a full check of all the configured endpoints.
   */
  async function doCheck() {
    let successful = 0;

    logger.debug(
      `Attempting to update ${config.endpoints.length} endpoint${
        config.endpoints.length > 1 ? "s" : ""
      }.`
    );

    for (const endpoint of config.endpoints) {
      const success = await ping(endpoint);
      if (success) successful += 1;
    }

    logger.info(
      `Successfully updated ${successful}/${config.endpoints.length} endpoints.`
    );
  }

  // Run initial ping.
  await doCheck();

  // Start ping loop.
  setInterval(async () => {
    await doCheck();
  }, config.server.checkInterval * 1000);

  await server(); // Initialize HTTP server.
}

/**
 * The function that makes the actual request to the endpoint.
 * @param site The site to make the request to.
 */
async function ping(site: Types.Endpoint): Promise<boolean> {
  try {
    const config = (site.config as Types.EndpointConfig) || DEFAULT_CONFIG;
    const start = performance.now();
    const result = await ky.get(site.url, {
      headers: config.headers,
    });
    const latency: number = Math.round(performance.now() - start);
    const region = await getRegion(
      (
        await dns.lookup(site.url.substring(8))
      ).address
    );

    if (!region) logger.warn(`Failed to resolve DNS for host: ${site.url}`);

    states[site.url] = {
      online:
        result.ok &&
        config.okMethods.some((method) => method === result.status),
      latency: result.ok ? latency : -1,
      lastPinged: new Date(),
      region: region
        ? `${region.country.iso_code}${
            region.subdivisions[0] && `, ${region.subdivisions[0].iso_code}`
          }`
        : "N/A",
    };

    return true;
  } catch (e) {
    logger.error(e);
    return false;
  }
}

main(); // Initialize application.
