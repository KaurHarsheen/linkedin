'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center text-white px-4">
      <div className="flex flex-col items-center justify-center flex-1 w-full pt-24">
        <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6 leading-tight">
          A platform<br />designed for growth
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 mb-10 text-center max-w-2xl">
          Tools to help you scale your site with your business.
        </p>
        <Link href="/auth">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg transition-colors duration-300">
            Get started — it's free
          </button>
        </Link>
      </div>
      {/* Trending Topics Belt */}
      <section className="w-full bg-black py-10 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Trending Topics</h2>
          <div className="relative w-full overflow-hidden">
            <div className="flex space-x-4 animate-scroll-belt whitespace-nowrap">
              {['#linode', '#avalanche', '#ankr', '#thwwebapps', 'dev', '#polygon', '#90daysofdevops'].map((tag, i) => (
                <span
                  key={i}
                  className="inline-block border border-gray-600 text-white rounded-lg px-5 py-2 text-lg font-mono bg-black/70 mr-2"
                >
                  {tag}
                </span>
              ))}
              {/* Duplicate for seamless loop */}
              {['#linode', '#avalanche', '#ankr', '#thwwebapps', 'dev', '#polygon', '#90daysofdevops'].map((tag, i) => (
                <span
                  key={i + 100}
                  className="inline-block border border-gray-600 text-white rounded-lg px-5 py-2 text-lg font-mono bg-black/70 mr-2"
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
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col items-center text-center text-white shadow-md">
            <h3 className="text-lg font-bold mb-2">Showcase Your Passions</h3>
            <p className="text-sm text-gray-300">Display your unique skills and interests with beautiful, customizable badges.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col items-center text-center text-white shadow-md">
            <h3 className="text-lg font-bold mb-2">Create a Portfolio</h3>
            <p className="text-sm text-gray-300">Build a stunning, AI-powered portfolio or resume that grows with you.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col items-center text-center text-white shadow-md">
            <h3 className="text-lg font-bold mb-2">Find a Job</h3>
            <p className="text-sm text-gray-300">Discover inclusive opportunities and apply to roles that fit your skills and values.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col items-center text-center text-white shadow-md">
            <h3 className="text-lg font-bold mb-2">Career Resources</h3>
            <p className="text-sm text-gray-300">Access guides, projects, and apprenticeships to boost your career.</p>
          </div>
        </div>
      </section>
      {/* Top Discussions This Week Section */}
      <section className="w-full bg-black py-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">🔥 Top Discussions This Week</h2>
          <div className="relative h-64 overflow-hidden">
            <div className="animate-scroll-vertical space-y-6 absolute w-full">
              {/* Discussion 1 */}
              <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-white shadow-md">
                <h3 className="text-lg font-bold mb-1">💻 "Is Rust actually replacing C++ or just hype?"</h3>
                <div className="text-gray-300 text-sm mb-2">Started by @sarah_dev | 342 comments | 🔥 Trending</div>
                <ul className="text-gray-200 text-sm mb-2 list-disc pl-5">
                  <li><b>Top contributor:</b> Senior Systems Engineer at Google</li>
                  <li><b>AI Insight:</b> "Based on GitHub trends, Rust adoption is up 45% in systems programming"</li>
                  <li><b>Skill tags:</b> #SystemsProgramming #Rust #CPlusPlus #Performance</li>
                </ul>
              </div>
              {/* Discussion 2 */}
              <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-white shadow-md">
                <h3 className="text-lg font-bold mb-1">🎸 "I'm a professional guitarist who learned to code. Here's what surprised me"</h3>
                <div className="text-gray-300 text-sm mb-2">Started by @strings_and_code | 178 comments | 🎸 Crossover</div>
                <ul className="text-gray-200 text-sm mb-2 list-disc pl-5">
                  <li><b>Unexpected insight:</b> "Music theory actually helped with algorithmic thinking"</li>
                  <li><b>Collaboration:</b> Startup wants to hire musician-developers</li>
                  <li><b>Skill tags:</b> #Music #Coding #CareerChange #CreativeTech</li>
                </ul>
              </div>
              {/* Discussion 3 */}
              <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-white shadow-md">
                <h3 className="text-lg font-bold mb-1">📊 "I analyzed 10,000 job posts. Here's what skills are actually in demand"</h3>
                <div className="text-gray-300 text-sm mb-2">Started by @data_detective | 567 comments | 📈 Insights</div>
                <ul className="text-gray-200 text-sm mb-2 list-disc pl-5">
                  <li><b>Key finding:</b> "Soft skills mentioned 3x more than expected"</li>
                  <li><b>Interactive:</b> Live dashboard showing real-time job market trends</li>
                  <li><b>Skill tags:</b> #DataScience #JobMarket #CareerInsights #Python</li>
                </ul>
              </div>
              {/* Discussion 4 */}
              <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-white shadow-md">
                <h3 className="text-lg font-bold mb-1">🔧 "I'm a plumber who went remote (yes, really)"</h3>
                <div className="text-gray-300 text-sm mb-2">Started by @remote_plumber | 412 comments | 🔧 Unique</div>
                <ul className="text-gray-200 text-sm mb-2 list-disc pl-5">
                  <li><b>Plot twist:</b> Now does virtual plumbing consultations and training</li>
                  <li><b>Inspiration:</b> "Every skill can be digitized somehow"</li>
                  <li><b>Skill tags:</b> #RemoteWork #TraditionalSkills #Innovation #OnlineEducation</li>
                </ul>
              </div>
              {/* Discussion 5 */}
              <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-white shadow-md">
                <h3 className="text-lg font-bold mb-1">💰 "Raised $50K for my SaaS, now what? First-time founder panic"</h3>
                <div className="text-gray-300 text-sm mb-2">Started by @nervous_founder | 127 comments | 💰 Advice</div>
                <ul className="text-gray-200 text-sm mb-2 list-disc pl-5">
                  <li><b>Mentor match:</b> 2 experienced founders offered guidance</li>
                  <li><b>AI insight:</b> "70% of founders feel impostor syndrome at this stage"</li>
                  <li><b>Skill tags:</b> #Entrepreneurship #SaaS #Fundraising #Leadership</li>
                </ul>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-white shadow-md">
                <h3 className="text-lg font-bold mb-1">💻 "Is Rust actually replacing C++ or just hype?"</h3>
                <div className="text-gray-300 text-sm mb-2">Started by @sarah_dev | 342 comments | 🔥 Trending</div>
                <ul className="text-gray-200 text-sm mb-2 list-disc pl-5">
                  <li><b>Top contributor:</b> Senior Systems Engineer at Google</li>
                  <li><b>AI Insight:</b> "Based on GitHub trends, Rust adoption is up 45% in systems programming"</li>
                  <li><b>Skill tags:</b> #SystemsProgramming #Rust #CPlusPlus #Performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Suggested Communities, AI Recommendations, and Insights */}
      <section className="w-full bg-black py-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">🌟 Suggested Communities to Join</h2>
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
        </div>
      </section>
    </div>
  );
} 