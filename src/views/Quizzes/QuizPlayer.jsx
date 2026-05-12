"use client";

import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-3 md:p-4">
      <p className="text-[10px] md:text-sm font-black uppercase tracking-widest text-zinc-400">{label}</p>
      <p className="mt-1 md:mt-2 text-xl md:text-2xl font-black">{value}</p>
    </div>
  );
}

export default function QuizPlayer({
  quiz,
  mode = "student",
  onExit,
  onSubmitAttempt,
}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [submittedAttempt, setSubmittedAttempt] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = quiz.questions[questionIndex];
  const answeredCount = Object.keys(responses).length;

  const previewScore = useMemo(() => {
    let correctAnswers = 0;

    for (const quizQuestion of quiz.questions) {
      if (responses[quizQuestion.id] === quizQuestion.correctChoiceId) {
        correctAnswers += 1;
      }
    }

    return quiz.questions.length
      ? Math.round((correctAnswers / quiz.questions.length) * 100)
      : 0;
  }, [quiz.questions, responses]);

  const handleNext = async () => {
    if (questionIndex === quiz.questions.length - 1) {
      if (mode === "student" && onSubmitAttempt) {
        setIsSubmitting(true);
        const attempt = await onSubmitAttempt(
          Object.entries(responses).map(([questionId, choiceId]) => ({
            questionId,
            choiceId,
          })),
        );
        setSubmittedAttempt(attempt);
        setIsSubmitting(false);
      }

      setShowResults(true);
      return;
    }

    setQuestionIndex((current) => current + 1);
  };

  const finalScore = submittedAttempt?.score ?? previewScore;

  if (showResults) {
    return (
      <div className="min-h-screen bg-black px-4 md:px-10 py-6 md:py-10 text-white">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 rounded-3xl border border-white/10 bg-[#121214] p-6 md:p-8">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onExit}
              className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back</span>
            </button>
            <span className="rounded-full bg-accent/15 px-4 py-2 text-[10px] md:text-sm font-black uppercase tracking-widest text-accent">
              {mode === "preview" ? "Preview Complete" : "Completed"}
            </span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-accent/10 to-orange-500/5 p-6 md:p-8">
            <p className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] text-accent">Quiz Summary</p>
            <h1 className="mt-4 text-2xl md:text-3xl font-black">{quiz.title}</h1>
            <p className="mt-3 text-zinc-400 text-sm md:text-base font-medium">
              You answered {finalScore}% on this run across {quiz.questions.length} questions.
            </p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              <SummaryCard label="Accuracy" value={`${finalScore}%`} />
              <SummaryCard label="Answered" value={answeredCount} />
              <div className="col-span-2 md:col-span-1">
                <SummaryCard label="Level" value={quiz.difficulty} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 md:px-10 py-6 md:py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onExit}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-xs md:text-sm hover:bg-white/5 transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">{mode === "preview" ? "Back to detail" : "Leave quiz"}</span>
            <span className="sm:hidden">Exit</span>
          </button>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] md:text-sm font-black uppercase tracking-widest text-zinc-400">
            Q{questionIndex + 1} <span className="text-zinc-600">/</span> {quiz.questions.length}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-3xl border border-white/10 bg-[#121214] p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] text-accent">{quiz.category}</p>
                <h1 className="mt-3 text-2xl md:text-3xl font-black">{quiz.title}</h1>
              </div>
              <span className="shrink-0 rounded-full bg-orange-500/15 px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs font-black uppercase tracking-widest text-orange-400">
                {quiz.difficulty}
              </span>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5 md:p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">Prompt</p>
              <h2 className="text-lg md:text-2xl font-bold leading-relaxed">{question.prompt}</h2>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {question.choices.map((choice) => {
                const isSelected = responses[question.id] === choice.id;

                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() =>
                      setResponses((current) => ({
                        ...current,
                        [question.id]: choice.id,
                      }))
                    }
                    className={`rounded-2xl border p-4 md:p-5 text-left transition-all duration-300 ${
                      isSelected
                        ? "border-accent bg-accent/15 text-white shadow-lg shadow-accent/5"
                        : "border-white/10 bg-[#17171a] text-zinc-400 hover:border-white/25"
                    }`}
                  >
                    <span className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                      {choice.label}
                    </span>
                    <span className="mt-1.5 block text-sm md:text-base font-bold">{choice.text}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                disabled={!responses[question.id] || isSubmitting}
                className="w-full sm:w-auto rounded-xl bg-accent-gradient px-8 py-3.5 font-black text-sm text-white shadow-xl shadow-accent/20 transition-all hover:shadow-accent/40 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting
                  ? "Submitting..."
                  : questionIndex === quiz.questions.length - 1
                    ? mode === "preview"
                      ? "Finish Preview"
                      : "Finish Quiz"
                    : "Next Question"}
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#121214] p-6">
            <h3 className="text-sm md:text-lg font-black uppercase tracking-widest text-white">Session Summary</h3>
            <div className="mt-5 space-y-4">
              <SummaryCard label="Answered" value={answeredCount} />
              <SummaryCard label="Estimated time" value={`${quiz.durationMinutes} min`} />
              <SummaryCard label="Mode" value={mode === "preview" ? "Preview" : "Live"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
