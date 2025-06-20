'use client';

import { useState } from 'react';
import ChatWindow from '../components/ChatWindow';

export default function ConnectPage() {
  const [activeChatIndex, setActiveChatIndex] = useState(null);

  const people = [
    {
      name: 'Aisha Kapoor',
      role: 'Frontend Developer',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      mutuals: 5,
      org: 'Zypher',
    },
    {
      name: 'Raj Mehta',
      role: 'AI/ML Intern',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      mutuals: 3,
      org: 'DeepLearn Labs',
    },
    {
      name: 'Sara Ali',
      role: 'Product Designer',
      image: 'https://randomuser.me/api/portraits/women/72.jpg',
      mutuals: 8,
      org: 'CreativeFox',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-[#202A44] dark:text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Connect with Professionals</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {people.map((person, index) => (
            <div
              key={index}
              className="card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#202A44] dark:text-white">{person.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{person.role}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                🧩 Mutual Connections: {person.mutuals}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                🏢 Works at {person.org}
              </p>
              <div className="flex space-x-3 mb-2">
                <button className="btn-primary px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                  Connect
                </button>
                <button
                  onClick={() =>
                    setActiveChatIndex(index === activeChatIndex ? null : index)
                  }
                  className="btn-secondary px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-[#202A44] dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  {activeChatIndex === index ? 'Close' : 'Message'}
                </button>
              </div>

              {/* Inline Chat Window */}
              {activeChatIndex === index && (
                <div className="mt-4">
                  <ChatWindow recipient={person.name} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
