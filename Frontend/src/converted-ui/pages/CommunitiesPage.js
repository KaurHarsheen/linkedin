'use client';
import { Link } from 'react-router-dom';

export default function CommunitiesPage() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center text-white px-4 py-12">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">All Communities</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Community 1 */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-white shadow-md">
            <h3 className="text-lg font-bold mb-1">🤖 AI & Future of Work</h3>
            <div className="text-gray-300 text-sm mb-2">15.2K members • 🔥 Very Active</div>
          </div>
          {/* Community 2 */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-white shadow-md">
            <h3 className="text-lg font-bold mb-1">🎨 Creative-Tech Crossover</h3>
            <div className="text-gray-300 text-sm mb-2">8.9K members • 📈 Growing Fast</div>
          </div>
          {/* Community 3 */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-white shadow-md">
            <h3 className="text-lg font-bold mb-1">💼 Startup Founders & Solo Builders</h3>
            <div className="text-gray-300 text-sm mb-2">22.1K members • 💪 Supportive</div>
          </div>
          {/* Community 4 */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-white shadow-md">
            <h3 className="text-lg font-bold mb-1">🌍 Digital Nomad Professionals</h3>
            <div className="text-gray-300 text-sm mb-2">31.4K members • ✈️ Global</div>
          </div>
          {/* Community 5 */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-white shadow-md">
            <h3 className="text-lg font-bold mb-1">🎯 Career Pivot Stories</h3>
            <div className="text-gray-300 text-sm mb-2">19.7K members • 🔄 Inspiring</div>
          </div>
          {/* Community 6 */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-white shadow-md">
            <h3 className="text-lg font-bold mb-1">🎵 Musician-Developers</h3>
            <div className="text-gray-300 text-sm mb-2">2.1K members • 🎸 Specialized</div>
          </div>
          {/* Community 7 */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-white shadow-md">
            <h3 className="text-lg font-bold mb-1">📈 Bootstrapped SaaS Builders</h3>
            <div className="text-gray-300 text-sm mb-2">5.6K members • 💰 Revenue-Focused</div>
          </div>
          {/* Community 8 */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-white shadow-md">
            <h3 className="text-lg font-bold mb-1">🧠 Neurodivergent Professionals</h3>
            <div className="text-gray-300 text-sm mb-2">3.8K members • 🤝 Supportive</div>
          </div>
          {/* Community 9 */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-white shadow-md">
            <h3 className="text-lg font-bold mb-1">🔬 Research to Industry</h3>
            <div className="text-gray-300 text-sm mb-2">1.9K members • 🎓 Academic</div>
          </div>
          {/* Community 10 */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-white shadow-md">
            <h3 className="text-lg font-bold mb-1">🛠️ No-Code/Low-Code Builders</h3>
            <div className="text-gray-300 text-sm mb-2">12.3K members • ⚡ Fast-Growing</div>
          </div>
        </div>
        <Link to="/">
          <button className="text-skillora-blue bg-white/10 border border-skillora-blue px-6 py-2 rounded-lg font-semibold hover:bg-skillora-blue hover:text-white transition-colors duration-300">
            ← Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
} 