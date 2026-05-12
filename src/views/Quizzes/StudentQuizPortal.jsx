"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  fetchStudentQuizzes,
  fetchStudentEvents,
  createQuizAttemptRequest,
  submitQuizAttemptRequest
} from "../../lib/quiz-client.js";
import { toast } from "../../components/ui/Toast.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, HoverScale, ScaleIn } from "../../components/ui/Motion.jsx";

const difficultyOptions = ["All Levels", "Easy", "Medium", "Hard"];

export function StudentQuizPlayer({ quiz, attemptId, onExit, onComplete, isPreview = false }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState((quiz.durationMinutes || 10) * 60);

  const question = quiz.questions[questionIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const score = quiz.questions.reduce((total, currentQuestion) => {
    return total + (selectedAnswers[currentQuestion.id] === currentQuestion.correctChoiceId ? 1 : 0);
  }, 0);

  const handleSubmit = async () => {
    if (!isPreview && attemptId) {
      const responses = Object.entries(selectedAnswers).map(([questionId, choiceId]) => ({
        questionId,
        choiceId,
      }));
      try {
        await submitQuizAttemptRequest(quiz._id || quiz.id, attemptId, responses);
      } catch (error) {
        console.error("Failed to submit attempt:", error);
      }
    }
    setShowResults(true);
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

  const handleNext = async () => {
    if (questionIndex === quiz.questions.length - 1) {
      await handleSubmit();
      return;
    }
    setQuestionIndex((current) => current + 1);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-bg-main px-6 py-10 text-text-main md:px-10 overflow-hidden">
        <StaggerContainer className="mx-auto flex max-w-4xl flex-col gap-6">
          <StaggerItem className="flex items-center justify-between">
            <button
              type="button"
              onClick={onExit}
              className="flex items-center gap-2 rounded-xl border border-border-main px-4 py-2 text-sm hover:bg-bg-secondary transition-colors"
            >
              <ArrowLeft size={16} />
              Back to quizzes
            </button>
            <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm text-green-400 font-bold">
              Completed
            </span>
          </StaggerItem>

          <StaggerItem className="rounded-3xl border border-border-main bg-accent-gradient/10 p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-accent-gradient" />
            <ScaleIn delay={0.3}>
              <Trophy className="w-16 h-16 text-accent mx-auto mb-6" />
            </ScaleIn>
            <FadeIn delay={0.5}>
              <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold">Quiz Summary</p>
              <h1 className="mt-4 text-4xl font-bold">{quiz.title}</h1>
              <p className="mt-6 text-xl text-text-secondary leading-relaxed">
                Excellent work! You answered <span className="text-white font-bold">{score}</span> out of <span className="text-white font-bold">{quiz.questions.length}</span> questions correctly.
              </p>
            </FadeIn>
          </StaggerItem>

          <StaggerItem className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Accuracy", value: `${Math.round((score / quiz.questions.length) * 100)}%` },
              { label: "Questions", value: quiz.questions.length },
              { label: "Correct", value: score },
              { label: "Points", value: score * 100 }
            ].map((stat, i) => (
              <div key={i} className="bg-bg-card border border-border-main p-6 rounded-2xl text-center">
                <p className="text-xs text-text-muted uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </StaggerItem>
        </StaggerContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-main px-6 py-10 text-text-main md:px-10 overflow-hidden">
      <StaggerContainer className="mx-auto flex max-w-6xl flex-col gap-6">
        <StaggerItem className="flex items-center justify-between">
          <button
            type="button"
            onClick={onExit}
            className="flex items-center gap-2 rounded-xl border border-border-main px-4 py-2 text-sm hover:bg-bg-secondary transition-colors"
          >
            <ArrowLeft size={16} />
            Leave quiz
          </button>
          <div className="rounded-full border border-border-main bg-bg-secondary px-6 py-2 text-sm text-text-secondary font-medium">
            Question <span className="text-white">{questionIndex + 1}</span> of <span className="text-white">{quiz.questions.length}</span>
          </div>
        </StaggerItem>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <StaggerItem className="rounded-3xl border border-border-main bg-bg-card p-1 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 bg-accent-gradient transition-all duration-500" style={{ width: `${((questionIndex + 1) / quiz.questions.length) * 100}%` }} />
            <div className="p-10">
              <div className="flex items-start justify-between gap-4 mb-10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2">{quiz.category}</p>
                  <h1 className="text-3xl font-bold tracking-tight">{quiz.title}</h1>
                </div>
                <span className="rounded-xl bg-accent-secondary/10 px-4 py-2 text-xs font-bold text-accent-secondary border border-accent-secondary/20">
                  {quiz.difficulty}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="rounded-2xl border border-border-main bg-bg-input p-8 mb-8">
                    <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">Question Prompt</p>
                    <h2 className="text-2xl font-semibold leading-relaxed tracking-tight">{question.prompt}</h2>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {question.choices.map((choice) => {
                      const isSelected = selectedAnswers[question.id] === choice.id;
                      return (
                        <button
                          key={choice.id}
                          type="button"
                          onClick={() =>
                            setSelectedAnswers((current) => ({
                              ...current,
                              [question.id]: choice.id,
                            }))
                          }
                          className={`rounded-2xl border-2 p-6 text-left transition-all duration-300 group relative overflow-hidden ${isSelected
                              ? "border-accent bg-accent/10 shadow-[0_0_30px_rgba(124,58,237,0.1)]"
                              : "border-border-main bg-bg-secondary hover:border-accent/40 hover:bg-bg-tertiary"
                            }`}
                        >
                          {isSelected && <motion.div layoutId="choice-bg" className="absolute inset-0 bg-accent-gradient opacity-[0.03]" />}
                          <span className={`block text-[10px] font-bold uppercase tracking-[0.3em] transition-colors ${isSelected ? "text-accent" : "text-text-muted"}`}>
                            {choice.label}
                          </span>
                          <span className={`mt-3 block text-lg font-semibold transition-colors ${isSelected ? "text-white" : "text-text-secondary"}`}>{choice.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 flex justify-end">
                <HoverScale>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!selectedAnswers[question.id]}
                    className="rounded-2xl bg-accent-gradient px-12 py-4 font-bold text-white shadow-xl shadow-accent/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:shadow-accent/40"
                  >
                    {questionIndex === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
                  </button>
                </HoverScale>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem className="space-y-6">
            <div className="rounded-3xl border border-border-main bg-bg-card p-8 shadow-sm">
              <h3 className="text-lg font-bold mb-6">Session Status</h3>
              <div className="space-y-4">
                <div className="rounded-2xl border border-border-main bg-bg-input p-5">
                  <p className="text-xs text-text-muted uppercase tracking-widest font-bold mb-2">Answered</p>
                  <p className="text-3xl font-bold text-white">{answeredCount} <span className="text-lg text-zinc-600 font-normal">/ {quiz.questions.length}</span></p>
                </div>
                <div className="rounded-2xl border border-border-main bg-bg-input p-5">
                  <p className="text-xs text-text-muted uppercase tracking-widest font-bold mb-2">Time Left</p>
                  <p className={`text-3xl font-bold ${timeLeft < 60 ? "text-red-500 animate-pulse" : "text-accent"}`}>
                    {formatTime(timeLeft)}
                  </p>
                </div>
              </div>
            </div>

            <FadeIn delay={0.5} className="rounded-3xl border border-border-main bg-accent-gradient/5 p-8 text-center border-dashed">
              <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
              <p className="text-sm text-text-secondary">Keep going! You're doing great on this {quiz.category} quiz.</p>
            </FadeIn>
          </StaggerItem>
        </div>
      </StaggerContainer>
    </div>
  );
}

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

    // Set up polling for real-time updates (new events or status changes)
    const pollInterval = setInterval(() => {
      loadData(true); // Silent update
    }, 10000); // Every 10 seconds

    return () => clearInterval(pollInterval);
  }, []);

  const categoryOptions = useMemo(
    () => ["All Categories", ...new Set(quizzes.map((quiz) => quiz.category))],
    [quizzes],
  );

  const filteredItems = useMemo(() => {
    if (viewType === "quizzes") {
      return quizzes
        .filter((quiz) =>
          difficulty === "All Levels" ? true : quiz.difficulty === difficulty,
        )
        .filter((quiz) =>
          category === "All Categories" ? true : quiz.category === category,
        )
        .filter((quiz) =>
          `${quiz.title} ${quiz.category} ${quiz.description} ${(quiz.tags || []).join(" ")}`
            .toLowerCase()
            .includes(search.toLowerCase()),
        );
    } else {
      return events
        .filter((event) =>
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
    <div className="min-h-screen bg-bg-main px-6 py-8 text-text-main md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <section className="rounded-3xl border border-border-main bg-bg-card p-8 shadow-sm">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-border-main px-4 py-2 text-sm text-text-secondary transition hover:bg-bg-secondary"
              >
                <ArrowLeft size={16} />
                Back to home
              </Link>
              <p className="mt-6 text-sm uppercase tracking-[0.2em] text-accent">Student Space</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight">
                Hello {user?.fullName || user?.username || "student"}, pick a quiz and start playing.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
                Search instantly, filter by subject or difficulty, and join active quizzes without stepping into the teacher dashboard flow.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border-main bg-bg-input p-4">
                <p className="text-sm text-text-muted">Available quizzes</p>
                <p className="mt-2 text-2xl font-semibold">{quizzes.length}</p>
              </div>
              <div className="rounded-2xl border border-border-main bg-bg-input p-4">
                <p className="text-sm text-text-muted">Popular level</p>
                <p className="mt-2 text-2xl font-semibold">Mixed</p>
              </div>
              <div className="rounded-2xl border border-border-main bg-bg-input p-4">
                <p className="text-sm text-text-muted">Live challenge</p>
                <p className="mt-2 text-2xl font-semibold text-accent">Ready</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-border-main bg-bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Quiz Library</h2>
              <div className="flex items-center gap-1 mt-4 p-1 bg-bg-input rounded-xl border border-border-main w-fit">
                <button
                  onClick={() => setViewType("quizzes")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewType === "quizzes"
                      ? "bg-accent text-text-on-accent shadow-md shadow-accent/20"
                      : "text-text-secondary hover:text-text-main hover:bg-bg-tertiary"
                    }`}
                >
                  Standard Quizzes
                </button>
                <button
                  onClick={() => setViewType("events")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewType === "events"
                      ? "bg-accent text-text-on-accent shadow-md shadow-accent/20"
                      : "text-text-secondary hover:text-text-main hover:bg-bg-tertiary"
                    }`}
                >
                  Events & Exams
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <div className="flex min-w-[260px] items-center gap-3 rounded-xl border border-border-main bg-bg-input px-4 py-3 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all">
                <Search size={18} className="text-text-muted" />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={`Search ${viewType}...`}
                  className="m-0 w-full border-none bg-transparent p-0 text-sm text-text-main outline-none"
                />
              </div>

              {viewType === "quizzes" && (
                <>
                  <div className="flex items-center gap-3 rounded-xl border border-border-main bg-bg-input px-4 py-3 text-sm text-text-secondary transition-all hover:bg-bg-tertiary">
                    <Filter size={16} className="text-text-muted" />
                    <select
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      className="m-0 border-none bg-transparent p-0 text-sm text-text-main outline-none cursor-pointer"
                    >
                      {categoryOptions.map((option) => (
                        <option key={option} value={option} className="bg-bg-card">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-border-main bg-bg-input px-4 py-3 text-sm text-text-secondary transition-all hover:bg-bg-tertiary">
                    <Sparkles size={16} className="text-text-muted" />
                    <select
                      value={difficulty}
                      onChange={(event) => setDifficulty(event.target.value)}
                      className="m-0 border-none bg-transparent p-0 text-sm text-text-main outline-none cursor-pointer"
                    >
                      {difficultyOptions.map((option) => (
                        <option key={option} value={option} className="bg-bg-card">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="mt-8 rounded-2xl border border-white/10 bg-black/10 px-6 py-14 text-center text-zinc-400">
              Loading quizzes...
            </div>
          ) : null}

          {error ? (
            <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-6 text-center text-red-200">
              {error}
            </div>
          ) : null}

          {!isLoading && !error ? (
            <div className="mt-8 grid gap-5 xl:grid-cols-2">
              {filteredItems.map((item) => {
                const isEvent = viewType === "events";
                const quiz = isEvent ? item.quizId : item;
                const status = isEvent ? item.currentStatus : "active";
                const isDisabled = isEvent && status !== "active";

                return (
                  <article
                    key={item._id || item.slug}
                    className={`rounded-2xl border border-border-main bg-bg-secondary p-6 transition-all duration-300 group ${isDisabled ? "opacity-60" : "hover:border-accent hover:bg-bg-tertiary hover:shadow-lg hover:shadow-accent/5"
                      }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent ${!isDisabled && "group-hover:scale-110"} transition-transform`}>
                            {isEvent ? <Calendar size={22} /> : <BookOpen size={22} />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm text-text-muted">{quiz?.category || "Event"}</p>
                              {isEvent && (
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${status === 'active' ? 'bg-green-500/20 text-green-400' :
                                    status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
                                  }`}>
                                  {status}
                                </span>
                              )}
                            </div>
                            <h3 className={`text-xl font-semibold ${!isDisabled && "group-hover:text-accent"} transition-colors line-clamp-1`}>
                              {isEvent ? item.title : quiz.title}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-text-muted line-clamp-2">
                              {isEvent ? item.description : quiz.description}
                            </p>
                          </div>
                        </div>
                        <div className="mt-5 flex flex-wrap gap-3 text-sm text-text-secondary">
                          {isEvent ? (
                            <>
                              <span className="flex items-center gap-2 rounded-full border border-border-main bg-bg-input px-3 py-1">
                                <Clock3 size={14} />
                                {isMounted ? (
                                  <>
                                    {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                                    {new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </>
                                ) : "Loading time..."}
                              </span>
                              <span className="rounded-full border border-border-main bg-bg-input px-3 py-1">
                                {isMounted ? new Date(item.startTime).toLocaleDateString() : "Loading date..."}
                              </span>
                            </>
                          ) : (
                            <span className="rounded-full border border-border-main bg-bg-input px-3 py-1">{quiz.difficulty}</span>
                          )}
                          <span className="flex items-center gap-2 rounded-full border border-border-main bg-bg-input px-3 py-1">
                            <Users size={14} />
                            {isEvent ? item.participants?.length || 0 : quiz.estimatedPlayers || 0} {isEvent ? "joined" : "players"}
                          </span>
                          <span className="flex items-center gap-2 rounded-full border border-border-main bg-bg-input px-3 py-1">
                            <Trophy size={14} />
                            {quiz?.questions?.length || 0} questions
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => !isDisabled && handleJoinQuiz(quiz, isEvent ? item._id : null)}
                        disabled={isDisabled}
                        className={`rounded-xl px-6 py-2.5 text-sm font-semibold transition-all whitespace-nowrap ${isDisabled
                            ? "bg-bg-tertiary text-text-muted cursor-not-allowed border border-border-main"
                            : "bg-accent-gradient text-text-on-accent shadow-lg shadow-accent/20 hover:opacity-90"
                          }`}
                      >
                        {isEvent ? (status === 'active' ? "Start now" : status === 'upcoming' ? "Wait..." : "Ended") : "Join now"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : null}

          {!isLoading && !error && filteredItems.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-border-main bg-bg-input px-6 py-14 text-center">
              <h3 className="text-xl font-semibold">No {viewType} matched that filter</h3>
              <p className="mt-3 text-text-muted">
                Try another keyword or check back later.
              </p>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
