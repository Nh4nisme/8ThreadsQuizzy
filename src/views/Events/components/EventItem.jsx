import { Calendar, Clock, Users, Play, Trash2, MoreVertical, Edit } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function EventItem({ event, onStatusUpdate, onEdit, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const statusConfig = {
    upcoming: { color: "bg-blue-500/20 text-blue-400", label: "Upcoming" },
    active: { color: "bg-green-500/20 text-green-400", label: "Active" },
    completed: { color: "bg-gray-500/20 text-gray-400", label: "Completed" },
  };

  const currentStatus = event.currentStatus || "upcoming";
  const { color, label } = statusConfig[currentStatus];

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString([], { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`flex flex-col border border-gray-800/50 bg-[#0a0a0c] rounded-2xl transition-all group ${showMenu ? 'z-30' : 'z-10'}`}>
      <div 
        className={`flex justify-between items-center p-5 hover:bg-[#121216] transition-all cursor-pointer border-l-4 rounded-t-2xl ${!isExpanded ? 'rounded-b-2xl' : ''} ${isExpanded ? 'bg-[#121216]' : ''}`} 
        style={{ borderLeftColor: currentStatus === 'active' ? '#10b981' : currentStatus === 'upcoming' ? '#3b82f6' : '#6b7280' }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
            <Calendar size={24} />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                {event.title}
              </h3>

              <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${color}`}>
                {label}
              </span>
            </div>

            <p className="text-gray-500 text-sm mt-0.5 line-clamp-1">
              {event.description || "No description provided."}
            </p>

            <div className="text-xs text-gray-500 mt-2 flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-gray-600" />
                {formatTime(event.startTime)} - {formatTime(event.endTime)}
              </span>
              <span className="flex items-center gap-1">
                <Users size={12} className="text-gray-600" />
                {event.participants?.length || 0} participants
              </span>
              <span className="flex items-center gap-1">
                <Play size={12} className="text-gray-600" />
                {event.quizId?.title || "Quiz details unavailable"}
              </span>
            </div>

            {event.assignedClasses?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {event.assignedClasses.map((cls) => (
                  <span key={cls} className="text-[9px] px-2 py-0.5 bg-gray-800 text-gray-400 rounded-md border border-gray-700">
                    {cls}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          {currentStatus === "upcoming" && (
            <button 
              onClick={() => onStatusUpdate(event._id, "active")}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600/10 text-emerald-500 hover:bg-emerald-600 hover:text-white rounded-xl text-sm font-bold transition-all"
            >
              <Play size={16} fill="currentColor" />
              Go Live Now
            </button>
          )}

          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-2.5 hover:bg-gray-800 rounded-xl transition-colors text-gray-500 hover:text-white"
            >
              <MoreVertical size={20} />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1f] border border-gray-800 rounded-xl shadow-2xl z-10 overflow-hidden py-1">
                {currentStatus !== "completed" && (
                  <button 
                    onClick={() => {
                      onEdit();
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-600 hover:text-white flex items-center gap-2 transition-colors"
                  >
                    <Edit size={14} />
                    Edit Event
                  </button>
                )}
                
                {currentStatus === "upcoming" && (
                  <button 
                    onClick={() => {
                      onDelete(event._id);
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-600 hover:text-white flex items-center gap-2 transition-colors"
                  >
                    <Trash2 size={14} />
                    Delete Event
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* EXPANDED CONTENT: PARTICIPANTS */}
      {isExpanded && (
        <div className="p-6 border-t border-gray-800/50 bg-[#070709] rounded-b-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Users size={16} />
              Live Participants ({event.participants?.length || 0})
            </h4>
          </div>

          {event.participants?.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {event.participants.map((p, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#111115] border border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 text-xs font-bold">
                      {p.studentName.charAt(0)}
                    </div>
                    <span className="text-sm text-white font-medium">{p.studentName}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-orange-400 font-bold">{p.score || 0} pts</p>
                    <p className="text-[10px] text-gray-500">{p.completedAt ? 'Completed' : 'In Progress'}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-600 border border-dashed border-gray-800 rounded-xl">
              <p className="text-sm">No students have joined this event yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
