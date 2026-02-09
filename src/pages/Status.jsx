import { useState } from 'react';
import { getNearbyBooks, addToSavedBooks } from '../api/BookData.js';

function Status() {
  const [isOpenToRecognition, setIsOpenToRecognition] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const nearbyBooks = getNearbyBooks();

  const openBookModal = (book) => {
    setSelectedBook(book);
    setSaveSuccess(false);
  };

  const closeBookModal = () => {
    setSelectedBook(null);
    setSaveSuccess(false);
  };

  const handleSaveBook = () => {
    if (!selectedBook) return;
    setIsSaving(true);

    setTimeout(() => {
      addToSavedBooks(selectedBook);
      setIsSaving(false);
      setSaveSuccess(true);

      // Close modal after showing success
      setTimeout(() => {
        closeBookModal();
      }, 1500);
    }, 500);
  };

  return (
    <div className="min-h-full bg-[#F9FAFB] p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#101828] tracking-[0.4px]">Your Status</h1>
        <p className="text-[#4A5565] text-[20px] leading-6 tracking-[-0.31px] mt-6.5 font-400">
          You can change this anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className={`text-xl font-semibold mb-4 ${isOpenToRecognition ? 'text-[#22C55E]' : 'text-[#E7000B]'}`}>
            {isOpenToRecognition ? 'You are Open to Recognition.' : 'You are in Focused Reading Mode.'}
          </h2>
          
          {isOpenToRecognition ? (
            <div className="text-[#4A5565] space-y-3">
              <p>
                With this setting turned on, your current book can be visible to nearby readers who are also open.
              </p>
              <p>
                This does not start a conversation. It only makes recognition possible.
              </p>
              <p>
                Because you are Open for Recognition, books around you are shown below.
              </p>
            </div>
          ) : (
            <div className="text-[#4A5565] space-y-3">
              <p>
                Your reading remains private and is not visible to others.
              </p>
              <p>
                This mode helps you stay focused without signaling availability for recognition.
              </p>
              <p>
                Because you are in Focused Reading Mode, nearby books are not shown below.
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-center">
          <div className="flex items-center bg-[#E5E7EB] rounded-full p-1">
            <button
              onClick={() => setIsOpenToRecognition(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isOpenToRecognition
                  ? 'bg-[#22C55E] text-white'
                  : 'text-[#6B7280] hover:text-[#374151]'
              }`}
            >
              On
            </button>
            <button
              onClick={() => setIsOpenToRecognition(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !isOpenToRecognition
                  ? 'bg-[#6B7280] text-white'
                  : 'text-[#6B7280] hover:text-[#374151]'
              }`}
            >
              Off
            </button>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-[#101828]">Books around you</h2>
              <p className="text-[#4A5565] mt-1">
                These books are being read nearby right now by people who are open to recognition.
              </p>
            </div>
            {isOpenToRecognition && (
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#22C55E] rounded-full"></span>
                <span className="text-[#22C55E] font-medium">Available now</span>
              </div>
            )}
          </div>

          {isOpenToRecognition ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {nearbyBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => openBookModal(book)}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="aspect-[2/3] bg-gradient-to-br from-[#E5E7EB] to-[#D1D5DB] rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                      src={book.image} 
                      alt={book.title}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full items-center justify-center hidden">
                      <svg
                        className="w-12 h-12 text-[#9CA3AF]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 shadow-sm">
              <div className="text-[#9CA3AF] text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
                <p className="text-lg">Nearby books are hidden in Focused Reading Mode</p>
                <p className="text-sm mt-2">Turn on recognition to see what others are reading</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-[#9CA3AF] text-sm">
        © Liro
      </div>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 pl-64"
          onClick={closeBookModal}
        >
          {/* Modal Content */}
          <div 
            className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-2xl mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={closeBookModal}
              className="absolute top-6 right-6 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
            >
              <svg 
                className="w-8 h-8" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>

            <div className="flex gap-8">
              {/* Book Cover */}
              <div className="w-48 shrink-0">
                <img 
                  src={selectedBook.image} 
                  alt={selectedBook.title}
                  className="w-full object-contain rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.src = '';
                    e.target.className = 'w-full aspect-[2/3] bg-gradient-to-br from-[#E5E7EB] to-[#D1D5DB] rounded-lg';
                  }}
                />
              </div>

              {/* Book Details */}
              <div className="flex flex-col gap-4 flex-1">
                {/* Title and Author */}
                <div>
                  <h2 className="text-2xl font-semibold text-[#101828]">{selectedBook.title}</h2>
                  <p className="text-[#6B7280] text-lg">by {selectedBook.author}</p>
                </div>

                {/* Book Info */}
                <div className="space-y-3 text-[#101828]">
                  <div>
                    <span className="font-medium">ISBN: </span>
                    <span>{selectedBook.isbn}</span>
                  </div>
                  <div>
                    <span className="font-medium">Date published: </span>
                    <span>{selectedBook.datePublished}</span>
                  </div>
                  <div>
                    <span className="font-medium">Publisher: </span>
                    <span>{selectedBook.publisher}</span>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[#101828] font-medium">Genre:</span>
                  <div className="flex gap-2 flex-wrap">
                    {selectedBook.genres.map((genre, index) => (
                      <span 
                        key={index}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${genre.color}`}
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Save Book Button */}
            {saveSuccess ? (
              <div className="w-full mt-8 py-3 bg-green-100 text-green-700 font-semibold rounded-xl flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Saved to your collection!
              </div>
            ) : (
              <button 
                onClick={handleSaveBook}
                disabled={isSaving}
                className="w-full mt-8 py-3 bg-[#E7000B] hover:bg-red-700 text-white font-semibold rounded-xl transition-colors disabled:bg-red-400"
              >
                {isSaving ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </span>
                ) : (
                  'Save Book'
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Status;