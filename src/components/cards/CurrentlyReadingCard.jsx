import Label from "../Label";

function CurrentlyReadingCard() {
  const progress = (41 / 319) * 100;

  return (
    <div className="bg-[#FFFFFF] border-[#E5E7EB] border-[1.5px] rounded-2xl p-6 shadow-xs w-full h-full">
      <div className="flex gap-6">
        {/* Book cover - object-contain shows full image, h-auto for natural aspect ratio */}
        <img 
          src="src/assets/atomic-habits.png" 
          alt="Atomic Habits" 
          className="w-40 object-contain rounded-lg shrink-0 self-start"
        />

        {/* Book details */}
        <div className="flex flex-col gap-4">
          {/* Main header */}
          <h2 className="text-[28px]  font-semibold text-stone-800">Currently Reading</h2>

          {/* Title and author */}
          <div>
            <h3 className="text-xl font-medium text-stone-800">Atomic Habits</h3>
            <p className="text-stone-500">by James Clear</p>
          </div>

          {/* Genre */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-black">Genre:</span>
            <div className="flex gap-2 flex-wrap">
              <Label color="bg-[#BE123C] text-white">Self-Help</Label>
              <Label color="bg-[#F9A8D4] text-[#881337]">Non-fiction</Label>
              <Label color="bg-[#881337] text-white">Psychology</Label>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3">
            <span className="text-black shrink-0">Progress:</span>
            <div className="flex-1 min-w-24 h-2.5 bg-stone-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-stone-700 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-black text-sm shrink-0">41/319 pages</span>
          </div>

          <div>
            <span className="text-black">Started on: </span>
            <span className="text-stone-800">14 July 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentlyReadingCard;