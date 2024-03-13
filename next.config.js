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
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    emotion: true,
  },
  images: {
    domains: ['ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com'], // 이곳에 에러에서 hostname 다음 따옴표에 오는 링크를 적으면 된다.
  },
  transpilePackages: ['@mdxeditor/editor'],
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true
    return config;
  },
});

module.exports = removeImports({
  nextConfig,
});
