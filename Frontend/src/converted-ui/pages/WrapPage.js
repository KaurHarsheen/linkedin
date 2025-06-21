'use client';

import { useState } from 'react';

export default function WrapPage() {
  const [timeframe, setTimeframe] = useState('monthly');

  const stats = [
    { label: 'Courses Completed', value: '12', icon: '📚' },
    { label: 'Learning Hours', value: '48', icon: '⏱️' },
    { label: 'New Connections', value: '24', icon: '🤝' },
    { label: 'Skills Acquired', value: '8', icon: '🎯' },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#202A44] dark:text-white mb-4">
            Your {timeframe === 'monthly' ? 'Monthly' : 'Quarterly'} Wrap
          </h1>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                timeframe === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-[#202A44] dark:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setTimeframe('quarterly')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                timeframe === 'quarterly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-[#202A44] dark:text-white'
              }`}
            >
              Quarterly
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-white/5 dark:bg-white/10 p-5 shadow-sm flex items-center space-x-4 hover:shadow-md transition"
            >
              <span className="text-3xl">{stat.icon}</span>
              <div>
                <h3 className="text-xl font-semibold text-[#202A44] dark:text-white">{stat.value}</h3>
                <p className="text-gray-500 dark:text-gray-300 text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Reel */}
        <div className="card p-6 mb-12">
          <h2 className="text-2xl font-semibold text-[#202A44] dark:text-white mb-6">
            Highlight Reel
          </h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-blue-600 text-2xl">
                🏆
              </div>
              <div>
                <h3 className="font-medium text-[#202A44] dark:text-white">
                  Completed Advanced React Course
                </h3>
                <p className="text-gray-500 dark:text-gray-300 mt-1">
                  Mastered advanced concepts like hooks, context, and performance optimization.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-blue-600 text-2xl">
                🚀
              </div>
              <div>
                <h3 className="font-medium text-[#202A44] dark:text-white">
                  Launched Personal Project
                </h3>
                <p className="text-gray-500 dark:text-gray-300 mt-1">
                  Built and deployed a full-stack application using Next.js and TypeScript.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Progress */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold text-[#202A44] dark:text-white mb-6">
            Roadmap Progress
          </h2>
          <div className="space-y-4">
            <div>
              <div className="h-2 bg-white/10 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-500 dark:text-gray-300">Frontend Development</span>
                <span className="font-medium text-gray-500 dark:text-gray-300">75%</span>
              </div>
            </div>
            <div>
              <div className="h-2 bg-white/10 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-500 dark:text-gray-300">Backend Development</span>
                <span className="font-medium text-gray-500 dark:text-gray-300">45%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
