const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  skills: [String],
  experience: { type: String, enum: ['Beginner','Intermediate','Expert'] },
  role: { type: String, enum: ['mentor', 'peer'] },
  availability: [Date],                 // added
  scheduledMeeting: {
    time: Date,
    link: String
  }
});

module.exports = mongoose.model('User', UserSchema);
