// src/components/DataInputForm.js
import React, { useState } from 'react';
import axios from 'axios';

const DataInputForm = ({ onDataSubmit }) => {
  const [formData, setFormData] = useState({
    month: 'October',
    year: 2023,
    timeDevoted: 80,
    learningPathProgress: 65,
    projects: [{ name: 'Wrap-Up Generator', description: 'A MERN project to visualize monthly progress.', techStack: ['React', 'Node.js', 'Canvas'] }],
    interviews: [{ company: 'Tech Corp', role: 'Frontend Developer', score: 8 }],
    keyAchievements: ['Learned Canvas API', 'Deployed a new feature'],
    focusForNextMonth: 'Mastering WebSockets'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNestedChange = (e, index, section) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [section]: updatedSection });
  };

  const addNestedItem = (section) => {
    if (section === 'projects') {
      setFormData({ ...formData, projects: [...formData.projects, { name: '', description: '', techStack: '' }] });
    }
    if (section === 'interviews') {
      setFormData({ ...formData, interviews: [...formData.interviews, { company: '', role: '', score: 5 }] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real app, you might POST to the backend here
      // const response = await axios.post('http://localhost:5000/api/wraps', formData);
      // For this demo, we'll just pass the data up to the parent component
      console.log("Submitting data:", formData);
      onDataSubmit(formData);
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Enter Your Monthly Progress</h2>
      <form onSubmit={handleSubmit}>
        {/* Month, Year, Time, Learning */}
        <input type="text" name="month" value={formData.month} onChange={handleChange} placeholder="Month (e.g., October)" />
        <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Year" />
        <input type="number" name="timeDevoted" value={formData.timeDevoted} onChange={handleChange} placeholder="Hours Devoted" />
        <input type="number" name="learningPathProgress" value={formData.learningPathProgress} onChange={handleChange} placeholder="Learning Progress (%)" />

        {/* Projects Section */}
        <h3>Projects</h3>
        {formData.projects.map((p, i) => (
          <div key={i} className="nested-form">
            <input type="text" name="name" value={p.name} onChange={(e) => handleNestedChange(e, i, 'projects')} placeholder="Project Name" />
            <input type="text" name="description" value={p.description} onChange={(e) => handleNestedChange(e, i, 'projects')} placeholder="Description" />
            <input type="text" name="techStack" value={p.techStack} onChange={(e) => handleNestedChange(e, i, 'projects')} placeholder="Tech Stack (comma-separated)" />
          </div>
        ))}
        <button type="button" onClick={() => addNestedItem('projects')}>+ Add Project</button>
        
        {/* Interviews Section */}
        <h3>Interviews</h3>
        {formData.interviews.map((interview, i) => (
            <div key={i} className="nested-form">
                <input type="text" name="company" value={interview.company} onChange={(e) => handleNestedChange(e, i, 'interviews')} placeholder="Company" />
                <input type="number" name="score" value={interview.score} onChange={(e) => handleNestedChange(e, i, 'interviews')} placeholder="Score (1-10)" min="1" max="10" />
            </div>
        ))}
        <button type="button" onClick={() => addNestedItem('interviews')}>+ Add Interview</button>

        <button type="submit" className="generate-btn">Generate My Wrap-Up</button>
      </form>
    </div>
  );
};

export default DataInputForm;