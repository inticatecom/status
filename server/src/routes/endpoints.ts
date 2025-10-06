// Resources
import { Router } from "express";
import { states } from "../index.js";
import { filterObject } from "../util.js";

/**
 * Routes relating to endpoints and getting their statuses.
 */
export default function Endpoints() {
  const router = Router(); // Initialize the router.

  /**
   * Fetches all endpoints, including their states and information.
   */
  router.get("/", (req, res) => {
    const { query } = req.query; // Fetch query parameters from request.

    // Filter out results.
    if (query) {
      return res.json(
        filterObject(states, (siteName) =>
          siteName.toLowerCase().includes((query as string).toLowerCase())
        )
      );
    }

    return res.json(states); // If no query parameters, then return all of them.
  });

  return router; // Export the router object.
}
