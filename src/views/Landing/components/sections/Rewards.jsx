"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Award, Gift, Users, Trophy, Star, Zap } from "lucide-react";

const FloatingBadge = ({ icon: Icon, delay, className, x, y }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      delay,
      duration: 1,
      y: { repeat: Infinity, duration: 4 + Math.random() * 2, ease: "easeInOut" },
      rotate: { repeat: Infinity, duration: 5 + Math.random() * 3, ease: "easeInOut" }
    }}
    className={`absolute p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl ${className}`}
    style={{ left: x, top: y }}
  >
    <div className="w-12 h-12 rounded-2xl bg-accent-gradient flex items-center justify-center text-white shadow-lg">
      <Icon className="w-6 h-6" />
    </div>
  </motion.div>
);

export default function RewardsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={ref} className="py-32 bg-black relative overflow-hidden">
      {/* Central Rotating Glow */}
      <motion.div 
        style={{ rotate }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-[400px] bg-gradient-to-t from-purple-500 to-transparent blur-md" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-[400px] bg-gradient-to-b from-orange-500 to-transparent blur-md" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mb-32"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8">
            <Zap className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Excitement Unlocked</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            A visible reward system that <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-500">makes progress earned</span>.
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Recognition works better when you understand what you're progressing toward. Unlock streaks, trophies, and global rankings as you master your subjects.
          </p>
        </motion.div>

        {/* Orbiting Badges Layout */}
        <div className="relative w-full h-[400px] hidden md:block">
          <FloatingBadge icon={Trophy} delay={0.2} x="10%" y="0%" className="z-20" />
          <FloatingBadge icon={Star} delay={0.4} x="80%" y="20%" className="z-20" />
          <FloatingBadge icon={Gift} delay={0.6} x="20%" y="60%" className="z-20" />
          <FloatingBadge icon={Users} delay={0.8} x="70%" y="70%" className="z-20" />
          
          {/* Center Trophy Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          >
            <div className="w-32 h-32 rounded-full bg-accent-gradient blur-3xl opacity-50 animate-pulse" />
            <Trophy className="w-24 h-24 text-white relative -top-32" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full">
          {[
            { icon: Gift, title: "Milestone rewards", desc: "Clear unlock points for streaks and high scores." },
            { icon: Award, title: "Rankings with context", desc: "Leaderboards paired with recent learning gains." },
            { icon: Users, title: "Team motivation", desc: "Shared targets that encourage entire groups." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <item.icon className="w-6 h-6 text-orange-400" />
              </div>
              <h4 className="text-white font-bold mb-3">{item.title}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
