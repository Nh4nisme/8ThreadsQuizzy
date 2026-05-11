export default function StudentRow({ student, isSelected, onToggle }) {
  const formatRelativeDate = (dateValue) => {
    if (!dateValue) return "Never";
    const date = new Date(dateValue);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  return (
    <div 
      className={`grid grid-cols-[50px_1fr_120px_120px_120px_150px] items-center px-6 py-4 border-b border-gray-800 hover:bg-[#202025] transition-colors ${
        isSelected ? "bg-purple-900/10" : ""
      }`}
    >
      {/* checkbox */}
      <div>
        <input 
          type="checkbox" 
          checked={isSelected}
          onChange={() => onToggle(student.id)}
          className="w-4 h-4 rounded border-gray-700 bg-black text-purple-600 focus:ring-purple-500 cursor-pointer"
        />
      </div>

      {/* name */}
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold">
          {student.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="font-medium truncate">{student.name}</p>
          <p className="text-xs text-gray-500 truncate">{student.email}</p>
        </div>
      </div>

      {/* class */}
      <div className="text-sm">{student.class}</div>

      {/* quizzes */}
      <div className="text-sm">{student.quizzesTaken}</div>

      {/* score */}
      <div className="text-sm font-medium text-emerald-400">{student.averageScore}%</div>

      {/* active */}
      <div className="text-xs text-gray-400">{formatRelativeDate(student.lastActivity)}</div>
    </div>
  );
}
