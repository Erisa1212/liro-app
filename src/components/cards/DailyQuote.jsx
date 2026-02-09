function DailyQuoteCard() {
    return (
      <div className="bg-[#FFFFFF] border-[#E5E7EB] border-[1.5px] rounded-2xl p-6 shadow-sm w-full h-full">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <h2 className="text-[28px] font-semibold text-stone-800 text-left">Daily Quote</h2>
  
          {/* Quote */}
          <p className="text-[22px] text-[#4A5565] text-left ">
            "It is only with the heart that one can see rightly; what is essential is invisible to the eye."
          </p>
  
          <p className="text-[#4A5565] text-sm text-right italic">
            —Antoine de Saint-Exupéry, The Little Prince
          </p>
        </div>
      </div>
    );
  }
  
  export default DailyQuoteCard;