import { userLogins } from './logLogin';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query;
    res.status(200).json({ logins: userLogins[userId] || {} });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 