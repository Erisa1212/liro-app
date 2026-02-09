// Books data for the app
export const booksData = {
  currentlyReading: [
    {
      id: 1,
      title: 'Wisdom Takes Work',
      author: 'Ryan Holiday',
      image: 'src/assets/wisdom.png',
      isbn: '978-0-5932-4521-8',
      currentPage: 41,
      totalPages: 319,
      startedOn: '14 July 2025',
    },
    {
      id: 2,
      title: 'The Daily Stoic',
      author: 'Ryan Holiday',
      image: 'src/assets/stoic.png',
      isbn: '978-0-7352-1173-5',
      currentPage: 302,
      totalPages: 416,
      startedOn: '01 February 2025',
    },
    {
      id: 3,
      title: 'Design as Art',
      author: 'Bruno Munari',
      image: 'src/assets/design.png',
      isbn: '978-0-14-103581-9',
      currentPage: 60,
      totalPages: 224,
      startedOn: '27 May 2025',
    },
  ],
  finishedBooks: [
    {
      id: 5,
      title: 'Atlas of the Heart',
      author: 'Brené Brown',
      image: 'src/assets/atlas.png',
      isbn: '978-0-399-59255-4',
      totalPages: 336,
      finishedOn: '25 December 2024',
    },
    {
      id: 6,
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      image: 'src/assets/think-fast.png',
      isbn: '978-0-374-53355-7',
      totalPages: 499,
      finishedOn: '15 November 2024',
    },
    {
      id: 7,
      title: 'Design is Storytelling',
      author: 'Ellen Lupton',
      image: 'src/assets/storytelling.png',
      isbn: '978-1-942303-19-0',
      totalPages: 160,
      finishedOn: '02 October 2024',
    },
  ],
  savedBooks: [
    {
      id: 9,
      title: 'Tiny Experiments',
      author: 'Anne-Laure Le Cunff',
      image: 'src/assets/experiments.png',
      isbn: '978-0-593-65287-4',
      datePublished: '2024',
      publisher: 'Portfolio',
      genres: [
        { name: 'Self-Help', color: 'bg-[#BE123C] text-white' },
        { name: 'Productivity', color: 'bg-[#881337] text-white' },
      ],
    },
    {
      id: 10,
      title: 'Breaking the Habit of Being Yourself',
      author: 'Dr. Joe Dispenza',
      image: 'src/assets/yourself.png',
      isbn: '978-1-4019-3808-4',
      datePublished: '2012',
      publisher: 'Hay House',
      genres: [
        { name: 'Self-Help', color: 'bg-[#BE123C] text-white' },
        { name: 'Psychology', color: 'bg-[#881337] text-white' },
        { name: 'Science', color: 'bg-[#F9A8D4] text-[#881337]' },
      ],
    },
    {
      id: 11,
      title: 'Atlas of the Heart',
      author: 'Brené Brown',
      image: 'src/assets/atlas.png',
      isbn: '978-0-399-59255-4',
      datePublished: '2021',
      publisher: 'Random House',
      genres: [
        { name: 'Psychology', color: 'bg-[#BE123C] text-white' },
        { name: 'Self-Help', color: 'bg-[#881337] text-white' },
      ],
    },
    {
      id: 12,
      title: 'Wisdom Takes Work',
      author: 'Ryan Holiday',
      image: 'src/assets/wisdom.png',
      isbn: '978-0-5932-4521-8',
      datePublished: '2023',
      publisher: 'Portfolio',
      genres: [
        { name: 'Philosophy', color: 'bg-[#BE123C] text-white' },
        { name: 'Self-Help', color: 'bg-[#881337] text-white' },
        { name: 'Stoicism', color: 'bg-[#F9A8D4] text-[#881337]' },
      ],
    },
    {
      id: 13,
      title: "Man's Search for Meaning",
      author: 'Viktor E. Frankl',
      image: 'src/assets/man-search.png',
      isbn: '978-0-8070-1429-5',
      datePublished: '1946',
      publisher: 'Beacon Press',
      genres: [
        { name: 'Psychology', color: 'bg-[#BE123C] text-white' },
        { name: 'Memoir', color: 'bg-[#881337] text-white' },
      ],
    },
  ],
  nearbyBooks: [
    {
      id: 108,
      title: 'Creativity for Sale',
      author: 'Jason SurfrApp',
      image: 'src/assets/creativity_sale.jpg',
      isbn: '978-0-9887-4231-5',
      totalPages: 224,
      datePublished: '2014',
      publisher: 'IWearYourShirt',
      genres: [
        { name: 'Business', color: 'bg-[#BE123C] text-white' },
        { name: 'Creativity', color: 'bg-[#881337] text-white' },
      ],
    },
    {
      id: 15,
      title: 'Wisdom Takes Work',
      author: 'Ryan Holiday',
      image: 'src/assets/wisdom.png',
      isbn: '978-0-5932-4521-8',
      datePublished: '2023',
      publisher: 'Portfolio',
      genres: [
        { name: 'Philosophy', color: 'bg-[#BE123C] text-white' },
        { name: 'Self-Help', color: 'bg-[#881337] text-white' },
        { name: 'Stoicism', color: 'bg-[#F9A8D4] text-[#881337]' },
      ],
    },
    {
      id: 16,
      title: 'Atlas of the Heart',
      author: 'Brené Brown',
      image: 'src/assets/atlas.png',
      isbn: '978-0-399-59255-4',
      datePublished: '2021',
      publisher: 'Random House',
      genres: [
        { name: 'Psychology', color: 'bg-[#BE123C] text-white' },
        { name: 'Self-Help', color: 'bg-[#881337] text-white' },
        { name: 'Nonfiction', color: 'bg-[#F9A8D4] text-[#881337]' },
      ],
    },
  ],
};

export const bookDatabase = [
  {
    id: 107,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    image: 'src/assets/alchemist.png',
    isbn: '978-0-7352-1173-5',
    totalPages: 208,
    datePublished: '1988',
    publisher: 'HarperOne',
    genres: [
      { name: 'Fiction', color: 'bg-[#BE123C] text-white' },
      { name: 'Classics', color: 'bg-[#881337] text-white' },
      { name: 'Fantasy', color: 'bg-[#F9A8D4] text-[#881337]' },
    ],
  },
  {
    id: 102,
    title: 'Deep Work',
    author: 'Cal Newport',
    image: 'src/assets/deep-work.png',
    isbn: '978-1-4555-8669-1',
    totalPages: 304,
    datePublished: '2016',
    publisher: 'Grand Central Publishing',
    genres: [
      { name: 'Productivity', color: 'bg-[#BE123C] text-white' },
      { name: 'Business', color: 'bg-[#881337] text-white' },
    ],
  },
  {
    id: 103,
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    image: 'src/assets/psychology-money.png',
    isbn: '978-0-85719-768-0',
    totalPages: 256,
    datePublished: '2020',
    publisher: 'Harriman House',
    genres: [
      { name: 'Finance', color: 'bg-[#BE123C] text-white' },
      { name: 'Psychology', color: 'bg-[#881337] text-white' },
    ],
  },
  {
    id: 104,
    title: 'Meditations',
    author: 'Marcus Aurelius',
    image: 'src/assets/meditations.png',
    isbn: '978-0-14-044933-4',
    totalPages: 256,
    datePublished: '180 AD',
    publisher: 'Penguin Classics',
    genres: [
      { name: 'Philosophy', color: 'bg-[#BE123C] text-white' },
      { name: 'Stoicism', color: 'bg-[#881337] text-white' },
      { name: 'Classics', color: 'bg-[#F9A8D4] text-[#881337]' },
    ],
  },
  {
    id: 105,
    title: 'The 4-Hour Workweek',
    author: 'Tim Ferriss',
    image: 'src/assets/4hour.png',
    isbn: '978-0-307-46535-8',
    totalPages: 416,
    datePublished: '2007',
    publisher: 'Harmony',
    genres: [
      { name: 'Business', color: 'bg-[#BE123C] text-white' },
      { name: 'Self-Help', color: 'bg-[#881337] text-white' },
    ],
  },
  {
    id: 106,
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    image: 'src/assets/sapiens.png',
    isbn: '978-0-06-231609-7',
    totalPages: 464,
    datePublished: '2011',
    publisher: 'Harper',
    genres: [
      { name: 'History', color: 'bg-[#BE123C] text-white' },
      { name: 'Science', color: 'bg-[#881337] text-white' },
      { name: 'Nonfiction', color: 'bg-[#F9A8D4] text-[#881337]' },
    ],
  },
];

export const getCurrentlyReadingBooks = () => booksData.currentlyReading;
export const getFinishedBooks = () => booksData.finishedBooks;
export const getSavedBooks = () => booksData.savedBooks;
export const getNearbyBooks = () => booksData.nearbyBooks;
export const getAllBooks = () => [
  ...booksData.currentlyReading,
  ...booksData.finishedBooks,
  ...booksData.savedBooks,
];

export const searchBooksByISBN = (searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return [];
  }
  
  const normalizedSearch = searchTerm.replace(/-/g, '').toLowerCase();
  
  const results = bookDatabase.filter(book => {
    const normalizedISBN = book.isbn.replace(/-/g, '').toLowerCase();
    return normalizedISBN.includes(normalizedSearch);
  });
  
  return results.slice(0, 3);
};

const generateId = () => {
  const allIds = [
    ...booksData.currentlyReading,
    ...booksData.finishedBooks,
    ...booksData.savedBooks,
    ...booksData.nearbyBooks,
  ].map(book => book.id);
  
  return Math.max(...allIds) + 1;
};

const getCurrentDate = () => {
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return new Date().toLocaleDateString('en-GB', options);
};



export const addToCurrentlyReading = (book) => {
  const newBook = {
    id: generateId(),
    title: book.title,
    author: book.author,
    image: book.image,
    isbn: book.isbn,
    currentPage: 0,
    totalPages: book.totalPages,
    startedOn: getCurrentDate(),
  };
  
  booksData.currentlyReading.push(newBook);
  return newBook;
};

// Add book to saved books
export const addToSavedBooks = (book) => {
  const newBook = {
    id: generateId(),
    title: book.title,
    author: book.author,
    image: book.image,
    isbn: book.isbn,
    datePublished: book.datePublished,
    publisher: book.publisher,
    genres: book.genres || [],
  };
  
  booksData.savedBooks.push(newBook);
  return newBook;
};

export const addToFinishedBooks = (book) => {
  const newBook = {
    id: generateId(),
    title: book.title,
    author: book.author,
    image: book.image,
    isbn: book.isbn,
    totalPages: book.totalPages,
    finishedOn: getCurrentDate(),
  };
  
  booksData.finishedBooks.push(newBook);
  return newBook;
};

export const removeFromSavedBooks = (bookId) => {
  const index = booksData.savedBooks.findIndex(book => book.id === bookId);
  if (index !== -1) {
    booksData.savedBooks.splice(index, 1);
  }
};