import { Calendar, ChevronRight } from "lucide-react";

export default function EventItem({ title, time, participants, button, onClick }) {
  const isActive = button === "View Live";
  
  return (
    <div 
      onClick={onClick}
      className="group flex justify-between items-center bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.08] transition-all cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
          isActive ? "bg-accent shadow-lg shadow-accent/20" : "bg-white/5 border border-white/10"
        }`}>
          <Calendar size={20} className={isActive ? "text-white" : "text-text-muted"} />
        </div>

        <div>
          <h3 className="font-bold text-sm text-white group-hover:text-accent transition-colors">{title}</h3>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">
            {time} • {participants}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
         {isActive && (
           <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
           </span>
         )}
         <ChevronRight size={16} className="text-text-muted group-hover:text-white transition-all transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}
