import { useState } from 'react';

const initialPassions = [
  { label: 'Vinyl Record Enthusiast', color: 'bg-blue-400', icon: '🎵' },
  { label: 'Potterhead', color: 'bg-purple-400', icon: '✨' },
  { label: 'Hooper', color: 'bg-violet-500', icon: '🏀' },
  { label: 'Cyclist', color: 'bg-blue-300', icon: '🚴' },
  { label: 'Bookworm', color: 'bg-orange-400', icon: '📚' },
  { label: 'Full Snack Developer', color: 'bg-pink-400', icon: '🍪' },
  { label: 'Amateur Chef', color: 'bg-green-400', icon: '🍔' },
  { label: 'Weightlifter', color: 'bg-orange-300', icon: '🏋️' },
  { label: 'Amateur Home Designer', color: 'bg-orange-200', icon: '🏠' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-[var(--color-deep-blue)] flex flex-col items-center justify-center text-white px-4">
      <div className="max-w-3xl w-full text-center space-y-8 py-24">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Revamp Your Professional Journey</h1>
        <p className="text-xl md:text-2xl text-[var(--color-bg)] mb-8">
          Skillora is the new way to connect, showcase, and grow. Build your portfolio, find jobs, and join a vibrant, inclusive community.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="bg-[var(--color-blue)] rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Showcase Your Passions</h2>
            <p>Display your unique skills and interests with beautiful, customizable badges.</p>
          </div>
          <div className="bg-[var(--color-blue)] rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Create a Portfolio</h2>
            <p>Build a stunning, AI-powered portfolio or resume that grows with you.</p>
          </div>
          <div className="bg-[var(--color-blue)] rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Find a Job</h2>
            <p>Discover inclusive opportunities and apply to roles that fit your skills and values.</p>
          </div>
          <div className="bg-[var(--color-blue)] rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Career Resources</h2>
            <p>Access guides, projects, and apprenticeships to boost your career.</p>
          </div>
        </div>
        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
          <a href="/auth" className="btn-primary text-lg">Get Started</a>
          <a href="/profile" className="btn-secondary text-lg">View Profile</a>
        </div>
      </div>
    </div>
  );
} 