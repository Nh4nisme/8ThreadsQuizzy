"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, Plus, Trash2 } from "lucide-react";
import {
  createQuizRequest,
  fetchQuizDetail,
  updateQuizRequest,
} from "../../lib/quiz-client.js";

const categoryOptions = ["Science", "Mathematics", "History", "Language", "Technology"];
const difficultyOptions = ["Easy", "Medium", "Hard"];

const createChoice = (questionIndex, choiceIndex) => ({
  id: `q${questionIndex + 1}-choice-${choiceIndex + 1}`,
  label: String.fromCharCode(65 + choiceIndex),
  text: "",
});

const createQuestion = (questionIndex) => ({
  id: `question-${questionIndex + 1}`,
  order: questionIndex + 1,
  prompt: "",
  points: 100,
  type: "multiple_choice",
  explanation: "",
  choices: Array.from({ length: 4 }, (_, choiceIndex) => createChoice(questionIndex, choiceIndex)),
  correctChoiceId: "",
});

const createSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function CreateQuiz() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quizId");
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "Science",
    difficulty: "Easy",
    durationMinutes: 15,
    estimatedPlayers: 0,
    visibility: "student",
    tags: "",
    settings: {
      passingScore: 70,
      randomizeQuestions: false,
      immediateResults: false,
    },
    questions: [createQuestion(0)],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(Boolean(quizId));
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const totalQuestions = form.questions.length;

  useEffect(() => {
    if (!quizId) {
      setIsLoadingQuiz(false);
      return;
    }

    const loadQuiz = async () => {
      try {
        const data = await fetchQuizDetail(quizId);
        const quiz = data.quiz;
        setForm({
          title: quiz.title,
          slug: quiz.slug,
          description: quiz.description,
          category: quiz.category,
          difficulty: quiz.difficulty,
          durationMinutes: quiz.durationMinutes,
          estimatedPlayers: quiz.estimatedPlayers || 0,
          visibility: quiz.visibility || "student",
          tags: Array.isArray(quiz.tags) ? quiz.tags.join(", ") : "",
          settings: {
            passingScore: quiz.settings?.passingScore ?? 70,
            randomizeQuestions: Boolean(quiz.settings?.randomizeQuestions),
            immediateResults: Boolean(quiz.settings?.immediateResults),
          },
          questions: quiz.questions.map((question) => ({
            ...question,
            choices: question.choices.map((choice) => ({
              id: choice.id,
              label: choice.label,
              text: choice.text,
            })),
          })),
        });
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load quiz.");
      } finally {
        setIsLoadingQuiz(false);
      }
    };

    loadQuiz();
  }, [quizId]);

  const canSubmit = useMemo(() => {
    if (!form.title.trim() || !form.slug.trim() || !form.description.trim()) {
      return false;
    }

    return form.questions.every((question) => {
      const hasPrompt = question.prompt.trim();
      const hasCorrectChoice = question.correctChoiceId;
      const allChoicesFilled = question.choices.every((choice) => choice.text.trim());
      return hasPrompt && hasCorrectChoice && allChoicesFilled;
    });
  }, [form]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const updateSettings = (field, value) => {
    setForm((current) => ({
      ...current,
      settings: {
        ...current.settings,
        [field]: value,
      },
    }));
  };

  const updateQuestion = (questionIndex, field, value) => {
    setForm((current) => ({
      ...current,
      questions: current.questions.map((question, index) =>
        index === questionIndex ? { ...question, [field]: value } : question,
      ),
    }));
  };

  const updateChoice = (questionIndex, choiceIndex, value) => {
    setForm((current) => ({
      ...current,
      questions: current.questions.map((question, index) => {
        if (index !== questionIndex) {
          return question;
        }

        return {
          ...question,
          choices: question.choices.map((choice, innerIndex) =>
            innerIndex === choiceIndex ? { ...choice, text: value } : choice,
          ),
        };
      }),
    }));
  };

  const addQuestion = () => {
    setForm((current) => ({
      ...current,
      questions: [...current.questions, createQuestion(current.questions.length)],
    }));
  };

  const removeQuestion = (questionIndex) => {
    setForm((current) => {
      const nextQuestions = current.questions
        .filter((_, index) => index !== questionIndex)
        .map((question, index) => ({
          ...question,
          id: `question-${index + 1}`,
          order: index + 1,
        }));

      return {
        ...current,
        questions: nextQuestions.length > 0 ? nextQuestions : [createQuestion(0)],
      };
    });
  };

  const handleSubmit = async (status) => {
    if (!canSubmit) {
      setError("Please complete the quiz details, questions, and correct answers before saving.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const payload = {
        ...form,
        slug: form.slug.trim(),
        title: form.title.trim(),
        description: form.description.trim(),
        status,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      const data = quizId
        ? await updateQuizRequest(quizId, payload)
        : await createQuizRequest(payload);
      setSuccessMessage(
        quizId
          ? "Quiz updated successfully."
          : status === "published"
            ? "Quiz published successfully."
            : "Quiz saved as draft.",
      );
      router.push("/quizzes");
      router.refresh();
      return data;
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to save quiz.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#101010] p-6 text-white">
      <div className="flex flex-col gap-6 border-b border-white/10 pb-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <button
            type="button"
            onClick={() => router.push("/quizzes")}
            className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 transition hover:bg-white/5"
          >
            <ChevronLeft size={18} />
          </button>
          <div>
            <h1 className="text-3xl font-bold">{quizId ? "Edit Quiz" : "Create New Quiz"}</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Add quiz details, define settings, and build question sets that map cleanly to the database schema.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("draft")}
            className="rounded-xl border border-white/10 px-5 py-3 font-medium transition hover:bg-white/5 disabled:opacity-50"
          >
            Save draft
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("published")}
            className="rounded-xl bg-gradient-to-r from-purple-500 to-orange-500 px-5 py-3 font-medium text-white disabled:opacity-50"
          >
            Publish quiz
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {successMessage ? (
        <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {successMessage}
        </div>
      ) : null}

      {isLoadingQuiz ? (
        <div className="mt-6 rounded-xl border border-white/10 bg-[#151518] px-4 py-10 text-center text-zinc-400">
          Loading quiz data...
        </div>
      ) : null}

      {!isLoadingQuiz ? (
      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-white/10 bg-[#151518] p-6">
            <h2 className="text-2xl font-semibold">Quiz Details</h2>
            <p className="mt-2 text-sm text-zinc-400">Basic metadata stored with the quiz document.</p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-zinc-300">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(event) => {
                    const nextTitle = event.target.value;
                    updateField("title", nextTitle);
                    updateField("slug", createSlug(nextTitle));
                  }}
                  placeholder="Enter quiz title"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-zinc-300">Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(event) => updateField("slug", createSlug(event.target.value))}
                  placeholder="quiz-slug"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-zinc-300">Description</label>
                <textarea
                  rows="4"
                  value={form.description}
                  onChange={(event) => updateField("description", event.target.value)}
                  placeholder="Short summary for students"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-300">Category</label>
                <select
                  value={form.category}
                  onChange={(event) => updateField("category", event.target.value)}
                >
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-300">Difficulty</label>
                <select
                  value={form.difficulty}
                  onChange={(event) => updateField("difficulty", event.target.value)}
                >
                  {difficultyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-300">Duration (minutes)</label>
                <input
                  type="number"
                  min="1"
                  value={form.durationMinutes}
                  onChange={(event) => updateField("durationMinutes", Number(event.target.value))}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-300">Estimated players</label>
                <input
                  type="number"
                  min="0"
                  value={form.estimatedPlayers}
                  onChange={(event) => updateField("estimatedPlayers", Number(event.target.value))}
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-zinc-300">Tags</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(event) => updateField("tags", event.target.value)}
                  placeholder="biology, revision, basics"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[#151518] p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Questions</h2>
                <p className="mt-2 text-sm text-zinc-400">Each question needs filled choices and a correct answer.</p>
              </div>
              <button
                type="button"
                onClick={addQuestion}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/5"
              >
                <Plus size={16} />
                Add question
              </button>
            </div>

            <div className="mt-6 space-y-5">
              {form.questions.map((question, questionIndex) => (
                <article
                  key={question.id}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">Question {questionIndex + 1}</h3>
                      <p className="mt-1 text-sm text-zinc-400">Multiple choice only for the current stored schema.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeQuestion(questionIndex)}
                      className="rounded-xl border border-red-500/20 p-2 text-red-300 transition hover:bg-red-500/10"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-4">
                    <div className="md:col-span-3">
                      <label className="text-sm font-medium text-zinc-300">Prompt</label>
                      <textarea
                        rows="3"
                        value={question.prompt}
                        onChange={(event) => updateQuestion(questionIndex, "prompt", event.target.value)}
                        placeholder="Enter the question prompt"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-zinc-300">Points</label>
                      <input
                        type="number"
                        min="0"
                        value={question.points}
                        onChange={(event) => updateQuestion(questionIndex, "points", Number(event.target.value))}
                      />
                    </div>

                    <div className="md:col-span-4">
                      <label className="text-sm font-medium text-zinc-300">Explanation</label>
                      <textarea
                        rows="2"
                        value={question.explanation}
                        onChange={(event) => updateQuestion(questionIndex, "explanation", event.target.value)}
                        placeholder="Optional explanation shown after completion"
                      />
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {question.choices.map((choice, choiceIndex) => (
                      <div
                        key={choice.id}
                        className={`rounded-xl border p-4 transition ${
                          question.correctChoiceId === choice.id
                            ? "border-purple-400 bg-purple-500/10"
                            : "border-white/10 bg-[#17171a]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold text-zinc-300">{choice.label}</span>
                          <button
                            type="button"
                            onClick={() => updateQuestion(questionIndex, "correctChoiceId", choice.id)}
                            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                              question.correctChoiceId === choice.id
                                ? "bg-purple-500 text-white"
                                : "border border-white/10 text-zinc-400 hover:bg-white/5"
                            }`}
                          >
                            {question.correctChoiceId === choice.id ? "Correct" : "Mark correct"}
                          </button>
                        </div>
                        <input
                          type="text"
                          value={choice.text}
                          onChange={(event) => updateChoice(questionIndex, choiceIndex, event.target.value)}
                          placeholder={`Answer option ${choice.label}`}
                        />
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-white/10 bg-[#151518] p-6">
            <h2 className="text-2xl font-semibold">Quiz Settings</h2>
            <p className="mt-2 text-sm text-zinc-400">Stored in the `settings` object on the quiz document.</p>

            <div className="mt-6 space-y-5">
              <div>
                <label className="text-sm font-medium text-zinc-300">Passing score</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.settings.passingScore}
                  onChange={(event) => updateSettings("passingScore", Number(event.target.value))}
                />
              </div>

              <label className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-4">
                <div>
                  <p className="font-medium text-white">Randomize questions</p>
                  <p className="mt-1 text-sm text-zinc-400">Shuffle question order when students start the quiz.</p>
                </div>
                <input
                  type="checkbox"
                  checked={form.settings.randomizeQuestions}
                  onChange={(event) => updateSettings("randomizeQuestions", event.target.checked)}
                  className="h-4 w-4 accent-purple-500"
                />
              </label>

              <label className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-4">
                <div>
                  <p className="font-medium text-white">Immediate results</p>
                  <p className="mt-1 text-sm text-zinc-400">Allow per-question feedback during play.</p>
                </div>
                <input
                  type="checkbox"
                  checked={form.settings.immediateResults}
                  onChange={(event) => updateSettings("immediateResults", event.target.checked)}
                  className="h-4 w-4 accent-purple-500"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[#151518] p-6">
            <h2 className="text-2xl font-semibold">Schema Preview</h2>
            <p className="mt-2 text-sm text-zinc-400">Quick sanity check before writing to Mongo.</p>

            <div className="mt-6 space-y-4 text-sm text-zinc-300">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-zinc-400">Slug</p>
                <p className="mt-2 break-all font-medium text-white">{form.slug || "quiz-slug"}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-zinc-400">Questions</p>
                <p className="mt-2 font-medium text-white">{totalQuestions}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-zinc-400">Visibility</p>
                <p className="mt-2 font-medium text-white">{form.visibility}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-zinc-400">Status on submit</p>
                <p className="mt-2 font-medium text-white">Draft or Published</p>
              </div>
            </div>
          </section>
        </aside>
      </div>
      ) : null}
    </div>
  );
}
