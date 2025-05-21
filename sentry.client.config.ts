// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  tracesSampleRate: 1,
  debug: false,
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN, // 반드시 NEXT_PUBLIC 접두어
  environment: process.env.NODE_ENV, // "development", "staging", "production"
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
  ignoreErrors: [
    // 무시할 오류 메시지 목록 (클라이언트에 많음)
    "ResizeObserver loop limit exceeded", // 브라우저에서 자주 무시해도 되는 에러
  ],
});
