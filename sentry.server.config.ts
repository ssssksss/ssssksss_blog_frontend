// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// 아래 주소로 docs 참고
// https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV ?? "development",
  // 버전은 나중에 깃허브에서 버전관련 설정을 해서 맞추던지 해야할 것 같다. 당장은 일단 버전 고정
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE ?? "1.0.0",
  tracesSampleRate: 1,

  // 디버그 모드를 켜거나 끕니다. 디버그가 활성화되면 SDK는 SDK가 수행하는 작업에 대한 유용한 디버깅 정보를 출력하려고 시도합니다.
  debug: false,
});
