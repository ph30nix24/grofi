"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Sparkles,
  ArrowRight,
  Filter,
  X,
  Send,
} from "lucide-react";
import { JobOpening } from "../types";
import { jobOpenings } from "../data/careersData";
import CareersJobModal from "./CareersJobModal";
import CareersGeneralApplyModal from "./CareersGeneralApplyModal";

interface CareersExplorerProps {
  initialDepartment?: string;
}

export default function CareersExplorer({ initialDepartment = "All" }: CareersExplorerProps) {
  const [selectedDept, setSelectedDept] = useState<string>(initialDepartment);
  const [selectedLocationType, setSelectedLocationType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modal states
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [modalTab, setModalTab] = useState<"details" | "apply">("details");
  const [isJobModalOpen, setIsJobModalOpen] = useState<boolean>(false);
  const [isGeneralModalOpen, setIsGeneralModalOpen] = useState<boolean>(false);

  // Departments list with counts
  const departments = useMemo(() => {
    return [
      "All",
      "Engineering",
      "Product & Design",
      "Data & Risk",
      "Growth & Marketing",
      "Partnerships & Ops",
    ];
  }, []);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobOpenings.filter((job) => {
      // Department match
      if (selectedDept !== "All" && job.department !== selectedDept) {
        return false;
      }

      // Location type match
      if (selectedLocationType !== "All" && job.locationType !== selectedLocationType) {
        return false;
      }

      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesSummary = job.summary.toLowerCase().includes(query);
        const matchesTags = job.tags.some((t) => t.toLowerCase().includes(query));
        const matchesDept = job.department.toLowerCase().includes(query);
        const matchesLoc = job.location.toLowerCase().includes(query);

        return matchesTitle || matchesSummary || matchesTags || matchesDept || matchesLoc;
      }

      return true;
    });
  }, [selectedDept, selectedLocationType, searchQuery]);

  const handleOpenDetails = (job: JobOpening) => {
    setSelectedJob(job);
    setModalTab("details");
    setIsJobModalOpen(true);
  };

  const handleOpenApply = (job: JobOpening) => {
    setSelectedJob(job);
    setModalTab("apply");
    setIsJobModalOpen(true);
  };

  return (
    <section id="open-roles" className="py-16 sm:py-24 bg-[#FDFBF7] border-b border-gray-200/80 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-4 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
              Open Positions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#02282C] font-bricolage tracking-tight">
              Join Our Engineering, Product &amp; Growth Guilds
            </h2>
            <p className="text-base text-gray-600 mt-2 max-w-2xl">
              We are actively looking for exceptional individuals to lead high-impact missions across retail credit,
              banking infrastructure, and consumer financial products.
            </p>
          </div>

          <button
            onClick={() => setIsGeneralModalOpen(true)}
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-primary border border-primary/30 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span>General Application</span>
          </button>
        </div>

        {/* Filter Controls & Search */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-2xs mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role title, skill (e.g. Next.js, Risk, Figma), or location..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Location Type Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 whitespace-nowrap hidden sm:inline">
                Work Mode:
              </span>
              <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-semibold">
                {["All", "Hybrid", "Remote"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedLocationType(type)}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      selectedLocationType === type
                        ? "bg-white text-primary shadow-xs font-bold"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Department Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-4 border-t border-gray-100 no-scrollbar">
            {departments.map((dept) => {
              const count =
                dept === "All"
                  ? jobOpenings.length
                  : jobOpenings.filter((j) => j.department === dept).length;

              const isSelected = selectedDept === dept;

              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-primary text-white shadow-xs"
                      : "bg-gray-100/90 text-gray-600 hover:bg-gray-200/80 hover:text-gray-900"
                  }`}
                >
                  <span>{dept}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 font-medium mb-6">
          <div>
            Showing <strong className="text-gray-900">{filteredJobs.length}</strong> open{" "}
            {filteredJobs.length === 1 ? "position" : "positions"}
            {selectedDept !== "All" && (
              <span>
                {" "}
                in <strong className="text-primary">{selectedDept}</strong>
              </span>
            )}
          </div>
          {(selectedDept !== "All" || selectedLocationType !== "All" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedDept("All");
                setSelectedLocationType("All");
                setSearchQuery("");
              }}
              className="text-primary hover:underline font-semibold cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 max-w-xl mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#02282C] font-bricolage mb-2">
              No matching positions found
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              We couldn&apos;t find any roles matching &ldquo;{searchQuery}&rdquo;. Try clearing your search query or
              exploring another department.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedDept("All");
                  setSelectedLocationType("All");
                  setSearchQuery("");
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setIsGeneralModalOpen(true)}
                className="bg-primary hover:bg-[#01353a] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Submit General Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-5">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="group bg-white rounded-2xl p-5 sm:p-7 border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all duration-200 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Left Role Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    {job.featured && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        <Sparkles className="w-3 h-3 text-gold" />
                        Featured Role
                      </span>
                    )}
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#EBF4ED] text-primary border border-primary/20">
                      {job.department}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                      {job.locationType} • {job.location}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-200">
                      Exp: {job.experience}
                    </span>
                  </div>

                  <h3
                    onClick={() => handleOpenDetails(job)}
                    className="text-lg sm:text-xl font-bold text-[#02282C] font-bricolage group-hover:text-primary transition-colors cursor-pointer"
                  >
                    {job.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1.5 mb-3.5 max-w-3xl">
                    {job.summary}
                  </p>

                  {/* Skills / Tech Tags */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {job.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-50 text-gray-600 border border-gray-200/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Compensation & CTAs */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100 shrink-0">
                  <div className="text-left lg:text-right">
                    <span className="text-[11px] font-semibold text-gray-400 block uppercase tracking-wider">
                      Target Compensation
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-[#02282C] font-bricolage text-primary">
                      {job.salaryRange}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      onClick={() => handleOpenDetails(job)}
                      className="flex-1 sm:flex-none text-xs font-bold text-gray-700 hover:text-primary bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                    >
                      View Role
                    </button>
                    <button
                      onClick={() => handleOpenApply(job)}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 text-xs font-bold bg-primary hover:bg-[#01353a] text-white px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer transform group-hover:translate-x-0.5"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Banner: Don't See Your Role? */}
        <div className="mt-12 bg-gradient-to-r from-[#02474D] to-[#01353A] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 bg-white/10 text-gold text-xs font-bold px-3 py-1 rounded-full mb-3 border border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
                Talent Network
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-bricolage tracking-tight mb-2">
                Don’t see your exact role listed?
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                We are always seeking exceptional builders, mathematicians, hackers, and creators. Pitch your unique
                strengths directly to our founding team.
              </p>
            </div>
            <button
              onClick={() => setIsGeneralModalOpen(true)}
              className="inline-flex items-center gap-2 bg-gold hover:bg-[#c9a52f] text-gray-950 font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span>Join Talent Community</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Role Details & Apply Modal */}
      <CareersJobModal
        job={selectedJob}
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        initialTab={modalTab}
      />

      {/* General Apply Modal */}
      <CareersGeneralApplyModal
        isOpen={isGeneralModalOpen}
        onClose={() => setIsGeneralModalOpen(false)}
      />
    </section>
  );
}
