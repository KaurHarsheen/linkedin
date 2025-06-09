import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LearningPath() {
  const [goal, setGoal] = useState('');
  const [currentSkills, setCurrentSkills] = useState('');
  const navigate = useNavigate(); // Get the navigate function

  const handleClick = () => {
    // You can do any validation or state saving here before navigation

    // Navigate to the /roadmap page
    navigate('/roadmap', {
      state: { goal, currentSkills } // Optional: pass data to roadmap route
    });
  };

  return (
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
        <label className="block text-lg font-medium text-gray-700">
          Your Current Skills (comma separated)
        </label>
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
  );
}
