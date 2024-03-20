import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // const { query, body } = req;
  const { body } = req;

  // Check for secret to confirm this is a valid request
  // if (query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
  //   return res.status(401).json({ message: 'Invalid token' });
  // }

  // if (body.path === '') {
  //   return res.status(401).json({ message: 'Invalid target' });
  // }

  try {
    await res.revalidate(`/${body.path}/${body.id}`);
    res.statusCode = 200;
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
