"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/ui/Header.jsx";
import LandingHero from "./components/LandingHero.jsx";
import LandingSections from "./components/LandingSections.jsx";
import AuthModal from "../Auth/AuthModal.jsx";

export default function Landing() {
  const [authMode, setAuthMode] = useState(null);
  const [isExploreUnlocked, setIsExploreUnlocked] = useState(false);
  const [pendingSectionId, setPendingSectionId] = useState(null);
  const exploreSectionRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isExploreUnlocked ? "" : "hidden";

    if (isExploreUnlocked && pendingSectionId) {
      setTimeout(() => {
        const targetSection =
          pendingSectionId === "quiz"
            ? exploreSectionRef.current
            : document.getElementById(pendingSectionId);

        targetSection?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 0);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isExploreUnlocked, pendingSectionId]);

  const handleSectionNavigation = (sectionId = "quiz") => {
    setPendingSectionId(sectionId);

    if (!isExploreUnlocked) {
      setIsExploreUnlocked(true);
      return;
    }

    const targetSection =
      sectionId === "quiz"
        ? exploreSectionRef.current
        : document.getElementById(sectionId);

    targetSection?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <Header
        onNavigate={handleSectionNavigation}
        onSignIn={() => setAuthMode("signin")}
        onSignUp={() => setAuthMode("signup")}
      />
      <LandingHero 
        onExplore={() => handleSectionNavigation("quiz")} 
        onGetStarted={() => setAuthMode("signup")}
      />
      <LandingSections ref={exploreSectionRef} />

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
        />
      )}
    </>
  );
}
