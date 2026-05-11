"use client";

import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4">
      <p className="text-sm text-zinc-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
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
      <div className="min-h-screen bg-black px-6 py-10 text-white md:px-10">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 rounded-2xl border border-white/10 bg-[#121214] p-8">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onExit}
              className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <span className="rounded-full bg-purple-500/15 px-4 py-2 text-sm text-purple-200">
              {mode === "preview" ? "Preview Complete" : "Completed"}
            </span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-purple-500/15 to-orange-500/10 p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-purple-300">Quiz Summary</p>
            <h1 className="mt-4 text-3xl font-semibold">{quiz.title}</h1>
            <p className="mt-3 text-zinc-300">
              You answered {finalScore}% on this run across {quiz.questions.length} questions.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <SummaryCard label="Accuracy" value={`${finalScore}%`} />
              <SummaryCard label="Answered" value={answeredCount} />
              <SummaryCard label="Level" value={quiz.difficulty} />
            </div>
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
            {mode === "preview" ? "Back to detail" : "Leave quiz"}
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
                disabled={!responses[question.id] || isSubmitting}
                className="rounded-xl bg-gradient-to-r from-purple-500 to-orange-500 px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
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

          <div className="rounded-2xl border border-white/10 bg-[#121214] p-6">
            <h3 className="text-lg font-semibold">Session Summary</h3>
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
