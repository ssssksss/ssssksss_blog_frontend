/* eslint-disable */
// const removeImports = require('next-remove-imports')();

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "http",
        hostname: "tong.visitkorea.or.kr",
      },
    ],
  },
  reactStrictMode: false,
  swcMinify: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; img-src 'self' blob: data: https:; script-src 'self'; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);

// const withPWA = require('next-pwa')({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
//   runtimeCaching: require('next-pwa/cache'),
//   disable: process.env.NODE_ENV === 'development',
// });

// /** @type {import('next').NextConfig} */
// const nextConfig = withPWA({
//   reactStrictMode: false,
//   images: {
//     // domains: ['ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com'],
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com',
//         port: '',
//         pathname: '/private/**',
//       },
//     ],
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   compiler: {
//     styledComponents: true,
//   },
//   async rewrites() {
//     return [
//       {
//         source: '/:path*',
//         destination: 'http://localhost:8080/:path*',
//       },
//     ];
//   },
//   // transpilePackages: ['@mdxeditor/editor'],
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback = {
//         fs: false, // 클라이언트 번들에서 fs 모듈 제외
//         path: false, // path 모듈도 제외 가능
//       };
//     }
//     return config;
//   },
// });

// module.exports = removeImports({
//   nextConfig,
// });

// module.exports = nextConfig;


// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    org: "sukyunglee",
    project: "javascript-nextjs",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
