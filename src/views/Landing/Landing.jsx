"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1 }}
      >
        <Header
          onNavigate={handleSectionNavigation}
          onSignIn={() => setAuthMode("signin")}
          onSignUp={() => setAuthMode("signup")}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <LandingHero 
          onExplore={() => handleSectionNavigation("quiz")} 
          onGetStarted={() => setAuthMode("signup")}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <LandingSections ref={exploreSectionRef} />
      </motion.div>

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
        />
      )}
    </>
  );
}
