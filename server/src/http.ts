// Resources
import express, { type Express } from "express";
import endpoints from "./routes/endpoints.js";
import server from "./routes/server.js";
import dotenv from "dotenv";
import { logger } from "./util.js";

dotenv.config({ quiet: true });

// Variables
const { SERVER_PORT } = process.env;

/**
 * The base initializer to start the HTTP server.
 * @returns The HTTP server.
 */
export default function HTTP(): Promise<Express> {
  return new Promise((resolve, reject) => {
    try {
      const app = express(); // Initialize HTTP server.

      // Connect Middlewares
      app.use(express.json());

      // Connect Routes
      app.use("/server", server());
      app.use("/endpoints", endpoints());

      // Attempt to reserve port for HTTP server.
      app.listen(SERVER_PORT, () => {
        logger.info(`HTTP server started on port: ${SERVER_PORT}`);
        resolve(app);
      });
    } catch (e) {
      reject(e); // Reject promise if something goes wrong whilst initializing the application.
    }
  });
}
