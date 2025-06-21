const userLogins = {};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, date } = req.body;
    if (!userLogins[userId]) userLogins[userId] = {};
    if (!userLogins[userId][date]) userLogins[userId][date] = 0;
    userLogins[userId][date] += 1;
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

export { userLogins }; 