import { NextApiRequest, NextApiResponse } from 'next';

export const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'stale-while-revalidate, s-maxage=3600');

  const robots = `
  User-agent: *
  Allow: /
  Disallow: /schedule/
  Disallow: /memo/
  Disallow: /todo/
  Sitemap: https://blog.ssssksss.xyz/sitemap.xml
  `;

  res.end(robots);
};
