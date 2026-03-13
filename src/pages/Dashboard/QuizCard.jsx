import moreIcon from "../../assets/more.png";

export default function QuizCard({
  title,
  questions,
  completions,
  percent,
  questionIcon,
  completionIcon
}) {
  return (
    <div className="bg-[#121216] p-4 rounded-xl relative">

      {/* ICON cố định góc phải */}
      <div className="absolute top-3 right-3 w-8 h-8 bg-[#2a1a45] rounded-lg flex items-center justify-center">
        <img src={moreIcon} className="w-4 h-4 brightness-0 invert" />
      </div>

      <h3 className="font-medium mb-2">{title}</h3>

      <div className="flex items-center gap-4 text-gray-400 text-sm">

        <div className="flex items-center gap-1">
          <img src={questionIcon} className="w-4 h-4 brightness-0 invert" />
          <span>{questions} questions</span>
        </div>

        <div className="flex items-center gap-1">
          <img src={completionIcon} className="w-4 h-4 brightness-0 invert" />
          <span>{completions} completions</span>
        </div>

      </div>

      <div className="mt-3">
        <div className="bg-gray-700 h-2 rounded-full">
          <div
            className="bg-purple-500 h-2 rounded-full"
            style={{ width: percent + "%" }}
          ></div>
        </div>

        <p className="text-right text-sm mt-1">{percent}%</p>
      </div>

    </div>
  );
}