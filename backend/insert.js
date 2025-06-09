require('dotenv').config();
const mongoose = require('mongoose');
const Profile = require('./models/Profile');

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log("Connected to MongoDB Atlas");

  // Sample data to insert
  const sampleProfile = new Profile({
  "name": "Mrityunjay Kashyap",
  "title": "Literary & Debating Society, NIT Jamshedpur",
  "location": "Jamshedpur, Jharkhand, India",
  "connections": 128,
  "mutualConnections": [
    { "name": "Pushkar Barnwal", "avatar": "" },
    { "name": "Gargi Pandit", "avatar": "" }
  ],
  "mutualCount": 18,
  "organizations": [
    { "name": "LITERARY AND DEBATING SOCIETY, NIT JAMSHEDPUR", "logo": "" },
    { "name": "National Institute of Technology Jamshedpur", "logo": "" }
  ],
  "avatar": "",
  "coverImage": ""
});

  await sampleProfile.save();
  console.log("Sample profile inserted successfully");

  mongoose.connection.close();
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});
