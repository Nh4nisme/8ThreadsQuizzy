"use client";

import { forwardRef } from "react";
import QuizDiscovery from "./sections/QuizDiscovery.jsx";
import WeeklyQuiz from "./sections/WeeklyQuiz.jsx";
import Rewards from "./sections/Rewards.jsx";
import About from "./sections/About.jsx";
import Footer from "./sections/Footer.jsx";

const LandingSections = forwardRef(function LandingSections(_, ref) {
  return (
    <div className="w-full bg-zinc-950 text-white overflow-hidden">
      {/* Quiz Discovery Section */}
      <div id="quiz" ref={ref} className="scroll-mt-24">
        <QuizDiscovery />
      </div>

      {/* Weekly Quiz Section */}
      <div id="weekly-quiz" className="scroll-mt-24">
        <WeeklyQuiz />
      </div>

      {/* Rewards Section */}
      <div id="rewards" className="scroll-mt-24">
        <Rewards />
      </div>

      {/* About Section */}
      <div id="about" className="scroll-mt-24">
        <About />
      </div>

      {/* Cinematic Footer */}
      <Footer />
    </div>
  );
});

export default LandingSections;
