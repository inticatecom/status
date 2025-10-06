// Resources
import { Router } from "express";
import { states } from "../index.js";

/**
 * Routes relating to endpoints and getting their statuses.
 */
export default function Endpoints() {
  const router = Router(); // Initialize the router.

  /**
   * Fetches all endpoints, including their states and information.
   */
  router.get("/", (req, res) => {
    const { site } = req.query; // Fetch query parameters from request.

    // Filter out results.
    if (site) {
      return res.json(
        Object.keys(states).filter((siteName) =>
          siteName.toLowerCase().includes((site as string).toLowerCase())
        )
      );
    }

    return res.json(states); // If no query parameters, then return all of them.
  });

  return router; // Export the router object.
}
