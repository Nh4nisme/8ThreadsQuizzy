export default function StatsCard({ title, number, percent }) {
  return (
    <div className="bg-[#1a1a1f] p-4 rounded-xl">
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