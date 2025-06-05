'use client';

import { useState } from 'react';

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'devops', label: 'DevOps' },
  ];

  const learningContent = [
    {
      id: 1,
      title: 'Building Modern Web Apps with Next.js 13',
      type: 'course',
      category: 'frontend',
      duration: '4 hours',
      level: 'Intermediate',
      image: 'https://placeholder.com/400x200',
    },
    {
      id: 2,
      title: 'Mastering TypeScript for Enterprise Applications',
      type: 'tutorial',
      category: 'frontend',
      duration: '2 hours',
      level: 'Advanced',
      image: 'https://placeholder.com/400x200',
    },
    {
      id: 3,
      title: 'Introduction to Machine Learning with Python',
      type: 'course',
      category: 'ai',
      duration: '6 hours',
      level: 'Beginner',
      image: 'https://placeholder.com/400x200',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#131D4F] mb-4">
            Learning & Discovery
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore curated content, courses, and resources to enhance your skills
            and stay updated with the latest technologies.
          </p>
        </div>

        {/* Categories */}
        <div className="flex justify-center space-x-4 mb-8 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-[#254D70] text-white'
                  : 'bg-[#EFE4D2] text-[#131D4F]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningContent.map((content) => (
            <div key={content.id} className="card group">
              <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full bg-gray-300"></div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-[#EFE4D2] rounded-full text-xs">
                    {content.type}
                  </span>
                  <span className="px-2 py-1 bg-[#EFE4D2] rounded-full text-xs">
                    {content.level}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#131D4F] group-hover:text-[#254D70]">
                  {content.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Duration: {content.duration}
                </p>
                <button className="w-full btn-primary mt-4">Start Learning</button>
              </div>
            </div>
          ))}
        </div>

        {/* You Might Like Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-[#131D4F] mb-6">
            You Might Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-[#EFE4D2] flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <h3 className="font-medium text-[#131D4F]">
                    Advanced React Patterns
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Learn advanced patterns and best practices for building scalable
                    React applications.
                  </p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-[#EFE4D2] flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="font-medium text-[#131D4F]">
                    System Design Fundamentals
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Master the art of designing scalable and maintainable systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 