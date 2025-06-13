// FINAL CORRECTED CODE - Use this entire block
const express = require('express');
const router = express.Router();
const { HfInference } = require('@huggingface/inference');
const Interview = require('../models/Interview');
require('dotenv').config();

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
const AI_MODEL = 'mistralai/Mistral-7B-Instruct-v0.2';

// System prompt that sets the rules for the AI during the interview.
const getInterviewSystemPrompt = (role, company, difficulty) => {
    return `You are an expert technical interviewer. Your task is to conduct a realistic mock interview.
- **Role to Interview For:** ${role}
- **Target Company:** ${company || 'a top tech company'}
- **Difficulty Level:** ${difficulty}

**Your Instructions:**
1.  Ask only one question at a time.
2.  Start the interview directly with your first question. Do not use any greetings like "Hello" or "Welcome".
3.  Based on my answers, ask relevant technical or behavioral follow-up questions.
4.  Keep your responses concise and strictly in the persona of an interviewer.
Now, ask your first question.`;
};


// POST /api/interview/start - Start a new interview
router.post('/start', async (req, res) => {
    try {
        const { role, company, difficulty, timeLimit } = req.body;
        
        const aiResponse = await hf.chatCompletion({
            model: AI_MODEL,
            messages: [{ role: 'user', content: getInterviewSystemPrompt(role, company, difficulty) }],
            parameters: { max_new_tokens: 150, temperature: 0.7 }
        });

        const firstQuestion = aiResponse.choices[0].message.content.trim();
        
        const newInterview = new Interview({
            role,
            company,
            difficulty,
            timeLimit,
            conversationHistory: [{ role: 'assistant', content: firstQuestion }]
        });
        
        await newInterview.save();

        res.status(201).json({ interviewId: newInterview._id, firstQuestion });

    } catch (error) {
        console.error("Error starting interview:", error);
        res.status(500).json({ message: "Failed to start interview", error: error.message });
    }
});
// ... other routes like /start, /next, /end are above this ...

// GET /api/interview/:id - Get full interview data (for feedback page)
router.get('/:id', async (req, res) => {
    try {
        // 1. It extracts the ID from the URL (e.g., '684c3eb0f560e73f8daea30a')
        const interviewId = req.params.id;

        // 2. It uses that ID to find the corresponding document in the MongoDB database
        const interview = await Interview.findById(interviewId);

        // 3. If no interview is found with that ID, it sends back its OWN 404 error
        if (!interview) {
            // This is a "database 404" - the server works, but the specific data doesn't exist
            return res.status(404).json({ message: "Interview not found in database" });
        }
        
        // 4. If found, it sends the full interview data back to the frontend
        res.json(interview);

    } catch (error) {
        // If there's a database connection error or other server issue
        res.status(500).json({ message: "Server error while fetching interview" });
    }
});

module.exports = router;

// POST /api/interview/next - Submit an answer and get the next question
router.post('/next', async (req, res) => {
    try {
        const { interviewId, answer } = req.body;
        const interview = await Interview.findById(interviewId);

        if (!interview) {
            return res.status(404).json({ message: "Interview not found" });
        }

        const updatedHistory = [...interview.conversationHistory, { role: 'user', content: answer }];

        const aiResponse = await hf.chatCompletion({
            model: AI_MODEL,
            messages: updatedHistory,
            parameters: { max_new_tokens: 150, temperature: 0.7 }
        });

        const nextQuestion = aiResponse.choices[0].message.content.trim();
        
        interview.conversationHistory.push({ role: 'user', content: answer });
        interview.conversationHistory.push({ role: 'assistant', content: nextQuestion });
        
        await interview.save();
        res.json({ nextQuestion });

    } catch (error) {
        console.error("Error getting next question:", error);
        res.status(500).json({ message: "Failed to get next question", error: error.message });
    }
});


// POST /api/interview/end - End the interview and get feedback

router.post('/end', async (req, res) => {
    try {
        const { interviewId } = req.body;
        const interview = await Interview.findById(interviewId);

        if (!interview) {
            return res.status(404).json({ message: "Interview not found" });
        }

        const transcript = interview.conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n\n');
        const feedbackPrompt = `
            **Role:** Act as an expert career coach reviewing an interview transcript.
            **Your Task:** Provide feedback on an interview for a "${interview.role}" position.
            **Instructions:**
            1.  Analyze the entire interview transcript provided below.
            2.  Provide constructive feedback, highlighting both strengths and areas for improvement.
            3.  Structure your feedback in two sections: "Strengths" and "Areas for Improvement".
            4.  Finally, provide an overall performance score on a scale of 1 to 10.
            5.  Your entire response must be ONLY the raw JSON object, without any surrounding text or markdown. The JSON should look like this: {"feedback": {"strengths": "...", "improvements": "..."}, "score": X}

            **Interview Transcript:**
            ${transcript}
        `;

        const aiResponse = await hf.chatCompletion({
            model: AI_MODEL,
            messages: [{ role: 'user', content: feedbackPrompt }],
            parameters: { max_new_tokens: 500 }
        });
        
        let feedbackData;
        try {
            const responseContent = aiResponse.choices[0].message.content;
            const jsonResponseMatch = responseContent.match(/\{.*\}/s);

            if (!jsonResponseMatch) {
                 throw new Error("AI response did not contain valid JSON.");
            }

            let jsonResponse = jsonResponseMatch[0];

            // ========================================================================
            // THE FIX IS HERE: Clean the string before parsing
            // The AI sometimes generates invalid escape sequences like `\*`.
            // We replace `\*` with `*` to make the JSON valid.
            jsonResponse = jsonResponse.replace(/\\\*/g, '*');
            // ========================================================================

            feedbackData = JSON.parse(jsonResponse);

        } catch (e) {
            console.error("Failed to parse AI feedback JSON:", e);
            console.error("Raw AI Response:", aiResponse.choices[0].message.content);
            feedbackData = { feedback: { strengths: "Could not generate structured feedback.", improvements: "The AI response was not in the correct JSON format." }, score: 3 };
        }

        interview.feedback = JSON.stringify(feedbackData.feedback);
        interview.score = feedbackData.score;
        
        await interview.save();
        res.json({ feedback: feedbackData.feedback, score: feedbackData.score });

    } catch (error) {
        console.error("Error ending interview:", error);
        res.status(500).json({ message: "Failed to generate feedback", error: error.message });
    }
});



module.exports = router;