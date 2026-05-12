"use client";

import { useRouter } from "next/navigation";
import {
  BookOpen,
  Calendar,
  ChartColumnBig,
  Share2,
  SquarePen,
  Users,
} from "lucide-react";

const formatDuration = (seconds = 0) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

const formatRelativeDate = (dateValue) => {
  if (!dateValue) {
    return "In progress";
  }

  const date = new Date(dateValue);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

function StatCard({ title, value, iconBg, iconColor, icon: Icon }) {
  return (
    <div className="flex justify-between items-start rounded-md border border-gray-800 bg-[#151518] p-5">
      <div>
        <h2 className="text-sm text-gray-400">{title}</h2>
        <h1 className="mt-1 text-3xl font-bold text-white">{value}</h1>
      </div>

      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
    </div>
  );
}

function RecentCompletions({ students = [] }) {
  return (
    <div className="rounded-md border border-gray-800 bg-[#151518] p-6 pb-10">
      <div className="mb-6">
        <h3 className="text-3xl font-bold text-white">Student Activity</h3>
        <p className="mt-3 text-sm text-gray-400">
          Students currently working on this quiz and the latest completed attempts.
        </p>
      </div>

      <div className="rounded-md border border-gray-800">
        <div className="max-h-[460px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
          <table className="w-full relative">
            <thead className="sticky top-0 z-10 bg-[#151518]">
              <tr className="border-b border-gray-800">
                {["Student", "Status", "Score", "Time Spent", "Updated"].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-3 text-left text-sm font-semibold text-white"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800/50">
              {students.length > 0 ? (
                students.map((student) => (
                  <tr
                    key={student.id}
                    className="text-white transition hover:bg-gray-800/30"
                  >
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-zinc-500">{student.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          student.status === "completed"
                            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20"
                            : "bg-orange-500/15 text-orange-300 border border-orange-500/20"
                        }`}
                      >
                        {student.status === "completed" ? "Completed" : "In Progress"}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-mono">{student.status === "completed" ? `${student.score}%` : "-"}</td>
                    <td className="px-4 py-4 text-gray-300">{formatDuration(student.timeSpentSeconds)}</td>
                    <td className="px-4 py-4 text-gray-400 text-sm">
                      {formatRelativeDate(student.completedAt || student.startedAt)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-10 text-center text-gray-500 italic">
                    No student activity found for this quiz.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function QuestionPerformance({ questions = [] }) {
  return (
    <div className="rounded-md border border-gray-800 bg-[#151518] p-6 pb-10">
      <div className="mb-6">
        <h3 className="text-3xl font-bold text-white">Question Performance</h3>
        <p className="mt-3 text-sm text-gray-400">
          Estimated performance snapshot by question from stored attempts.
        </p>
      </div>

      <div>
        {questions.length === 0 ? (
          <p className="py-8 text-center text-2xl text-gray-500">No data available</p>
        ) : (
          questions.map((question, index) => (
            <div key={question.questionId} className="mb-4">
              <div className="mb-1 flex justify-between">
                <span className="text-sm text-gray-300">
                  {index + 1}. {question.question}
                </span>
                <span className="text-sm font-semibold text-white">{question.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-800">
                <div
                  style={{ width: `${question.progress}%` }}
                  className="h-full rounded-full bg-purple-600"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function QuizDetail({ detail, onEdit, onPreview, onShare }) {
  const router = useRouter();

  if (!detail?.quiz) {
    return (
      <div className="rounded-md border border-dashed border-white/10 bg-[#151518] p-10 text-center text-zinc-400">
        Select a quiz from the library to inspect details and student activity.
      </div>
    );
  }

  const { quiz, stats, students, questionPerformance } = detail;

  return (
    <div>
      <div className="flex justify-between w-full items-start p-6">
        <div>
          <div className="flex rounded-md">
            <button
              type="button"
              onClick={() => router.push("/quizzes")}
              className="mr-5 mt-3 flex h-12 w-12 items-center justify-center rounded-xl border border-gray-700 text-white transition hover:bg-[#7c3aed]"
            >
              <BookOpen />
            </button>

            <div>
              <h3 className="text-3xl font-bold text-white">{quiz.title}</h3>
              <p className="mt-3 text-sm text-gray-400">{quiz.description}</p>
            </div>
          </div>
        </div>

        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={onEdit}
            className="mr-3 flex justify-between rounded-lg border border-gray-700 px-5 py-2.5 font-bold text-white transition hover:bg-[#7c3aed]"
          >
            <SquarePen className="mr-3" />
            Edit
          </button>

          <button
            type="button"
            onClick={onShare}
            className="mr-3 flex justify-between rounded-lg border border-gray-700 px-5 py-2.5 font-bold text-white transition hover:bg-[#7c3aed]"
          >
            <Share2 className="mr-3" />
            Share
          </button>

          <button 
            type="button"
            onClick={onPreview}
            className="flex justify-between rounded-lg border border-gray-700 bg-purple-600 px-5 py-2.5 font-bold text-white transition hover:bg-[#7c3aed]"
          >
            Preview
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Total Completions"
          value={stats.totalCompletions}
          icon={BookOpen}
          iconBg="bg-purple-900/40"
          iconColor="text-[#7c3aed]"
        />
        <StatCard
          title="Average Time"
          value={formatDuration(stats.averageTimeSeconds)}
          icon={Calendar}
          iconBg="bg-green-950"
          iconColor="text-green-700"
        />
        <StatCard
          title="Average Score"
          value={`${stats.averageScore}%`}
          icon={Users}
          iconBg="bg-blue-950"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Top Score"
          value={`${stats.topScore}%`}
          icon={ChartColumnBig}
          iconBg="bg-amber-950"
          iconColor="text-orange-500"
        />
      </div>

      <div className="mt-5 grid grid-cols-[60%_40%] gap-4">
        <RecentCompletions students={students} />
        <QuestionPerformance questions={questionPerformance} />
      </div>
    </div>
  );
}
