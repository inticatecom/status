// Resources
import dotenv from "dotenv";

// Definitions
import type { NextConfig } from "next";

dotenv.config({ path: "../.env", quiet: true }); // Configure environment variables to load from root.

// Variables
const nextConfig: NextConfig = {};

export default nextConfig; // Export Configuration
