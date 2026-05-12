export default function QuizCard({
  title,
  questions,
  completions,
  percent,
  questionIcon,
  completionIcon,
  onClick,
}) {
  return (
    <div
      className="bg-[#121216] p-4 rounded-xl relative hover:bg-[#1a1a20] transition-all cursor-pointer group border border-transparent hover:border-purple-500/30"
      onClick={onClick}
    >
      <div className="absolute top-3 right-3 w-8 h-8 bg-[#2a1a45] rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors">
        <img
          src="/assets/more.png"
          alt="menu"
          className="w-4 h-4 brightness-0 invert"
        />
      </div>

      <h3 className="font-medium mb-2 group-hover:text-purple-400 transition-colors">
        {title}
      </h3>

      <div className="flex items-center gap-4 text-gray-400 text-sm">
        <div className="flex items-center gap-1">
          <img
            src={questionIcon}
            alt=""
            className="w-4 h-4 brightness-0 invert"
          />
          <span>{questions} questions</span>
        </div>

        <div className="flex items-center gap-1">
          <img
            src={completionIcon}
            alt=""
            className="w-4 h-4 brightness-0 invert"
          />
          <span>{completions} completions</span>
        </div>
      </div>

      <div className="mt-3">
        <div className="bg-gray-700 h-2 rounded-full overflow-hidden">
          <div
            className="bg-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          ></div>
        </div>

        <p className="text-right text-sm mt-1 text-gray-500 group-hover:text-purple-400 transition-colors">
          {percent}%
        </p>
      </div>
    </div>
  );
}
