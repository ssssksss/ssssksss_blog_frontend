import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');

  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->


<url>
  <loc>https://blog.ssssksss.xyz/</loc>
  <lastmod>2024-03-06T02:13:18+00:00</lastmod>
  <priority>1.00</priority>
</url>
<url>
  <loc>https://blog.ssssksss.xyz/blog</loc>
  <lastmod>2024-03-06T02:13:18+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://blog.ssssksss.xyz/board?page=1&amp;size=10&amp;sort=latest&amp;keyword=</loc>
  <lastmod>2024-03-06T02:13:18+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://blog.ssssksss.xyz/todo</loc>
  <lastmod>2024-03-06T02:13:18+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://blog.ssssksss.xyz/memo</loc>
  <lastmod>2024-03-06T02:13:18+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://blog.ssssksss.xyz/schedule</loc>
  <lastmod>2024-03-06T02:13:18+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://blog.ssssksss.xyz/setting</loc>
  <lastmod>2024-03-06T02:13:18+00:00</lastmod>
  <priority>0.80</priority>
</url>


</urlset>`;

  res.end(xml);
}
