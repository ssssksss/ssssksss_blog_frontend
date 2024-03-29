// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   const { query, body } = req;

//   if (query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }

//   if (body.path === '') {
//     return res.status(401).json({ message: 'Invalid target' });
//   }

//   try {
//     await res.revalidate(`/${body.path}/${body.id}`);
//     res.statusCode = 200;
//     return res.json({ revalidated: true });
//   } catch (err) {
//     return res.status(500).send('Error revalidating');
//   }
// }

import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  const { body } = req;

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate(`/blog/${body.id}`);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating' + body.id);
  }
}
