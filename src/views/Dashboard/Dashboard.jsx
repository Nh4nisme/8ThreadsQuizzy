"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext.jsx";
import StatsCard from "./components/StatsCard.jsx";
import EventItem from "./components/EventItem.jsx";
import StudentItem from "./components/StudentItem.jsx";
import QuizCard from "./components/QuizCard.jsx";
import { fetchTeacherQuizzes, fetchTeacherStudents, fetchTeacherEvents } from "../../lib/quiz-client.js";

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [students, setStudents] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const results = await Promise.allSettled([
          fetchTeacherQuizzes(),
          fetchTeacherStudents(),
          fetchTeacherEvents(),
        ]);

        if (results[0].status === "fulfilled") setQuizzes(results[0].value.quizzes || []);
        else console.error("Quizzes failed:", results[0].reason);

        if (results[1].status === "fulfilled") setStudents(results[1].value.students || []);
        else console.error("Students failed:", results[1].reason);

        if (results[2].status === "fulfilled") setEvents(results[2].value.events || []);
        else console.error("Events failed:", results[2].reason);

      } catch (error) {
        console.error("Critical dashboard error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const totalQuizzes = quizzes.length;
  const totalStudents = students.length;
  const activeEvents = quizzes.filter(q => q.status === "published").length;
  const avgCompletion = quizzes.length > 0
    ? Math.round(quizzes.reduce((acc, q) => acc + (q.completions || 0), 0) / quizzes.length)
    : 0;

  const topStudents = [...students]
    .sort((a, b) => (b.averageScore || 0) - (a.averageScore || 0))
    .slice(0, 5);

  const recentQuizzes = quizzes.slice(0, 3);

  return (
    <div className=" text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-400">
            Welcome back, {user?.fullName || user?.username || "there"}! Here&apos;s what&apos;s happening with your
            quizzes
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Quizzes"
          number={totalQuizzes.toLocaleString()}
          percent="+0%"
          icon="/assets/openbook.png"
        />

        <StatsCard
          title="Active Quizzes"
          number={activeEvents.toLocaleString()}
          percent="+0%"
          icon="/assets/calendar.png"
        />

        <StatsCard
          title="Students"
          number={totalStudents.toLocaleString()}
          percent="+0%"
          icon="/assets/students.png"
        />

        <StatsCard
          title="Avg. Completions"
          number={avgCompletion.toLocaleString()}
          percent="+0%"
          icon="/assets/average.png"
        />
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 bg-[#1a1a1f] p-6 rounded-xl">
          <h1 className="text-lg font-semibold mb-1">Recent Events</h1>

          <p className="text-gray-400 mb-4">
            Manage your upcoming and active quiz events
          </p>

          {isLoading ? (
            <p className="text-gray-500">Loading events...</p>
          ) : events.length > 0 ? (
            events.slice(0, 3).map((event) => (
              <EventItem
                key={event._id}
                title={event.title}
                time={new Date(event.startTime).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                participants={`${event.participants?.length || 0} participants`}
                button={event.currentStatus === 'active' ? 'View Live' : 'Manage'}
                onClick={() => router.push('/events')}
              />
            ))
          ) : (
            <p className="text-gray-500">No events scheduled.</p>
          )}
        </div>

        <div className="bg-[#1a1a1f] p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Top Students</h2>

          {isLoading ? (
            <p className="text-gray-500">Loading students...</p>
          ) : topStudents.length > 0 ? (
            topStudents.map((student, index) => (
              <StudentItem
                key={student.id}
                rank={index + 1}
                name={student.name}
                subject={student.class || "N/A"}
                score={`${student.averageScore || 0}`}
                icon="/assets/achieve.png"
              />
            ))
          ) : (
            <p className="text-gray-500">No students found.</p>
          )}
        </div>
      </div>

      <div className="bg-[#1a1a1f] p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Recent Quizzes</h2>

        <div className="grid grid-cols-4 gap-4">
          {isLoading ? (
            <div className="col-span-3 text-gray-500">Loading quizzes...</div>
          ) : (
            recentQuizzes.map((quiz) => (
              <QuizCard
                key={quiz._id}
                title={quiz.title}
                questions={quiz.questions?.length || 0}
                completions={quiz.completions || 0}
                percent={quiz.status === "published" ? 100 : 0}
                questionIcon="/assets/openbook.png"
                completionIcon="/assets/students.png"
                onClick={() => router.push(`/quizzes?quizId=${quiz._id}`)}
              />
            ))
          )}

          <div
            className="border border-dashed border-gray-600 rounded-xl flex items-center justify-center cursor-pointer hover:border-purple-500 hover:bg-purple-500/5 transition-all group"
            onClick={() => router.push("/quizzes/create")}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-purple-400 text-3xl group-hover:scale-110 transition-transform">+</span>
              <span className="text-purple-400 font-medium">Create Quiz</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
