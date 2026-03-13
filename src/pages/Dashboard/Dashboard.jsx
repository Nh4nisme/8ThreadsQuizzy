import StatsCard from "./StatsCard";
import EventItem from "./EventItem";
import StudentItem from "./StudentItem";
import QuizCard from "./QuizCard";

export default function Dashboard() {
  return (
    <div className=" text-white p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-400">
            Welcome back, Sarah! Here's what's happening with your quizzes
          </p>
        </div>

        <button className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500">
          + Create New Quiz
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard title="Total Quizzes" number="2,543" percent="+12.5%" />
        <StatsCard title="Active Events" number="2,543" percent="+12.5%" />
        <StatsCard title="Students" number="2,543" percent="+12.5%" />
        <StatsCard title="Avg. Completion" number="2,543" percent="-12.5%" />
      </div>

      {/* EVENTS + STUDENTS */}
      <div className="grid grid-cols-3 gap-6 mb-6">

        {/* EVENTS */}
      <div className="col-span-2 bg-[#1a1a1f] p-6 rounded-xl">
        <h1 className="text-lg font-semibold mb-1">Recent Events</h1>

          <p className="text-gray-400 mb-4">
            Manage your upcoming and active quiz events
          </p>

          <EventItem
            title="Science Mid-term Quiz"
            time="Today, 2:30 PM"
            participants="32 participants"
            button="View Live"
          />

          <EventItem
            title="Mathematics Weekly Test"
            time="Tomorrow, 10:00 AM"
            participants="28 participants"
            button="Manage"
          />

          <EventItem
            title="History Final Exam"
            time="May 20, 9:00 AM"
            participants="45 participants"
            button="Manage"
          />
      </div>

        {/* STUDENTS */}
        <div className="bg-[#1a1a1f] p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Top Students</h2>

          <StudentItem rank="1" name="Alex John" subject="Science" score="950" />
          <StudentItem rank="2" name="Emma Watson" subject="Mathematics" score="920" />
          <StudentItem rank="3" name="Michael Clark" subject="Physics" score="980" />
          <StudentItem rank="4" name="Sophia Green" subject="English" score="890" />
          <StudentItem rank="5" name="Lucia Wilde" subject="Science" score="870" />
        </div>
      </div>

      {/* QUIZZES */}
      <div className="bg-[#1a1a1f] p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Recent Quizzes</h2>

        <div className="grid grid-cols-4 gap-4">

          <QuizCard
            title="Introduction to Biology"
            questions="15"
            completions="28"
            percent={75}
          />

          <QuizCard
            title="Introduction to Biology"
            questions="15"
            completions="28"
            percent={40}
          />

          <QuizCard
            title="Introduction to Biology"
            questions="15"
            completions="28"
            percent={90}
          />

          <div className="border border-dashed border-gray-600 rounded-xl flex items-center justify-center">
            <button className="text-purple-400 text-lg">+ Create Quiz</button>
          </div>

        </div>
      </div>

    </div>
  );
}