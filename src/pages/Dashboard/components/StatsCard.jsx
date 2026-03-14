export default function StatsCard({ title, number, percent, icon }) {
  return (
    <div className="bg-[#1a1a1f] p-4 rounded-xl relative">
      {/* ICON */}
      <div className="absolute top-3 right-3 w-8 h-8 bg-[#2a1a45] rounded-full flex items-center justify-center">
        <img src={icon} className="w-4 h-4 brightness-0 invert" />
      </div>

      <p className="text-gray-400 text-sm">{title}</p>

      <div className="flex items-center gap-2 mt-2">
        <h2 className="text-2xl font-bold">{number}</h2>

        <span
          className={`text-sm ${
            percent.includes("-") ? "text-red-400" : "text-green-400"
          }`}
        >
          {percent}
        </span>
      </div>
    </div>
  );
}
