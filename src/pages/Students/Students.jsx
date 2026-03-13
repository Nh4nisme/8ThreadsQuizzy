import StudentRow from "./components/StudentRow.jsx";

export default function Students() {
  return (
    <div className="text-white">

      {/* PAGE HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Students</h1>
          <p className="text-gray-400">
            Manage your students and track their progress
          </p>
        </div>

        <button className="bg-gradient-to-r from-purple-600 to-purple-500 px-4 py-2 rounded-lg font-medium">
          Invite Students
        </button>
      </div>

      {/* CARD */}
      <div className="bg-[#1a1a1f] border border-gray-800 rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-1">Student Directory</h2>

        <p className="text-gray-400 mb-6">
          View and manage all your students
        </p>

        {/* FILTER BAR */}
        <div className="flex justify-between items-center mb-6">

          {/* class tabs */}
          <div className="flex gap-2 bg-[#111115] p-1 rounded-lg">
            <button className="px-3 py-1 bg-black rounded-md">
              All Students
            </button>
            <button className="px-3 py-1 text-gray-400">
              10A
            </button>
            <button className="px-3 py-1 text-gray-400">
              10B
            </button>
          </div>

          {/* search */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search students..."
              className="bg-[#111115] border border-gray-700 px-3 py-2 rounded-lg text-sm"
            />

            <button className="bg-[#111115] border border-gray-700 px-3 py-2 rounded-lg text-sm">
              Name
            </button>
          </div>

        </div>

        {/* TABLE */}
        <div className="border border-gray-800 rounded-lg overflow-hidden">

          {/* header */}
          <div className="grid grid-cols-5 px-6 py-3 text-gray-400 text-sm border-b border-gray-800">
            <div>Name</div>
            <div>Class</div>
            <div>Quizzes Taken</div>
            <div>Average Score</div>
            <div>Last Active</div>
          </div>

          {/* rows */}
          <StudentRow />
          <StudentRow />
          <StudentRow />
          <StudentRow />

        </div>

      </div>

    </div>
  );
}

