"use client";

import { motion } from "framer-motion";
import { Users, ChartColumnIncreasing, BookOpen } from "lucide-react";

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="py-32 bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Editorial Header */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em] mb-6 block">Our Stance</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                Designed for <span className="italic font-serif">structured</span> learning, not empty activity.
              </h2>
              <div className="h-[1px] w-20 bg-accent-gradient mb-8" />
              <p className="text-zinc-500 text-lg leading-relaxed">
                The product stance is clear: practical for educators, simple for students, and focused on repeat use. We don't just add features; we build learning loops.
              </p>
            </motion.div>
          </div>

          {/* Progressive Reveal Timeline/List */}
          <div className="lg:col-span-6 lg:offset-1">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-24"
            >
              {[
                { 
                  icon: Users, 
                  title: "Teacher-first workflows", 
                  desc: "Creation, distribution, and review stay efficient enough for real classroom usage instead of demo-only scenarios." 
                },
                { 
                  icon: ChartColumnIncreasing, 
                  title: "Actionable performance data", 
                  desc: "Surface the signals that influence intervention decisions without overwhelming users with unnecessary reporting layers." 
                },
                { 
                  icon: BookOpen, 
                  title: "Consistent learning loops", 
                  desc: "Keep students in a rhythm of discover, attempt, review, and improve so the product supports progress over time." 
                }
              ].map((item, i) => (
                <motion.div key={i} variants={itemVariants} className="relative pl-12 group">
                  {/* Vertical Line Segment */}
                  <div className="absolute left-[23px] top-12 bottom-[-96px] w-[2px] bg-white/5 hidden md:block" />
                  
                  {/* Number/Icon Indicator */}
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center z-10 group-hover:border-purple-500/50 transition-colors duration-500">
                    <item.icon className="w-5 h-5 text-zinc-400 group-hover:text-purple-400 transition-colors" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
                    <p className="text-zinc-500 text-base leading-7 max-w-lg">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
