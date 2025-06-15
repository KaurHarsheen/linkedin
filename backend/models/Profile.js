const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: String,
  title: String,
  location: String,
  connections: Number,
  mutualConnections: [String],
  mutualCount: Number,
  organizations: [String],
  avatar: String,
  coverImage: String,
  embedding: [Number]
});

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
