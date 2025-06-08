const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const genaiRoutes = require('./routes/genai');
const roadmap = require('./roadmap')
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/genai', genaiRoutes);
app.use('/api/roadmap', roadmap);  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
