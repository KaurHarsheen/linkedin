'use client';
import { useState } from 'react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('about');
  const tabs = [
    { id: 'about', label: 'About Me' },
    { id: 'skills', label: 'Skill Graph' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'roadmap', label: 'AI Roadmap' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-white/10"></div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-2xl">🤖</span>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white dark:text-white light:text-[#202A44]">John Doe</h1>
            <p className="text-lg mt-1 text-gray-300 dark:text-gray-300 light:text-[#202A44]">Full Stack Developer | AI Enthusiast</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">React</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">TypeScript</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">Node.js</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">AI/ML</span>
            </div>
            <div className="mt-4 flex space-x-4">
              <button className="btn-primary">Connect</button>
              <button className="btn-secondary">Message</button>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs Navigation */}
      <div className="border-b border-white/20 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-skillora-blue text-skillora-blue'
                  : 'border-transparent text-skillora-bg hover:text-skillora-blue hover:border-skillora-blue'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - About & Skills */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-white dark:text-white light:text-[#202A44]">About Me</h2>
            <div className="space-y-4">
              <p className="text-gray-300 dark:text-gray-300 light:text-[#202A44]">
                Passionate developer with expertise in modern web technologies and AI integration.
                Always eager to learn and explore new technologies.
              </p>
            </div>
          </div>
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-white dark:text-white light:text-[#202A44]">Skill Graph</h2>
            <div className="h-64 bg-white/10 rounded-lg flex items-center justify-center">
              <p className="text-gray-300 dark:text-gray-300 light:text-[#202A44]">Interactive skill graph coming soon...</p>
            </div>
          </div>
        </div>
        {/* Middle Column - Portfolio/Stories */}
        <div className="md:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-white dark:text-white light:text-[#202A44]">Portfolio & Stories</h2>
            <div className="space-y-6">
              {/* Story Card */}
              <div className="border rounded-lg p-4 border-white/20 bg-white/5">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/10"></div>
                  <div>
                    <h3 className="font-medium text-white dark:text-white light:text-[#202A44]">Project Highlight</h3>
                    <p className="text-sm text-gray-300 dark:text-gray-300 light:text-[#202A44]">2 hours ago</p>
                  </div>
                </div>
                <p className="text-gray-300 dark:text-gray-300 light:text-[#202A44]">
                  Just completed an exciting AI-powered feature for our platform! 🚀
                </p>
                <div className="mt-4 h-48 bg-white/10 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 