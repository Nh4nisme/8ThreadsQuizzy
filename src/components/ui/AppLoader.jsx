"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function AppLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset loading or wait for hydration
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 1.1, 
      filter: "blur(20px)",
      transition: { duration: 0.6, ease: "easeInOut" } 
    }
  };

  const barVariants = {
    hidden: { width: "0%" },
    visible: { 
      width: "100%", 
      transition: { duration: 1.8, ease: [0.65, 0, 0.35, 1] } 
    }
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.2 } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]"
        >
          <div className="relative flex flex-col items-center">
            {/* Logo Reveal */}
            <motion.div
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-8"
            >
              <div className="relative h-20 w-20">
                <img src="/assets/Logo.png" alt="Logo" className="h-full w-full object-contain" />
                <motion.div 
                  animate={{ 
                    boxShadow: ["0 0 0px rgba(124, 58, 237, 0)", "0 0 40px rgba(124, 58, 237, 0.3)", "0 0 0px rgba(124, 58, 237, 0)"] 
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 rounded-full"
                />
              </div>
            </motion.div>

            {/* Text Reveal */}
            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl font-bold tracking-tighter text-white md:text-4xl"
              >
                <span className="bg-accent-gradient bg-clip-text text-transparent">8Threads</span>Quizzy
              </motion.h1>
            </div>

            {/* Precision Progress Bar */}
            <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/5">
              <motion.div
                variants={barVariants}
                initial="hidden"
                animate="visible"
                className="h-full bg-accent-gradient"
              />
            </div>

            {/* Subtle Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-4 text-[10px] uppercase tracking-[0.4em] text-gray-500 font-medium"
            >
              Initializing Experience
            </motion.p>
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{ repeat: Infinity, duration: 8 }}
              className="absolute -top-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-purple-600/20 blur-[120px]"
            />
            <motion.div 
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.05, 0.1, 0.05]
              }}
              transition={{ repeat: Infinity, duration: 10 }}
              className="absolute -bottom-[20%] -right-[10%] h-[60%] w-[60%] rounded-full bg-orange-600/20 blur-[120px]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
