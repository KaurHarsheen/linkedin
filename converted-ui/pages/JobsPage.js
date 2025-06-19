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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white dark:text-white light:text-[#202A44] mb-8 text-center">Find a Job</h1>
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg ${
                selectedType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-white dark:text-white light:text-[#202A44]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="card flex flex-col md:flex-row md:items-center justify-between gap-4"
              aria-label={job.title + ' at ' + job.company}
            >
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white dark:text-white light:text-[#202A44]">{job.title}</h2>
                <p className="text-gray-300 dark:text-gray-300 light:text-[#202A44] font-medium">{job.company}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-white/10 text-white dark:text-white light:text-[#202A44] px-3 py-1 rounded-full text-xs">
                    {job.location}
                  </span>
                  <span className="bg-white/10 text-white dark:text-white light:text-[#202A44] px-3 py-1 rounded-full text-xs">
                    {job.type}
                  </span>
                  {job.inclusive && (
                    <span className="bg-white/10 text-blue-600 px-3 py-1 rounded-full text-xs" title="Inclusive Opportunity">
                      Inclusive
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.tags.map((tag) => (
                    <span key={tag} className="bg-white/10 text-white dark:text-white light:text-[#202A44] px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-gray-300 dark:text-gray-300 light:text-[#202A44]">{job.description}</p>
              </div>
              <div className="flex flex-col gap-2 min-w-[140px]">
                <button className="btn-primary w-full">Apply</button>
                <button className="btn-secondary w-full">Save</button>
              </div>
            </div>
          ))}
          {filteredJobs.length === 0 && (
            <div className="text-center text-gray-500 py-12">No jobs found for this filter.</div>
          )}
        </div>
      </div>
    </div>
  );
} 