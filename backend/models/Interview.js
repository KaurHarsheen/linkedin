const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
    role: { type: String, required: true },
    company: { type: String },
    difficulty: { type: String, required: true },
    timeLimit: { type: Number, required: true },
    conversationHistory: [
        {
            role: { type: String, enum: ['user', 'assistant'] },
            content: { type: String }
        }
    ],
    feedback: { type: String },
    score: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Interview', InterviewSchema);