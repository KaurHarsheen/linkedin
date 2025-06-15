const express = require('express');
const router = express.Router();
const Profile = require('./models/Profile');
const axios = require('axios');

// POST: Create new profile with embedding
router.post('/', async (req, res) => {
  try {
    const {
      name,
      title,
      location,
      connections,
      mutualConnections,
      mutualCount,
      organizations,
      avatar,
      coverImage
    } = req.body;

    // Combine text to generate meaningful embedding
    const combinedText = `${name} ${title} ${location}`;

    // Generate embedding using Hugging Face
    const hfResponse = await axios.post(
      'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2',
      {
        inputs: combinedText
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const embedding = hfResponse.data?.[0];

    if (!embedding || !Array.isArray(embedding)) {
      return res.status(500).json({ error: "Embedding generation failed", details: hfResponse.data });
    }

    const newProfile = new Profile({
      name,
      title,
      location,
      connections,
      mutualConnections,
      mutualCount,
      organizations,
      avatar,
      coverImage,
      embedding
    });

    await newProfile.save();
    res.status(201).json({ message: "✅ Profile inserted successfully", profile: newProfile });
  } catch (err) {
    console.error("❌ Error inserting profile:", err.message);
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
});

module.exports = router;
