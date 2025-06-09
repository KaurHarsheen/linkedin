const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// GET profile
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne(); // get the first profile from 'profiles' collection
    if (!profile) {
      return res.status(404).json({ message: 'No profile found' });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST or Update profile
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

    let profile = await Profile.findOne();

    if (profile) {
      // Update existing profile
      profile.name = name || profile.name;
      profile.title = title || profile.title;
      profile.location = location || profile.location;
      profile.connections = connections || profile.connections;
      profile.mutualConnections = mutualConnections || profile.mutualConnections;
      profile.mutualCount = mutualCount || profile.mutualCount;
      profile.organizations = organizations || profile.organizations;
      profile.avatar = avatar || profile.avatar;
      profile.coverImage = coverImage || profile.coverImage;
    } else {
      // Create new profile
      profile = new Profile({
        name,
        title,
        location,
        connections,
        mutualConnections,
        mutualCount,
        organizations,
        avatar,
        coverImage
      });
    }

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
