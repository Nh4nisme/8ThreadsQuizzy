import React from "react";
import HeroBackground from "../components/hero/HeroBackground.jsx";
import HeroBadge from "../components/hero/HeroBadge.jsx";
import HeroActions from "../components/hero/HeroActions.jsx";
import topGrid from "../../../assets/PatternUp.png";
import useMousePosition from "../../../hooks/useMousePosition.js";
import useSpotlight from "../../../hooks/useSpotlight.js";
import useFloatAnimation from "../../../hooks/useFloatAnimation.js";

export default function LandingHero() {
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
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-black"
    >
      {/* Interactive spotlight overlay */}
      <div style={spotlightStyle} />
      {/* Animated grid background */}
      <HeroBackground
        gridImage={topGrid}
        parallax={parallax}
        floatAnim={floatAnim}
      />
      <div className="relative z-10 flex flex-col items-center mt-24">
        <div className="mb-6">
          <HeroBadge />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-center text-white">
          Learn, Quiz,{" "}
          <span className="bg-gradient-to-r from-purple-500 to-orange-500 text-transparent bg-clip-text">
            Earn Rewards
          </span>
        </h1>
        <p className="mt-6 text-lg text-center text-white max-w-xl">
          Join thousands of students and teachers on the ultimate quiz platform.
          Test your knowledge, compete with peers, and win exciting rewards
        </p>
        <HeroActions />
      </div>
    </div>
  );
}
