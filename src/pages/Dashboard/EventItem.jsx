export default function EventItem({ title, time, participants, button }) {
  return (
    <div className="flex justify-between items-center bg-[#121216] p-4 rounded-lg mb-3">

      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-gray-400 text-sm">
          {time} • {participants}
        </p>
      </div>

      <button className="bg-purple-600 px-3 py-1 rounded-lg text-sm hover:bg-purple-500">
        {button}
      </button>

    </div>
  );
}