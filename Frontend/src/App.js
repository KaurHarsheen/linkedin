import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AIContentGenerator from './AIContentGenerator';
import RoadmapPage from './RoadMap'; 
import HomePage from './HomePage';
import Profile from './pages/Profile';
import './App.css'
import Navbar from './Navbar';
import LearningPath from './pages/LearningPath'
import InterviewHomePage from './pages/InterviewHomePage';
import InterviewPage from './pages/InterviewPage';
import FeedbackPage from './pages/FeedbackPage';
function App() {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 to detect current route
  const [goal, setGoal] = useState('');
  const [currentSkills, setCurrentSkills] = useState('');

  const handleClick = () => {
    const skillsArray = currentSkills.split(',').map(skill => skill.trim());
    localStorage.setItem('goal', goal);
    localStorage.setItem('currentSkills', JSON.stringify(skillsArray));
    navigate('/roadmap');
  };

  return (
    <>
    <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/learning-path" element={<LearningPath />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/roadmap" element={<RoadmapPage goal={goal} currentSkills={currentSkills} />} />
        <Route path="/interview/:id" element={<InterviewPage />} />
          <Route path="/feedback/:id" element={<FeedbackPage />} />
          <Route path="/interview" element={<InterviewHomePage />} />
      </Routes>
    </>
  );
}

export default App;
