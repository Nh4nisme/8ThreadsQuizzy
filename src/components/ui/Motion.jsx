"use client";

import { motion } from "framer-motion";

// --- Standard Motion Tokens ---
const DEFAULT_EASE = [0.16, 1, 0.3, 1]; // Premium cubic-bezier
const DEFAULT_DURATION = 0.6;

export const FadeIn = ({ children, delay = 0, duration = DEFAULT_DURATION, y = 20, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay, ease: DEFAULT_EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({ children, delayChildren = 0, staggerChildren = 0.1, className = "", initial = "hidden" }) => (
  <motion.div
    initial={initial}
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren,
          staggerChildren,
        },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, y = 20, className = "" }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y, scale: 0.95 },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          duration: DEFAULT_DURATION, 
          ease: DEFAULT_EASE 
        } 
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const ScaleIn = ({ children, delay = 0, duration = 0.8, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
    viewport={{ once: true }}
    transition={{ duration, delay, ease: DEFAULT_EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

export const HoverScale = ({ children, scale = 1.02, className = "" }) => (
  <motion.div
    whileHover={{ scale }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    className={className}
  >
    {children}
  </motion.div>
);

export const GlowOrb = ({ className, color = "purple" }) => {
  const colors = {
    purple: "bg-purple-600/20",
    blue: "bg-blue-600/20",
    orange: "bg-orange-600/15",
    emerald: "bg-emerald-600/15",
    amber: "bg-amber-600/15",
    red: "bg-red-600/20",
  };
  return (
    <motion.div
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.4, 0.7, 0.4],
        x: [0, 20, 0],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`pointer-events-none absolute rounded-full blur-[120px] ${colors[color] || colors.purple} ${className}`}
    />
  );
};

export const RevealText = ({ text, delay = 0, className = "" }) => {
  const words = text.split(" ");
  return (
    <StaggerContainer staggerChildren={0.05} delayChildren={delay} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 }
          }}
          className="inline-block mr-1.5"
        >
          {word}
        </motion.span>
      ))}
    </StaggerContainer>
  );
};
