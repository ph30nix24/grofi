import React from "react";
import { Code2, Rocket, Coffee, Users, Quote, CheckCircle2 } from "lucide-react";

const cultureHighlights = [
  {
    icon: <Rocket className="w-5 h-5 text-primary" />,
    title: "Quarterly Grofi Hack Sprints",
    description:
      "Every quarter, we pause regular sprint tickets for 48 hours. Anyone can pitch an unconventional fintech idea, team up, and build live prototypes.",
  },
  {
    icon: <Code2 className="w-5 h-5 text-amber-600" />,
    title: "Friday Demos & Technical Teardowns",
    description:
      "We celebrate craft every Friday afternoon. Squads showcase their latest releases, share lessons from production incidents, and exchange candid feedback.",
  },
  {
    icon: <Users className="w-5 h-5 text-emerald-600" />,
    title: "Direct Access to Founders & Leaders",
    description:
      "No corporate hierarchy or bureaucratic gates. Strategy decks and product roadmaps are open to everyone, and founders are just a Slack message away.",
  },
  {
    icon: <Coffee className="w-5 h-5 text-purple-600" />,
    title: "Spaces Designed for Flow State",
    description:
      "Quiet library zones for deep architectural thinking, vibrant collaboration lounges for whiteboarding, and standing desks equipped with 4K monitors.",
  },
];

const teamVoices = [
  {
    quote:
      "At previous companies, pushing an API change took 3 weeks of architectural committee approvals. At Grofi, I deployed a loan eligibility engine rewrite in my second week. The trust and agency here are unmatched.",
    author: "Aditya Sharma",
    role: "Senior Backend Architect",
    tenure: "2 years at Grofi",
    avatarBg: "bg-emerald-600",
  },
  {
    quote:
      "Fintech usually feels cold and intimidating. Here, our design team is given the freedom to craft joyful, tactile interfaces that make comparing complex loan terms feel as simple as ordering a coffee.",
    author: "Pooja Verma",
    role: "Lead Product Designer",
    tenure: "1.5 years at Grofi",
    avatarBg: "bg-primary",
  },
];

export default function CareersCulture() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-gray-200/80 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-4 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            Life Inside Grofi
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#02282C] font-bricolage tracking-tight mb-4">
            High Velocity, High Trust, <span className="text-primary">Zero Politics</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            We are intentional about cultivating an environment where smart, kind, and driven people do their best work
            without unnecessary bureaucracy.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {cultureHighlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FDFBF7] rounded-2xl p-6 border border-gray-200/90 hover:border-primary/40 hover:shadow-sm transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-4 shadow-2xs">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-[#02282C] font-bricolage mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Team Testimonial Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamVoices.map((voice, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-[#FDFBF7] to-[#F7F4EC] rounded-2xl p-7 sm:p-8 border border-gray-200/80 relative flex flex-col justify-between"
            >
              <Quote className="w-8 h-8 text-gold/30 absolute top-6 right-6" />

              <p className="text-sm sm:text-base text-gray-700 italic leading-relaxed mb-6 font-montserrat">
                &ldquo;{voice.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3.5 pt-4 border-t border-gray-200/60">
                <div
                  className={`w-11 h-11 rounded-full ${voice.avatarBg} text-white font-bold text-sm flex items-center justify-center font-bricolage shrink-0 shadow-xs`}
                >
                  {voice.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#02282C] font-bricolage">
                    {voice.author}
                  </h4>
                  <p className="text-xs text-gray-500 font-montserrat">
                    {voice.role} • {voice.tenure}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
