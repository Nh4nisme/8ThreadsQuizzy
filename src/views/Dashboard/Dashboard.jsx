"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext.jsx";
import { Plus, Sparkles, LayoutDashboard } from "lucide-react";
import StatsCard from "./components/StatsCard.jsx";
import EventItem from "./components/EventItem.jsx";
import StudentItem from "./components/StudentItem.jsx";
import QuizCard from "./components/QuizCard.jsx";
import { fetchTeacherQuizzes, fetchTeacherStudents, fetchTeacherEvents } from "../../lib/quiz-client.js";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "../../components/ui/Motion.jsx";

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
        if (results[1].status === "fulfilled") setStudents(results[1].value.students || []);
        if (results[2].status === "fulfilled") setEvents(results[2].value.events || []);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const stats = [
    { title: "Total Quizzes", value: quizzes.length, icon: "/assets/openbook.png", trend: "+2%" },
    { title: "Active Events", value: events.filter(e => e.currentStatus === 'active').length, icon: "/assets/calendar.png", trend: "+12%" },
    { title: "Total Students", value: students.length, icon: "/assets/students.png", trend: "+5%" },
    { title: "Avg. Score", value: "84%", icon: "/assets/average.png", trend: "+1.2%" },
  ];

  const topStudents = [...students]
    .sort((a, b) => (b.averageScore || 0) - (a.averageScore || 0))
    .slice(0, 4);

  return (
    <StaggerContainer className="space-y-10">
      <FadeIn className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            Welcome back, <span className="text-gradient">{user?.fullName?.split(' ')[0] || user?.username}</span>
          </h1>
          <p className="text-text-secondary font-medium mt-1 text-sm md:text-base">Here is a summary of your academic ecosystem today.</p>
        </div>

        <button
          onClick={() => router.push("/quizzes/create")}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-accent-gradient font-black text-sm shadow-xl shadow-accent/20 transition-all hover:shadow-accent/40 hover:-translate-y-0.5 active:translate-y-0 w-full lg:w-auto"
        >
          <Plus size={18} />
          Create New Quiz
        </button>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StaggerItem key={i}>
            <StatsCard
              title={stat.title}
              number={stat.value.toLocaleString()}
              percent={stat.trend}
              icon={stat.icon}
            />
          </StaggerItem>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <StaggerItem className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-white">Live & Upcoming Events</h2>
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest mt-1">Real-time engagement metrics</p>
            </div>
            <button onClick={() => router.push("/events")} className="text-xs font-black text-accent uppercase tracking-widest hover:underline">View All</button>
          </div>

          <div className="grid gap-3">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse" />)
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
              <div className="p-10 rounded-[32px] border border-dashed border-white/5 bg-white/5 text-center">
                <p className="text-sm font-bold text-text-muted">No scheduled events found.</p>
              </div>
            )}
          </div>
        </StaggerItem>

        <StaggerItem className="space-y-6">
          <div>
            <h2 className="text-xl font-black text-white">Top Performers</h2>
            <p className="text-xs font-bold text-text-muted uppercase tracking-widest mt-1">Student achievement ranking</p>
          </div>

          <div className="grid gap-3">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse" />)
            ) : topStudents.length > 0 ? (
              topStudents.map((student, index) => (
                <StudentItem
                  key={student.id}
                  rank={index + 1}
                  name={student.name}
                  subject={student.class || "Academic"}
                  score={student.averageScore || 0}
                />
              ))
            ) : (
              <div className="p-10 rounded-[32px] border border-dashed border-white/5 bg-white/5 text-center">
                <p className="text-sm font-bold text-text-muted">No student data available.</p>
              </div>
            )}
          </div>
        </StaggerItem>
      </div>

      <StaggerItem className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white">Repository Catalog</h2>
            <p className="text-xs font-bold text-text-muted uppercase tracking-widest mt-1">Your published and draft question sets</p>
          </div>
          <button onClick={() => router.push("/quizzes")} className="text-xs font-black text-accent uppercase tracking-widest hover:underline">Manage Repository</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-[240px] bg-white/5 rounded-[32px] animate-pulse" />)
          ) : (
            quizzes.slice(0, 3).map((quiz) => (
              <QuizCard
                key={quiz._id}
                title={quiz.title}
                questions={quiz.questions?.length || 0}
                completions={quiz.completions || 0}
                percent={quiz.status === "published" ? 100 : 0}
                onClick={() => router.push(`/quizzes?quizId=${quiz._id}`)}
              />
            ))
          )}

          <ScaleIn>
            <div
              className="group relative h-full min-h-[240px] border-2 border-dashed border-white/10 rounded-[32px] flex flex-col items-center justify-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-all overflow-hidden"
              onClick={() => router.push("/quizzes/create")}
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all shadow-xl">
                <Plus size={32} />
              </div>
              <p className="mt-4 font-black text-sm text-text-muted group-hover:text-white transition-colors">Forge New Asset</p>

              {/* Background Glow on Hover */}
              <div className="absolute inset-0 bg-accent-gradient opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none" />
            </div>
          </ScaleIn>
        </div>
      </StaggerItem>

      <FadeIn delay={0.4} className="rounded-3xl md:rounded-[40px] border border-accent/20 bg-accent-gradient/5 p-6 md:p-12 text-center overflow-hidden relative group">
        <Sparkles size={40} className="text-accent mx-auto mb-6 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
        <h2 className="text-xl md:text-3xl font-black text-white mb-4">Elevate your Teaching Experience</h2>
        <p className="text-text-secondary max-w-2xl mx-auto font-medium text-sm md:text-base">
          Discover new ways to engage with your students. Use the "Events" portal to host live competitions and foster a collaborative learning spirit.
        </p>
        <button
          onClick={() => router.push("/events")}
          className="mt-8 md:mt-10 px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl bg-white text-black font-black text-sm shadow-2xl transition-all hover:bg-zinc-200 active:scale-95 w-full sm:w-auto"
        >
          Explore Events Portal
        </button>

        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/20 blur-[100px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 blur-[100px] pointer-events-none" />
      </FadeIn>
    </StaggerContainer>
  );
}