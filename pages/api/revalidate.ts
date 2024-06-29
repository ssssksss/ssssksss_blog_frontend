// import { NextApiRequest, NextApiResponse } from 'next';

import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   const { query, body } = req;

//   if (query.secret !== process.env.REVALIDATE_TOKEN) {
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

// import { NextApiRequest, NextApiResponse } from 'next';
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
  // res.revalidate(`/blog/${req.query.id}`);
  // return res.json({ revalidated: true });
  // res.statusCode = 200;
  // return res.json({ message: "success" });
  // Check for secret to confirm this is a valid request
  // if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
  //   return res.status(401).json({ message: 'Invalid token' });
  // }
  // // const { body } = req;

  // try {
  //   // this should be the actual path not a rewritten path
  //   // e.g. for "/blog/[slug]" this should be "/blog/post-1"
  //   await res.revalidate(`/blog/${req.query.id}`);
  //   return res.json({ revalidated: true });
  // } catch (err) {
  //   // If there was an error, Next.js will continue
  //   // to show the last successfully generated page
  //   return res.status(500).send('Error revalidating');
  // }
// }

    const REVALIDATE_API_ROUTES = async (req: NextApiRequest, res: NextApiResponse) => {
      try {
              await res.revalidate(`/blog/${req.query.id}`);
      res.statusCode = 200;
      return res.json({ message: 'success' });
      } catch {
        return res.json({ message: 'fail' });
      }
    };

    export default REVALIDATE_API_ROUTES;