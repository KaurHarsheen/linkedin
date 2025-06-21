const express = require('express');
const axios = require('axios');
const router = express.Router();
const mockData = require('../mockData');

// --- ROUTE 1: CORRECTED TO CREATE A BETTER PROMPT ---
router.post('/stats', (req, res) => {
    const { period } = req.body;
    if (!period) return res.status(400).json({ message: "Period is required." });
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - period);
    const filterByDate = (item) => new Date(item.completedAt) > startDate;
    const completedProjects = mockData.projects.filter(filterByDate);
    const completedTasks = mockData.tasks.filter(filterByDate);
    const completedLearnings = mockData.learnings.filter(filterByDate);
    
    // This is the data we will display perfectly on the frontend
    const stats = {
        period,
        completedProjects: completedProjects.length,
        completedTasks: completedTasks.length,
        completedLearnings: completedLearnings.length,
    };

    // --- **THE NEW VISUAL PROMPT** ---
    // This asks for a beautiful background, not text.
    // Choose the style you like best!
    const prompt = `A clean, minimalist, abstract background representing data and connectivity. Geometric shapes, glowing lines, digital art, vibrant but soft corporate blue and cyan colors, masterpiece.`;
    
    // We send BOTH the stats (for the text) and the new prompt (for the image)
    res.json({ stats, prompt });
});


// --- ROUTE 2: UPGRADED WITH A NEGATIVE PROMPT ---
router.post('/generate-image', async (req, res) => {
    const { prompt } = req.body;
    const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;

    if (!prompt) return res.status(400).json({ message: "Prompt is required." });
    if (!HF_TOKEN) return res.status(500).json({ message: "Hugging Face API key not configured." });

    try {
        const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";
        
        // We create a payload with both a positive and negative prompt
        const payload = {
            inputs: prompt,
            parameters: {
                // This tells the AI what to AVOID. It's extremely effective.
                negative_prompt: "blurry, bad art, distorted, ugly, weird text, unclear letters, gibberish, watermark, signature, deformed",
            }
        };

        const response = await axios.post(
            HUGGINGFACE_API_URL,
            payload, // Send the full payload
            {
                headers: {
                    'Authorization': `Bearer ${HF_TOKEN}`,
                    'Accept': 'image/jpeg'
                },
                responseType: 'arraybuffer'
            }
        );

        res.setHeader('Content-Type', 'image/jpeg');
        res.send(response.data);

    } catch (error) {
        // ... (Your existing error handling is good) ...
        console.error("--- Hugging Face API Error ---");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data.toString());
        } else {
            console.error("Error Message:", error.message);
        }
        console.error("-----------------------------");
        if (error.response && error.response.status === 503) {
            return res.status(503).json({ message: "The AI model is currently loading, please try again in a moment." });
        }
        res.status(500).json({ message: "Failed to generate image." });
    }
});

module.exports = router;