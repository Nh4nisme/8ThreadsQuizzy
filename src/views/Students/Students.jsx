"use client";

import { useEffect, useState, useMemo } from "react";
import StudentRow from "./components/StudentRow.jsx";
import { fetchTeacherStudents, assignStudentToClassRequest } from "../../lib/quiz-client.js";
import { X } from "lucide-react";

function AssignModal({ isOpen, onClose, onConfirm, selectedCount }) {
  const [className, setClassName] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#1a1a1f] border border-gray-800 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Assign to Class</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition">
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        
        <p className="text-gray-400 mb-6">
          You are assigning <span className="text-purple-400 font-semibold">{selectedCount}</span> student(s) to a new class.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Class Name</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="e.g. 10A, Math-2024"
              className="w-full bg-[#111115] border border-gray-700 px-4 py-3 rounded-xl text-white outline-none focus:border-purple-500 transition"
              autoFocus
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-700 font-medium text-gray-300 hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(className)}
              disabled={!className.trim()}
              className="flex-1 px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-white transition shadow-lg shadow-purple-500/20"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All Students");
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadStudents = async (showLoading = true) => {
    try {
      if (showLoading) setIsLoading(true);
      const data = await fetchTeacherStudents();
      setStudents(data.students || []);
    } catch (err) {
      console.error("Failed to load students:", err);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
    
    // Auto-update every 10 seconds
    const interval = setInterval(() => {
      loadStudents(false);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const classTabs = useMemo(() => {
    const classes = ["All Students", ...new Set(students.map((s) => s.class))];
    return classes.filter(c => c !== "Unassigned");
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students
      .filter((s) =>
        activeTab === "All Students" ? true : s.class === activeTab
      )
      .filter((s) =>
        `${s.name} ${s.email} ${s.class}`.toLowerCase().includes(search.toLowerCase())
      );
  }, [students, activeTab, search]);

  const handleToggleStudent = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleAll = () => {
    if (selectedIds.length === filteredStudents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredStudents.map(s => s.id));
    }
  };

  const handleConfirmAssign = async (className) => {
    try {
      await assignStudentToClassRequest(selectedIds, className.trim());
      setIsModalOpen(false);
      setSelectedIds([]);
      loadStudents();
    } catch (err) {
      alert("Failed to assign class: " + err.message);
    }
  };

  return (
    <div className="text-white min-h-screen">
      {/* PAGE HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Students</h1>
          <p className="text-gray-400 mt-1">
            Manage your students and track their real-time progress
          </p>
        </div>

        <div className="flex gap-3">
          {selectedIds.length > 0 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-500 px-6 py-2.5 rounded-xl font-semibold transition flex items-center gap-2 shadow-lg shadow-purple-500/20"
            >
              Assign {selectedIds.length} to Class
            </button>
          )}
        </div>
      </div>

      {/* CARD */}
      <div className="bg-[#121216] border border-gray-800/50 rounded-2xl p-8 shadow-xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-xl font-semibold text-white">Student Directory</h2>
            <p className="text-gray-400 mt-1">View and manage all your students</p>
          </div>
          
          <div className="flex gap-4">
             <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search students..."
                  className="bg-[#111115] border border-gray-700/50 w-64 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-purple-500 transition-all pl-10"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </span>
             </div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-800/50 pb-6">
          <div className="flex gap-3 bg-[#0a0a0c] p-1.5 rounded-2xl border border-gray-800/50">
            {classTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab 
                    ? "bg-[#1a1a20] text-white shadow-lg shadow-black/40" 
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div className="border border-gray-800/50 rounded-2xl overflow-hidden bg-[#0a0a0c]">
          {/* header */}
          <div className="grid grid-cols-[50px_1fr_120px_120px_120px_150px] px-6 py-4 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-800/50 bg-[#121216]">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                checked={selectedIds.length === filteredStudents.length && filteredStudents.length > 0}
                onChange={handleToggleAll}
                className="w-4 h-4 rounded border-gray-700 bg-black text-purple-600 focus:ring-purple-500 cursor-pointer"
              />
            </div>
            <div>Name</div>
            <div>Class</div>
            <div>Quizzes</div>
            <div>Avg. Score</div>
            <div>Last Activity</div>
          </div>

          {/* rows */}
          <div className="divide-y divide-gray-800/50">
            {isLoading ? (
              <div className="px-6 py-16 text-center">
                <div className="inline-block w-8 h-8 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium">Loading your students...</p>
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <p className="text-gray-500 font-medium">No students found matching your criteria.</p>
              </div>
            ) : (
              filteredStudents.map((student) => (
                <StudentRow 
                  key={student.id} 
                  student={student} 
                  isSelected={selectedIds.includes(student.id)}
                  onToggle={handleToggleStudent}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <AssignModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAssign}
        selectedCount={selectedIds.length}
      />
    </div>
  );
}
