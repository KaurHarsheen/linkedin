const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Or gemini-1.5-pro if available

router.post('/', async (req, res) => {
  try {
    const { topic, description } = req.body;

    const prompt = `
Give me 5 currently accessible and high-quality learning resources on "${topic}" from either GeeksforGeeks or Coursera.
Each resource should include only:
- a "title": the name of the resource or article
- a "summary": a short 2–3 line description of what the resource covers

Do not include any links, URLs, or video content.
Return the result strictly in JSON format like:

[
  {
    "title": "Example Title",
    "summary": "This article explains how recursion works in JavaScript with detailed examples."
  },
  ...
]
`;

    // ✅ Correct usage: pass prompt as a string
    const result = await model.generateContent(prompt);

    // ✅ Extract the text response correctly
    const text = result.response.text();

    let parsed = [];
    try {
      // Extract only the JSON array part from the response
      const jsonStart = text.indexOf('[');
      const jsonEnd = text.lastIndexOf(']');
      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error('JSON array not found in response');
      }

      const jsonString = text.slice(jsonStart, jsonEnd + 1);
      parsed = JSON.parse(jsonString);
    } catch (err) {
      console.warn('Failed to parse JSON from Gemini output:', err.message);
      return res.status(500).json({ error: 'Invalid format returned by Gemini.' });
    }

    // Filter out only valid items
    const valid = parsed.filter(
      item =>
        item &&
        typeof item.title === 'string' &&
        typeof item.summary === 'string'
    );

    res.json({ resources: valid });
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch Gemini resources' });
  }
});

module.exports = router;
