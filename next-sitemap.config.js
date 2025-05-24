module.exports = {
  siteUrl: "https://blog.ssssksss.xyz", // 배포된 사이트의 도메인
  generateRobotsTxt: true, // robots.txt 생성 여부
  sitemapSize: 5000, // (선택) sitemap 파일 분할 기준
  exclude: [
    "/age",
    "/design",
    "/plan",
    "/site-bookmark",
    "/switch",
    "/travel",
    "/tree",
    "/board/update",
    "/board/create",
  ], // (선택) sitemap에서 제외할 경로
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/age",
          "/design",
          "/plan",
          "/site-bookmark",
          "/switch",
          "/travel",
          "/tree",
          "/board/update",
          "/board/create",
        ],
      },
    ],
  },
};