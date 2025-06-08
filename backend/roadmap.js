const express = require('express');
const axios = require('axios');
const router = express.Router();
router.post('/', async (req, res) => {

  const { currentSkills, goal } = req.body;
    const skillsArray = Array.isArray(currentSkills) ? currentSkills : String(currentSkills).split(',').map(s => s.trim());
const prompt = `
You are a career mentor and learning roadmap expert.

Create a detailed, customized 4-month learning roadmap in JSON format for the following user:

Goal: ${goal}
Current Skills: ${skillsArray.join(', ')}

IMPORTANT:
- Only include topics relevant to the user's goal.
- Avoid web development topics unless the goal explicitly involves it.
- Provide a step-by-step roadmap with **at least 4 to 6 steps**.
- Each step is an object with "title" and "description".
- The description should explain what the topic covers and what the learner will achieve.

Example output:
[
  {
    "title": "Introduction to Data Structures",
    "description": "Learn about arrays, linked lists, stacks, and queues. Understand their use cases and basic operations."
  },
  {
    "title": "Algorithms Basics",
    "description": "Study sorting, searching algorithms, and algorithmic complexity to build problem-solving skills."
  }
  // ...more steps
]

Please respond **ONLY** with the JSON array of steps. No explanations or additional text.
`;

  try {
    const geminiResponse = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        params: {
          key: 'AIzaSyCjfJc1QWXkEjb50U5bfpS3Vu9bnAS6ZME'  // Your actual Gemini API key
        }
      }
    );

    let rawText = geminiResponse.data.candidates[0]?.content?.parts[0]?.text || '';

    // Strip markdown code block wrappers like ```json ... ```
    rawText = rawText.replace(/```json|```/g, '').trim();

    try {
      // Try to parse JSON directly
      const parsedRoadmap = JSON.parse(rawText);

      // Limit to 6 items
      const limitedRoadmap = parsedRoadmap.slice(0, 6);

      return res.json({ roadmap: limitedRoadmap });
    } catch (e) {
      // If direct parsing fails, try regex extraction
      const match = rawText.match(/\[\s*{[\s\S]*}\s*]/);
      if (match) {
        try {
          const parsedRoadmap = JSON.parse(match[0]);

          // Limit to 6 items
          const limitedRoadmap = parsedRoadmap.slice(0, 6);

          return res.json({ roadmap: limitedRoadmap });
        } catch (innerError) {
          console.error('Failed to parse extracted JSON:', match[0]);
          return res.status(500).json({
            error: 'Invalid JSON format after extraction',
            rawResponse: rawText
          });
        }
      } else {
        console.error('No JSON array found in Gemini response:', rawText);
        return res.status(500).json({
          error: 'No valid JSON array found in response',
          rawResponse: rawText
        });
      }
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate roadmap' });
  }
});

module.exports = router;
