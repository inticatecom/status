// Resources
import ky, { type KyResponse } from "ky";
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
export const states: Record<string, Record<string, Types.State>> = {};
export let region = "";
export let latestPing = new Date();

/**
 * The main function to call the program.
 */
async function main(): Promise<void> {
  // Initialize states.
  Object.entries(config.endpoints).forEach(([categoryName, endpoints]) => {
    const temp: Record<string, Types.State> = {};

    for (const endpoint of endpoints) {
      temp[endpoint.displayName || endpoint.url] = INITIAL_STATE;
    }

    states[categoryName] = temp;
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
    let total = 0;
    let successful = 0; // The number of successful pings.

    // logger.debug(
    //   `Attempting to update ${config.endpoints.length} endpoint${
    //     config.endpoints.length > 1 ? "s" : ""
    //   }.`
    // );

    // Loop over all endpoints and run the ping logic on it.
    for (const [categoryName, endpoints] of Object.entries(config.endpoints)) {
      for (const endpoint of endpoints) {
        const success = await ping(endpoint, categoryName);
        total += 1;
        if (success) successful += 1;
      }
    }

    latestPing = new Date(); // Set the latest ping run to the current time after the ping operation has ran.

    logger.info(`Successfully updated ${successful}/${total} endpoints.`);
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
async function ping(site: Types.Endpoint, category: string): Promise<boolean> {
  const config = (site.config as Types.EndpointConfig) || DEFAULT_CONFIG; // Find endpoint configuration or use default configuration.
  const start = performance.now(); // Start latency check.

  // Attempt to make request to endpoint's base URL.
  let result: KyResponse<Types.State>;
  try {
    result = await ky.get(site.url, {
      headers: config.headers,
    });
  } catch (e) {
    logger.error(e);
    return false; // Tell the function that the endpoint is currently offline.
  }

  const latency: number = Math.round(performance.now() - start); // End latency check after request has been made.

  // Attempt to identify the endpoint's server's location.
  let region: Types.NetworkRegion | null = null;
  try {
    const hostname = new URL(site.url).hostname;
    const address = await dns.lookup(hostname);
    region = await getRegion(address.address);
  } catch (e) {
    logger.warn(`Failed to resolve region for ${site.url}: ${e}`);
  }

  const siteName = site.displayName || site.url; // Use either the site's display name if provided or the site's absolute URL.

  if (!states[category]) return false;

  // Populate object with new information.
  states[category][siteName] = {
    online:
      result.ok && config.okMethods.some((method) => method === result.status),
    latency: result.ok ? latency : -1,
    lastPinged: new Date(),
    region: region
      ? `${region.country.iso_code}${
          region.subdivisions[0] && `, ${region.subdivisions[0].iso_code}`
        }`
      : "N/A",
  };

  logger.debug(states[siteName]);

  return true; // Tell the function that the operation succeeded.
}

main(); // Initialize application.
