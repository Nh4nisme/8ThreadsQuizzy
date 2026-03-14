import {
  BookOpen,
  Calendar,
  Users,
  ChartColumnBig,
  Share2,
  ChevronLeft,
  SquarePen,
} from "lucide-react";
{
  /* Data for demonstrational purpose, delete and tweak when using API instead */
}
const students = [
  {
    name: "Alex Johnson",
    score: "85%",
    timeSpent: "15:24",
    completed: "2 hours ago",
  },
  {
    name: "Emma Wilson",
    score: "92%",
    timeSpent: "18:24",
    completed: "2 hours ago",
  },
  {
    name: "Michael Cohen",
    score: "85%",
    timeSpent: "15:24",
    completed: "2 hours ago",
  },
  {
    name: "Sophia Gracious",
    score: "92%",
    timeSpent: "18:24",
    completed: "2 hours ago",
  },
];

const questionsProgress = [
  { question: "What is the basic unit of life?", progress: 67 },
  { question: "Which organelle is responsible for...?", progress: 69 },
  { question: "What is the process of cell division...?", progress: 41 },
  { question: "Which of the following is NOT a...?", progress: 36 },
];

function OverallStats(completion, time, avgScore, topScore) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="flex justify-between items-start p-5 bg-[#151518] border border-gray-800 rounded-md">
        {/* Total Completions */}
        <div>
          <h2 className="text-gray-400 text-sm">Total Completions</h2>
          <h1 className="font-bold text-white text-3xl mt-1">28</h1>
        </div>

        <div className="flex items-center justify-center bg-purple-900/40 rounded-full w-10 h-10">
          <BookOpen className="text-[#7c3aed] w-5 h-5" />
        </div>
      </div>

      {/* Completion Time */}

      <div className="flex justify-between items-start p-5 bg-[#151518] border border-gray-800 rounded-md">
        <div>
          <h2 className="text-gray-400 text-sm">Completion Time</h2>
          <h1 className="font-bold text-white text-3xl mt-1">12:45</h1>
        </div>

        <div className="flex items-center justify-center bg-green-950 rounded-full w-10 h-10">
          <Calendar className="text-green-700 w-5 h-5" />
        </div>
      </div>

      {/* Average Score */}
      <div className="flex justify-between items-start p-5 bg-[#151518] border border-gray-800 rounded-md">
        <div>
          <h2 className="text-gray-400 text-sm">Average Score</h2>
          <h1 className="font-bold text-white text-3xl mt-1">78.5%</h1>
        </div>

        <div className="flex items-center justify-center bg-blue-950 rounded-full w-10 h-10">
          <Users className="text-blue-600 w-5 h-5" />
        </div>
      </div>

      {/* Top Score */}
      <div className="flex justify-between items-start p-5 bg-[#151518] border border-gray-800 rounded-md">
        <div>
          <h2 className="text-gray-400 text-sm">Top Score</h2>
          <h1 className="font-bold text-white text-3xl mt-1">95%</h1>
        </div>

        <div className="flex items-center justify-center bg-amber-950 rounded-full w-10 h-10">
          <ChartColumnBig className="text-orange-500 w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

function RecentCompletions({ students = [] }) {
  return (
    <div className="bg-[#151518] border border-gray-800 rounded-md p-6 pb-15">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-white font-bold text-3xl">Recent Completions</h3>
          <p className="text-gray-400 text-sm mt-3">
            Students who recently completed this quiz
          </p>
        </div>

        <button className="mt-3 px-4 py-2 border border-gray-700 rounded-lg text-white font-bold bg-[#101010] hover:bg-[#7c3aed] transition">
          View All Results
        </button>
      </div>

      {/* Table */}
      <div className="border border-gray-800 rounded-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              {["Student", "Score", "Time Spent", "Completed"].map((h) => (
                <th
                  key={h}
                  className="text-left text-white font-semibold text-sm px-4 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {students.map((s, i) => (
              <tr
                key={i}
                className="text-white border-gray-800/50 hover:bg-gray-800/30 transition cursor-pointer"
              >
                <td className="px-4 py-4">{s.name}</td>
                <td className="px-4 py-4">{s.score}</td>
                <td className="px-4 py-4">{s.timeSpent}</td>
                <td className="px-4 py-4">{s.completed}</td>
              </tr>
            ))}

            {students.length === 0 && (
              <tr>
                <td colSpan={4} className="text-white text-center px-4 py-8">
                  No completions yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QuestionPerformance({ questionsProgress = [] }) {
  return (
    <div className="bg-[#151518] border border-gray-800 rounded-md p-6 pb-15">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-white font-bold text-3xl">
            Question Performance
          </h3>
          <p className="text-gray-400 text-sm mt-3">
            How students performed on each question
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        {questionsProgress.length === 0 ? (
          <p className="text-gray-500 text-2xl text-center py-8">
            No data available
          </p>
        ) : (
          questionsProgress.map((q, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-gray-300 text-sm">
                  {i + 1}. {q.question}
                </span>
                <span className="text-white font-semibold text-sm">
                  {q.progress}%
                </span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full">
                <div
                  style={{ width: `${q.progress}%` }}
                  className="h-full bg-purple-600 rounded-full"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function QuizShare() {
  return (
    <div className="flex">
      <div className="flex justify-between w-full items-start bg-[#151518] rounded-md p-6">
        <div>
          <h3 className="text-white font-bold text-3xl">Share this quiz</h3>
          <p className="text-gray-400 text-sm mt-3">
            Share this quiz with students or colleagues
          </p>
        </div>

        <button className="flex justify-between mt-3 px-2 py-2 border border-gray-700 rounded-lg text-white font-bold bg-purple-600 hover:bg-[#7c3aed] transition cursor-pointer">
          <Share2 className="mr-3"></Share2> Share Quiz
        </button>
      </div>
    </div>
  );
}

{
  /* UI for now, need tweak for API call */
}
{
  /* Maybe make this function take in an array with details like aboves */
}
function QuizDetail({ quizTItle, quizDescription }) {
  return (
    <div>
      <div>
        {/* Quiz Title and Description */}
        <div className="flex justify-between w-full items-start p-6">
          <div>
            <div className="flex rounded-md">
              <button className="flex items-center justify-center text-white rounded-xl border border-gray-700 w-12 h-12 mt-3 mr-5 hover:bg-[#7c3aed] transition cursor-pointer">
                <ChevronLeft></ChevronLeft>
              </button>

              <div>
                <h3 className="text-white font-bold text-3xl">{quizTItle}</h3>
                <p className="text-gray-400 text-sm mt-3">{quizDescription}</p>
              </div>
            </div>
          </div>
          {/* Quiz Buttons */}

          <div className="flex justify-center mt-3">
            <button className="flex justify-between px-5 py-2.5 mr-3 border border-gray-700 rounded-lg text-white font-bold hover:bg-[#7c3aed] transition cursor-pointer">
              <SquarePen className="mr-3"></SquarePen>Edit
            </button>

            <button className="flex justify-between px-5 py-2.5 mr-3 border border-gray-700 rounded-lg text-white font-bold hover:bg-[#7c3aed] transition cursor-pointer">
              <Share2 className="mr-3"></Share2>Share
            </button>

            <button className="flex justify-between px-5 py-2.5 border border-gray-700 rounded-lg text-white font-bold bg-purple-600 hover:bg-[#7c3aed] transition cursor-pointer">
              Preview
            </button>
          </div>
        </div>

        {/* Quiz details */}
        <OverallStats></OverallStats>

        <div className="grid grid-cols-[60%_40%] gap-4 mt-5">
          <RecentCompletions students={students}></RecentCompletions>
          <QuestionPerformance
            questionsProgress={questionsProgress}
          ></QuestionPerformance>
        </div>
      </div>
    </div>
  );
}

export default QuizDetail;
