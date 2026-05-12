import React from "react";
import { motion } from "framer-motion";
import HeroBackground from "../components/hero/HeroBackground.jsx";
import HeroBadge from "../components/hero/HeroBadge.jsx";
import HeroActions from "../components/hero/HeroActions.jsx";
import useMousePosition from "../../../hooks/useMousePosition.js";
import useSpotlight from "../../../hooks/useSpotlight.js";
import useFloatAnimation from "../../../hooks/useFloatAnimation.js";

export default function LandingHero({ onExplore, onGetStarted }) {
  // Animation hooks
  const { mouse, heroRef } = useMousePosition();
  const spotlightStyle = useSpotlight(mouse);
  const floatAnim = useFloatAnimation();

  // Parallax effect
  const parallax = {
    x: (mouse.x - 0.5) * 60, // max 30px left/right
    y: (mouse.y - 0.5) * 60, // max 30px up/down
  };

  return (
    <div
      ref={heroRef}
      className="relative flex min-h-[calc(100vh-72px)] w-full flex-col items-center justify-center overflow-hidden bg-bg-main"
    >
      {/* Interactive spotlight overlay */}
      <div style={spotlightStyle} className="pointer-events-none absolute inset-0 z-0 opacity-50" />
      
      {/* Animated grid background */}
      <HeroBackground
        gridImage="/assets/PatternUp.png"
        parallax={parallax}
        floatAnim={floatAnim}
      />

      <div className="relative z-10 flex flex-col items-center mt-24 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <HeroBadge />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-black text-center text-white tracking-tighter leading-[0.9] max-w-5xl"
        >
          Learn. Quiz.{" "}
          <span className="text-gradient">
            Ascend.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 text-xl md:text-2xl text-center text-text-secondary max-w-3xl leading-relaxed font-medium"
        >
          Join the elite ecosystem of knowledge seekers. 
          Build your legacy through interactive challenges and secure your place on the leaderboard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16"
        >
          <HeroActions 
            onExplore={onExplore} 
            onGetStarted={onGetStarted}
          />
        </motion.div>
      </div>
    </div>
  );
}
