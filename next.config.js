const removeImports = require('next-remove-imports')();

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: require('next-pwa/cache'),
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/private/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  compiler: {
    emotion: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/sitemap.xml',
  //       destination: '/api/sitemap',
  //     },
  //   ];
  // },
  transpilePackages: ['@mdxeditor/editor'],
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
});

module.exports = removeImports({
  nextConfig,
});

module.exports = nextConfig;
