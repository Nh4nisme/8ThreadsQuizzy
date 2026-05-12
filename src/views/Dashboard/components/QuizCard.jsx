import { BookOpen, Users, MoreHorizontal, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function QuizCard({
  title,
  questions,
  completions,
  percent,
  onClick,
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group relative flex flex-col bg-bg-card border border-white/5 rounded-[32px] p-6 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.03] cursor-pointer overflow-hidden shadow-xl"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-2xl bg-accent-gradient flex items-center justify-center shadow-lg shadow-accent/20">
          <BookOpen size={20} className="text-white" />
        </div>
        <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-text-muted hover:text-white transition-all">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <h3 className="text-lg font-black tracking-tight text-white mb-2 group-hover:text-accent transition-colors">
        {title}
      </h3>

      <div className="flex items-center gap-4 text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] mb-6">
        <div className="flex items-center gap-1.5">
          <BookOpen size={12} className="text-accent" />
          <span>{questions} Qs</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users size={12} className="text-accent" />
          <span>{completions} Play</span>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex items-center justify-between mb-2">
           <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Mastery</span>
           <span className="text-xs font-black text-white">{percent}%</span>
        </div>
        <div className="bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${percent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-accent-gradient h-full rounded-full shadow-[0_0_12px_rgba(139,92,246,0.5)]"
          />
        </div>
      </div>

      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all">
         <ArrowRight size={20} className="text-accent" />
      </div>
    </motion.div>
  );
}
