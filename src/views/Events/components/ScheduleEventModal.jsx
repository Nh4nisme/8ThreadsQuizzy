"use client";

import { useState, useEffect } from "react";
import { X, Calendar, Clock, BookOpen, RotateCcw } from "lucide-react";
import { fetchTeacherQuizzes, fetchTeacherStudents } from "../../../lib/quiz-client";

export default function ScheduleEventModal({ isOpen, onClose, onConfirm, initialData = null }) {
  const [quizzes, setQuizzes] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quizId: "",
    startTime: "",
    endTime: "",
    allowRetakes: false,
    assignedClasses: [],
  });

  useEffect(() => {
    if (isOpen) {
      const loadInitialData = async () => {
        setIsLoading(true);
        try {
          const [quizzesData, studentsData] = await Promise.all([
            fetchTeacherQuizzes(),
            fetchTeacherStudents(),
          ]);
          setQuizzes(quizzesData.quizzes || []);
          
          // Extract unique classes
          const uniqueClasses = [...new Set(studentsData.students?.map(s => s.class).filter(Boolean))];
          setClasses(uniqueClasses);
        } catch (error) {
          console.error("Failed to load initial modal data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      loadInitialData();
    }

    if (initialData) {
      const formatForInput = (dateStr) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        // Correct timezone offset for local display
        const offset = d.getTimezoneOffset() * 60000;
        const localISODate = new Date(d.getTime() - offset).toISOString().slice(0, 16);
        return localISODate;
      };

      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        quizId: initialData.quizId?._id || initialData.quizId || "",
        startTime: formatForInput(initialData.startTime),
        endTime: formatForInput(initialData.endTime),
        allowRetakes: !!initialData.allowRetakes,
        assignedClasses: initialData.assignedClasses || [],
      });
    } else {
      setFormData({
        title: "",
        description: "",
        quizId: "",
        startTime: "",
        endTime: "",
        allowRetakes: false,
        assignedClasses: [],
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-[#1a1a1f] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="text-purple-500" size={24} />
            {initialData ? "Edit Quiz Event" : "Schedule Quiz Event"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Event Title</label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Science Mid-term Quiz"
              className="w-full bg-[#111115] border border-gray-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Short description for students..."
              className="w-full bg-[#111115] border border-gray-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500 transition-all h-20 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Start Time</label>
              <input
                required
                type="datetime-local"
                min={new Date().toISOString().slice(0, 16)}
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full bg-[#111115] border border-gray-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500 transition-all [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">End Time</label>
              <input
                required
                type="datetime-local"
                min={formData.startTime || new Date().toISOString().slice(0, 16)}
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full bg-[#111115] border border-gray-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500 transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Select Quiz</label>
            <select
              required
              value={formData.quizId}
              onChange={(e) => setFormData({ ...formData, quizId: e.target.value })}
              className="w-full bg-[#111115] border border-gray-700 rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-500 transition-all appearance-none"
            >
              <option value="" disabled>Choose a quiz to schedule...</option>
              {quizzes.map((quiz) => (
                <option key={quiz._id} value={quiz._id}>
                  {quiz.title} ({quiz.questions?.length || 0} questions)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Assign to Classes</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {classes.length > 0 ? classes.map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => {
                    const current = formData.assignedClasses;
                    const next = current.includes(cls) 
                      ? current.filter(c => c !== cls) 
                      : [...current, cls];
                    setFormData({ ...formData, assignedClasses: next });
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    formData.assignedClasses.includes(cls)
                      ? "bg-purple-600 border-purple-500 text-white"
                      : "bg-[#111115] border-gray-700 text-gray-400 hover:border-gray-500"
                  }`}
                >
                  {cls}
                </button>
              )) : (
                <p className="text-xs text-gray-500 italic">No classes found. Assign students to classes first.</p>
              )}
            </div>
            <p className="text-[10px] text-gray-500 mt-2">Only students in the selected classes will see this event.</p>
          </div>

          <div className="flex items-center gap-3 p-4 bg-[#111115] rounded-xl border border-gray-800">
            <div className="flex-1">
              <p className="text-white font-medium">Allow Retakes</p>
              <p className="text-xs text-gray-500">Allow students to attempt the quiz multiple times during the event period.</p>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, allowRetakes: !formData.allowRetakes })}
              className={`w-12 h-6 rounded-full transition-colors relative ${formData.allowRetakes ? 'bg-purple-600' : 'bg-gray-700'}`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.allowRetakes ? 'translate-x-6' : ''}`} />
            </button>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-700 font-medium text-gray-300 hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-white transition-all shadow-lg shadow-purple-500/20"
            >
              Schedule Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
