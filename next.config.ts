import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  turbopack: {
    // Ensure Turbopack treats this folder as the workspace root
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
