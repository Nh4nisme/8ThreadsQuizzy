"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, CircleCheckBig, Globe, ChevronLeft, ChevronRight } from "lucide-react";

const cards = [
  {
    title: "The Cosmos Explorer",
    category: "Science",
    icon: Sparkles,
    color: "from-blue-500 to-purple-600",
    stats: "2.4k Participated",
    desc: "Journey through the stars in our weekly themed drops."
  },
  {
    title: "Global Logic Battle",
    category: "General",
    icon: Globe,
    color: "from-emerald-500 to-teal-600",
    stats: "1.8k Participated",
    desc: "Quick participation flow designed for global classrooms."
  },
  {
    title: "Precision Coding",
    category: "Tech",
    icon: CircleCheckBig,
    color: "from-orange-500 to-red-600",
    stats: "3.1k Participated",
    desc: "Track how your group performs with deep comparisons."
  }
];

export default function WeeklyQuizSection() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % cards.length);
  const prev = () => setIndex((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <section className="py-32 bg-[#08080a] relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mb-20"
        >
          <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Habit forming</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Weekly challenge formats that keep you returning.
          </h2>
          <p className="text-zinc-500">
            Cycles designed to feel scheduled and dependable, with fresh variation for teachers and students alike.
          </p>
        </motion.div>

        {/* 3D Stacked Card System */}
        <div className="relative w-full max-w-[800px] h-[500px] flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {cards.map((card, i) => {
              const position = (i - index + cards.length) % cards.length;
              const isCenter = position === 0;
              const isRight = position === 1;
              const isLeft = position === 2;

              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.4,
                    scale: isCenter ? 1 : 0.85,
                    x: isCenter ? 0 : isRight ? 280 : -280,
                    zIndex: isCenter ? 30 : 10,
                    rotateY: isCenter ? 0 : isRight ? -15 : 15,
                    filter: isCenter ? "blur(0px)" : "blur(4px)",
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute w-full max-w-[400px] aspect-[3/4] md:aspect-square"
                >
                  <motion.div 
                    whileHover={isCenter ? { y: -10, rotateX: 5, rotateY: -5 } : {}}
                    className={`w-full h-full rounded-[2.5rem] bg-zinc-900 border border-white/10 p-10 flex flex-col shadow-2xl relative overflow-hidden group cursor-pointer`}
                    style={{ perspective: "1000px" }}
                  >
                    {/* Card Background Gradient Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700`} />
                    
                    <div className="flex justify-between items-start relative z-10">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-lg shadow-black/40`}>
                        <card.icon className="w-7 h-7" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
                        {card.category}
                      </span>
                    </div>

                    <div className="mt-auto relative z-10">
                      <h3 className="text-3xl font-bold text-white mb-4 leading-tight">{card.title}</h3>
                      <p className="text-zinc-500 text-sm mb-6 leading-relaxed">{card.desc}</p>
                      
                      <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-400">{card.stats}</span>
                        <div className="flex -space-x-2">
                          {[1,2,3].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-zinc-900 bg-zinc-800" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute -bottom-10 flex gap-4 z-50">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-zinc-400"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-zinc-400"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
