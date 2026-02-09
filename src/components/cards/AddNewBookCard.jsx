import { useState, useEffect, useRef } from 'react';
import { searchBooksByISBN, addToCurrentlyReading, addToSavedBooks, addToFinishedBooks } from '../../api/BookData.js';

function AddNewBookCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [addToList, setAddToList] = useState('currentlyReading');
  const [isAdding, setIsAdding] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    console.log('Search term:', searchTerm);
    if (searchTerm.length >= 3) {
      const results = searchBooksByISBN(searchTerm);
      console.log('Search results:', results);  
      setSearchResults(results);
      setShowDropdown(results.length > 0);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setSearchTerm(book.isbn);
    setShowDropdown(false);
  };

  const handleAddBook = () => {
    if (!selectedBook) return;

    setIsAdding(true);

    // Simulate a small delay for UX
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

      // Reset after showing success
      setTimeout(() => {
        setSuccessMessage('');
        setSearchTerm('');
        setSelectedBook(null);
        setAddToList('currentlyReading');
        setIsModalOpen(false);
      }, 2000);
    }, 500);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSearchTerm('');
    setSelectedBook(null);
    setSearchResults([]);
    setShowDropdown(false);
    setSuccessMessage('');
    setAddToList('currentlyReading');
  };

  return (
    <>
      <div className="bg-[#FFFFFF] border-[#E5E7EB] border-[1.5px] rounded-2xl p-6 shadow-sm w-full h-full">
        <div className="flex flex-col items-center text-center gap-6">
          <h2 className="text-[28px] font-semibold text-stone-800">Add New Book</h2>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-18.25 h-18.25 bg-[#FEF2F2] hover:bg-rose-200 rounded-2xl flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="text-[64px] font-normal text-[#E7000B] align-middle leading-none -mt-2">+</span>
          </button>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 pl-64"
          onClick={handleCloseModal}
        >
          {/* Modal Content */}
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
    </>
  );
}

export default AddNewBookCard;