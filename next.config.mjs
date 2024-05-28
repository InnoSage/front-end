/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true
    },
    experimental: {
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    }
};

export default nextConfig;
