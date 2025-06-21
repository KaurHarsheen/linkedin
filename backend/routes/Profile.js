const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const axios = require('axios');
require('dotenv').config();

const COHERE_API_KEY = process.env.COHERE_API_KEY;
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/complement', async (req, res) => {
  try {
    const { profileId, goal, topK } = req.body;

    const baseProfile = await Profile.findById(profileId);
    if (!baseProfile || !Array.isArray(baseProfile.embedding)) {
      return res.status(404).json({ message: 'Base profile not found or missing embedding.' });
    }

    const goalEmbedding = await getEmbedding(goal);
if (!goalEmbedding || !Array.isArray(goalEmbedding) || goalEmbedding.length === 0) {
  console.error('⚠️ Goal embedding is missing or empty:', goalEmbedding);
  return res.status(500).json({ error: 'Failed to generate valid goal embedding. Please check the input text or model.' });
}


    console.log('🧪 DEBUGGING EMBEDDINGS');
    console.log('Goal Embedding:', true, 'Length:', goalEmbedding.length);
    console.log('Base Profile ID:', baseProfile._id);
    console.log('Base Profile Embedding:', true, 'Length:', baseProfile.embedding.length);

    const allProfiles = await Profile.find({
      _id: { $ne: profileId },
      embedding: { $exists: true }
    });

    console.log('Number of Other Profiles:', allProfiles.length);

    const scored = [];

    allProfiles.forEach((p, idx) => {
      const e = p.embedding;
      console.log(`--- Profile ${idx + 1} ---`);
      console.log('ID:', p._id);
      console.log('Has embedding:', Array.isArray(e));
      console.log('Embedding length:', e?.length);
      console.log('First 3 values:', e?.slice(0, 3));

      if (!Array.isArray(e) || e.length !== goalEmbedding.length || e.length !== baseProfile.embedding.length) {
        console.log(`Skipping profile ${p._id} due to embedding mismatch.`);
        return;
      }

      const combined = e.map((val, i) => (val + goalEmbedding[i]) / 2);
      const score = cosineSimilarity(baseProfile.embedding, combined);

      scored.push({ profile: p, score });
    });

    const sorted = scored.sort((a, b) => b.score - a.score).slice(0, topK || 5);

    res.json(sorted.map(s => ({
      profile: s.profile,
      similarity: s.score.toFixed(4)
    })));
  } catch (err) {
    console.error('❌ Error in /complement:', err.message);
    res.status(500).json({ error: err.message });
  }
});
// POST: Create new profile with Cohere embeddings
router.post('/', async (req, res) => {
  try {
    const {
      name, title, location,
      connections, mutualConnections,
      mutualCount, organizations,
      avatar, coverImage
    } = req.body;

    const textToEmbed = `${name} ${title} ${location}`.trim();
    if (!textToEmbed) {
      return res.status(400).json({ error: "Name, title, or location missing!" });
    }

    // Get embeddings using Cohere
    const cohereRes = await axios.post(
      'https://api.cohere.ai/v1/embed',
      {
        texts: [textToEmbed],
        model: 'embed-english-v3.0', // or another version from Cohere docs
        input_type: 'search_document'
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const embedding = cohereRes.data.embeddings[0]; // This should be a float array

    if (!Array.isArray(embedding)) {
      console.error('Unexpected Cohere output:', cohereRes.data);
      return res.status(500).json({ error: 'Invalid embedding format', raw: cohereRes.data });
    }

    const newProfile = new Profile({
      name, title, location, connections,
      mutualConnections, mutualCount, organizations,
      avatar, coverImage, embedding
    });

    await newProfile.save();
    return res.status(201).json(newProfile);

  } catch (err) {
    console.error('Cohere API error:', err.response?.data || err.message);
    return res.status(500).json({
      error: err.response?.data?.message || err.message
    });
  }
});

module.exports = router;
