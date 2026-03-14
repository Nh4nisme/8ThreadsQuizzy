export default function useSpotlight(mouse) {
  return {
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    zIndex: 1,
    mixBlendMode: "screen",
    background: `
      radial-gradient(circle 100px at ${mouse.x * 100}% ${mouse.y * 100}%,
        rgba(255,154,139,0.65) 0%,
        rgba(255,106,213,0.55) 25%,
        rgba(124,108,255,0.45) 50%,
        rgba(124,108,255,0.15) 70%,
        transparent 85%
      )
    `,
    filter: "blur(14px)",
    transition: "background 0.05s linear",
  };
}
