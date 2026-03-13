import React from "react";

export default function HeroBackground({ gridImage, parallax = {x:0, y:0}, floatAnim = {} }) {
  return (
    <>
      <img
        src={gridImage}
        alt="Grid Top"
        className="absolute top-0 left-0 w-full pointer-events-none opacity-100 select-none"
        draggable="false"
        style={{
          transform: `translate(${parallax.x}px, ${parallax.y}px)`,
          ...floatAnim,
          zIndex: 0,
        }}
      />

      <img
        src={gridImage}
        alt="Grid Bottom"
        className="absolute bottom-0 left-0 w-full pointer-events-none opacity-100 rotate-180 select-none"
        draggable="false"
        style={{
          transform: `translate(${parallax.x}px, ${-parallax.y}px)`,
          ...floatAnim,
          zIndex: 0,
        }}
      />
    </>
  );
}

