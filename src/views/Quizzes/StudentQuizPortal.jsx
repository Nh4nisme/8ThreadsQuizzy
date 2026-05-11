"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
import { fetchStudentQuizzes } from "../../lib/quiz-client.js";

const difficultyOptions = ["All Levels", "Easy", "Medium", "Hard"];

function StudentQuizPlayer({ quiz, onExit }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const question = quiz.questions[questionIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const score = quiz.questions.reduce((total, currentQuestion) => {
    return total + (selectedAnswers[currentQuestion.id] === currentQuestion.correctChoiceId ? 1 : 0);
  }, 0);

  const handleNext = () => {
    if (questionIndex === quiz.questions.length - 1) {
      setShowResults(true);
      return;
    }

    setQuestionIndex((current) => current + 1);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-black px-6 py-10 text-white md:px-10">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 rounded-2xl border border-white/10 bg-[#121214] p-8">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onExit}
              className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
            >
              <ArrowLeft size={16} />
              Back to quizzes
            </button>
            <span className="rounded-full bg-purple-500/15 px-4 py-2 text-sm text-purple-200">
              Completed
            </span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-purple-500/15 to-orange-500/10 p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-purple-300">Quiz Summary</p>
            <h1 className="mt-4 text-3xl font-semibold">{quiz.title}</h1>
            <p className="mt-3 text-zinc-300">
              You answered {score} out of {quiz.questions.length} questions correctly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-6 py-10 text-white md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onExit}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
          >
            <ArrowLeft size={16} />
            Leave quiz
          </button>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
            Question {questionIndex + 1} of {quiz.questions.length}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-2xl border border-white/10 bg-[#121214] p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-purple-300">{quiz.category}</p>
                <h1 className="mt-3 text-3xl font-semibold">{quiz.title}</h1>
              </div>
              <span className="rounded-full bg-orange-500/15 px-4 py-2 text-sm text-orange-200">
                {quiz.difficulty}
              </span>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-6">
              <p className="text-sm text-zinc-400">Prompt</p>
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
                    className={`rounded-2xl border p-5 text-left transition ${
                      isSelected
                        ? "border-purple-400 bg-purple-500/15 text-white"
                        : "border-white/10 bg-[#17171a] text-zinc-200 hover:border-white/25"
                    }`}
                  >
                    <span className="block text-xs uppercase tracking-[0.2em] text-zinc-500">
                      {choice.label}
                    </span>
                    <span className="mt-2 block text-base">{choice.text}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                disabled={!selectedAnswers[question.id]}
                className="rounded-xl bg-gradient-to-r from-purple-500 to-orange-500 px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {questionIndex === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121214] p-6">
            <h3 className="text-lg font-semibold">Session Summary</h3>
            <div className="mt-5 space-y-4">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm text-zinc-400">Answered</p>
                <p className="mt-2 text-2xl font-semibold">{answeredCount}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm text-zinc-400">Estimated time</p>
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
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All Levels");
  const [category, setCategory] = useState("All Categories");
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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
    return <StudentQuizPlayer quiz={activeQuiz} onExit={() => setActiveQuiz(null)} />;
  }

  return (
    <div className="min-h-screen bg-black px-6 py-8 text-white md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <section className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(196,80,55,0.16),transparent_26%),#121214] p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/5"
              >
                <ArrowLeft size={16} />
                Back to home
              </Link>
              <p className="mt-6 text-sm uppercase tracking-[0.2em] text-purple-300">Student Space</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight">
                Hello {user?.fullName || user?.username || "student"}, pick a quiz and start playing.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">
                Search instantly, filter by subject or difficulty, and join active quizzes without stepping into the teacher dashboard flow.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm text-zinc-400">Available quizzes</p>
                <p className="mt-2 text-2xl font-semibold">{quizzes.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm text-zinc-400">Popular level</p>
                <p className="mt-2 text-2xl font-semibold">Mixed</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm text-zinc-400">Live challenge</p>
                <p className="mt-2 text-2xl font-semibold">Ready</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#121214] p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Quiz Library</h2>
              <p className="mt-2 text-zinc-400">
                Results update as you type or switch filters.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <div className="flex min-w-[260px] items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                <Search size={18} className="text-zinc-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by title or subject"
                  className="m-0 w-full border-none bg-transparent p-0 text-sm text-white outline-none"
                />
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-300">
                <Filter size={16} className="text-zinc-500" />
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="m-0 border-none bg-transparent p-0 text-sm text-white outline-none"
                >
                  {categoryOptions.map((option) => (
                    <option key={option} value={option} className="bg-[#121214]">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-300">
                <Sparkles size={16} className="text-zinc-500" />
                <select
                  value={difficulty}
                  onChange={(event) => setDifficulty(event.target.value)}
                  className="m-0 border-none bg-transparent p-0 text-sm text-white outline-none"
                >
                  {difficultyOptions.map((option) => (
                    <option key={option} value={option} className="bg-[#121214]">
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
                  className="rounded-2xl border border-white/10 bg-black/20 p-6 transition hover:border-purple-400/70"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                          <BookOpen size={22} />
                        </div>
                        <div>
                          <p className="text-sm text-zinc-400">{quiz.category}</p>
                          <h3 className="text-xl font-semibold">{quiz.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-zinc-400">{quiz.description}</p>
                        </div>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-3 text-sm text-zinc-300">
                        <span className="rounded-full border border-white/10 px-3 py-1">{quiz.difficulty}</span>
                        <span className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
                          <Clock3 size={14} />
                          {quiz.durationMinutes} min
                        </span>
                        <span className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
                          <Users size={14} />
                          {quiz.estimatedPlayers || 0} players
                        </span>
                        <span className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
                          <Trophy size={14} />
                          {quiz.questions.length} questions
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveQuiz(quiz)}
                      className="rounded-xl bg-gradient-to-r from-purple-500 to-orange-500 px-4 py-2 text-sm font-medium text-white"
                    >
                      Join now
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          {!isLoading && !error && filteredQuizzes.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-black/10 px-6 py-14 text-center">
              <h3 className="text-xl font-semibold">No quizzes matched that filter</h3>
              <p className="mt-3 text-zinc-400">
                Try another keyword, difficulty level, or subject.
              </p>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
