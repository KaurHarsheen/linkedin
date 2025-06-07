const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { prompt, type, tone } = req.body;

  if (!prompt || !type || !tone) {
    return res.status(400).json({ error: 'Missing prompt, type, or tone' });
  }

  const fullPrompt = `Write a ${tone.toLowerCase()} and professional ${type.toLowerCase()} based on: "${prompt}"`;
  console.log('Prompt:', fullPrompt);

  try {
    const response = await axios.post(
      'https://api.cohere.ai/v2/chat',
      {
        model: 'command-r-plus', // or use the newest: 'command-a-03-2025'
        messages: [
          {
            role: 'user',
            content: fullPrompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const generatedText = response.data.message.content
      .map(c => c.text)
      .join('\n')
      .trim();

    res.json({ generated: generatedText });

  } catch (error) {
    console.error('Cohere Chat API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'AI generation failed' });
  }
});

module.exports = router;
