import { google } from "googleapis";

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No auth header" });

  const accessToken = authHeader.split(" ")[1];
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  const now = new Date();
  const events = await calendar.events.list({
    calendarId: "primary",
    timeMin: now.toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });
  res.status(200).json({ events: events.data.items });
} 