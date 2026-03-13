export default function StudentRow() {
  return (
    <div className="grid grid-cols-5 items-center px-6 py-4 border-b border-gray-800 hover:bg-[#202025]">

      {/* name */}
      <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/40"
          className="w-8 h-8 rounded-full"
        />
        <span>Alex Johnson</span>
      </div>

      {/* class */}
      <div>10A</div>

      {/* quizzes */}
      <div>12</div>

      {/* score */}
      <div>85%</div>

      {/* active */}
      <div className="text-gray-400">2 hours ago</div>

    </div>
  );
}