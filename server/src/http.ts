// Resources
import express, { type Express } from "express";
import endpoints from "./routes/endpoints.js";
import server from "./routes/server.js";

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
      app.listen(3000, () => {
        resolve(app);
      });
    } catch (e) {
      reject(e); // Reject promise if something goes wrong whilst initializing the application.
    }
  });
}
