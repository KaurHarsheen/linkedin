"use client";

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-[#202A44] dark:text-white mb-8 text-center">
          Career Resources
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overview */}
          <section className="card p-6 bg-skillora-bg dark:bg-[#1e1e2f] rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-[#202A44] dark:text-white mb-3">
              Overview
            </h2>
            <p className="text-[#202A44] dark:text-gray-300">
              Explore resources to help you grow your career, find new opportunities, and connect with mentors and peers.
            </p>
          </section>

          {/* Career Guides */}
          <section className="card p-6 bg-skillora-bg dark:bg-[#1e1e2f] rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-[#202A44] dark:text-white mb-3">
              Career Guides
            </h2>
            <ul className="list-disc pl-5 text-[#202A44] dark:text-gray-300 space-y-1">
              <li>How to Build a Standout Portfolio</li>
              <li>Interview Preparation for Tech Roles</li>
              <li>Networking for Introverts</li>
              <li>Remote Work Best Practices</li>
            </ul>
          </section>

          {/* Commissioned Projects */}
          <section className="card p-6 bg-skillora-bg dark:bg-[#1e1e2f] rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-[#202A44] dark:text-white mb-3">
              Commissioned Projects
            </h2>
            <p className="text-[#202A44] dark:text-gray-300">
              Find freelance and contract work, or post your own project to hire talent from the community.
            </p>
            <button className="btn-primary mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Browse Projects
            </button>
          </section>

          {/* Creative Apprenticeship */}
          <section className="card p-6 bg-skillora-bg dark:bg-[#1e1e2f] rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-[#202A44] dark:text-white mb-3">
              Creative Apprenticeship
            </h2>
            <p className="text-[#202A44] dark:text-gray-300">
              Connect with mentors, join apprenticeship programs, and gain hands-on experience in your field.
            </p>
            <button className="btn-secondary mt-4 px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 transition">
              Find Apprenticeships
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
