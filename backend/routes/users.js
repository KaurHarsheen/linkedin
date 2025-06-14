const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { getEmbeddings, getSummary } = require('../utils/cohere');
const mongoose = require('mongoose');
//const User = require('../models/user');

router.get('/seed', async (req, res) => {
  await User.deleteMany();

  const users = [
    {
    _id: new mongoose.Types.ObjectId('666111111111111111111111'),
    name: 'Alice',
    email: 'a@example.com',
    skills: ['React', 'Node'],
    experience: 'Expert',
    role: 'mentor',
    availability: ["2025-06-13T10:00:00.000Z"]
  },
  {
    _id: new mongoose.Types.ObjectId('666222222222222222222222'),
    name: 'Bob',
    email: 'b@example.com',
    skills: ['React'],
    experience: 'Beginner',
    role: 'peer',
    availability: ["2025-06-13T10:00:00.000Z"]
  },
    {
      _id: new mongoose.Types.ObjectId('666333333333333333333333'),
      name: 'Charlie',
      email: 'c@example.com',
      skills: ['Node'],
      experience: 'Intermediate',
      role: 'peer',
      availability: [new Date('2025-06-12T15:30:00.000Z')]  // UTC time
    },
    {
      _id: new mongoose.Types.ObjectId('666444444444444444444444'),
      name: 'David',
      email: 'd@example.com',
      skills: ['MongoDB'],
      experience: 'Beginner',
      role: 'mentor',
      availability: [new Date('2025-06-12T15:30:00.000Z')]  // UTC time
    }
  ];

  await User.insertMany(users);
  res.send({ message: 'Users seeded successfully' });
});

// 🎯 Match route

router.get('/match/:id', async (req, res) => {
  console.log("Request params ➜", req.params);
  try {
    const id = req.params.id;
    //console.log("id ➜", id);
    // ✅ Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const currentUser = await User.findById(id);
   // console.log("currentUser ➜", currentUser);

    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const users = await User.find({ _id: { $ne: id } });

    const inputTexts = [currentUser, ...users].map(
      (u) => `${u.skills.join(', ')} ${u.experience}`
    );

    const vectors = await getEmbeddings(inputTexts);
    const targetVec = vectors[0];
    const otherVecs = vectors.slice(1);

    function cosineSim(a, b) {
      const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
      const magA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
      const magB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
      return dot / (magA * magB);
    }

    const scored = users
      .map((u, i) => ({ user: u, score: cosineSim(targetVec, otherVecs[i]) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.user);

    const summary = await getSummary(currentUser, scored);

    res.json({ matches: scored, summary });
  } catch (err) {console.error("Error in /match/:id ➜", err);
    console.error("Error in /match/:id ➜", err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// POST /:id/schedule
router.post('/:id/schedule', async (req, res) => {
  const user = await User.findById(req.params.id);
  const others = await User.find({ _id: { $ne: req.params.id } });

  let common = others.flatMap(o =>
    o.availability.filter(a =>
      user.availability.some(uTime =>
        Math.abs(new Date(uTime) - new Date(a)) <= 15 * 60 * 1000
      ))
  );

  if (!common.length) return res.status(400).json({ error: 'No common slots' });

  const meetingTime = new Date(common[0]);
  const meetingLink = `https://meet.jit.si/room-${Math.random().toString(36).slice(2, 9)}`;

  user.scheduledMeeting = { time: meetingTime, link: meetingLink };
  await user.save();

  for (const o of others) {
    if (o.availability.includes(meetingTime.toISOString())) {
      o.scheduledMeeting = { time: meetingTime, link: meetingLink };
      await o.save();
    }
  }

  // 🧠 return ISO string instead of raw Date
  res.json({ time: meetingTime.toISOString(), link: meetingLink });
});
// POST /:id/availability
router.post('/:id/availability', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.availability = req.body.availability.map(d => new Date(d));
  await user.save();
  res.json({ success: true });
});

module.exports = router;
