export default function StudentItem({ rank, name, subject, score }) {
  return (
    <div className="flex justify-between items-center mb-4">

      <div className="flex items-center gap-3">
        <span className="bg-[#2a2a2f] w-7 h-7 flex items-center justify-center rounded-full">
          {rank}
        </span>

        <div>
          <p className="font-medium">{name}</p>
          <p className="text-gray-400 text-sm">{subject}</p>
        </div>
      </div>

      <span className="text-orange-400 font-semibold">{score}</span>

    </div>
  );
}