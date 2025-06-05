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
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
              {/* Profile Image Placeholder */}
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-[var(--color-blue)] flex items-center justify-center">
              <span className="text-white text-2xl">🤖</span>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[var(--color-deep-blue)]">John Doe</h1>
            <p className="text-[var(--color-blue)] text-lg mt-1">Full Stack Developer | AI Enthusiast</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[var(--color-bg)] rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-[var(--color-bg)] rounded-full text-sm">TypeScript</span>
              <span className="px-3 py-1 bg-[var(--color-bg)] rounded-full text-sm">Node.js</span>
              <span className="px-3 py-1 bg-[var(--color-bg)] rounded-full text-sm">AI/ML</span>
            </div>
            <div className="mt-4 flex space-x-4">
              <button className="btn-primary">Connect</button>
              <button className="btn-secondary">Message</button>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-[var(--color-blue)] text-[var(--color-blue)]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
            <h2 className="text-xl font-semibold mb-4">About Me</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Passionate developer with expertise in modern web technologies and AI integration.
                Always eager to learn and explore new technologies.
              </p>
            </div>
          </div>
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Skill Graph</h2>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Interactive skill graph coming soon...</p>
            </div>
          </div>
        </div>
        {/* Middle Column - Portfolio/Stories */}
        <div className="md:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Portfolio & Stories</h2>
            <div className="space-y-6">
              {/* Story Card */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                  <div>
                    <h3 className="font-medium">Project Highlight</h3>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Just completed an exciting AI-powered feature for our platform! 🚀
                </p>
                <div className="mt-4 h-48 bg-gray-100 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 