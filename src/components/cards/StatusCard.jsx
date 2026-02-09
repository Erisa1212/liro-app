import { useState } from 'react';

function StatusCard() {
  const [isOn, setIsOn] = useState(true);

  return (
    <div className="bg-[#FFFFFF] border-[#E5E7EB] border-[1.5px] rounded-2xl p-6 shadow-xs w-full h-full">
      <div className="flex flex-col items-center text-center gap-4">
        {/* Main header - always the same */}
        <h2 className="text-[28px]  font-semibold text-stone-800">Your Status is set to:</h2>

        {/* Dynamic second header */}
        <h3 className="text-lg font-medium text-stone-700">
          {isOn ? 'Open for Recognition' : 'Focused Reading Mode'}
        </h3>

        {/* Toggle switch */}
        <div className="flex items-center bg-stone-200 rounded-full p-1 ">
          <button
            onClick={() => setIsOn(true)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
              isOn 
                ? 'bg-green-500 text-white shadow-md' 
                : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            On
          </button>
          <button
            onClick={() => setIsOn(false)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
              !isOn 
                ? 'bg-[#E43630] backdrop-blur-[2.6px] text-white shadow-md' 
                : 'text-stone-400 hover:text-stone-600'
            }`}
            
          >
            Off
          </button>
        </div>

        {/* Dynamic description */}
        <p className="text-sm text-stone-500 max-w-xs">
          {isOn 
            ? 'Your book is visible to other readers, and nearby books are shown.' 
            : 'Your reading is private and nearby books are hidden.'}
        </p>
      </div>
    </div>
  );
}

export default StatusCard;