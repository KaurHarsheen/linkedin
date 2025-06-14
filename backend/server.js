// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const genaiRoutes = require('./routes/genai');
// const roadmap = require('./roadmap')
// const mongoose = require('mongoose');
// const profileRoutes = require('./routes/Profile');
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('MongoDB connected');
//   app.listen(5000, () => console.log('Server running on port 5000'));
// }).catch(err => console.log(err));
// app.use('/api/profile', profileRoutes);
// app.use('/api/genai', genaiRoutes);
// app.use('/api/roadmap', roadmap);  

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const genaiRoutes = require('./routes/genai');
const roadmap = require('./roadmap');
const profileRoutes = require('./routes/Profile');
const geminiResourceRoutes = require('./routes/genaiResources'); // ✅ NEW
const interviewRoutes=require('./routes/Interview')
const userRoutes = require('./routes/users');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => console.log(err));

// Routes
app.use('/api/profile', profileRoutes);
app.use('/api/genai', genaiRoutes);
app.use('/api/roadmap', roadmap);
app.use('/api/gemini-resources', geminiResourceRoutes); // ✅ NEW
app.use('/api/interview',interviewRoutes);
app.use('/api/users', userRoutes);  // Make sure this line exists!
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
