import axios from 'axios';

export const fetchMatches = async (userId) => {
  if (!userId) {
    console.error("🚨 fetchMatches called without valid userId");
    return { matches: [] };
  }

  try {
    console.log("fetchMatches userId:", userId); // Add this line
    const response = await axios.get(`http://localhost:5000/api/users/match/${userId}`);
    return response.data;
  } catch (err) {
    console.error("❌ Error in fetchMatches ➜", err);
    return { matches: [] };
  }
};

export const seedData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/users/seed');
    return response.data;
  } catch (err) {
    console.error("❌ Error in seedData ➜", err);
    return { success: false };
  }
};