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
import InterviewMain from './pages/InterviewMain';
import SchedulePage from './pages/SchedulePage';
import TeamSuggestions from './components/TeamSuggestions';
function App() {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 to detect current route
  const [goal, setGoal] = useState('');
  const [currentSkills, setCurrentSkills] = useState('');
    const myProfileId = "684ebd98f127a058e7dba9ac";
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
          <Route path="/interviewai" element={<InterviewHomePage />} />
           <Route path="/interview" element={<InterviewMain />} />
           <Route path="/schedule" element={<SchedulePage />} />
           <Route path="/findteam" element={<TeamSuggestions profileId={myProfileId} />} />
      </Routes>
    </>
  );
}

export default App;
