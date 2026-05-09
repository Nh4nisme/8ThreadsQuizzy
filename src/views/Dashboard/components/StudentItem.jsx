export default function StudentItem({ rank, name, subject, score, icon }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-3">
        <span className="bg-[#2a2a2f] w-7 h-7 flex items-center justify-center rounded-full">
          {rank}
        </span>

        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src="/assets/user.png"
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <p className="font-medium">{name}</p>
          <p className="text-gray-400 text-sm">{subject}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <img
          src={icon}
          alt=""
          className="w-5 h-5 brightness-0 saturate-100 invert-[55%] sepia-[97%] saturate-[900%] hue-rotate-[350deg]"
        />
        <span className="text-orange-400 font-semibold text-lg">{score}</span>
      </div>
    </div>
  );
}
