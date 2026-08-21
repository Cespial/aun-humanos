import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hay un package-lock.json en el home; sin esto Turbopack toma ~/ como raíz.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;
