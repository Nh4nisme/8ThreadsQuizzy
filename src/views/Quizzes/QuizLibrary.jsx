import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Clock,
  Users,
  EllipsisVertical,
  Search,
  Filter,
  SquarePen,
  Copy,
  Trash2,
  ChevronDown,
} from "lucide-react";
import {
  deleteQuizRequest,
  duplicateQuizRequest,
  fetchTeacherQuizzes,
} from "../../lib/quiz-client.js";
import { FadeIn, StaggerContainer, StaggerItem, HoverScale } from "../../components/ui/Motion.jsx";

function QuizMenu({ quizId, onEdit, onDuplicated, onDeleted }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDuplicate = async () => {
    const data = await duplicateQuizRequest(quizId);
    onDuplicated(data.quiz);
    setOpen(false);
  };

  const handleDelete = async () => {
    await deleteQuizRequest(quizId);
    onDeleted(quizId);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="rounded-lg border border-gray-700 px-3 py-3 text-white transition hover:bg-purple-600"
      >
        <EllipsisVertical className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-1 w-44 overflow-hidden rounded-xl bg-[#101010] shadow-xl">
          <button
            type="button"
            onClick={() => {
              onEdit(quizId);
              setOpen(false);
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-white transition hover:bg-purple-600"
          >
            <SquarePen className="h-5" />
            Edit
          </button>

          <button
            type="button"
            onClick={handleDuplicate}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-white transition hover:bg-purple-600"
          >
            <Copy className="h-5" />
            Duplicate
          </button>

          <hr className="text-gray-800" />

          <button
            type="button"
            onClick={handleDelete}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-500 transition hover:bg-red-500 hover:text-white"
          >
            <Trash2 className="h-5" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

function CategoryDropdown({ categories, category, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-2 rounded-lg border border-[#27272a] bg-[#18181a] p-2.5 text-sm text-white"
      >
        <Filter className="w-4 text-gray-400" />
        {category}
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-1 w-44 rounded-xl border border-gray-800 bg-[#1a1a1f] shadow-xl">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              className={`w-full px-3 py-2.5 text-left text-sm transition ${category === item
                ? "bg-gray-200 text-black"
                : "text-gray-400 hover:bg-gray-800"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function QuizCard({ quiz, isSelected, onView, onEdit, onDuplicated, onDeleted }) {
  const quizStatusLabel = quiz.status === "published" ? "Published" : "Draft";

  return (
    <StaggerItem>
      <div
        className={`mt-5 flex items-center gap-4 rounded-lg border-2 bg-[#19191b] p-5 transition ${isSelected ? "border-purple-600" : "border-gray-800 hover:border-purple-600 shadow-lg hover:shadow-purple-500/10"
          }`}
      >
        <div className="rounded-full bg-purple-900/40 p-4">
          <BookOpen className="text-[#7c3aed]" />
        </div>

        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h1 className="font-bold text-white">{quiz.title}</h1>
            <span
              className={`rounded-full px-3 py-0.75 text-xs font-bold ${quiz.status === "published"
                ? "bg-green-500 text-white"
                : "border border-amber-500 bg-amber-950 text-orange-500"
                }`}
            >
              {quizStatusLabel}
            </span>
          </div>

          <p className="mb-2 text-sm text-gray-300">{quiz.description}</p>

          <div className="flex gap-4 text-xs text-white">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" /> {quiz.questions.length} questions
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {quiz.durationMinutes} min
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" /> {quiz.completions || 0} completions
            </span>
            <span>{quiz.category}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <HoverScale>
            <button
              type="button"
              onClick={() => onView(quiz._id)}
              className="rounded-lg border border-gray-800 bg-[#101010] px-4 py-2 text-white transition hover:bg-purple-600"
            >
              View
            </button>
          </HoverScale>

          <QuizMenu
            quizId={quiz._id}
            onEdit={onEdit}
            onDuplicated={onDuplicated}
            onDeleted={onDeleted}
          />
        </div>
      </div>
    </StaggerItem>
  );
}

export default function QuizLibrary({ selectedQuizId, onSelectQuiz }) {
  // ... (existing state/effects remain same)
  const router = useRouter();
  const [active, setActive] = useState("All Quizzes");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const tabs = ["All Quizzes", "Published", "Draft"];

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const data = await fetchTeacherQuizzes();
        setQuizzes(data.quizzes || []);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load quizzes.");
      } finally {
        setIsLoading(false);
      }
    };

    loadQuizzes();
  }, []);

  const categories = useMemo(
    () => ["All Categories", ...new Set(quizzes.map((quiz) => quiz.category))],
    [quizzes],
  );

  const filteredQuizzes = useMemo(() => {
    return quizzes
      .filter((quiz) =>
        active === "All Quizzes"
          ? true
          : active === "Published"
            ? quiz.status === "published"
            : quiz.status === "draft",
      )
      .filter((quiz) => category === "All Categories" || quiz.category === category)
      .filter((quiz) =>
        `${quiz.title} ${quiz.description} ${quiz.category}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
  }, [active, category, quizzes, search]);

  const handleEdit = (quizId) => {
    router.push(`/quizzes/create?quizId=${quizId}`);
  };

  const handleDuplicated = (quiz) => {
    setQuizzes((current) => [quiz, ...current]);
  };

  const handleDeleted = (quizId) => {
    setQuizzes((current) => current.filter((quiz) => quiz._id !== quizId));

    if (selectedQuizId === quizId) {
      onSelectQuiz(null);
    }
  };

  return (
    <StaggerContainer>
      <FadeIn className="mb-5 flex justify-between w-full items-start">
        <div>
          <div className="flex rounded-lg">
            <div>
              <h3 className="text-3xl font-bold text-white">Quizzes</h3>
              <p className="mt-3 text-sm text-gray-400">Create, manage and analyze your quizzes</p>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="rounded-lg bg-[#151518] px-6 py-8 border border-white/5">
        <FadeIn>
          <h1 className="text-2xl font-bold tracking-tight text-white">Quiz Library</h1>
          <h2 className="mb-6 pt-1 text-base text-gray-400">Browse and manage all your quizzes</h2>
        </FadeIn>

        <FadeIn delay={0.2} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="inline-flex rounded-lg border border-gray-800 p-1 bg-black/20">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${active === tab ? "bg-[#101010] text-white shadow-lg" : "text-gray-400 hover:text-white"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-[#27272a] bg-[#18181a] pl-3 focus-within:border-purple-600 transition-colors">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search quizzes..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="mt-0 w-full border-none bg-transparent text-sm text-white outline-none placeholder-gray-500 py-2.5"
              />
            </div>

            <CategoryDropdown
              categories={categories}
              category={category}
              onChange={setCategory}
            />
          </div>
        </FadeIn>

        {isLoading ? (
          <FadeIn className="mt-7 rounded-lg border border-white/10 bg-black/10 px-6 py-10 text-center text-zinc-400">
            Loading quizzes...
          </FadeIn>
        ) : null}

        {error ? (
          <FadeIn className="mt-7 rounded-lg border border-red-500/30 bg-red-500/10 px-6 py-6 text-center text-red-200">
            {error}
          </FadeIn>
        ) : null}

        {!isLoading && !error ? (
          <div className="mt-7">
            {filteredQuizzes.map((quiz) => (
              <QuizCard
                key={quiz._id}
                quiz={quiz}
                isSelected={selectedQuizId === quiz._id}
                onView={onSelectQuiz}
                onEdit={handleEdit}
                onDuplicated={handleDuplicated}
                onDeleted={handleDeleted}
              />
            ))}
          </div>
        ) : null}

        {!isLoading && !error && filteredQuizzes.length === 0 ? (
          <FadeIn className="mt-7 rounded-lg border border-dashed border-white/10 bg-black/10 px-6 py-10 text-center text-zinc-400">
            No quizzes matched the current search and filters.
          </FadeIn>
        ) : null}
      </div>
    </StaggerContainer>
  );
}
