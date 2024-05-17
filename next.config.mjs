import { config } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

config();

if (!process.env.API_URL) {
    throw new Error ("API_URL is not defined");
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    reactStrictMode: false,
    env: {
        siteUrl: process.env.SITE_URL ?? "http://localhost:3000",
        apiUrl: process.env.API_URL,
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    experimental: {
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    }
};

export default nextConfig;
