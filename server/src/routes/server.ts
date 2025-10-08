// Resources
import { Router } from "express";
import { region, latestPing } from "../index.js";

/**
 * Routes relating to the main status server.
 */
export default function Server() {
  const router = Router(); // Initialize the router.

  /**
   * Fetches all endpoints, including their states and information.
   */
  router.get("/", (_, res) => {
    return res.json({
      region,
      latestPing,
    });
  });

  return router; // Export the router object.
}
