"use client";

import { useState } from "react";

const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Inclusive Tech",
    location: "Remote",
    type: "Full-time",
    tags: ["React", "Accessibility", "Remote"],
    inclusive: true,
    description: "Join a diverse team building accessible web apps.",
  },
  {
    id: 2,
    title: "AI Research Intern",
    company: "OpenAI for All",
    location: "Bangalore, India",
    type: "Internship",
    tags: ["AI", "Research", "Internship"],
    inclusive: true,
    description: "Work on cutting-edge AI projects in an inclusive environment.",
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "TechBridge",
    location: "San Francisco, CA",
    type: "Full-time",
    tags: ["Node.js", "API", "Cloud"],
    inclusive: false,
    description: "Build scalable APIs for global users.",
  },
];

const jobTypes = ["All", "Full-time", "Internship", "Remote"];

export default function JobsPage() {
  const [selectedType, setSelectedType] = useState("All");

  const filteredJobs =
    selectedType === "All"
      ? mockJobs
      : mockJobs.filter((job) =>
          selectedType === "Remote"
            ? job.location.toLowerCase().includes("remote")
            : job.type === selectedType
        );

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-[#202A44] dark:text-white">
          Explore Opportunities
        </h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-200 shadow-sm ${
                selectedType === type
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white/10 text-[#202A44] dark:text-white hover:bg-blue-500/20"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 gap-8">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-md hover:shadow-lg transition group border dark:border-white/10 border-gray-100"
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-1 text-[#202A44] dark:text-white">
                    {job.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 font-medium mb-2">
                    {job.company}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                      {job.location}
                    </span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                      {job.type}
                    </span>
                    {job.inclusive && (
                      <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                        Inclusive
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/10 text-[#202A44] dark:text-white px-3 py-1 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {job.description}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-start gap-2 md:items-end md:justify-center">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full md:w-auto">
                    Apply Now
                  </button>
                  <button className="px-4 py-2 bg-white/10 text-[#202A44] dark:text-white border border-white/10 rounded-lg hover:bg-white/20 w-full md:w-auto">
                    Save Job
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* No Jobs Message */}
          {filteredJobs.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              No jobs found for this filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
