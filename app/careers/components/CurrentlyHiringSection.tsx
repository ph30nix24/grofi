"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Video,
  Clapperboard,
  Users2,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Award,
} from "lucide-react";

export interface ActiveHiringRole {
  id: string;
  title: string;
  openings: string;
  openingsCount: number;
  department: string;
  location: string;
  workMode: "WFO" | "In-Office" | "Hybrid" | "Studio" | "Studio / Hybrid";
  experience: string;
  compensation: string;
  tagline: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
  icon: React.ReactNode;
  iconBg: string;
  badgeColor: string;
}

export const activeHiringRoles: ActiveHiringRole[] = [
  {
    id: "business-development-executive",
    title: "Business and Development Executive",
    openings: "10 Openings",
    openingsCount: 10,
    department: "Sales & Growth",
    location: "Delhi",
    workMode: "WFO",
    experience: "0 – 3 Years (Freshers with strong drive welcome)",
    compensation: "Competitive Base + Uncapped High Performance Incentives",
    tagline: "Drive high-velocity customer acquisition & financial product distribution.",
    summary:
      "As a Business Development Executive at Grofi, you will be the front-line growth engine in our Delhi office. You will connect with salaried professionals, business owners, and channel partners to evaluate, recommend, and disburse high-value loans and credit cards.",
    responsibilities: [
      "Engage with qualified inbound and outbound leads seeking personal loans, business loans, and credit cards.",
      "Explain loan terms, interest rates, and eligibility criteria with absolute transparency.",
      "Guide applicants through the digital documentation, e-KYC, and bank partner sanction process.",
      "Build long-term referral relationships with chartered accountants, financial advisors, and corporate hubs.",
      "Achieve monthly disbursal targets and earn lucrative, uncapped performance incentives.",
    ],
    requirements: [
      "Exceptional verbal communication skills in English, Hindi, and local languages.",
      "High agency, hunger to learn, and natural persuasive abilities.",
      "Prior experience in tele-sales, banking DSA, financial products, or client relationship management is a plus.",
      "Basic understanding of loans, CIBIL scores, and banking products.",
    ],
    perks: [
      "Uncapped monthly commission structure with zero ceiling",
      "Fast-track promotion to Team Lead within 6–9 months for top performers",
      "Structured sales training and direct mentorship from industry veterans",
    ],
    icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
    iconBg: "bg-emerald-50 border-emerald-200",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  {
    id: "content-creator",
    title: "Content Creator",
    openings: "5 Openings",
    openingsCount: 5,
    department: "Media & Brand",
    location: "Delhi",
    workMode: "WFO",
    experience: "1 – 3 Years",
    compensation: "Competitive CTC + Viral Milestone Bonuses",
    tagline: "Script, record, and host viral personal finance breakdowns.",
    summary:
      "We are looking for energetic, on-camera storytellers in Delhi who can translate complicated Indian financial concepts—like credit card reward redemption hacks, home loan tax breaks, and credit score hacks—into entertaining, high-retention short videos in our Delhi studio.",
    responsibilities: [
      "Research, script, and present daily 30–60 second vertical videos (Reels, Shorts, and TikTok/X clips).",
      "Stay ahead of trending audio, memes, and personal finance developments in India.",
      "Collaborate closely with our in-house Video Editor and Graphic Designer to ensure snappy pacing.",
      "Demystify banking fine print into actionable, trustworthy advice that our audience loves.",
      "Engage with community comments and turn audience questions into engaging video replies.",
    ],
    requirements: [
      "Natural on-camera presence, high charisma, and clear articulation (Hindi & English).",
      "Demonstrated experience scripting and presenting short-form videos with strong engagement metrics.",
      "Genuine curiosity about money, credit cards, investing, and personal finance.",
      "Ability to ship 3–5 high-quality videos weekly consistently.",
    ],
    perks: [
      "Access to fully equipped soundproof studio with 4K cameras, teleprompters & pro audio in Delhi",
      "Performance incentives tied to audience reach, follower growth, and video virality",
      "Become the recognized public face of India's fastest-growing fintech community",
    ],
    icon: <Video className="w-6 h-6 text-purple-600" />,
    iconBg: "bg-purple-50 border-purple-200",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    id: "video-editor",
    title: "Video Editor",
    openings: "1 Opening",
    openingsCount: 1,
    department: "Creative Studio",
    location: "Delhi",
    workMode: "WFO",
    experience: "1 – 4 Years",
    compensation: "Competitive CTC + High-End Editing Rig",
    tagline: "Craft high-retention, kinetic motion graphics & viral video edits.",
    summary:
      "Working from our Delhi studio, you will be our dedicated creative powerhouse responsible for the visual pacing, sound design, motion graphics, and overall aesthetic of Grofi's video content across Instagram, YouTube, and digital campaigns.",
    responsibilities: [
      "Edit fast-paced, high-retention Reels, Shorts, and long-form podcast breakdowns.",
      "Create dynamic on-screen typography, animated sound effects, transitions, and kinetic graphic elements.",
      "Optimize video pacing and hooks to maximize retention, watch time, and click-through rates.",
      "Manage raw footage pipelines, color grading, audio cleanup, and asset libraries.",
      "Experiment with creative visual styles to establish a distinctive, premium Grofi brand aesthetic.",
    ],
    requirements: [
      "Mastery of Adobe Premiere Pro, After Effects, or DaVinci Resolve.",
      "Proven portfolio showcasing dynamic short-form edits with kinetic captions and sound design.",
      "Strong sense of comedic timing, narrative pacing, and internet visual trends.",
      "Ability to execute fast turnarounds while maintaining meticulous visual standards.",
    ],
    perks: [
      "High-end Apple M-series MacBook Pro / Studio editing machine provided at our Delhi office",
      "Creative freedom to experiment with new animation styles, plugins, and sound libraries",
      "Direct collaboration with leadership to shape Grofi's visual identity",
    ],
    icon: <Clapperboard className="w-6 h-6 text-amber-600" />,
    iconBg: "bg-amber-50 border-amber-200",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
  },
  {
    id: "hr-executive",
    title: "HR Executive",
    openings: "2 Openings",
    openingsCount: 2,
    department: "People & Talent",
    location: "Delhi",
    workMode: "WFO",
    experience: "1 – 3 Years",
    compensation: "Competitive CTC + Health Insurance + Annual Bonus",
    tagline: "Build a stellar team & cultivate a thriving workplace culture.",
    summary:
      "Based in our Delhi office, we need an ambitious, empathetic HR Executive to spearhead high-velocity recruitment across sales, media, and tech, while nurturing a warm, performance-driven workplace culture where team members flourish.",
    responsibilities: [
      "Lead active talent sourcing across LinkedIn, job portals, and campus networks for sales & media roles.",
      "Screen candidate profiles, conduct initial cultural evaluations, and coordinate interview schedules.",
      "Manage end-to-end new-hire onboarding, offer rollouts, document verification, and orientation.",
      "Organize team engagement initiatives, monthly celebration dinners, and festival festivities.",
      "Address employee queries promptly, maintain HR records, and support leadership in people operations.",
    ],
    requirements: [
      "1–3 years of hands-on experience in talent acquisition or human resource operations in a fast-paced company.",
      "Exceptional interpersonal, active listening, and relationship-building skills.",
      "Organized, detail-oriented, and capable of managing multiple hiring pipelines simultaneously.",
      "Proactive, positive attitude with a passion for cultivating high-trust company cultures.",
    ],
    perks: [
      "Direct leadership exposure with founders and core vertical heads",
      "Influence company culture, compensation benchmarking, and employee experience policies",
      "Rapid career progression to HR Lead as our team expands",
    ],
    icon: <Users2 className="w-6 h-6 text-primary" />,
    iconBg: "bg-[#EBF4ED] border-primary/20",
    badgeColor: "bg-[#EBF4ED] text-primary border-primary/30",
  },
];

interface CurrentlyHiringSectionProps {
  onSelectRole: (roleTitle: string) => void;
}

export default function CurrentlyHiringSection({ onSelectRole }: CurrentlyHiringSectionProps) {
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  const toggleExpand = (roleId: string) => {
    setExpandedRole((prev) => (prev === roleId ? null : roleId));
  };

  return (
    <section id="currently-hiring" className="py-16 sm:py-24 bg-white border-b border-gray-200/80 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-4 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-gold" />
            Currently Hiring
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#02282C] font-bricolage tracking-tight mb-4">
            We Are Actively Hiring for <span className="text-primary">4 Key Roles</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Click on any role to explore responsibilities and perks, or click &ldquo;Apply for this Role&rdquo; to
            jump straight to the application form with the position pre-selected.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {activeHiringRoles.map((role) => {
            const isExpanded = expandedRole === role.id;

            return (
              <div
                key={role.id}
                className={`bg-[#FDFBF7] rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between ${
                  isExpanded
                    ? "border-primary/50 shadow-lg ring-1 ring-primary/20"
                    : "border-gray-200/90 hover:border-primary/30 hover:shadow-md"
                }`}
              >
                <div>
                  {/* Top Header Row with Openings Count Badge */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${role.iconBg} shadow-2xs shrink-0`}
                    >
                      {role.icon}
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border uppercase tracking-wider ${role.badgeColor}`}
                      >
                        <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                        {role.openings}
                      </span>
                      <span className="text-[11px] font-semibold text-gray-500 font-montserrat">
                        {role.department}
                      </span>
                    </div>
                  </div>

                  {/* Role Title */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#02282C] font-bricolage mb-1.5 leading-snug">
                    {role.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs sm:text-sm font-semibold text-primary/80 mb-3">
                    {role.tagline}
                  </p>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                    {role.summary}
                  </p>

                  {/* Quick Meta Pills */}
                  <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-medium text-gray-600">
                    <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-gray-200">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {role.location} ({role.workMode})
                    </span>
                    <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-gray-200">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {role.experience}
                    </span>
                  </div>

                  {/* Compensation Band */}
                  <div className="bg-white/90 p-3 rounded-xl border border-gray-200/90 mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-gold shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-[#02282C] font-bricolage">
                      {role.compensation}
                    </span>
                  </div>

                  {/* Expandable Details Section */}
                  {isExpanded && (
                    <div className="pt-4 mt-2 border-t border-gray-200 space-y-4 animate-fadeIn text-xs sm:text-sm">
                      <div>
                        <h4 className="font-bold text-[#02282C] font-bricolage uppercase tracking-wider text-xs mb-2">
                          Key Responsibilities:
                        </h4>
                        <ul className="space-y-1.5 text-gray-600">
                          {role.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                              <span className="leading-relaxed">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-[#02282C] font-bricolage uppercase tracking-wider text-xs mb-2">
                          Requirements:
                        </h4>
                        <ul className="space-y-1.5 text-gray-600">
                          {role.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                              <span className="leading-relaxed">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-[#02282C] font-bricolage uppercase tracking-wider text-xs mb-2">
                          Role Perks:
                        </h4>
                        <ul className="space-y-1.5 text-gray-600">
                          {role.perks.map((prk, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                              <span className="leading-relaxed">{prk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="pt-5 mt-5 border-t border-gray-200/80 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => toggleExpand(role.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-primary transition-colors cursor-pointer py-2 px-1"
                  >
                    <span>{isExpanded ? "Hide Details" : "View Full Details"}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectRole(role.title)}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-[#01353a] text-white font-bold text-xs sm:text-sm py-2.5 px-5 rounded-xl shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <span>Apply for this Role</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
