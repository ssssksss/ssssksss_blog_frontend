/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    emotion: true,
  },
};

module.exports = nextConfig;
