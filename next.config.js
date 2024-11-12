/* eslint-disable */
// const removeImports = require('next-remove-imports')();

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com",
        port: "", // 포트는 생략
        pathname: "/private/**", // 경로 패턴 설정 (와일드카드 사용 가능)
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
};

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
