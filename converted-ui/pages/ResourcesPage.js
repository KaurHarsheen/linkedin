"use client";

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white dark:text-white light:text-[#202A44] mb-8 text-center">Career Resources</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overview */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-white dark:text-white light:text-[#202A44] mb-2">Overview</h2>
            <p className="text-gray-300 dark:text-gray-300 light:text-[#202A44] mb-2">Explore resources to help you grow your career, find new opportunities, and connect with mentors and peers.</p>
          </section>
          {/* Career Guides */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-white dark:text-white light:text-[#202A44] mb-2">Career Guides</h2>
            <ul className="list-disc pl-5 text-gray-300 dark:text-gray-300 light:text-[#202A44]">
              <li>How to Build a Standout Portfolio</li>
              <li>Interview Preparation for Tech Roles</li>
              <li>Networking for Introverts</li>
              <li>Remote Work Best Practices</li>
            </ul>
          </section>
          {/* Commissioned Projects */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-white dark:text-white light:text-[#202A44] mb-2">Commissioned Projects</h2>
            <p className="text-gray-300 dark:text-gray-300 light:text-[#202A44] mb-2">Find freelance and contract work, or post your own project to hire talent from the community.</p>
            <button className="btn-primary mt-4">Browse Projects</button>
          </section>
          {/* Creative Apprenticeship */}
          <section className="card">
            <h2 className="text-2xl font-semibold text-white dark:text-white light:text-[#202A44] mb-2">Creative Apprenticeship</h2>
            <p className="text-gray-300 dark:text-gray-300 light:text-[#202A44] mb-2">Connect with mentors, join apprenticeship programs, and gain hands-on experience in your field.</p>
            <button className="btn-secondary mt-4">Find Apprenticeships</button>
          </section>
        </div>
      </div>
    </div>
  );
} 