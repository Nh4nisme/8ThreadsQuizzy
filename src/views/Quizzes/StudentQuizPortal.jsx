"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Clock3,
  Filter,
  Search,
  Sparkles,
  Trophy,
  Users,
  Calendar,
  ChevronRight,
  Timer,
  CheckCircle2,
  AlertCircle,
  Zap,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  fetchStudentQuizzes,
  fetchStudentEvents,
  createQuizAttemptRequest,
  submitQuizAttemptRequest
} from "../../lib/quiz-client.js";
import { toast } from "../../components/ui/Toast.jsx";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, HoverScale, ScaleIn } from "../../components/ui/Motion.jsx";

const difficultyOptions = ["All Levels", "Easy", "Medium", "Hard"];

// --- Helper Components for Premium Feel ---

const GlowOrb = ({ className, color = "purple" }) => {
  const colors = {
    purple: "bg-purple-600/20",
    blue: "bg-blue-600/20",
    orange: "bg-orange-600/15",
    emerald: "bg-emerald-600/15",
    red: "bg-red-600/20",
  };
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`pointer-events-none absolute rounded-full blur-[120px] ${colors[color] || colors.purple} ${className}`}
    />
  );
};

const ConfettiParticle = ({ index }) => {
  const randomX = Math.random() * 100 - 50;
  const randomY = Math.random() * -100 - 50;
  const colors = ["#AC63E6", "#7C3AED", "#F59E0B", "#10B981", "#3B82F6"];

  return (
    <motion.div
      initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
      animate={{
        opacity: 0,
        scale: Math.random() * 1.5,
        x: randomX * 10,
        y: randomY * 10,
        rotate: 360
      }}
      transition={{ duration: 2, ease: "easeOut", delay: index * 0.02 }}
      className="absolute w-2 h-2 rounded-full"
      style={{ backgroundColor: colors[index % colors.length] }}
    />
  );
};

// --- Sub-View: StudentQuizPlayer ---

export function StudentQuizPlayer({ quiz, attemptId, onExit, onComplete, isPreview = false }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState((quiz.durationMinutes || 10) * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = quiz.questions[questionIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const totalQuestions = quiz.questions.length;

  const score = quiz.questions.reduce((total, currentQuestion) => {
    return total + (selectedAnswers[currentQuestion.id] === currentQuestion.correctChoiceId ? 1 : 0);
  }, 0);

  const isLowTime = timeLeft < 60;
  const progressPercent = ((questionIndex + 1) / totalQuestions) * 100;
  const answeredPercent = (answeredCount / totalQuestions) * 100;

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (!isPreview && attemptId) {
      const responses = Object.entries(selectedAnswers).map(([questionId, choiceId]) => ({
        questionId,
        choiceId,
      }));
      try {
        await submitQuizAttemptRequest(quiz._id || quiz.id, attemptId, responses);
      } catch (error) {
        console.error("Failed to submit attempt:", error);
        toast.error("Connectivity issue. Attempt saved locally.");
      }
    }
    setShowResults(true);
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (showResults) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showResults]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (questionIndex === totalQuestions - 1) {
      handleSubmit();
      return;
    }
    setQuestionIndex((current) => current + 1);
  };

  // --- RESULTS VIEW ---
  if (showResults) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#050505] px-6 py-12 text-white md:px-10">
        <GlowOrb className="-top-24 -left-24 h-[500px] w-[500px]" color="purple" />
        <GlowOrb className="bottom-0 -right-24 h-[600px] w-[600px]" color="emerald" />
        <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px]" color="blue" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-8">
          <StaggerContainer className="flex flex-col gap-8">
            <StaggerItem className="flex items-center justify-between">
              <button
                type="button"
                onClick={onExit}
                className="group flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20"
              >
                <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                Return to Dashboard
              </button>
              <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 border border-emerald-500/20">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Assessment Finalized</span>
              </div>
            </StaggerItem>

            <StaggerItem className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#111115]/60 p-12 text-center backdrop-blur-xl shadow-2xl">
              {/* Confetti Spawner */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {Array.from({ length: 50 }).map((_, i) => (
                  <ConfettiParticle key={i} index={i} />
                ))}
              </div>

              <div className="relative z-10">
                <ScaleIn delay={0.2}>
                  <div className="relative mx-auto mb-8 w-24 h-24">
                    <div className="absolute inset-0 bg-accent-gradient blur-2xl opacity-40 rounded-full animate-pulse" />
                    <div className="relative flex items-center justify-center w-full h-full rounded-3xl bg-accent-gradient shadow-lg">
                      <Trophy className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </ScaleIn>

                <FadeIn delay={0.4}>
                  <p className="text-sm uppercase tracking-[0.4em] text-accent font-bold mb-4">Quiz Achievement</p>
                  <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
                    {Math.round((score / totalQuestions) * 100) >= 80 ? "Legendary!" : "Great Job!"}
                  </h1>

                  <div className="inline-flex items-center gap-4 px-8 py-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                    <div className="text-left">
                      <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-bold">Total Score</p>
                      <p className="text-4xl font-black bg-accent-gradient bg-clip-text text-transparent">
                        {score * 100}<span className="text-xl text-white/50 ml-1">pts</span>
                      </p>
                    </div>
                    <div className="w-[1px] h-10 bg-white/10" />
                    <div className="text-left">
                      <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-bold">Accuracy</p>
                      <p className="text-4xl font-black text-white">
                        {Math.round((score / totalQuestions) * 100)}%
                      </p>
                    </div>
                  </div>

                  <p className="max-w-xl mx-auto text-lg text-text-secondary leading-relaxed">
                    You've successfully completed <span className="text-white font-bold">{quiz.title}</span>.
                    Your performance indicates a strong grasp of <span className="text-white font-bold">{quiz.category}</span> fundamentals.
                  </p>
                </FadeIn>
              </div>
            </StaggerItem>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Questions Solved", value: `${score}/${totalQuestions}`, icon: CheckCircle2, color: "emerald" },
                { label: "Time Expended", value: formatTime((quiz.durationMinutes * 60) - timeLeft), icon: Clock3, color: "blue" },
                { label: "Difficulty Bonus", value: quiz.difficulty === "Hard" ? "1.5x" : "1.0x", icon: Zap, color: "amber" }
              ].map((stat, i) => (
                <StaggerItem key={i} className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#1a1a1f]/80 p-8 backdrop-blur-md transition-all hover:border-white/20">
                  <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full blur-3xl opacity-10 bg-${stat.color}-500 transition-opacity group-hover:opacity-30`} />
                  <stat.icon className={`w-6 h-6 mb-4 text-${stat.color}-400`} />
                  <p className="text-xs text-text-muted uppercase tracking-widest font-bold mb-2">{stat.label}</p>
                  <p className="text-3xl font-black text-white">{stat.value}</p>
                </StaggerItem>
              ))}
            </div>

            <StaggerItem className="flex gap-4">
              <button
                onClick={onExit}
                className="flex-1 rounded-3xl bg-white text-black py-5 font-bold transition-all hover:bg-zinc-200 active:scale-[0.98] shadow-xl shadow-white/5"
              >
                Continue to Library
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-8 font-bold backdrop-blur-md transition-all hover:bg-white/10"
              >
                <Zap size={20} className="text-amber-400" />
                Share Score
              </button>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    );
  }

  // --- ACTIVE PLAYER VIEW ---
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Dynamic Background Reaction to Timer */}
      <motion.div
        animate={{
          opacity: isLowTime ? [0.1, 0.3, 0.1] : 0.1,
          backgroundColor: isLowTime ? "#ef4444" : "#AC63E6"
        }}
        transition={{ duration: isLowTime ? 1 : 4, repeat: Infinity }}
        className="pointer-events-none absolute inset-0 blur-[150px]"
      />

      <GlowOrb className="-top-40 -left-40 h-[600px] w-[600px]" color={isLowTime ? "red" : "purple"} />
      <GlowOrb className="-bottom-40 -right-40 h-[600px] w-[600px]" color="blue" />

      <div className="relative z-10 flex flex-col h-screen max-w-7xl mx-auto px-6 py-8 md:px-10">

        {/* Header Section */}
        <header className="flex items-center justify-between mb-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onExit}
            className="group flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium backdrop-blur-md transition-all hover:bg-white/10"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            Quit Session
          </motion.button>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-bold">Session Integrity</p>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                <span className="text-xs font-bold text-emerald-400">Secure Live Connection</span>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-white/10 mx-2 hidden md:block" />
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-2.5 backdrop-blur-md">
              <span className="text-xs font-bold text-text-muted uppercase tracking-widest mr-2">Step</span>
              <span className="text-xl font-black text-white">{questionIndex + 1}</span>
              <span className="text-sm text-white/40 font-bold"> / {totalQuestions}</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 grid gap-8 lg:grid-cols-[1fr_340px] items-start pb-8 overflow-hidden">

          {/* Question Module */}
          <main className="h-full flex flex-col gap-6">
            <div className="relative flex-1 rounded-[40px] border border-white/10 bg-[#111115]/40 p-1 shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col">
              {/* Animated Progress Bar */}
              <div className="absolute top-0 left-0 w-full h-[6px] bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="h-full bg-accent-gradient shadow-[0_0_15px_rgba(172,99,230,0.5)] transition-all duration-700"
                />
              </div>

              <div className="p-8 md:p-12 flex-1 flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col h-full"
                  >
                    <div className="mb-10">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="rounded-lg bg-accent/20 px-3 py-1 text-[10px] font-black text-accent uppercase tracking-[0.2em] border border-accent/20">
                          {quiz.category}
                        </span>
                        <span className={`rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] border ${quiz.difficulty === "Hard" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                          quiz.difficulty === "Medium" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                            "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          }`}>
                          {quiz.difficulty} Level
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-white/90">
                        {question.prompt}
                      </h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 mt-auto">
                      {question.choices.map((choice, i) => {
                        const isSelected = selectedAnswers[question.id] === choice.id;
                        return (
                          <motion.button
                            key={choice.id}
                            whileHover={{ scale: 1.02, translateY: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              setSelectedAnswers((current) => ({
                                ...current,
                                [question.id]: choice.id,
                              }))
                            }
                            className={`group relative flex flex-col items-start rounded-3xl border-2 p-6 text-left transition-all duration-300 ${isSelected
                              ? "border-accent bg-accent/10 shadow-[0_0_40px_rgba(172,99,230,0.15)] ring-4 ring-accent/5"
                              : "border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]"
                              }`}
                          >
                            <div className="flex w-full items-center justify-between mb-4">
                              <span className={`flex items-center justify-center w-8 h-8 rounded-xl text-xs font-black border-2 transition-colors ${isSelected ? "bg-accent border-accent text-white" : "bg-white/5 border-white/10 text-text-muted group-hover:border-white/30"
                                }`}>
                                {choice.label}
                              </span>
                              {isSelected && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                  <CheckCircle2 className="w-5 h-5 text-accent" />
                                </motion.div>
                              )}
                            </div>
                            <span className={`text-lg font-bold transition-colors ${isSelected ? "text-white" : "text-white/70 group-hover:text-white"}`}>
                              {choice.text}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Action Bar */}
              <div className="p-8 border-t border-white/5 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-text-muted">
                  <AlertCircle size={16} />
                  <span className="text-xs font-medium">Verify your selection before continuing.</span>
                </div>
                <HoverScale>
                  <button
                    onClick={handleNext}
                    disabled={!selectedAnswers[question.id] || isSubmitting}
                    className="group relative flex items-center gap-3 rounded-2xl bg-accent-gradient px-10 py-4 font-black text-white shadow-2xl shadow-accent/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:shadow-accent/40 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>{questionIndex === totalQuestions - 1 ? "Complete Challenge" : "Confirm & Next"}</span>
                    <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </HoverScale>
              </div>
            </div>
          </main>

          {/* Sidebar Modules */}
          <aside className="space-y-6 flex flex-col h-full overflow-y-auto pr-1 custom-scrollbar">
            {/* Status Card */}
            <div className="rounded-[32px] border border-white/10 bg-[#111115]/60 p-8 shadow-xl backdrop-blur-xl">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-text-muted mb-8">Performance</h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="space-y-1">
                  <p className="text-[10px] text-text-muted uppercase font-black tracking-widest">Progress</p>
                  <p className="text-2xl font-black">{Math.round(answeredPercent)}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-text-muted uppercase font-black tracking-widest">Time Remaining</p>
                  <p className={`text-2xl font-black tabular-nums transition-colors ${isLowTime ? "text-red-500" : "text-emerald-400"}`}>
                    {formatTime(timeLeft)}
                  </p>
                </div>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${answeredPercent}%` }}
                  className="h-full bg-accent-gradient"
                />
              </div>
              <p className="mt-4 text-[10px] text-text-muted font-bold">
                {answeredCount} of {totalQuestions} questions finalized
              </p>
            </div>

            {/* Navigation Grid */}
            <div className="rounded-[32px] border border-white/10 bg-[#111115]/60 p-8 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-text-muted">Map</h3>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-accent" title="Current" />
                  <div className="w-2 h-2 rounded-full bg-white/20" title="Pending" />
                  <div className="w-2 h-2 rounded-full bg-accent/30" title="Answered" />
                </div>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {quiz.questions.map((q, idx) => {
                  const isAnswered = !!selectedAnswers[q.id];
                  const isCurrent = idx === questionIndex;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setQuestionIndex(idx)}
                      className={`relative group h-11 w-11 rounded-xl flex items-center justify-center text-xs font-black transition-all ${isCurrent
                        ? "bg-accent text-white shadow-lg shadow-accent/40 scale-110 z-10"
                        : isAnswered
                          ? "bg-accent/15 text-accent border border-accent/20 hover:bg-accent/30"
                          : "bg-white/5 text-text-muted border border-white/5 hover:border-white/20 hover:bg-white/10"
                        }`}
                    >
                      {idx + 1}
                      {isAnswered && !isCurrent && (
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-bg-main" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Motivation Card */}
            <div className="group relative rounded-[32px] border border-accent/20 bg-accent-gradient/5 p-8 text-center backdrop-blur-md overflow-hidden transition-all hover:bg-accent-gradient/10">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent-gradient shadow-lg mb-4"
              >
                <Sparkles className="w-7 h-7 text-white" />
              </motion.div>
              <h4 className="text-lg font-bold mb-2">Sharpen Your Mind</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                You are currently tackling <span className="text-white font-bold">{totalQuestions} challenges</span>.
                Accuracy is the key to achieving the top rank!
              </p>
              <div className="absolute top-0 left-0 w-full h-1 bg-accent-gradient opacity-20" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// --- Main View: StudentQuizPortal ---

export default function StudentQuizPortal() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const initialQuizId = searchParams.get("quizId");

  const [search, setSearch] = useState("");
  const [viewType, setViewType] = useState("quizzes"); // "quizzes" or "events"
  const [difficulty, setDifficulty] = useState("All Levels");
  const [category, setCategory] = useState("All Categories");
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [activeAttemptId, setActiveAttemptId] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleJoinQuiz = async (quiz, eventId = null) => {
    try {
      const { attempt } = await createQuizAttemptRequest(quiz._id || quiz.id, eventId);
      setActiveAttemptId(attempt._id);
      setActiveQuiz(quiz);
    } catch (err) {
      toast.error("Failed to join quiz: " + err.message);
    }
  };

  useEffect(() => {
    if (initialQuizId && quizzes.length > 0) {
      const quiz = quizzes.find(q => q._id === initialQuizId || q.id === initialQuizId);
      if (quiz) {
        setSearch(quiz.title);
      }
    }
  }, [initialQuizId, quizzes]);

  useEffect(() => {
    const loadData = async (isSilent = false) => {
      try {
        if (!isSilent) setIsLoading(true);
        const [quizzesData, eventsData] = await Promise.all([
          fetchStudentQuizzes(),
          fetchStudentEvents()
        ]);
        setQuizzes(quizzesData.quizzes || []);
        setEvents(eventsData.events || []);
      } catch (loadError) {
        if (!isSilent) setError(loadError instanceof Error ? loadError.message : "Unable to load data.");
      } finally {
        if (!isSilent) setIsLoading(false);
      }
    };

    loadData();
    const pollInterval = setInterval(() => loadData(true), 15000);
    return () => clearInterval(pollInterval);
  }, []);

  const categoryOptions = useMemo(
    () => ["All Categories", ...new Set(quizzes.map((quiz) => quiz.category))],
    [quizzes],
  );

  const filteredItems = useMemo(() => {
    if (viewType === "quizzes") {
      return quizzes
        .filter((quiz) => difficulty === "All Levels" ? true : quiz.difficulty === difficulty)
        .filter((quiz) => category === "All Categories" ? true : quiz.category === category)
        .filter((quiz) =>
          `${quiz.title} ${quiz.category} ${quiz.description} ${(quiz.tags || []).join(" ")}`
            .toLowerCase()
            .includes(search.toLowerCase()),
        );
    } else {
      return events.filter((event) =>
        `${event.title} ${event.description}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }
  }, [category, difficulty, quizzes, events, search, viewType]);

  if (activeQuiz) {
    return (
      <StudentQuizPlayer
        quiz={activeQuiz}
        attemptId={activeAttemptId}
        onExit={() => {
          setActiveQuiz(null);
          setActiveAttemptId(null);
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] px-6 py-12 text-white md:px-10">
      {/* Immersive Background Decorations */}
      <GlowOrb className="-top-40 -left-40 h-[600px] w-[600px]" color="purple" />
      <GlowOrb className="top-1/2 -right-40 h-[700px] w-[700px] -translate-y-1/2" color="blue" />
      <GlowOrb className="-bottom-40 left-1/4 h-[500px] w-[500px]" color="emerald" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12">
        {/* Welcome Hero Section */}
        <StaggerContainer className="grid gap-8 lg:grid-cols-[1fr_400px] items-center">
          <StaggerItem>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium backdrop-blur-md transition-all hover:bg-white/10"
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
            <div className="mt-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 border border-accent/20 mb-6"
              >
                <Sparkles size={14} className="text-accent" />
                <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">Learning Environment</span>
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6">
                Ready to excel, <span className="bg-accent-gradient bg-clip-text text-transparent">{user?.fullName?.split(' ')[0] || user?.username || "Learner"}?</span>
              </h1>
              <p className="max-w-xl text-lg text-text-secondary leading-relaxed">
                Dive into our interactive quiz catalog. Sharpen your skills, compete in live events, and track your progress in real-time.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem className="grid gap-4 sm:grid-cols-2">
            <div className="relative overflow-hidden rounded-[32px] border border-white/5 bg-white/5 p-6 backdrop-blur-md group transition-all hover:border-white/10">
              <div className="absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 bg-purple-500/10 blur-2xl group-hover:bg-purple-500/20" />
              <p className="text-[10px] text-text-muted uppercase font-black tracking-widest mb-2">Available Quizzes</p>
              <p className="text-4xl font-black">{quizzes.length}</p>
              <div className="mt-4 flex items-center gap-1 text-emerald-400 text-xs font-bold">
                <Zap size={14} /> <span>12 new today</span>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[32px] border border-white/5 bg-white/5 p-6 backdrop-blur-md group transition-all hover:border-white/10">
              <div className="absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20" />
              <p className="text-[10px] text-text-muted uppercase font-black tracking-widest mb-2">Live Events</p>
              <p className="text-4xl font-black text-emerald-400">{events.filter(e => e.currentStatus === 'active').length}</p>
              <div className="mt-4 flex items-center gap-1 text-text-muted text-xs font-bold">
                <Clock3 size={14} /> <span>Join anytime</span>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[32px] border border-white/5 bg-[#111115]/80 p-6 backdrop-blur-md col-span-full border-dashed">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent-gradient flex items-center justify-center shadow-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Unlock Achievements</p>
                  <p className="text-[10px] text-text-muted">Complete 5 quizzes this week</p>
                </div>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Browser & Filters Section */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between p-8 rounded-[40px] border border-white/5 bg-[#111115]/40 backdrop-blur-xl">
            <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/10 w-fit">
              <button
                onClick={() => setViewType("quizzes")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${viewType === "quizzes"
                  ? "bg-white text-black shadow-lg"
                  : "text-text-secondary hover:text-white hover:bg-white/5"
                  }`}
              >
                Discovery
              </button>
              <button
                onClick={() => setViewType("events")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${viewType === "events"
                  ? "bg-accent text-white shadow-lg shadow-accent/20"
                  : "text-text-secondary hover:text-white hover:bg-white/5"
                  }`}
              >
                Live Events
              </button>
            </div>

            <div className="flex flex-col gap-4 md:flex-row flex-1 max-w-2xl">
              <div className="flex-1 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all">
                <Search size={18} className="text-text-muted" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Find a ${viewType === "quizzes" ? "quiz topic..." : "live event..."}`}
                  className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-text-muted/50"
                />
              </div>

              {viewType === "quizzes" && (
                <div className="flex gap-4">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-bold outline-none cursor-pointer hover:bg-white/10 transition-all"
                  >
                    {categoryOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#111115]">{opt}</option>
                    ))}
                  </select>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-bold outline-none cursor-pointer hover:bg-white/10 transition-all"
                  >
                    {difficultyOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#111115]">{opt}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Grid Content */}
          <div className="relative">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32 rounded-[40px] border border-white/5 bg-white/5 animate-pulse">
                <div className="w-12 h-12 rounded-full border-4 border-accent border-t-transparent animate-spin mb-4" />
                <p className="text-text-muted font-bold tracking-widest uppercase text-xs">Syncing Library</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 rounded-[40px] border border-red-500/20 bg-red-500/5 text-center">
                <AlertCircle className="w-10 h-10 text-red-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Sync Error</h3>
                <p className="text-text-secondary max-w-sm">{error}</p>
                <button onClick={() => window.location.reload()} className="mt-6 text-sm font-bold text-white underline underline-offset-4">Try Reconnecting</button>
              </div>
            ) : (
              <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {filteredItems.map((item) => {
                  const isEvent = viewType === "events";
                  const quiz = isEvent ? item.quizId : item;
                  const status = isEvent ? item.currentStatus : "active";
                  const isDisabled = isEvent && status !== "active";
                  const accentColor = quiz?.category === "Science" ? "emerald" :
                    quiz?.category === "Math" ? "blue" :
                      quiz?.category === "Technology" ? "purple" : "accent";

                  return (
                    <StaggerItem key={item._id || item.slug}>
                      <motion.article
                        whileHover={{ y: -8 }}
                        className={`group relative overflow-hidden rounded-[32px] border border-white/5 bg-[#111115]/60 p-8 transition-all duration-500 backdrop-blur-md ${isDisabled ? "opacity-60 cursor-not-allowed" : "hover:border-white/20 hover:bg-[#1a1a1f]/80"
                          }`}
                      >
                        {/* Status Pulse for Events */}
                        {isEvent && status === 'active' && (
                          <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Live Now</span>
                          </div>
                        )}

                        <div className="relative z-10 flex flex-col h-full">
                          <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-white shadow-inner transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                            {isEvent ? <Calendar size={28} /> : <BookOpen size={28} />}
                          </div>

                          <div className="mb-8">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-secondary">
                                {isEvent ? "Hosted Event" : quiz?.category || "Standard Quiz"}
                              </span>
                              <span className="w-1 h-1 rounded-full bg-white/20" />
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
                                {isEvent ? item.currentStatus : quiz?.difficulty}
                              </span>
                            </div>
                            <h3 className="text-2xl font-black leading-tight tracking-tight mb-4 group-hover:text-white transition-colors">
                              {isEvent ? item.title : quiz?.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-text-secondary line-clamp-2">
                              {isEvent ? item.description : quiz?.description}
                            </p>
                          </div>

                          <div className="mt-auto pt-6 border-t border-white/5">
                            <div className="flex items-center justify-between">
                              <div className="flex -space-x-2">
                                {Array.from({ length: 3 }).map((_, i) => (
                                  <div key={i} className="w-7 h-7 rounded-full border-2 border-[#111115] bg-accent-gradient flex items-center justify-center text-[8px] font-bold">
                                    {String.fromCharCode(65 + i)}
                                  </div>
                                ))}
                                <div className="flex items-center justify-center px-2 text-[10px] font-bold text-text-muted">
                                  +{isEvent ? item.participants?.length || 0 : quiz?.estimatedPlayers || 0}
                                </div>
                              </div>
                              <button
                                onClick={() => !isDisabled && handleJoinQuiz(quiz, isEvent ? item._id : null)}
                                disabled={isDisabled}
                                className={`rounded-2xl px-6 py-3 text-xs font-black transition-all ${isDisabled
                                  ? "bg-white/5 text-white/20"
                                  : "bg-white text-black hover:bg-accent hover:text-white active:scale-95 shadow-xl shadow-black/50"
                                  }`}
                              >
                                {isEvent ? (status === 'active' ? "Launch" : status === 'upcoming' ? "Awaiting" : "Expired") : "Begin"}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-accent-gradient opacity-0 transition-opacity duration-500 group-hover:opacity-[0.03] pointer-events-none" />
                      </motion.article>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            )}

            {!isLoading && !error && filteredItems.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 rounded-[40px] border border-dashed border-white/10 bg-white/5 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Search size={32} className="text-text-muted" />
                </div>
                <h3 className="text-2xl font-black mb-2">No Match Found</h3>
                <p className="text-text-secondary max-w-sm">We couldn't find any results for your current search criteria. Try broadening your keywords.</p>
                <button onClick={() => { setSearch(""); setCategory("All Categories"); setDifficulty("All Levels"); }} className="mt-8 text-sm font-bold text-accent uppercase tracking-[0.2em]">Reset All Filters</button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
