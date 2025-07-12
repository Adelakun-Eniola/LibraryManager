import React, { useState, useEffect } from 'react';
import './App.css';

// Mock data for demonstration
const mockBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'available', category: 'Classic' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', status: 'borrowed', category: 'Classic' },
  { id: 3, title: '1984', author: 'George Orwell', status: 'available', category: 'Dystopian' },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', status: 'available', category: 'Romance' },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', status: 'borrowed', category: 'Classic' },
  { id: 6, title: 'Lord of the Flies', author: 'William Golding', status: 'available', category: 'Adventure' },
];

const mockStats = {
  totalBooks: 1250,
  availableBooks: 890,
  borrowedBooks: 360,
  totalMembers: 450,
};

interface Book {
  id: number;
  title: string;
  author: string;
  status: string;
  category: string;
}

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    category: '',
    status: 'available'
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBook.title && newBook.author && newBook.category) {
      const book: Book = {
        id: books.length + 1,
        ...newBook
      };
      setBooks([...books, book]);
      setNewBook({ title: '', author: '', category: '', status: 'available' });
      setCurrentView('books');
    }
  };

  const toggleBookStatus = (id: number) => {
    setBooks(books.map(book =>
      book.id === id
        ? { ...book, status: book.status === 'available' ? 'borrowed' : 'available' }
        : book
    ));
  };

  const renderHeader = () => (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <a href="#" className="logo" onClick={() => setCurrentView('home')}>
          📚 LibraryMS
        </a>
        <nav>
          <ul className="nav-links">
            <li><a href="#" onClick={() => setCurrentView('home')}>Home</a></li>
            <li><a href="#" onClick={() => setCurrentView('books')}>Books</a></li>
            <li><a href="#" onClick={() => setCurrentView('add-book')}>Add Book</a></li>
            <li><a href="#" onClick={() => setCurrentView('members')}>Members</a></li>
            <li><a href="#" onClick={() => setCurrentView('dashboard')}>Dashboard</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );

  const renderHome = () => (
    <div className="container">
      <section className="hero">
        <h1>Welcome to LibraryMS</h1>
        <p>
          Your modern library management solution. Organize, track, and manage your books with ease.
          Experience the future of library management with our intuitive and responsive interface.
        </p>
        <a href="#" className="cta-button" onClick={() => setCurrentView('books')}>
          Explore Books
        </a>
      </section>

      <section className="features">
        <h2>Why Choose LibraryMS?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📖</div>
            <h3>Book Management</h3>
            <p>Easily add, edit, and organize your entire book collection with our intuitive interface.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Member Management</h3>
            <p>Keep track of library members, their borrowing history, and manage user accounts.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Advanced Search</h3>
            <p>Find books quickly with our powerful search functionality across titles, authors, and categories.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analytics Dashboard</h3>
            <p>Get insights into your library's performance with detailed statistics and reports.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Responsive</h3>
            <p>Access your library management system from any device with our responsive design.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-time Updates</h3>
            <p>Get instant updates on book availability, due dates, and member activities.</p>
          </div>
        </div>
      </section>
    </div>
  );

  const renderDashboard = () => (
    <div className="container">
      <h2 className="text-center mb-4" style={{ color: 'white', fontSize: '2.5rem' }}>
        Library Dashboard
      </h2>
      <div className="dashboard">
        <div className="dashboard-card">
          <h3>Total Books</h3>
          <div className="dashboard-number">{mockStats.totalBooks}</div>
          <div className="dashboard-label">Books in collection</div>
        </div>
        <div className="dashboard-card">
          <h3>Available Books</h3>
          <div className="dashboard-number">{mockStats.availableBooks}</div>
          <div className="dashboard-label">Ready to borrow</div>
        </div>
        <div className="dashboard-card">
          <h3>Borrowed Books</h3>
          <div className="dashboard-number">{mockStats.borrowedBooks}</div>
          <div className="dashboard-label">Currently borrowed</div>
        </div>
        <div className="dashboard-card">
          <h3>Total Members</h3>
          <div className="dashboard-number">{mockStats.totalMembers}</div>
          <div className="dashboard-label">Registered users</div>
        </div>
      </div>

      <div className="features" style={{ marginTop: '3rem' }}>
        <h2>Recent Activity</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Books Added Today</h3>
            <p>5 new books were added to the collection</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Books Borrowed</h3>
            <p>12 books were borrowed in the last 24 hours</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Books Returned</h3>
            <p>8 books were returned today</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBooks = () => (
    <div className="container">
      <div className="text-center mb-4">
        <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem' }}>
          Book Collection
        </h2>
        <div className="form-group" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Search books by title, author, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '1rem',
              fontSize: '1rem',
              borderRadius: '25px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)'
            }}
          />
        </div>
      </div>

      <div className="book-grid">
        {filteredBooks.map(book => (
          <div key={book.id} className="book-card">
            <div className="book-cover">
              📚
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-author">by {book.author}</div>
            <div className="book-author" style={{ marginBottom: '1rem' }}>
              Category: {book.category}
            </div>
            <div className={`book-status ${book.status}`}>
              {book.status === 'available' ? 'Available' : 'Borrowed'}
            </div>
            <button
              className="btn btn-primary mt-2"
              onClick={() => toggleBookStatus(book.id)}
              style={{ width: '100%' }}
            >
              {book.status === 'available' ? 'Borrow' : 'Return'}
            </button>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center mt-4">
          <p style={{ color: 'white', fontSize: '1.2rem' }}>
            No books found matching your search criteria.
          </p>
        </div>
      )}
    </div>
  );

  const renderAddBook = () => (
    <div className="container">
      <h2 className="text-center mb-4" style={{ color: 'white', fontSize: '2.5rem' }}>
        Add New Book
      </h2>
      <div className="form-container">
        <form onSubmit={handleAddBook}>
          <div className="form-group">
            <label htmlFor="title">Book Title</label>
            <input
              type="text"
              id="title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={newBook.category}
              onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
              required
            >
              <option value="">Select a category</option>
              <option value="Classic">Classic</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science">Science</option>
              <option value="Romance">Romance</option>
              <option value="Mystery">Mystery</option>
              <option value="Adventure">Adventure</option>
              <option value="Biography">Biography</option>
              <option value="History">History</option>
              <option value="Dystopian">Dystopian</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={newBook.status}
              onChange={(e) => setNewBook({ ...newBook, status: e.target.value })}
            >
              <option value="available">Available</option>
              <option value="borrowed">Borrowed</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Add Book
          </button>
        </form>
      </div>
    </div>
  );

  const renderMembers = () => (
    <div className="container">
      <h2 className="text-center mb-4" style={{ color: 'white', fontSize: '2.5rem' }}>
        Library Members
      </h2>
      <div className="features">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>John Doe</h3>
            <p>Member since 2023<br />Books borrowed: 12<br />Status: Active</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>Jane Smith</h3>
            <p>Member since 2023<br />Books borrowed: 8<br />Status: Active</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>Bob Johnson</h3>
            <p>Member since 2022<br />Books borrowed: 25<br />Status: Active</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>Alice Brown</h3>
            <p>Member since 2023<br />Books borrowed: 6<br />Status: Active</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return renderHome();
      case 'books':
        return renderBooks();
      case 'add-book':
        return renderAddBook();
      case 'members':
        return renderMembers();
      case 'dashboard':
        return renderDashboard();
      default:
        return renderHome();
    }
  };

  return (
    <div className="App">
      {renderHeader()}
      <main className="main-content">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;
