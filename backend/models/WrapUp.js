const mongoose = require('mongoose');

const WrapUpSchema = new mongoose.Schema({
  month: { type: String, required: [true, 'Month is required.'] },
  year: { type: Number, required: [true, 'Year is required.'] },
  timeDevoted: { type: Number, required: true, default: 0 },
  projects: [{ name: { type: String, required: true } }],

  // Job Tracking Fields - Modified for images
  generationStatus: { 
    type: String, 
    enum: ['pending', 'claimed', 'processing', 'completed', 'failed'], 
    default: 'pending' 
  },
  imageUrls: {
    type: [String], // Store an array of image URLs
    default: []
  },
  failureReason: { type: String, default: '' },
}, { 
  timestamps: true 
});

module.exports = mongoose.model('WrapUp', WrapUpSchema);