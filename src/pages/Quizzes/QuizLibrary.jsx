import { useState, useRef, useEffect } from "react";
import { BookOpen, Clock, Users, EllipsisVertical, Search, Filter, SquarePen, Copy, Trash2, ChevronDown} from 'lucide-react'

const quizzes = [
  { QuizID: 1, QuizTitle: "Introduction to Biology", QuestionCount: 15, QuizDescription: "Basic concepts of biology for beginners", QuizStatus: "Published", QuizTime: 20, QuizCompletion: 32 },
  { QuizID: 2, QuizTitle: "Advanced Mathematics", QuestionCount: 15, QuizDescription: "Basic concepts of biology for beginners", QuizStatus: "Published", QuizTime: 20, QuizCompletion: 32 },
  { QuizID: 3, QuizTitle: "Chemistry Fundamentals", QuestionCount: 15, QuizDescription: "Basic concepts of biology for beginners", QuizStatus: "Draft", QuizTime: 20, QuizCompletion: 32 },
];

{/* Default option does NOT allow styling, resorting to ts*/}
({/* Functions does not work for now*/})
function QuizMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-3 border border-gray-700 rounded-lg text-white hover:bg-purple-600 transition">
        <EllipsisVertical className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-44 bg-[#101010] rounded-xl shadow-xl z-50 overflow-hidden">
          
          <button className="flex items-center gap-3 w-full px-4 py-3 text-white text-sm hover:bg-purple-600 transition">
            <SquarePen className="h-5" /> Edit
          </button>

          <button className="flex items-center gap-3 w-full px-4 py-3 text-white text-sm hover:bg-purple-600 transition">
            <Copy className="h-5" /> Duplicate
          </button>

          <hr className="text-gray-800"/>

          <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 text-sm hover:bg-red-500 hover:text-white transition">
            <Trash2 className="h-5" /> Delete
          </button>

        </div>
      )}
    </div>
  );
}

({/* Same thing with above but for category, delete if not needed */})
function CategoryDropdown() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("All Categories");
  const categories = ["All Categories", "Biology", "Math", "Chemistry"];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2.5 flex items-center gap-2 bg-[#18181a] border border-[#27272a] rounded-lg text-white text-sm">
        <Filter className="w-4 text-gray-400" />
        {category}
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-44 bg-[#1a1a1f] border border-gray-800 rounded-xl shadow-xl z-50">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => { setCategory(c); setOpen(false); }}
              className={`w-full text-left px-3 py-2.5 text-sm transition 
                ${category === c ? "bg-gray-200" : "text-gray-400 hover:bg-gray-800"}`}>
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

{/*Without QuizID it still gonna works, but let put it here for now*/}
function QuizCard({QuizID, QuizStatus, QuizTitle, QuestionCount,QuizDescription, QuizTime, QuizCompletion}){
 return (
    <div className="mt-5 flex items-center gap-4 border-2 bg-[#19191b] border-gray-800 hover:border-purple-600 rounded-lg p-5 transition">
      {/* Icon */}
      <div className="bg-purple-900/40 rounded-full p-4">
        <BookOpen className="text-[#7c3aed]"></BookOpen>
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Title + status */}
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-white font-bold">{QuizTitle}</h1>
          <span className={`text-xs px-3 py-0.75 rounded-full font-bold
            ${QuizStatus === "Published"
              ? "bg-green-500 text-white"
              : "border border-amber-500 text-orange-500 bg-amber-950"
            }`}>
            {QuizStatus}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-2">{QuizDescription}</p>

        {/* Quiz info */}
        <div className="flex gap-4 text-white text-xs">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> {QuestionCount} questions
            </span>
            
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {QuizTime} min
            </span>
            
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> {QuizCompletion} completions
            </span>
          <span>Created just now</span> {/* Probably need change if planning to connect to a database */}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 bg-[#101010] text-white border border-gray-800 rounded-lg hover:bg-purple-600 transition">
            View
        </button>

        <QuizMenu/>
      </div>     
    </div>
  );
}

function QuizComponent() {
  const [active, setActive] = useState("All Quizzes");
  const [search, setSearch] = useState("");
  const tabs = ["All Quizzes", "Published", "Draft"];
  const filtered = quizzes
    .filter(q => active === "All Quizzes" || q.QuizStatus === active)
    .filter(q => q.QuizTitle.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      {/* Quiz Title and Description */}
      <div className="flex justify-between w-full items-start mb-5">
        <div>
          <div className="flex rounded-lg">
            <div>
              <h3 className="text-white font-bold text-3xl">Quizzes</h3>
              <p className="text-gray-400 text-sm mt-3">Create, manage and analyze your quizzes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#151518] rounded-lg px-6 py-8">
        {/* Title */}
        <h1 className="text-white text-2xl font-bold tracking-tight">Quiz Library</h1>
        <h2 className="text-gray-400 text-base pt-1 mb-6">Browse and manage all your quizzes</h2>

        {/* Tabs + Search */}
        <div className="flex items-center justify-between">

          {/* Tabs */}
          <div className="p-1 border border-gray-800 inline-flex rounded-lg">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActive(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition
                  ${active === tab ? "bg-[#101010] text-white" : "text-gray-400 hover:text-white"}`}>
                {tab}
              </button>
            ))}
          </div>

          {/* Searchbar */}
          <div className="flex gap-3">
            <div className="flex items-center p-0 gap-2 bg-[#18181a] border border-[#27272a] pl-3 rounded-lg focus-within:border-purple-600">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search quizzes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mt-0 text-white text-sm outline-none border-none placeholder-gray-500 w-full bg-transparent"/>
            </div>

            <CategoryDropdown></CategoryDropdown>
          </div>
        </div>

        {/* Quiz cards */}
        <div className="mt-7">
          {filtered.map((quiz) => (
            <QuizCard key={quiz.QuizID} {...quiz} />
          ))}
        </div>
      </div>
    </>
  )
}

export default QuizComponent
