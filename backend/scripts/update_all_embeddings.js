require('dotenv').config({ path: __dirname + '/../.env' });


const mongoose = require('mongoose');
const Profile = require('../models/Profile');
const { getEmbedding } = require('../utils/embedding');

async function updateEmbeddings() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const profiles = await Profile.find();

    for (const profile of profiles) {
      if (!profile.name && !profile.title && !profile.location) continue;

      const text = `${profile.name || ''} ${profile.title || ''} ${profile.location || ''}`;
      const embedding = await getEmbedding(text.trim());

      if (embedding && Array.isArray(embedding)) {
        profile.embedding = embedding;
        await profile.save();
        console.log(`✅ Updated embedding for profile ${profile._id}`);
      } else {
        console.warn(`⚠️ Could not generate embedding for profile ${profile._id}`);
      }
    }

    console.log('🎉 All embeddings updated!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

updateEmbeddings();
