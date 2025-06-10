'use client';

import { useState } from 'react';

export default function AIToolsPage() {
  const [activeTool, setActiveTool] = useState('resume');

  const tools = [
    {
      id: 'resume',
      name: 'Resume Generator',
      description: 'Create a professional resume tailored to your experience and target role.',
      icon: '📝',
    },
    {
      id: 'bio',
      name: 'Bio Generator',
      description: 'Generate an engaging professional bio for your profile.',
      icon: '👤',
    },
    {
      id: 'palette',
      name: 'Brand Palette Creator',
      description: 'Create a cohesive color palette for your personal brand.',
      icon: '🎨',
    },
    {
      id: 'mascot',
      name: 'Mascot Creator',
      description: 'Design a unique mascot that represents your professional identity.',
      icon: '🤖',
    },
    {
      id: 'mentor',
      name: 'AI Mentor Chat',
      description: 'Get personalized career advice and guidance from our AI mentor.',
      icon: '💡',
    },
    {
      id: 'path',
      name: 'Learning Path Builder',
      description: 'Create a customized learning path based on your goals.',
      icon: '🗺️',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white dark:text-white light:text-[#202A44] mb-4">
            AI-Powered Tools
          </h1>
          <p className="text-gray-300 dark:text-gray-300 light:text-[#202A44] max-w-2xl mx-auto">
            Leverage the power of artificial intelligence to enhance your professional profile. Our suite of AI tools helps you create compelling resumes, generate engaging bios, and build your personal brand.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`card text-left transition-all duration-300 ${
                activeTool === tool.id
                  ? 'ring-2 ring-blue-600'
                  : 'hover:shadow-lg'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-2xl">{tool.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white dark:text-white light:text-[#202A44]">
                    {tool.name}
                  </h3>
                  <p className="text-gray-300 dark:text-gray-300 light:text-[#202A44] mt-1">{tool.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Tool Interface */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-skillora-deep-blue">
              {tools.find((t) => t.id === activeTool)?.name}
            </h2>
            <span className="text-4xl">
              {tools.find((t) => t.id === activeTool)?.icon}
            </span>
          </div>

          {/* Tool-specific content */}
          <div className="space-y-6">
            {activeTool === 'resume' && (
              <div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Role
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg"
                      placeholder="e.g., Senior Frontend Developer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience Level
                    </label>
                    <select 
                      className="w-full p-3 border rounded-lg"
                      aria-label="Select experience level"
                    >
                      <option>Entry Level</option>
                      <option>Mid Level</option>
                      <option>Senior Level</option>
                      <option>Lead/Manager</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Key Skills
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg"
                      placeholder="e.g., React, TypeScript, Node.js"
                    />
                  </div>
                </div>
                <button className="btn-primary mt-6">Generate Resume</button>
              </div>
            )}

            {activeTool === 'bio' && (
              <div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Professional Background
                    </label>
                    <textarea
                      className="w-full p-3 border rounded-lg h-32"
                      placeholder="Tell us about your experience and expertise..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tone
                    </label>
                    <select 
                      className="w-full p-3 border rounded-lg"
                      aria-label="Select bio tone"
                    >
                      <option>Professional</option>
                      <option>Casual</option>
                      <option>Creative</option>
                      <option>Technical</option>
                    </select>
                  </div>
                </div>
                <button className="btn-primary mt-6">Generate Bio</button>
              </div>
            )}

            {/* Add more tool-specific interfaces as needed */}
          </div>
        </div>
      </div>
    </div>
  );
} 