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
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { 
  fetchStudentQuizzes, 
  createQuizAttemptRequest, 
  submitQuizAttemptRequest 
} from "../../lib/quiz-client.js";

const difficultyOptions = ["All Levels", "Easy", "Medium", "Hard"];

export function StudentQuizPlayer({ quiz, attemptId, onExit, onComplete, isPreview = false }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const question = quiz.questions[questionIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const score = quiz.questions.reduce((total, currentQuestion) => {
    return total + (selectedAnswers[currentQuestion.id] === currentQuestion.correctChoiceId ? 1 : 0);
  }, 0);

  const handleNext = async () => {
    if (questionIndex === quiz.questions.length - 1) {
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
      return;
    }

    setQuestionIndex((current) => current + 1);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-bg-main px-6 py-10 text-text-main md:px-10">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 rounded-2xl border border-border-main bg-bg-card p-8">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onExit}
              className="flex items-center gap-2 rounded-xl border border-border-main px-4 py-2 text-sm hover:bg-bg-secondary"
            >
              <ArrowLeft size={16} />
              Back to quizzes
            </button>
            <span className="rounded-full bg-accent/15 px-4 py-2 text-sm text-accent">
              Completed
            </span>
          </div>

          <div className="rounded-2xl border border-border-main bg-accent-gradient/10 p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-accent">Quiz Summary</p>
            <h1 className="mt-4 text-3xl font-semibold">{quiz.title}</h1>
            <p className="mt-3 text-text-secondary">
              You answered {score} out of {quiz.questions.length} questions correctly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-main px-6 py-10 text-text-main md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onExit}
            className="flex items-center gap-2 rounded-xl border border-border-main px-4 py-2 text-sm hover:bg-bg-secondary"
          >
            <ArrowLeft size={16} />
            Leave quiz
          </button>
          <div className="rounded-full border border-border-main bg-bg-secondary px-4 py-2 text-sm text-text-secondary">
            Question {questionIndex + 1} of {quiz.questions.length}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-2xl border border-border-main bg-bg-card p-8 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-accent">{quiz.category}</p>
                <h1 className="mt-3 text-3xl font-semibold">{quiz.title}</h1>
              </div>
              <span className="rounded-full bg-accent-secondary/15 px-4 py-2 text-sm text-accent-secondary">
                {quiz.difficulty}
              </span>
            </div>

            <div className="mt-8 rounded-2xl border border-border-main bg-bg-input p-6">
              <p className="text-sm text-text-muted">Prompt</p>
              <h2 className="mt-3 text-2xl font-medium leading-9">{question.prompt}</h2>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
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
                    className={`rounded-2xl border p-5 text-left transition duration-200 ${
                      isSelected
                        ? "border-accent bg-accent/10 text-text-main shadow-[0_0_15px_var(--accent-glow)]"
                        : "border-border-main bg-bg-secondary text-text-secondary hover:border-accent/50 hover:bg-bg-tertiary"
                    }`}
                  >
                    <span className="block text-xs uppercase tracking-[0.2em] text-text-muted">
                      {choice.label}
                    </span>
                    <span className="mt-2 block text-base font-medium">{choice.text}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                disabled={!selectedAnswers[question.id]}
                className="rounded-xl bg-accent-gradient px-8 py-3 font-semibold text-text-on-accent transition-all hover:opacity-90 shadow-lg shadow-accent/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {questionIndex === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-border-main bg-bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Session Summary</h3>
            <div className="mt-5 space-y-4">
              <div className="rounded-xl border border-border-main bg-bg-input p-4">
                <p className="text-sm text-text-muted">Answered</p>
                <p className="mt-2 text-2xl font-semibold">{answeredCount}</p>
              </div>
              <div className="rounded-xl border border-border-main bg-bg-input p-4">
                <p className="text-sm text-text-muted">Estimated time</p>
                <p className="mt-2 text-2xl font-semibold">{quiz.durationMinutes} min</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentQuizPortal() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const initialQuizId = searchParams.get("quizId");
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All Levels");
  const [category, setCategory] = useState("All Categories");
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [activeAttemptId, setActiveAttemptId] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const handleJoinQuiz = async (quiz) => {
    try {
      const { attempt } = await createQuizAttemptRequest(quiz._id || quiz.id);
      setActiveAttemptId(attempt._id);
      setActiveQuiz(quiz);
    } catch (err) {
      alert("Failed to join quiz: " + err.message);
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
    const loadQuizzes = async () => {
      try {
        const data = await fetchStudentQuizzes();
        setQuizzes(data.quizzes || []);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load quizzes.");
      } finally {
        setIsLoading(false);
      }
    };

    loadQuizzes();
  }, []);

  const categoryOptions = useMemo(
    () => ["All Categories", ...new Set(quizzes.map((quiz) => quiz.category))],
    [quizzes],
  );

  const filteredQuizzes = useMemo(() => {
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
  }, [category, difficulty, quizzes, search]);

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
              <p className="mt-2 text-text-muted">
                Results update as you type or switch filters.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <div className="flex min-w-[260px] items-center gap-3 rounded-xl border border-border-main bg-bg-input px-4 py-3 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all">
                <Search size={18} className="text-text-muted" />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by title or subject"
                  className="m-0 w-full border-none bg-transparent p-0 text-sm text-text-main outline-none"
                />
              </div>

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
              {filteredQuizzes.map((quiz) => (
                <article
                  key={quiz._id || quiz.slug}
                  className="rounded-2xl border border-border-main bg-bg-secondary p-6 transition-all duration-300 hover:border-accent hover:bg-bg-tertiary hover:shadow-lg hover:shadow-accent/5 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent group-hover:scale-110 transition-transform">
                          <BookOpen size={22} />
                        </div>
                        <div>
                          <p className="text-sm text-text-muted">{quiz.category}</p>
                          <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">{quiz.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-text-muted">{quiz.description}</p>
                        </div>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-3 text-sm text-text-secondary">
                        <span className="rounded-full border border-border-main bg-bg-input px-3 py-1">{quiz.difficulty}</span>
                        <span className="flex items-center gap-2 rounded-full border border-border-main bg-bg-input px-3 py-1">
                          <Clock3 size={14} />
                          {quiz.durationMinutes} min
                        </span>
                        <span className="flex items-center gap-2 rounded-full border border-border-main bg-bg-input px-3 py-1">
                          <Users size={14} />
                          {quiz.estimatedPlayers || 0} players
                        </span>
                        <span className="flex items-center gap-2 rounded-full border border-border-main bg-bg-input px-3 py-1">
                          <Trophy size={14} />
                          {quiz.questions.length} questions
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleJoinQuiz(quiz)}
                      className="rounded-xl bg-accent-gradient px-6 py-2.5 text-sm font-semibold text-text-on-accent shadow-lg shadow-accent/20 hover:opacity-90 transition-opacity whitespace-nowrap"
                    >
                      Join now
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          {!isLoading && !error && filteredQuizzes.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-border-main bg-bg-input px-6 py-14 text-center">
              <h3 className="text-xl font-semibold">No quizzes matched that filter</h3>
              <p className="mt-3 text-text-muted">
                Try another keyword, difficulty level, or subject.
              </p>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
