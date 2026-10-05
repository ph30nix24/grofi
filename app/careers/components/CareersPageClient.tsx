"use client";

import React, { useState } from "react";
import CareersHeroSection from "./CareersHeroSection";
import CurrentlyHiringSection from "./CurrentlyHiringSection";
import CareersApplicationForm from "./CareersApplicationForm";
import WhyJoinGrofiSection from "./WhyJoinGrofiSection";

export default function CareersPageClient() {
  const [selectedRole, setSelectedRole] = useState<string>("Business and Development Executive");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectRole = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    scrollToSection("application-form");
  };

  return (
    <>
      {/* 1. Hero Section */}
      <CareersHeroSection
        onRolesClick={() => scrollToSection("currently-hiring")}
        onApplyClick={() => scrollToSection("application-form")}
      />

      {/* 2. Currently Hiring Section */}
      <CurrentlyHiringSection onSelectRole={handleSelectRole} />

      {/* 3. Direct Application Form */}
      <CareersApplicationForm selectedRoleTitle={selectedRole} />

      {/* 4. Signature Section: Why Join Grofi & Culture */}
      <WhyJoinGrofiSection />
    </>
  );
}
