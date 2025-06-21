'use client';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
export default function HomePage() {
  // Chart data and options
  const data = {
    labels: ['01', '02', '03', '04', '05', '06', '07'],
    datasets: [
      {
        label: 'This month',
        data: [8, 6, 7, 9, 8, 10, 11],
        borderColor: '#60a5fa',
        backgroundColor: 'rgba(96,165,250,0.2)',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#60a5fa',
        fill: true,
      },
      {
        label: 'Last month',
        data: [10, 7, 6, 7, 6, 7, 8],
        borderColor: '#fbbf24',
        backgroundColor: 'rgba(251,191,36,0.1)',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#fbbf24',
        fill: true,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#fff', font: { size: 14 } },
      },
      tooltip: {
        backgroundColor: '#111827',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}h`;
          }
        }
      },
      title: { display: false },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
      animationDuration: 600,
    },
    elements: {
      line: {
        borderWidth: 4,
        borderCapStyle: 'round',
      },
      point: {
        radius: 5,
        hoverRadius: 8,
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: (ctx) => ctx.dataset.borderColor,
        hoverBorderColor: '#fff',
        hoverBorderWidth: 4,
      },
    },
    scales: {
      x: {
        ticks: { color: '#cbd5e1', font: { size: 13 } },
        grid: { color: 'rgba(255,255,255,0.05)' },
      },
      y: {
        min: 0,
        max: 12,
        ticks: { color: '#cbd5e1', font: { size: 13 }, stepSize: 2, callback: (v) => v + 'h' },
        grid: { color: 'rgba(255,255,255,0.07)' },
      },
    },
    animation: {
      duration: 1800,
      easing: 'easeInOutCubic',
      animateScale: true,
      animateRotate: true,
    },
  };
const trendingTags = ['#InternationalAffairs', '#GenerativeAI', '#InclusiveMusic', '#ECommerce', '#DEI', '#CyberSec', '#CreativeLeadership'];
  const communities = [
    { name: "🤖 AI & Future of Work", members: "15.2K", status: "🔥 Very Active" },
    { name: "🎨 Creative-Tech Crossover", members: "8.9K", status: "📈 Growing Fast" },
    { name: "💼 Startup Founders & Solo Builders", members: "22.1K", status: "💪 Supportive" },
    { name: "🌍 Digital Nomad Professionals", members: "31.4K", status: "✈️ Global" }
  ];
  const features = [
    {
      title: "Showcase Your Passions",
      description: "Display your unique skills and interests with beautiful, customizable badges."
    },
    {
      title: "Create a Portfolio",
      description: "Build a stunning, AI-powered portfolio or resume that grows with you."
    },
    {
      title: "Find a Job",
      description: "Discover inclusive opportunities and apply to roles that fit your skills and values."
    },
    {
      title: "Career Resources",
      description: "Access guides, projects, and apprenticeships to boost your career."
    }
  ];
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{`Day ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value}h`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  const discussions = [
    {
      id: 1,
      title: "💻 \"Is Rust actually replacing C++ or just hype?\"",
      author: "@sarah_dev",
      comments: 342,
      badge: "🔥 Trending",
      insights: [
        "Top contributor: Senior Systems Engineer at Google",
        "AI Insight: \"Based on GitHub trends, Rust adoption is up 45% in systems programming\"",
        "Skill tags: #SystemsProgramming #Rust #CPlusPlus #Performance"
      ]
    },
    {
      id: 2,
      title: "🎸 \"I'm a professional guitarist who learned to code. Here's what surprised me\"",
      author: "@strings_and_code",
      comments: 178,
      badge: "🎸 Crossover",
      insights: [
        "Unexpected insight: \"Music theory actually helped with algorithmic thinking\"",
        "Collaboration: Startup wants to hire musician-developers",
        "Skill tags: #Music #Coding #CareerChange #CreativeTech"
      ]
    },
    {
      id: 3,
      title: "📊 \"I analyzed 10,000 job posts. Here's what skills are actually in demand\"",
      author: "@data_detective",
      comments: 567,
      badge: "📈 Insights",
      insights: [
        "Key finding: \"Soft skills mentioned 3x more than expected\"",
        "Interactive: Live dashboard showing real-time job market trends",
        "Skill tags: #DataScience #JobMarket #CareerInsights #Python"
      ]
    },
    {
      id: 4,
      title: "🔧 \"I'm a plumber who went remote (yes, really)\"",
      author: "@remote_plumber",
      comments: 412,
      badge: "🔧 Unique",
      insights: [
        "Plot twist: Now does virtual plumbing consultations and training",
        "Inspiration: \"Every skill can be digitized somehow\"",
        "Skill tags: #RemoteWork #TraditionalSkills #Innovation #OnlineEducation"
      ]
    },
    {
      id: 5,
      title: "💰 \"Raised $50K for my SaaS, now what? First-time founder panic\"",
      author: "@nervous_founder",
      comments: 127,
      badge: "💰 Advice",
      insights: [
        "Mentor match: 2 experienced founders offered guidance",
        "AI insight: \"70% of founders feel impostor syndrome at this stage\"",
        "Skill tags: #Entrepreneurship #SaaS #Fundraising #Leadership"
      ]
    }
  ];
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center text-white">
            <style jsx>{`
        @keyframes scroll-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scroll-vertical {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        
    .animate-scroll-horizontal {
      display: flex;
      width: max-content;
      animation: scroll-horizontal 20s linear infinite;
    }
        
        .animate-scroll-vertical {
          animation: scroll-vertical 30s linear infinite;
        }
        
        .animate-scroll-horizontal:hover {
          animation-play-state: paused;
        }
        
        .animate-scroll-vertical:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="flex flex-col items-center justify-center flex-1 w-full pt-24 px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6 leading-tight  bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          A platform<br />designed for growth
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 mb-10 text-center max-w-2xl">
          Tools to help you scale your site with your business.
        </p>
        <Link to="/auth">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            Get started — it's free
          </button>
        </Link>
      </div>
      {/* Trending Topics Belt */}
      <section className="w-full bg-black py-10 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6">Trending Topics</h2>
          <div className="relative w-full overflow-hidden">
            <div className="flex space-x-4 animate-scroll-horizontal whitespace-nowrap">
              {[...trendingTags, ...trendingTags].map((tag, i) => (
                <span
                  key={i}
                  className="flex-shrink-0 border border-gray-600 text-white rounded-lg px-5 py-2 text-lg font-mono bg-gray-900/70 hover:bg-gray-800/70 transition-colors duration-300 cursor-pointer"
                >
              
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Feature Boxes Section */}
      <section className="w-full bg-black py-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col items-center text-center text-white shadow-md hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Performance Chart Section - moved here */}
      <section className="w-full bg-black pt-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Track your performance and keep up with your peers</h2>
            <select className="bg-white/10 text-white px-4 py-2 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-600" title="Select date range">
              <option>01-07 May</option>
              <option>08-14 May</option>
              <option>15-21 May</option>
            </select>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg">
            <Line data={data} options={options} height={120} />
          </div>
        </div>
      </section>
            {/* Top Discussions Section */}
      <section className="w-full bg-black py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            🔥 Top Discussions This Week
          </h2>
          <div className="relative h-80 overflow-hidden">
            <div className="animate-scroll-vertical absolute w-full">
              {[...discussions, ...discussions].map((discussion, index) => (
                <div key={`${discussion.id}-${index}`} className="bg-white/10 border border-white/20 rounded-xl p-5 text-white shadow-md hover:bg-white/15 transition-all duration-300 mb-6">
                  <h3 className="text-lg font-bold mb-2">{discussion.title}</h3>
                  <div className="text-gray-300 text-sm mb-3">
                    Started by {discussion.author} | {discussion.comments} comments | {discussion.badge}
                  </div>
                  <ul className="text-gray-200 text-sm space-y-1">
                    {discussion.insights.map((insight, insightIndex) => (
                      <li key={insightIndex} className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
{/* Suggested Communities Section */}
      <section className="w-full bg-black py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            🌟 Suggested Communities to Join
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {communities.map((community, index) => (
              <div key={index} className="bg-white/10 border border-white/20 rounded-xl p-5 text-white shadow-md hover:bg-white/15 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <h3 className="text-lg font-bold mb-1">{community.name}</h3>
                <div className="text-gray-300 text-sm">
                  {community.members} members • {community.status}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Link to="/communities">
            <button className="flex items-center gap-2 text-blue-400 bg-white/10 border border-blue-400 px-6 py-2 rounded-lg font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:scale-105">
              Explore more
              <span className="ml-1">→</span>
            </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 