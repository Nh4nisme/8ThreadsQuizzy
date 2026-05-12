"use client";

import { motion } from "framer-motion";

export const FadeIn = ({ children, delay = 0, duration = 0.5, y = 10, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({ children, delayChildren = 0, staggerChildren = 0.08, className = "" }) => (
  <motion.div
    initial="hidden"
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

export const StaggerItem = ({ children, y = 15, className = "" }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y, scale: 0.96 },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          duration: 0.5, 
          ease: [0.16, 1, 0.3, 1] 
        } 
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const ScaleIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
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
