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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white dark:text-white light:text-[#202A44] mb-4">
            Your {timeframe === 'monthly' ? 'Monthly' : 'Quarterly'} Wrap
          </h1>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-4 py-2 rounded-lg ${
                timeframe === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-white dark:text-white light:text-[#202A44]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setTimeframe('quarterly')}
              className={`px-4 py-2 rounded-lg ${
                timeframe === 'quarterly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-white dark:text-white light:text-[#202A44]'
              }`}
            >
              Quarterly
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="card">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{stat.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white dark:text-white light:text-[#202A44]">
                    {stat.value}
                  </h3>
                  <p className="text-gray-300 dark:text-gray-300 light:text-[#202A44]">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Reel */}
        <div className="card mb-12">
          <h2 className="text-2xl font-semibold text-white dark:text-white light:text-[#202A44] mb-6">
            Highlight Reel
          </h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-2xl text-blue-600">🏆</span>
              </div>
              <div>
                <h3 className="font-medium text-white dark:text-white light:text-[#202A44]">
                  Completed Advanced React Course
                </h3>
                <p className="text-gray-300 dark:text-gray-300 light:text-[#202A44] mt-1">
                  Mastered advanced concepts like hooks, context, and performance optimization.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-2xl text-blue-600">🚀</span>
              </div>
              <div>
                <h3 className="font-medium text-white dark:text-white light:text-[#202A44]">
                  Launched Personal Project
                </h3>
                <p className="text-gray-300 dark:text-gray-300 light:text-[#202A44] mt-1">
                  Built and deployed a full-stack application using Next.js and TypeScript.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Progress */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-white dark:text-white light:text-[#202A44] mb-6">
            Roadmap Progress
          </h2>
          <div className="space-y-4">
            <div className="relative">
              <div className="h-2 bg-white/10 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{ width: '75%' }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-300 dark:text-gray-300 light:text-[#202A44]">Frontend Development</span>
                <span className="text-sm font-medium text-gray-300 dark:text-gray-300 light:text-[#202A44]">75%</span>
              </div>
            </div>
            <div className="relative">
              <div className="h-2 bg-white/10 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{ width: '45%' }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-300 dark:text-gray-300 light:text-[#202A44]">Backend Development</span>
                <span className="text-sm font-medium text-gray-300 dark:text-gray-300 light:text-[#202A44]">45%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 