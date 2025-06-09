// backend/models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: String,
  title: String,
  location: String,
  connections: Number,
  mutualConnections: [
    {
      name: String,
      avatar: String
    }
  ],
  mutualCount: Number,
  organizations: [
    {
      name: String,
      logo: String
    }
  ],
  avatar: String,
  coverImage: String
});

module.exports = mongoose.model('Profile', profileSchema,'profiles');
