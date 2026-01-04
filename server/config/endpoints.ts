// Definitions
import type { Endpoint } from "../src/definitions.js";

// Export Configuration
export default {
  "My Category": [
    {
      url: "https://example.com",
      displayName: "My Endpoint",
    },
  ],
} satisfies Record<string, Endpoint[]>;
