"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[300px] bg-accent-gradient opacity-10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          {/* Logo & Vision */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <img src="/assets/Logo.png" alt="Logo" className="w-10 h-10 group-hover:rotate-12 transition-transform duration-500" />
              <span className="text-2xl font-bold bg-accent-gradient bg-clip-text text-transparent">8ThreadsQuizzy</span>
            </Link>
            <p className="text-zinc-500 leading-relaxed mb-8">
              The ultimate immersive quiz platform for structured learning and collaborative growth. Built for the next generation of educators and students.
            </p>
            <div className="flex gap-4">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: "#fff" }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 md:offset-1">
            <h5 className="text-white font-bold mb-8 uppercase tracking-widest text-[10px]">Platform</h5>
            <ul className="space-y-4">
              {["Quizzes", "Features", "Pricing", "Rewards"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-zinc-500 hover:text-white transition-colors text-sm flex items-center group">
                    {link}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h5 className="text-white font-bold mb-8 uppercase tracking-widest text-[10px]">Resources</h5>
            <ul className="space-y-4">
              {["Documentation", "API Reference", "Community", "Support"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-zinc-500 hover:text-white transition-colors text-sm flex items-center group">
                    {link}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Area */}
          <div className="md:col-span-3">
            <div className="p-8 rounded-[2rem] bg-accent-gradient relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="text-white font-bold text-xl mb-4">Ready to start?</h4>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">Join 8,000+ users transforming their learning journey today.</p>
                <button className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:scale-[1.02] transition-transform active:scale-95">
                  Get Started Free
                </button>
              </div>
              {/* Decorative elements inside CTA */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute -right-10 -top-10 w-40 h-40 border-2 border-white/10 rounded-full" 
              />
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-zinc-600 text-xs">
            © 2026 8ThreadsQuizzy. Built with passion for modern education.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-zinc-600 hover:text-white transition-colors text-xs">Privacy Policy</Link>
            <Link href="#" className="text-zinc-600 hover:text-white transition-colors text-xs">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
