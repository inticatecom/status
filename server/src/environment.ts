// Resources
import dotenv from "dotenv";

dotenv.config({ quiet: true }); // Make sure all environment variables are loaded.

// Variables
const { SERVER_PORT, FIND_IP_KEY } = process.env;
if (!SERVER_PORT || !FIND_IP_KEY)
  throw new Error("Missing required environment variables.");

export { SERVER_PORT, FIND_IP_KEY }; // Export Environment Variables
