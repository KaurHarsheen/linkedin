const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const { cosineSimilarity } = require('../utils/cosine');
const { getEmbedding } = require('../utils/embedding');

router.post('/complement', async (req, res) => {
  try {
    const { profileId, goal, topK } = req.body;

    const baseProfile = await Profile.findById(profileId);
    if (!baseProfile) {
      return res.status(404).json({ message: 'Base profile not found.' });
    }

    const goalEmbedding = await getEmbedding(goal);
    if (!goalEmbedding) {
      return res.status(500).json({ message: 'Failed to generate goal embedding.' });
    }

    const allProfiles = await Profile.find({
      _id: { $ne: profileId },
      embedding: { $exists: true }
    });

    const scored = allProfiles.map(p => {
      let profileEmbedding = p.embedding;

      if (!Array.isArray(profileEmbedding)) return null;
      if (typeof profileEmbedding[0] === "string") {
        profileEmbedding = profileEmbedding.map(Number);
      }

      if (profileEmbedding.length !== goalEmbedding.length) {
        console.warn(`⚠️ Skipping ${p._id} - embedding length mismatch.`);
        return null;
      }

      const score = cosineSimilarity(goalEmbedding, profileEmbedding);
      if (isNaN(score)) return null;

      return {
        profile: p,
        score
      };
    }).filter(Boolean);

    const sorted = scored.sort((a, b) => b.score - a.score).slice(0, topK || 5);

    res.json(
      sorted.map(s => ({
        profile: s.profile,
        similarity: s.score.toFixed(4)
      }))
    );
  } catch (err) {
    console.error('❌ Error in /complement:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
