import EventItem from "./EventItem";

export default function Events() {
  return (
    <div className="text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Quiz Events</h1>
          <p className="text-gray-400">
            Schedule and manage quiz sessions for your students
          </p>
        </div>

        <button className="bg-gradient-to-r from-purple-600 to-purple-500 px-4 py-2 rounded-lg">
          Schedule Event
        </button>
      </div>

      {/* CARD */}
      <div className="bg-[#1a1a1f] border border-gray-800 rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-1">
          Event Calendar
        </h2>

        <p className="text-gray-400 mb-6">
          View and manage your scheduled quiz events
        </p>

        {/* FILTER */}
        <div className="flex justify-between items-center mb-6">

          {/* tabs */}
          <div className="flex gap-2 bg-[#111115] p-1 rounded-lg">
            <button className="px-3 py-1 bg-black rounded-md">
              All Events
            </button>
            <button className="px-3 py-1 text-gray-400">
              Active
            </button>
            <button className="px-3 py-1 text-gray-400">
              Upcoming
            </button>
            <button className="px-3 py-1 text-gray-400">
              Completed
            </button>
          </div>

          {/* search */}
          <div className="flex gap-3">
            <input
              placeholder="Search events..."
              className="bg-[#111115] border border-gray-700 px-3 py-2 rounded-lg text-sm"
            />

            <button className="bg-[#111115] border border-gray-700 px-3 py-2 rounded-lg text-sm">
              All Quizzes
            </button>
          </div>

        </div>

        {/* EVENTS */}
        <div className="space-y-4">

          <EventItem
            title="Science Mid-term Quiz"
            status="Active"
            color="green"
          />

          <EventItem
            title="Mathematics Weekly Test"
            status="Upcoming"
            color="blue"
          />

          <EventItem
            title="Chemistry Quiz #3"
            status="Completed"
            color="gray"
          />

        </div>

      </div>

    </div>
  );
}