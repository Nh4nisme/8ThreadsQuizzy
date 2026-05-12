"use client";

import { motion } from "framer-motion";

export default function LayoutTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 2 }}
    >
      {children}
    </motion.div>
  );
}
