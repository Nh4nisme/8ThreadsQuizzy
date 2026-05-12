"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BookOpen, ChartColumnIncreasing, Award } from "lucide-react";

export default function QuizDiscoverySection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Interactive Storytelling Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Knowledge discovery</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Built for <span className="text-transparent bg-clip-text bg-accent-gradient">fast discovery</span> & repeat engagement.
          </h2>
          <p className="text-lg text-zinc-400 mb-12 max-w-xl leading-relaxed">
            Move past static lists. Our kinetic interface surfaces the right knowledge at the right time, turning discovery into a measurable learning flow.
          </p>

          <div className="space-y-8">
            {[
              { icon: BookOpen, title: "Kinetic Library", desc: "Browse curated subjects with fluid interface transitions." },
              { icon: ChartColumnIncreasing, title: "Pulse Tracking", desc: "Real-time metrics that identify weak areas instantly." },
              { icon: Award, title: "Milestone Loop", desc: "Progression cycles that encourage consistent practice." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:border-purple-500/30 transition-all duration-500">
                  <item.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">{item.title}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Immersive Visual Showcase */}
        <div className="relative h-[600px] hidden lg:block">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-orange-600/10 rounded-[3rem] blur-3xl" />
          
          {/* Floating Glass Modules */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-10 right-0 w-[340px] p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl z-20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent-gradient flex items-center justify-center font-bold text-white">Q</div>
              <div className="h-2 w-24 bg-white/10 rounded-full" />
            </div>
            <div className="space-y-4">
              <div className="h-4 w-full bg-white/10 rounded-lg animate-pulse" />
              <div className="h-4 w-3/4 bg-white/10 rounded-lg animate-pulse" />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="h-10 rounded-xl bg-purple-500/20 border border-purple-500/30" />
              <div className="h-10 rounded-xl bg-white/5 border border-white/10" />
            </div>
          </motion.div>

          <motion.div 
            style={{ y: y2 }}
            className="absolute top-60 -left-10 w-[300px] p-6 rounded-3xl bg-zinc-900/80 border border-white/10 backdrop-blur-md shadow-2xl z-10"
          >
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Live Performance</div>
            <div className="flex items-end gap-2 h-20">
              {[40, 70, 45, 90, 65, 80].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                  className="flex-1 bg-accent-gradient rounded-t-md"
                />
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
            whileInView={{ rotate: 10, scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-20 right-20 w-[260px] h-[340px] bg-accent-gradient rounded-[2rem] p-1 shadow-2xl z-0 overflow-hidden"
          >
            <div className="w-full h-full bg-black/40 backdrop-blur-sm rounded-[1.8rem] flex flex-col items-center justify-center p-8 text-center">
              <Award className="w-16 h-16 text-white mb-6" />
              <div className="text-white font-bold text-xl mb-2">Unstoppable</div>
              <div className="text-white/60 text-sm">7 Day Streak</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
