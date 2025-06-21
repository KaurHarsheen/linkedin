const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
    role: { type: String, required: true },
    company: { type: String },
    difficulty: { type: String, required: true },
    timeLimit: { type: Number, required: true }, // This will be used by the frontend timer
    conversationHistory: [
        {
            role: { type: String, enum: ['user', 'assistant', 'system'] },
            content: { type: String }
        }
    ],
    // New Ultra-Specific Phases
    phase: {
        type: String,
        enum: [
            'greeting',
            'user_intro_prompt',
            'skills_prompt',
            'problem_solving_1',
            'problem_solving_2',
            'conclusion'
        ],
        default: 'greeting'
    },
    feedback: { type: String },
    score: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Interview', InterviewSchema);