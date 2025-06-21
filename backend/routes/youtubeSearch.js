const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const API_KEY = 'AIzaSyBq8q8WaS2izDQj5Qlz7JECegpyNu-6HbU';
// const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`;

router.get('/', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items) {
      return res.status(404).json({ error: 'No results found', data });
    }

    const video = data.items[0];
    const result = {
      title: video.snippet.title,
      videoUrl: `https://www.youtube.com/watch?v=${video.id.videoId}`
    };

    res.json(result);
  } catch (err) {
    console.error('❌ YouTube fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch YouTube video' });
  }
});

module.exports = router;
