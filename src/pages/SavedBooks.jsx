import { useState, useEffect, useRef } from 'react';
import { getSavedBooks, searchBooksByISBN, addToSavedBooks, removeFromSavedBooks } from '../api/BookData.js';

function SavedBooks() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [savedBooks, setSavedBooks] = useState(getSavedBooks());
  
  // Add Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedNewBook, setSelectedNewBook] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const dropdownRef = useRef(null);

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

  const openBookModal = (book) => {
    setSelectedBook(book);
  };

  const closeBookModal = () => {
    setSelectedBook(null);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setSearchTerm('');
    setSelectedNewBook(null);
    setSearchResults([]);
    setShowDropdown(false);
    setSuccessMessage('');
  };

  const handleSelectBook = (book) => {
    setSelectedNewBook(book);
    setSearchTerm(book.isbn);
    setShowDropdown(false);
  };

  const handleAddBook = () => {
    if (!selectedNewBook) return;
    setIsAdding(true);

    setTimeout(() => {
      const addedBook = addToSavedBooks(selectedNewBook);
      
      setIsAdding(false);
      setSuccessMessage('"' + addedBook.title + '" added to Saved Books!');
      
      // Refresh the saved books list
      setSavedBooks(getSavedBooks());

      setTimeout(() => {
        closeAddModal();
      }, 2000);
    }, 500);
  };

  const handleRemoveBook = () => {
    if (!selectedBook) return;
    
    removeFromSavedBooks(selectedBook.id);
    setSavedBooks(getSavedBooks());
    closeBookModal();
  };

  return (
    <div className="min-h-full bg-[#F9FAFB] p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#101828] tracking-[0.4px]">Saved Books</h1>
          <p className="text-[#4A5565] text-[20px] leading-6 tracking-[-0.31px] mt-2">
            Titles you came across and chose to save.
          </p>
        </div>
        
        {/* Add New Book Button */}
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-[#E7000B] hover:bg-red-700 text-white font-medium rounded-xl transition-colors"
        >
          <span className="text-xl leading-none">+</span>
          Add New Book
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {savedBooks.map((book) => (
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

      <div className="mt-12 text-center text-[#9CA3AF] text-sm">
        © Liro
      </div>

      {/* Book Details Modal */}
      {selectedBook && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 pl-64"
          onClick={closeBookModal}
        >
          <div 
            className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-2xl mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
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

              <div className="flex flex-col gap-4 flex-1">
                <div>
                  <h2 className="text-2xl font-semibold text-[#101828]">{selectedBook.title}</h2>
                  <p className="text-[#6B7280] text-lg">by {selectedBook.author}</p>
                </div>

                <div className="space-y-3 text-[#101828]">
                  <div>
                    <span className="font-medium">ISBN: </span>
                    <span className="text-[#4A5565]">{selectedBook.isbn}</span>
                  </div>
                  <div>
                    <span className="font-medium">Date published: </span>
                    <span className="text-[#4A5565]">{selectedBook.datePublished}</span>
                  </div>
                  <div>
                    <span className="font-medium">Publisher: </span>
                    <span className="text-[#4A5565]">{selectedBook.publisher}</span>
                  </div>
                </div>

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

            <button 
              onClick={handleRemoveBook}
              className="w-full mt-8 py-3 bg-[#E7000B] hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
            >
              Remove from Saved
            </button>
          </div>
        </div>
      )}

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
                  <p className="text-stone-500">Add a book to your saved collection.</p>
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
                      setSelectedNewBook(null);
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
                {selectedNewBook && (
                  <div className="w-full bg-white rounded-xl p-4 border border-stone-200">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-24 bg-gradient-to-br from-[#E5E7EB] to-[#D1D5DB] rounded-lg flex-shrink-0 overflow-hidden">
                        <img 
                          src={selectedNewBook.image} 
                          alt={selectedNewBook.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-stone-800">{selectedNewBook.title}</p>
                        <p className="text-sm text-stone-500">{selectedNewBook.author}</p>
                        <p className="text-xs text-stone-400 mt-1">{selectedNewBook.totalPages} pages • {selectedNewBook.publisher}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Add Book Button */}
                <button 
                  onClick={handleAddBook}
                  disabled={!selectedNewBook || isAdding}
                  className={`w-full py-3 font-semibold rounded-xl transition-colors ${
                    selectedNewBook && !isAdding
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
                    'Save Book'
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

export default SavedBooks;