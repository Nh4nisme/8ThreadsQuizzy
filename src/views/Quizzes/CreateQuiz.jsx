"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ChevronLeft, 
  ChevronRight,
  Plus, 
  Trash2, 
  CheckCircle2, 
  Settings, 
  BookOpen, 
  Layout, 
  Eye, 
  Zap, 
  Save, 
  Rocket, 
  AlertCircle,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Target,
  Clock,
  Users
} from "lucide-react";
import {
  createQuizRequest,
  fetchQuizDetail,
  updateQuizRequest,
} from "../../lib/quiz-client.js";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, HoverScale, ScaleIn, GlowOrb } from "../../components/ui/Motion.jsx";
import { toast } from "../../components/ui/Toast.jsx";

const categoryOptions = ["Science", "Mathematics", "History", "Language", "Technology"];
const difficultyOptions = ["Easy", "Medium", "Hard"];

const createChoice = (questionIndex, choiceIndex) => ({
  id: `q${questionIndex + 1}-choice-${choiceIndex + 1}`,
  label: String.fromCharCode(65 + choiceIndex),
  text: "",
});

const createQuestion = (questionIndex) => ({
  id: `question-${Date.now()}-${questionIndex}`,
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

// --- Progress Step Indicator ---
const StepIndicator = ({ currentStep, setStep, steps, canAdvance }) => (
  <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-4 custom-scrollbar">
    {steps.map((step, idx) => (
      <div key={step.id} className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => (idx < currentStep || canAdvance(idx)) && setStep(idx)}
          disabled={idx > currentStep && !canAdvance(idx)}
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-2 transition-all duration-300 ${
            currentStep === idx 
              ? "border-accent bg-accent/10 text-white shadow-[0_0_20px_rgba(172,99,230,0.2)]" 
              : idx < currentStep 
                ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400" 
                : "border-white/5 bg-white/5 text-text-muted opacity-50"
          }`}
        >
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border-2 ${
             currentStep === idx ? "bg-accent border-accent text-white" : idx < currentStep ? "bg-emerald-500 border-emerald-500 text-white" : "border-white/10"
          }`}>
             {idx < currentStep ? <CheckCircle2 size={14} /> : idx + 1}
          </div>
          <span className="text-sm font-bold whitespace-nowrap">{step.label}</span>
        </button>
        {idx < steps.length - 1 && <div className="w-8 h-[2px] bg-white/5" />}
      </div>
    ))}
  </div>
);

export default function CreateQuiz() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quizId");
  
  const [currentStep, setCurrentStep] = useState(0);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  
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

  const steps = [
    { id: "identity", label: "Identity", icon: Layout },
    { id: "builder", label: "Questions", icon: BookOpen },
    { id: "config", label: "Settings", icon: Settings },
    { id: "review", label: "Final Review", icon: Eye },
  ];

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
          questions: quiz.questions.map((question, qIdx) => ({
            ...question,
            id: question._id || `q-${Date.now()}-${qIdx}`,
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

  const validateStep = (stepIdx) => {
    if (stepIdx === 0) {
      return !!(form.title.trim() && form.slug.trim() && form.description.trim());
    }
    if (stepIdx === 1) {
      return form.questions.every(q => 
        q.prompt.trim() && 
        q.correctChoiceId && 
        q.choices.every(c => c.text.trim())
      );
    }
    return true;
  };

  const canAdvance = (targetStep) => {
    for (let i = 0; i < targetStep; i++) {
      if (!validateStep(i)) return false;
    }
    return true;
  };

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const updateSettings = (field, value) => {
    setForm((current) => ({
      ...current,
      settings: { ...current.settings, [field]: value },
    }));
  };

  const updateQuestion = (questionIndex, field, value) => {
    setForm((current) => ({
      ...current,
      questions: current.questions.map((q, idx) =>
        idx === questionIndex ? { ...q, [field]: value } : q
      ),
    }));
  };

  const updateChoice = (questionIndex, choiceIndex, value) => {
    setForm((current) => ({
      ...current,
      questions: current.questions.map((q, idx) => {
        if (idx !== questionIndex) return q;
        return {
          ...q,
          choices: q.choices.map((c, cIdx) =>
            cIdx === choiceIndex ? { ...c, text: value } : c
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
    setActiveQuestionIdx(form.questions.length);
  };

  const removeQuestion = (idx) => {
    if (form.questions.length === 1) return;
    setForm((current) => ({
      ...current,
      questions: current.questions.filter((_, i) => i !== idx),
    }));
    if (activeQuestionIdx >= idx && activeQuestionIdx > 0) {
      setActiveQuestionIdx(activeQuestionIdx - 1);
    }
  };

  const handleSubmit = async (status) => {
    if (!validateStep(0) || !validateStep(1)) {
      setError("Please complete all required fields and question details.");
      setCurrentStep(validateStep(0) ? 1 : 0);
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const payload = {
        ...form,
        status,
        tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      };

      const data = quizId
        ? await updateQuizRequest(quizId, payload)
        : await createQuizRequest(payload);
      
      toast.success(quizId ? "Quiz updated successfully!" : "Quiz created successfully!");
      router.push("/quizzes");
      router.refresh();
      return data;
    } catch (submitError) {
      setError(submitError.message || "Failed to save quiz.");
      toast.error(submitError.message || "Failed to save quiz.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeQuestion = form.questions[activeQuestionIdx];

  // --- RENDERING HELPERS ---

  const renderInput = (label, field, placeholder, type = "text") => (
    <div className="space-y-2">
      <label className="text-xs font-black uppercase tracking-[0.2em] text-text-muted">{label}</label>
      <input
        type={type}
        value={form[field]}
        onChange={(e) => {
          updateField(field, e.target.value);
          if (field === "title") updateField("slug", createSlug(e.target.value));
        }}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium focus:border-accent focus:ring-4 focus:ring-accent/5 transition-all outline-none"
      />
    </div>
  );

  return (
    <div className="relative min-h-screen bg-[#050505] text-white p-4 md:p-8 overflow-hidden">
      <GlowOrb className="-top-40 -left-40 h-[600px] w-[600px]" color="purple" />
      <GlowOrb className="-bottom-40 -right-40 h-[600px] w-[600px]" color="blue" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <HoverScale>
              <button
                onClick={() => router.push("/quizzes")}
                className="h-12 w-12 flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
            </HoverScale>
            <div>
              <h1 className="text-2xl md:text-4xl font-black tracking-tight">{quizId ? "Update Quiz" : "Forge New Quiz"}</h1>
              <p className="text-text-muted text-xs md:text-sm font-medium mt-1">Refine your challenge and publish to your students.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <button
               disabled={isSubmitting}
               onClick={() => handleSubmit("draft")}
               className="group flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/10 bg-white/5 font-bold text-sm transition-all hover:bg-white/10 disabled:opacity-50"
             >
               <Save size={18} className="text-text-muted group-hover:text-white" />
               Save Draft
             </button>
             <button
               disabled={isSubmitting || !canAdvance(3)}
               onClick={() => handleSubmit("published")}
               className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-accent-gradient font-black text-sm shadow-xl shadow-accent/20 transition-all hover:shadow-accent/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:translate-y-0"
             >
               <Rocket size={18} />
               {quizId ? "Update Live" : "Launch Quiz"}
             </button>
          </div>
        </header>

        {/* Workflow Navigation */}
        <StepIndicator currentStep={currentStep} setStep={setCurrentStep} steps={steps} canAdvance={canAdvance} />

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
           <main className="min-h-[600px]">
             <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.section
                    key="step-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid gap-8 bg-[#111115]/60 border border-white/10 rounded-3xl md:rounded-[40px] p-6 md:p-12 backdrop-blur-xl"
                  >
                    <div className="grid gap-6 md:grid-cols-2">
                       <div className="col-span-full">
                          <h2 className="text-2xl font-black mb-2">Quiz Identity</h2>
                          <p className="text-text-muted text-sm mb-6">Start with the basics. This is how students will identify your quiz.</p>
                       </div>
                       <div className="col-span-full">{renderInput("Quiz Title", "title", "e.g. Molecular Biology Advanced")}</div>
                       {renderInput("Slug (URL)", "slug", "auto-generated-slug")}
                       <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-[0.2em] text-text-muted">Category</label>
                          <select
                            value={form.category}
                            onChange={(e) => updateField("category", e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium focus:border-accent outline-none appearance-none cursor-pointer"
                          >
                            {categoryOptions.map(opt => <option key={opt} value={opt} className="bg-[#111115]">{opt}</option>)}
                          </select>
                       </div>
                       <div className="col-span-full space-y-2">
                          <label className="text-xs font-black uppercase tracking-[0.2em] text-text-muted">Description</label>
                          <textarea
                            rows="4"
                            value={form.description}
                            onChange={(e) => updateField("description", e.target.value)}
                            placeholder="Provide a compelling summary of what students will learn..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium focus:border-accent outline-none resize-none"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-[0.2em] text-text-muted">Difficulty</label>
                          <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl">
                             {difficultyOptions.map(opt => (
                               <button
                                 key={opt}
                                 onClick={() => updateField("difficulty", opt)}
                                 className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                                   form.difficulty === opt ? "bg-white text-black shadow-lg" : "text-text-muted hover:text-white"
                                 }`}
                               >
                                 {opt}
                               </button>
                             ))}
                          </div>
                       </div>
                       {renderInput("Tags", "tags", "biology, dna, revision")}
                    </div>
                  </motion.section>
                )}

                {currentStep === 1 && (
                  <motion.section
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex items-center justify-between bg-[#111115]/60 border border-white/10 rounded-[32px] p-6 backdrop-blur-xl">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-accent-gradient flex items-center justify-center text-xl font-black">
                             {activeQuestionIdx + 1}
                          </div>
                          <div>
                             <h2 className="text-xl font-black">Question Builder</h2>
                             <p className="text-xs text-text-muted font-medium">Multiple Choice • {activeQuestion.points} Points</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <button
                            onClick={() => removeQuestion(activeQuestionIdx)}
                            className="h-11 w-11 flex items-center justify-center rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 transition-all"
                            title="Delete Question"
                          >
                            <Trash2 size={18} />
                          </button>
                       </div>
                    </div>

                    <div className="bg-[#111115]/60 border border-white/10 rounded-3xl md:rounded-[40px] p-6 md:p-10 backdrop-blur-xl space-y-8">
                       <div className="space-y-4">
                          <div className="flex items-center justify-between">
                             <label className="text-xs font-black uppercase tracking-[0.3em] text-accent">Question Prompt</label>
                             <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black uppercase text-text-muted">Weight:</span>
                                <input 
                                  type="number" 
                                  value={activeQuestion.points}
                                  onChange={(e) => updateQuestion(activeQuestionIdx, "points", Number(e.target.value))}
                                  className="w-16 bg-transparent border-b border-white/10 text-center text-xs font-bold focus:border-accent outline-none"
                                />
                             </div>
                          </div>
                          <textarea
                            rows="3"
                            value={activeQuestion.prompt}
                            onChange={(e) => updateQuestion(activeQuestionIdx, "prompt", e.target.value)}
                            placeholder="Ask something challenging..."
                            className="w-full bg-white/5 border border-white/10 rounded-[24px] px-6 py-5 text-lg font-bold focus:border-accent outline-none resize-none"
                          />
                       </div>

                       <div className="space-y-4">
                          <label className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">Answer Options</label>
                          <p className="text-xs text-text-muted">Select the correct choice by clicking the letter icon.</p>
                          <div className="grid gap-4 md:grid-cols-2">
                             {activeQuestion.choices.map((choice, cIdx) => {
                               const isCorrect = activeQuestion.correctChoiceId === choice.id;
                               return (
                                 <div 
                                   key={choice.id}
                                   className={`relative group rounded-3xl border-2 p-1 transition-all duration-300 ${
                                     isCorrect ? "border-emerald-500 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.1)]" : "border-white/5 bg-white/5 hover:border-white/20"
                                   }`}
                                 >
                                    <div className="flex items-center gap-3">
                                       <button
                                         onClick={() => updateQuestion(activeQuestionIdx, "correctChoiceId", choice.id)}
                                         className={`shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl text-xs font-black border-2 transition-all ${
                                           isCorrect ? "bg-emerald-500 border-emerald-500 text-white" : "bg-white/5 border-white/10 text-text-muted group-hover:border-white/30"
                                         }`}
                                       >
                                          {isCorrect ? <CheckCircle2 size={16} /> : choice.label}
                                       </button>
                                       <input
                                         type="text"
                                         value={choice.text}
                                         onChange={(e) => updateChoice(activeQuestionIdx, cIdx, e.target.value)}
                                         placeholder={`Option ${choice.label}`}
                                         className="flex-1 bg-transparent border-none py-4 text-sm font-bold outline-none"
                                       />
                                    </div>
                                 </div>
                               );
                             })}
                          </div>
                       </div>

                       <div className="space-y-4 pt-4 border-t border-white/5">
                          <label className="text-xs font-black uppercase tracking-[0.3em] text-text-muted">Explanation (Post-answer feedback)</label>
                          <textarea
                            rows="2"
                            value={activeQuestion.explanation}
                            onChange={(e) => updateQuestion(activeQuestionIdx, "explanation", e.target.value)}
                            placeholder="Explain why the correct answer is right..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-medium focus:border-accent outline-none resize-none"
                          />
                       </div>
                    </div>

                    <div className="flex items-center justify-between px-4">
                       <p className="text-xs text-text-muted font-bold italic">Auto-saving local draft...</p>
                       <div className="flex gap-4">
                          <button
                            disabled={activeQuestionIdx === 0}
                            onClick={() => setActiveQuestionIdx(activeQuestionIdx - 1)}
                            className="flex items-center gap-2 px-6 py-2 rounded-xl border border-white/10 bg-white/5 font-bold text-xs transition-all hover:bg-white/10 disabled:opacity-30"
                          >
                             <ChevronLeft size={14} /> Previous
                          </button>
                          <button
                            disabled={activeQuestionIdx === form.questions.length - 1}
                            onClick={() => setActiveQuestionIdx(activeQuestionIdx + 1)}
                            className="flex items-center gap-2 px-6 py-2 rounded-xl border border-white/10 bg-white/5 font-bold text-xs transition-all hover:bg-white/10 disabled:opacity-30"
                          >
                             Next <ChevronUp className="rotate-90" size={14} />
                          </button>
                       </div>
                    </div>
                  </motion.section>
                )}

                {currentStep === 2 && (
                  <motion.section
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-[#111115]/60 border border-white/10 rounded-3xl md:rounded-[40px] p-6 md:p-12 backdrop-blur-xl space-y-12"
                  >
                    <div>
                       <h2 className="text-2xl font-black mb-2">Quiz Intelligence</h2>
                       <p className="text-text-muted text-sm">Fine-tune how the quiz behaves and is scored.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                       <div className="space-y-4">
                          <label className="text-xs font-black uppercase tracking-[0.2em] text-accent">Performance Threshold</label>
                          <div className="p-6 rounded-[32px] border border-white/10 bg-white/5">
                             <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-bold">Passing Score</span>
                                <span className="text-2xl font-black">{form.settings.passingScore}%</span>
                             </div>
                             <input 
                               type="range" 
                               min="0" 
                               max="100" 
                               value={form.settings.passingScore}
                               onChange={(e) => updateSettings("passingScore", Number(e.target.value))}
                               className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-accent"
                             />
                          </div>
                       </div>

                       <div className="space-y-4">
                          <label className="text-xs font-black uppercase tracking-[0.2em] text-accent">Session Metrics</label>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
                                <label className="text-[10px] font-black uppercase text-text-muted block mb-2">Duration</label>
                                <div className="flex items-center gap-2">
                                   <Clock size={14} className="text-accent" />
                                   <input 
                                     type="number" 
                                     value={form.durationMinutes}
                                     onChange={(e) => updateField("durationMinutes", Number(e.target.value))}
                                     className="w-full bg-transparent font-black text-lg outline-none"
                                   />
                                   <span className="text-xs font-bold text-text-muted">m</span>
                                </div>
                             </div>
                             <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
                                <label className="text-[10px] font-black uppercase text-text-muted block mb-2">Est. Players</label>
                                <div className="flex items-center gap-2">
                                   <Users size={14} className="text-accent" />
                                   <input 
                                     type="number" 
                                     value={form.estimatedPlayers}
                                     onChange={(e) => updateField("estimatedPlayers", Number(e.target.value))}
                                     className="w-full bg-transparent font-black text-lg outline-none"
                                   />
                                </div>
                             </div>
                          </div>
                       </div>

                       <div className="col-span-full space-y-4">
                          <label className="text-xs font-black uppercase tracking-[0.2em] text-accent">Active Logic</label>
                          <div className="grid md:grid-cols-2 gap-4">
                             {[
                               { 
                                 id: "randomizeQuestions", 
                                 label: "Question Randomization", 
                                 desc: "Shuffle question order for each attempt." 
                               },
                               { 
                                 id: "immediateResults", 
                                 label: "Immediate Feedback", 
                                 desc: "Show correct answers after each question." 
                               }
                             ].map(opt => (
                               <button
                                 key={opt.id}
                                 onClick={() => updateSettings(opt.id, !form.settings[opt.id])}
                                 className={`flex items-start gap-4 p-6 rounded-[32px] border-2 text-left transition-all duration-300 ${
                                   form.settings[opt.id] ? "border-accent bg-accent/5 shadow-lg shadow-accent/5" : "border-white/5 bg-white/5 hover:border-white/20"
                                 }`}
                               >
                                  <div className={`mt-1 h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                                    form.settings[opt.id] ? "bg-accent border-accent text-white" : "border-white/10"
                                  }`}>
                                     {form.settings[opt.id] && <CheckCircle2 size={14} />}
                                  </div>
                                  <div>
                                     <p className="font-bold text-sm">{opt.label}</p>
                                     <p className="text-xs text-text-muted mt-1">{opt.desc}</p>
                                  </div>
                               </button>
                             ))}
                          </div>
                       </div>
                    </div>
                  </motion.section>
                )}

                {currentStep === 3 && (
                  <motion.section
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                     <div className="bg-[#111115]/60 border border-white/10 rounded-3xl md:rounded-[40px] p-6 md:p-12 backdrop-blur-xl">
                        <div className="flex items-center gap-6 mb-10">
                           <div className="w-20 h-20 rounded-[32px] bg-accent-gradient flex items-center justify-center shadow-2xl">
                              <Target className="w-10 h-10 text-white" />
                           </div>
                           <div>
                              <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-1">Ready for launch</p>
                              <h2 className="text-3xl font-black">{form.title}</h2>
                              <p className="text-text-muted font-medium">Verification summary before database write.</p>
                           </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                           {[
                             { label: "Questions", value: form.questions.length, icon: BookOpen },
                             { label: "Category", value: form.category, icon: Layout },
                             { label: "Points", value: form.questions.reduce((a, b) => a + (b.points || 0), 0), icon: Zap }
                           ].map((stat, i) => (
                             <div key={i} className="p-6 rounded-[28px] border border-white/5 bg-white/5 backdrop-blur-md">
                                <stat.icon size={18} className="text-accent mb-3" />
                                <p className="text-[10px] font-black uppercase text-text-muted tracking-widest">{stat.label}</p>
                                <p className="text-xl font-black mt-1">{stat.value}</p>
                             </div>
                           ))}
                        </div>

                        <div className="mt-10 p-8 rounded-[32px] border border-emerald-500/20 bg-emerald-500/5">
                           <div className="flex items-start gap-4">
                              <CheckCircle2 className="text-emerald-400 mt-1" size={20} />
                              <div>
                                 <h4 className="font-bold text-emerald-400">Schema Integrity Check Passed</h4>
                                 <p className="text-xs text-emerald-500/70 mt-1 leading-relaxed">
                                    All questions have valid prompts, full choice sets, and defined correct answers. The quiz is ready for student access.
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="bg-accent-gradient p-1 rounded-[40px] overflow-hidden shadow-2xl shadow-accent/20">
                        <div className="bg-[#0a0a0a] rounded-[38px] p-10 flex flex-col items-center text-center">
                           <Sparkles size={40} className="text-accent mb-6" />
                           <h3 className="text-2xl font-black mb-4">Launch Assessment</h3>
                           <p className="text-text-secondary max-w-sm mb-10 leading-relaxed">
                             Once published, this quiz will be immediately visible to your selected audience based on visibility settings.
                           </p>
                           <HoverScale className="w-full max-w-xs">
                             <button
                               onClick={() => handleSubmit("published")}
                               className="w-full py-5 rounded-[24px] bg-accent-gradient text-white font-black shadow-xl shadow-accent/20 hover:shadow-accent/40 transition-all"
                             >
                               Finalize & Publish
                             </button>
                           </HoverScale>
                        </div>
                     </div>
                  </motion.section>
                )}
             </AnimatePresence>

             {/* Footer Navigation */}
             <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
                <button
                  onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 font-bold text-sm transition-all hover:bg-white/10 disabled:opacity-0 pointer-events-auto"
                >
                   <ChevronLeft size={18} /> Back
                </button>
                {currentStep < 3 && (
                  <button
                    onClick={() => canAdvance(currentStep + 1) && setCurrentStep(currentStep + 1)}
                    disabled={!canAdvance(currentStep + 1)}
                    className="flex items-center gap-2 px-10 py-4 rounded-2xl bg-white text-black font-black text-sm shadow-xl transition-all hover:bg-zinc-200 disabled:opacity-30"
                  >
                     Continue <ChevronRight size={18} className="rotate-0" />
                  </button>
                )}
             </div>
           </main>

           {/* Sidebar Navigator */}
           <aside className="sticky top-8 space-y-6">
              <section className="bg-[#111115]/60 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-black uppercase tracking-[0.3em] text-text-muted">Questions Map</h3>
                    <div className="h-6 w-6 flex items-center justify-center rounded-lg bg-accent/10 text-accent font-black text-[10px]">
                       {form.questions.length}
                    </div>
                 </div>

                 <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {form.questions.map((q, idx) => {
                      const isValid = q.prompt.trim() && q.correctChoiceId && q.choices.every(c => c.text.trim());
                      const isActive = activeQuestionIdx === idx;
                      
                      return (
                        <button
                          key={q.id}
                          onClick={() => {
                            setActiveQuestionIdx(idx);
                            setCurrentStep(1);
                          }}
                          className={`w-full group flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 ${
                            isActive 
                              ? "border-accent bg-accent/10" 
                              : "border-white/5 bg-white/5 hover:border-white/10"
                          }`}
                        >
                           <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black border-2 ${
                             isActive ? "bg-accent border-accent text-white" : "border-white/10 text-text-muted"
                           }`}>
                              {idx + 1}
                           </div>
                           <div className="flex-1 text-left">
                              <p className={`text-xs font-bold truncate ${isActive ? "text-white" : "text-text-muted group-hover:text-white"}`}>
                                {q.prompt || "Untitled Question"}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                 <div className={`w-1.5 h-1.5 rounded-full ${isValid ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"}`} />
                                 <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                                   {isValid ? "Complete" : "Incomplete"}
                                 </span>
                              </div>
                           </div>
                        </button>
                      );
                    })}
                 </div>

                 <button
                   onClick={addQuestion}
                   className="w-full mt-6 flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-white/10 text-text-muted font-bold text-sm hover:border-accent hover:text-accent hover:bg-accent/5 transition-all"
                 >
                    <Plus size={18} /> Add New Step
                 </button>
              </section>

              <section className="bg-accent-gradient/5 border border-accent/20 rounded-[32px] p-8 backdrop-blur-xl">
                 <div className="flex items-center gap-3 mb-4">
                    <AlertCircle size={18} className="text-accent" />
                    <h4 className="text-sm font-black uppercase tracking-widest">Builder Tips</h4>
                 </div>
                 <ul className="space-y-4">
                    {[
                      "Use clear, unambiguous prompts.",
                      "Ensure only one correct answer exists.",
                      "Keep explanations concise and helpful."
                    ].map((tip, i) => (
                      <li key={i} className="flex gap-3 text-xs text-text-secondary leading-relaxed">
                         <span className="text-accent">•</span> {tip}
                      </li>
                    ))}
                 </ul>
              </section>
           </aside>
        </div>

        {error && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl bg-red-500 text-white shadow-2xl animate-bounce">
             <AlertCircle size={20} />
             <p className="text-sm font-bold">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

