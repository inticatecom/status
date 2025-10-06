// Resources
import ky from "ky";
import server from "./http.js";

// Definitions
import * as Types from "./definitions.js";
import * as config from "../config/index.js";

// Settings
const INITIAL_STATE: Types.State = {
  success: false,
  latency: -1,
  lastPinged: new Date(),
};
const DEFAULT_CONFIG: Types.EndpointConfig = {
  okMethods: [200],
  headers: {},
};

// Variables
export const states: Record<string, Types.State> = {};

/**
 * The main function to call the program.
 */
async function main(): Promise<void> {
  // Initialize states.
  config.endpoints.forEach((endpoint) => {
    states[endpoint.url] = INITIAL_STATE;
  });

  /**
   * Do a full check of all the configured endpoints.
   */
  async function doCheck() {
    for (const endpoint of config.endpoints) {
      await ping(endpoint);
    }
    console.log(states);
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
async function ping(site: Types.Endpoint): Promise<void> {
  const config = (site.config as Types.EndpointConfig) || DEFAULT_CONFIG;
  const start = performance.now();
  const result = await ky.get(site.url, {
    headers: config.headers,
  });
  const latency: number = Math.round(performance.now() - start);

  states[site.url] = {
    success:
      result.ok && config.okMethods.some((method) => method === result.status),
    latency: result.ok ? latency : -1,
    lastPinged: new Date(),
  };
}

main(); // Initialize application.
