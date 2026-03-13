import userIcon from "../../assets/user.png";

export default function StudentItem({ rank, name, subject, score, icon }) {
  return (
    <div className="flex justify-between items-center mb-4">

      <div className="flex items-center gap-3">
        
        {/* Rank */}
        <span className="bg-[#2a2a2f] w-7 h-7 flex items-center justify-center rounded-full">
          {rank}
        </span>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img src={userIcon} className="w-full h-full object-cover" />
        </div>

        {/* Name */}
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-gray-400 text-sm">{subject}</p>
        </div>

      </div>

      {/* Score + icon */}
      <div className="flex items-center gap-2">
  <img
    src={icon}
    className="w-5 h-5 brightness-0 saturate-100 invert-[55%] sepia-[97%] saturate-[900%] hue-rotate-[350deg]"
  />
  <span className="text-orange-400 font-semibold text-lg">{score}</span>
</div>

    </div>
  );
}