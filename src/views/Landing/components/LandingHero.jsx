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
      className="relative flex min-h-[calc(100vh-72px)] w-full flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Interactive spotlight overlay */}
      <div style={spotlightStyle} />
      {/* Animated grid background */}
      <HeroBackground
        gridImage="/assets/PatternUp.png"
        parallax={parallax}
        floatAnim={floatAnim}
      />
      <div className="relative z-10 flex flex-col items-center mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <HeroBadge />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-bold text-center text-white tracking-tight"
        >
          Learn, Quiz,{" "}
          <span className="bg-gradient-to-r from-purple-500 to-orange-500 text-transparent bg-clip-text">
            Earn Rewards
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-xl text-center text-zinc-400 max-w-2xl leading-relaxed"
        >
          Join thousands of students and teachers on the ultimate quiz platform.
          Test your knowledge, compete with peers, and win exciting rewards.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
