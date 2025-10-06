// Resources
import { Router } from "express";

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
      latestPing: -1,
    });
  });

  return router; // Export the router object.
}
