export default function QuizCard({ title, questions, completions, percent }) {
  return (
    <div className="bg-[#121216] p-4 rounded-xl">

      <h3 className="font-medium mb-2">{title}</h3>

      <p className="text-gray-400 text-sm">
        {questions} questions • {completions} completions
      </p>

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