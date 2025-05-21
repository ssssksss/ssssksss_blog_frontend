import { NextRequest } from "next/server";

const ORG_SLUG = "agezero";
const PROJECT_SLUG = "javascript-nextjs";

export async function GET(request: NextRequest) {
  return await fetch(
    `https://sentry.io/api/0/projects/${ORG_SLUG}/${PROJECT_SLUG}/issues/?limit=5`,
    {
      headers: {
        Authorization: `Bearer ${process.env.SENTRY_AUTH_TOKEN}`,
        "Accept-Encoding": "identity",
      },
    },
  );

}