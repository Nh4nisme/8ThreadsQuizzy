import { Trophy } from "lucide-react";

export default function StudentItem({ rank, name, subject, score }) {
  const isTopThree = rank <= 3;
  
  return (
    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
          isTopThree 
            ? "bg-accent-gradient text-white shadow-lg shadow-accent/20" 
            : "bg-white/5 text-text-muted border border-white/10"
        }`}>
          {rank}
        </div>

        <div className="flex flex-col">
          <p className="font-bold text-sm text-white group-hover:text-accent transition-colors">{name}</p>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-0.5">{subject}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end">
           <span className="text-sm font-black text-white">{score}</span>
           <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Points</span>
        </div>
        {isTopThree && <Trophy size={16} className="text-amber-500" />}
      </div>
    </div>
  );
}
