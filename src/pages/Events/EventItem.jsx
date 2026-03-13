import bookIcon from "../../assets/openbook.png";
export default function EventItem({ title, status, color }) {

  const statusColor = {
    green: "bg-green-500/20 text-green-400",
    blue: "bg-blue-500/20 text-blue-400",
    gray: "bg-gray-500/20 text-gray-400"
  };

  return (
    <div className="flex justify-between items-center border border-gray-800 bg-[#15151a] rounded-lg p-4 hover:bg-[#1f1f26]">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <div className="w-10 h-10 rounded-full bg-[#2a1a45] flex items-center justify-center">
          <img src={bookIcon} className="w-5 h-5 brightness-0 invert" />
      </div>

        <div>
          <div className="flex items-center gap-2">

            <h3 className="font-medium">
              {title}
            </h3>

            <span className={`text-xs px-2 py-0.5 rounded ${statusColor[color]}`}>
              {status}
            </span>

          </div>

          <p className="text-gray-400 text-sm">
            Basic concepts of biology for beginners
          </p>

          <div className="text-xs text-gray-500 mt-1 flex gap-4">
            <span>15 questions</span>
            <span>20 min</span>
            <span>32 completions</span>
            <span>Created just now</span>
          </div>

        </div>

      </div>

      {/* RIGHT */}
      <div className="flex gap-3">

        <button className="px-3 py-1 border border-gray-600 rounded-md text-sm">
          Manage
        </button>

        <button className="px-2 py-1 border border-gray-700 rounded-md">
          ⋮
        </button>

      </div>

    </div>
  );
}