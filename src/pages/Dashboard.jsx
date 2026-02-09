import CurrentlyReadingCard from '../components/cards/CurrentlyReadingCard';
import StatusCard from '../components/cards/StatusCard';
import AddNewBookCard from '../components/cards/AddNewBookCard';
import DailyQuoteCard from '../components/cards/DailyQuote';

function Dashboard() {
  return (
    <div className="min-h-full bg-[#F9FAFB] p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#101828] tracking-[0.4px]">Your Digital Bookmark Dashboard</h1>
        <p className="text-[#4A5565] text-[20px] leading-6 tracking-[-0.31px] mt-6.5 font-400">Manage your reading status and saved books while reading on the go</p>
      </div>


      {/* Content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CurrentlyReadingCard />
        </div>
        <StatusCard />

        <AddNewBookCard />
        <div className="lg:col-span-2">
          <DailyQuoteCard />
        </div>
      </div>

      <div className="mt-12 text-center text-[#9CA3AF] text-sm self-end">
        © Liro
      </div>
    </div>
  );
}

export default Dashboard;