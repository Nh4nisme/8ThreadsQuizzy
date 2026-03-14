import { useEffect } from "react";

export default function useFloatAnimation() {
  useEffect(() => {
    if (document.getElementById("floatY-keyframes")) return;
    const style = document.createElement("style");
    style.id = "floatY-keyframes";
    style.innerHTML = `@keyframes floatY { 0% { transform: translateY(0px); } 50% { transform: translateY(32px); } 100% { transform: translateY(0px); } }`;
    document.head.appendChild(style);
  }, []);

  return {
    animation: "floatY 10s ease-in-out infinite",
  };
}
