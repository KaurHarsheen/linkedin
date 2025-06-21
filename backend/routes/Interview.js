const express = require('express');
const router = express.Router();
const { HfInference } = require('@huggingface/inference');
const Interview = require('../models/Interview');
require('dotenv').config();

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
const AI_MODEL = 'mistralai/Mistral-7B-Instruct-v0.2';

// ========================================================================
// THE MASTER PROMPT 3.0 - Engineered for a precise, human-like flow.
// ========================================================================
const getSystemPromptForPhase = (interview) => {
    const { role, difficulty, phase, conversationHistory } = interview;
    const userIntro = conversationHistory.find(m => m.role === 'user')?.content || 'The candidate has not introduced themselves yet.';
    const lastUserResponse = conversationHistory.at(-1)?.content || 'N/A';

    let phaseInstructions = '';
    switch (phase) {
        case 'greeting':
            return `**Your Persona:** You are "Alex," a Senior Interviewer.
            **Task:** Begin the interview.
            **Instructions:** Start by introducing yourself and the company. State that this will be a technical interview for the **${role}** position and will last approximately ${interview.timeLimit} minutes. Then, ask the candidate to give a brief introduction about their background and experience.
            **Example:** "Hi, I'm Alex. Thanks for joining me today. This will be a technical interview for the Software Engineer role, and it should take about 45 minutes. To start, could you please give me a brief introduction about your background and experience?"`;
        
        case 'user_intro_prompt':
            // This phase is handled by the user's response, so the AI's next step is skills assessment.
            phaseInstructions = `**Previous Context:** The candidate just introduced themselves.
            **Task:** Assess their core skills.
            **Instructions:** Based on their introduction ("${userIntro}"), ask a single, targeted question about their key skills or a technology they mentioned.
            **Example:** "Thanks for sharing that. You mentioned working with React. Could you tell me more about your experience with it and what you enjoy most about the library?"`;
            break;

        case 'skills_prompt':
            phaseInstructions = `**Previous Context:** The candidate just described their skills.
            **Task:** Transition to the main problem-solving section.
            **Instructions:** Acknowledge their response and present the FIRST Data Structures and Algorithms (DSA) problem. The problem should be of **${difficulty}** difficulty. Present the problem clearly and concisely.
            **Example:** "Okay, that's helpful context. Let's move into some problem-solving. For your first question: Given an array of integers, find the two numbers that add up to a specific target. You can assume that each input would have exactly one solution."`;
            break;
            
        case 'problem_solving_1':
            phaseInstructions = `**Previous Context:** The candidate has just proposed a solution for the first DSA problem.
            **Task:** Present the SECOND and FINAL DSA problem.
            **Instructions:** Briefly acknowledge their previous answer (e.g., "Alright, thank you for that walkthrough.") and then present the SECOND DSA problem. This problem should also be of **${difficulty}** difficulty and should test a different concept than the first one (e.g., if the first was arrays, maybe this one is on trees or strings).
            **Example:** "Alright, thank you for that walkthrough. For your second and final technical question: Write a function to check if a given binary tree is a valid binary search tree."`;
            break;
            
        case 'problem_solving_2':
             phaseInstructions = `**Previous Context:** The candidate has just answered the final technical question.
            **Task:** Conclude the interview.
            **Instructions:** Thank the candidate for their time and for walking you through their solutions. Inform them that this concludes the technical assessment and that the HR team will be in touch with the next steps. Do not ask if they have questions. Just provide a polite closing.
            **Example:** "Great, thank you for working through that with me. That's all the questions I have for you today. We appreciate you taking the time to interview with us. Our HR team will be in touch with you regarding the next steps."`;
            break;
    }

    // This is a fallback general instruction for the AI
    return `**Your Persona:** You are "Alex," a Senior Interviewer.
    **Golden Rules:**
    1.  **One Question Only:** Ask only one question or make one statement per turn.
    2.  **NEVER Teach:** Do not provide answers or explain concepts. If the user is stuck, say "Okay, we can move on."
    3.  **Stay in Character:** You are Alex, a human interviewer. Do not mention being an AI.
    **Current Task:** ${phaseInstructions}`;
};

// POST /api/interview/start
router.post('/start', async (req, res) => {
    try {
        const { role, company, difficulty, timeLimit } = req.body;
        
        const newInterview = new Interview({ role, company, difficulty, timeLimit }); // Create with initial data
        const systemPrompt = getSystemPromptForPhase(newInterview);

        const aiResponse = await hf.chatCompletion({
            model: AI_MODEL,
            messages: [{ role: 'user', content: systemPrompt }],
        });
        const firstStatement = aiResponse.choices[0].message.content.trim();
        
        newInterview.conversationHistory = [{ role: 'assistant', content: firstStatement }];
        await newInterview.save();
        res.status(201).json(newInterview); // Send back the full interview object
    } catch (error) {
        console.error("Error starting interview:", error);
        res.status(500).json({ message: "Failed to start interview" });
    }
});

// POST /api/interview/next
router.post('/next', async (req, res) => {
    try {
        const { interviewId, answer } = req.body;
        const interview = await Interview.findById(interviewId);
        if (!interview) return res.status(404).json({ message: "Interview not found" });

        interview.conversationHistory.push({ role: 'user', content: answer });

        // Simple, predictable phase progression
        const phaseOrder = ['greeting', 'user_intro_prompt', 'skills_prompt', 'problem_solving_1', 'problem_solving_2', 'conclusion'];
        const currentPhaseIndex = phaseOrder.indexOf(interview.phase);
        const nextPhase = phaseOrder[currentPhaseIndex + 1] || 'conclusion';
        interview.phase = nextPhase;
        
        const systemPrompt = getSystemPromptForPhase(interview);
        
        const aiResponse = await hf.chatCompletion({
            model: AI_MODEL,
            messages: [{ role: 'user', content: systemPrompt }],
        });
        const nextQuestion = aiResponse.choices[0].message.content.trim();
        
        interview.conversationHistory.push({ role: 'assistant', content: nextQuestion });
        await interview.save();
        res.json({ nextQuestion });
    } catch (error) {
        console.error("Error getting next question:", error);
        res.status(500).json({ message: "Failed to get next question" });
    }
});

// GET /api/interview/:id (No changes needed, this is correct)
router.get('/:id', async (req, res) => {
    try {
        const interview = await Interview.findById(req.params.id);
        if (!interview) return res.status(404).json({ message: "Interview not found" });
        res.json(interview);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// POST /api/interview/end (No functional changes needed, but cleaned up)
router.post('/end', async (req, res) => {
    try {
        const { interviewId } = req.body;
        const interview = await Interview.findById(interviewId);
        if (!interview) return res.status(404).json({ message: "Interview not found" });

        const transcript = interview.conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n\n');
        const feedbackPrompt = `As an expert career coach, analyze this interview transcript for a "${interview.role}" position and provide feedback. Your response MUST be ONLY a raw JSON object like this: {"feedback": {"strengths": "...", "improvements": "..."}, "score": X}. Transcript: ${transcript}`;

        const aiResponse = await hf.chatCompletion({
            model: AI_MODEL,
            messages: [{ role: 'user', content: feedbackPrompt }],
        });
        
        let feedbackData;
        try {
            const responseContent = aiResponse.choices[0].message.content;
            const jsonResponseMatch = responseContent.match(/\{.*\}/s);
            if (!jsonResponseMatch) throw new Error("No valid JSON found in AI response.");
            let jsonResponse = jsonResponseMatch[0].replace(/\\\*/g, '*');
            feedbackData = JSON.parse(jsonResponse);
        } catch (e) {
            console.error("Failed to parse AI feedback JSON:", e);
            feedbackData = { feedback: { strengths: "AI could not generate structured feedback.", improvements: "Response format was incorrect." }, score: 3 };
        }

        interview.feedback = JSON.stringify(feedbackData.feedback);
        interview.score = feedbackData.score;
        await interview.save();
        res.json({ feedback: feedbackData.feedback, score: feedbackData.score });
    } catch (error) {
        console.error("Error ending interview:", error);
        res.status(500).json({ message: "Failed to generate feedback" });
    }
});

module.exports = router;