"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function LayoutTransition({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.3, 
          ease: "linear"
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
