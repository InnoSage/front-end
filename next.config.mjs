import { config } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

config();

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    reactStrictMode: false,
    env: {
        siteUrl: process.env.SITE_URL ?? "http://localhost:3000"
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    experimental: {
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    }
};

export default nextConfig;
