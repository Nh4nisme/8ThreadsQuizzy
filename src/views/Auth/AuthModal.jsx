"use client";

import { useState } from "react";
import { SignUp } from "./components/SignUp.tsx";
import { SignIn } from "./components/SignIn.tsx";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";

export default function AuthModal({ mode, onClose }) {
  const [isLogin, setIsLogin] = useState(mode === "signin");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#050505]/80 backdrop-blur-xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative z-10 w-full max-w-5xl h-full md:h-[700px] max-h-[90vh] bg-[#0f0f12] border border-white/10 rounded-3xl md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side: Branding/Visuals */}
        <div className="hidden md:flex w-1/2 bg-black relative overflow-hidden items-center justify-center border-r border-white/5">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--accent-primary)_0%,_transparent_70%)] opacity-20 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_#3b82f6_0%,_transparent_70%)] opacity-20 blur-3xl" />
          </div>

          <div className="relative z-10 text-center px-12">
            <h1 className="text-5xl font-black tracking-tighter text-white mb-6">
              8Threads<span className="text-gradient">Quizzy</span>
            </h1>
            <p className="text-text-secondary font-medium text-lg leading-relaxed">
              Join the elite circle of learners and creators on the most advanced quiz architecture ever built.
            </p>
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar relative bg-[#0f0f12]">
          <button
            onClick={onClose}
            className="absolute top-8 right-8 h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-text-muted hover:text-white transition-all"
          >
            <X size={20} />
          </button>

          <div className="w-full max-w-[400px] mx-auto pt-8">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="signin"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <SignIn onSwitchSignUp={() => setIsLogin(false)} />
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <SignUp onSwitchSignIn={() => setIsLogin(true)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
