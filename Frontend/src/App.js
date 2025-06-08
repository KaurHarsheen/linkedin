import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AIContentGenerator from './AIContentGenerator';
import RoadmapPage from './RoadMap'; 
import HomePage from './HomePage';

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
      {/* ✅ Show input form ONLY on home page ("/") */}
      {location.pathname === '/' && (
        <div className="p-6 space-y-4 max-w-xl mx-auto">
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">Your Goal</label>
            <input
              type="text"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              className="w-full p-2 border rounded-lg shadow-sm"
              placeholder="e.g., Content Writer"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">Your Current Skills (comma separated)</label>
            <input
              type="text"
              value={currentSkills}
              onChange={e => setCurrentSkills(e.target.value)}
              className="w-full p-2 border rounded-lg shadow-sm"
              placeholder="e.g., English, SEO, Grammar"
            />
          </div>

          <button
            onClick={handleClick}
            className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition duration-300 ease-in-out"
          >
            Generate Customized Learning Path
          </button>
        </div>
      )}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/roadmap" element={<RoadmapPage goal={goal} currentSkills={currentSkills} />} />
      </Routes>
    </>
  );
}

export default App;
