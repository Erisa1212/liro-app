import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentlyReadingBooks, getFinishedBooks, searchBooksByISBN, addToCurrentlyReading, addToSavedBooks, addToFinishedBooks } from '../api/BookData.js';

function Reading() {
  const [showFinished, setShowFinished] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Modal state
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [addToList, setAddToList] = useState('currentlyReading');
  const [isAdding, setIsAdding] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentlyReadingBooks = getCurrentlyReadingBooks();
  const finishedBooks = getFinishedBooks();

  useEffect(() => {
    if (location.state?.openAddModal) {
      setIsAddModalOpen(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  // Search for books when search term changes
  useEffect(() => {
    if (searchTerm.length >= 3) {
      const results = searchBooksByISBN(searchTerm);
      setSearchResults(results);
      setShowDropdown(results.length > 0);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setSearchTerm('');
    setSelectedBook(null);
    setSearchResults([]);
    setShowDropdown(false);
    setSuccessMessage('');
    setAddToList('currentlyReading');
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setSearchTerm(book.isbn);
    setShowDropdown(false);
  };

  const handleAddBook = () => {
    if (!selectedBook) return;
    setIsAdding(true);

    setTimeout(() => {
      let addedBook;
      let listName;

      switch (addToList) {
        case 'currentlyReading':
          addedBook = addToCurrentlyReading(selectedBook);
          listName = 'Currently Reading';
          break;
        case 'savedBooks':
          addedBook = addToSavedBooks(selectedBook);
          listName = 'Saved Books';
          break;
        case 'finishedBooks':
          addedBook = addToFinishedBooks(selectedBook);
          listName = 'Finished Books';
          break;
        default:
          addedBook = addToCurrentlyReading(selectedBook);
          listName = 'Currently Reading';
      }

      setIsAdding(false);
      setSuccessMessage('"' + addedBook.title + '" added to ' + listName + '!');

      setTimeout(() => {
        closeAddModal();
      }, 2000);
    }, 500);
  };

  return (
    <div className="min-h-full bg-[#F9FAFB] p-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#101828] tracking-[0.4px]">
            {showFinished ? 'Finished Books' : 'Currently Reading'}
          </h1>
          <p className="text-[#4A5565] text-[20px] leading-6 tracking-[-0.31px] mt-2">
            {showFinished 
              ? 'Books you have completed reading.' 
              : 'Books connected to your reading journey.'}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Add New Book Button */}
          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-[#E7000B] hover:bg-red-700 text-white font-medium rounded-xl transition-colors"
          >
            <span className="text-xl leading-none">+</span>
            Add New Book
          </button>
          
          {/* Toggle Link */}
          <button 
            onClick={() => setShowFinished(!showFinished)}
            className="text-[#101828] font-medium hover:text-[#E7000B] transition-colors flex items-center gap-1"
          >
            {showFinished ? '← Back to Currently Reading' : 'Check out Finished Books →'}
          </button>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {showFinished ? (
          // Finished Books - No progress bar
          finishedBooks.map((book) => (
            <div 
              key={book.id} 
              className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm"
            >
              <div className="flex gap-6">
                {/* Book Cover */}
                <img 
                  src={book.image} 
                  alt={book.title}
                  className="w-28 object-contain rounded-lg shrink-0 self-start"
                  onError={(e) => {
                    e.target.src = '';
                    e.target.className = 'w-28 h-40 bg-gradient-to-br from-[#E5E7EB] to-[#D1D5DB] rounded-lg shrink-0 self-start';
                  }}
                />

                <div className="flex flex-col gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-[#101828]">{book.title}</h3>
                    <p className="text-[#6B7280]">by {book.author}</p>
                  </div>

                  <div>
                    <span className="text-[#101828] font-medium">ISBN: </span>
                    <span className="text-[#4A5565]">{book.isbn}</span>
                  </div>

                  <div>
                    <span className="text-[#101828] font-medium">Pages: </span>
                    <span className="text-[#4A5565]">{book.totalPages} pages</span>
                  </div>

                  <div>
                    <span className="text-[#101828] font-medium">Finished on: </span>
                    <span className="text-[#4A5565]">{book.finishedOn}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          currentlyReadingBooks.map((book) => {
            const progress = (book.currentPage / book.totalPages) * 100;
            
            return (
              <div 
                key={book.id} 
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm"
              >
                <div className="flex gap-6">
                  {/* Book Cover */}
                  <img 
                    src={book.image} 
                    alt={book.title}
                    className="w-28 object-contain rounded-lg shrink-0 self-start"
                    onError={(e) => {
                      e.target.src = '';
                      e.target.className = 'w-28 h-40 bg-gradient-to-br from-[#E5E7EB] to-[#D1D5DB] rounded-lg shrink-0 self-start';
                    }}
                  />

                  {/* Book Details */}
                  <div className="flex flex-col gap-3 flex-1">
                    {/* Title and Author */}
                    <div>
                      <h3 className="text-xl font-semibold text-[#101828]">{book.title}</h3>
                      <p className="text-[#6B7280]">by {book.author}</p>
                    </div>

                    {/* ISBN */}
                    <div>
                      <span className="text-[#101828] font-medium">ISBN: </span>
                      <span className="text-[#4A5565]">{book.isbn}</span>
                    </div>

                    {/* Progress */}
                    <div className="flex items-center gap-3">
                      <span className="text-[#101828] font-medium shrink-0">Progress:</span>
                      <div className="flex-1 h-2.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#374151] rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-[#4A5565] text-sm shrink-0">
                        {book.currentPage}/{book.totalPages} pages
                      </span>
                    </div>

                    {/* Started On */}
                    <div>
                      <span className="text-[#101828] font-medium">Started on: </span>
                      <span className="text-[#4A5565]">{book.startedOn}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-12 text-center text-[#9CA3AF] text-sm self-end">
        © Liro
      </div>

      {/* Add New Book Modal */}
      {isAddModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 pl-64"
          onClick={closeAddModal}
        >
          <div 
            className="bg-stone-100 rounded-2xl p-8 shadow-lg w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {successMessage ? (
              // Success State
              <div className="flex flex-col items-center text-center gap-6 py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-stone-800">{successMessage}</p>
              </div>
            ) : (
              // Form State
              <div className="flex flex-col items-center text-center gap-6">
                {/* Header */}
                <div>
                  <h2 className="text-2xl font-semibold text-stone-800 mb-2">Add a New Book</h2>
                  <p className="text-stone-500">Add a book to your library so you can keep track of your reading.</p>
                </div>

                {/* ISBN Input with Dropdown */}
                <div className="w-full relative" ref={dropdownRef}>
                  <label className="block text-left text-sm font-medium text-stone-700 mb-2">
                    ISBN<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setSelectedBook(null);
                    }}
                    onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
                    placeholder="Enter ISBN number"
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white placeholder-stone-400 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E7000B] focus:border-transparent"
                  />
                  <p className="text-left text-xs text-stone-400 mt-2">You can find the ISBN on the back of the book.</p>

                  {/* Dropdown Results */}
                  {showDropdown && searchResults.length > 0 && (
                    <div className="absolute left-0 right-0 top-[52px] bg-white border border-stone-200 rounded-xl shadow-lg z-10 overflow-hidden">
                      {searchResults.map((book) => (
                        <button
                          key={book.id}
                          onClick={() => handleSelectBook(book)}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-stone-50 transition-colors text-left border-b border-stone-100 last:border-b-0"
                        >
                          <div className="w-10 h-14 bg-gradient-to-br from-[#E5E7EB] to-[#D1D5DB] rounded flex-shrink-0 overflow-hidden">
                            <img 
                              src={book.image} 
                              alt={book.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-stone-800 truncate">{book.title}</p>
                            <p className="text-sm text-stone-500 truncate">{book.author}</p>
                            <p className="text-xs text-stone-400">{book.isbn}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected Book Preview */}
                {selectedBook && (
                  <div className="w-full bg-white rounded-xl p-4 border border-stone-200">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-24 bg-gradient-to-br from-[#E5E7EB] to-[#D1D5DB] rounded-lg flex-shrink-0 overflow-hidden">
                        <img 
                          src={selectedBook.image} 
                          alt={selectedBook.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-stone-800">{selectedBook.title}</p>
                        <p className="text-sm text-stone-500">{selectedBook.author}</p>
                        <p className="text-xs text-stone-400 mt-1">{selectedBook.totalPages} pages • {selectedBook.publisher}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Add to List Selector */}
                {selectedBook && (
                  <div className="w-full">
                    <label className="block text-left text-sm font-medium text-stone-700 mb-2">
                      Add to
                    </label>
                    <select
                      value={addToList}
                      onChange={(e) => setAddToList(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E7000B] focus:border-transparent cursor-pointer"
                    >
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="savedBooks">Saved Books</option>
                      <option value="finishedBooks">Finished Books</option>
                    </select>
                  </div>
                )}

                {/* Add Book Button */}
                <button 
                  onClick={handleAddBook}
                  disabled={!selectedBook || isAdding}
                  className={`w-full py-3 font-semibold rounded-xl transition-colors ${
                    selectedBook && !isAdding
                      ? 'bg-[#E7000B] hover:bg-red-700 text-white cursor-pointer'
                      : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  }`}
                >
                  {isAdding ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Adding...
                    </span>
                  ) : (
                    'Add Book'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Reading;