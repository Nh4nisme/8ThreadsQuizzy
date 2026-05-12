import { motion } from "framer-motion";

export default function StatsCard({ title, number, percent, icon }) {
  const isLoss = percent.includes("-");
  
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group relative bg-bg-card border border-white/5 rounded-3xl p-6 backdrop-blur-xl transition-all hover:border-white/20"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center transition-colors group-hover:bg-accent/10">
          <img src={icon} alt="" className="w-6 h-6 brightness-0 invert opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all" />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
          isLoss ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"
        }`}>
          {percent}
        </div>
      </div>

      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-1">{title}</p>
      <h2 className="text-3xl font-black tracking-tight text-white">{number}</h2>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-accent-gradient opacity-0 group-hover:opacity-100 transition-opacity rounded-t-3xl" />
    </motion.div>
  );
}
