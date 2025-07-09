import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  LogOut, 
  Book, 
  User, 
  Heart, 
  Star,
  Download,
  Calendar,
  Filter,
  Menu,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { userAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [borrowingBook, setBorrowingBook] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    // Filter books based on search term
    if (searchTerm) {
      const filtered = books.filter(book =>
        book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.bookAuthor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  }, [searchTerm, books]);

  const fetchBooks = async () => {
    try {
      const response = await userAPI.getAllBooks();
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      toast.error('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  const handleBorrowBook = async (bookId) => {
    setBorrowingBook(bookId);
    try {
      await userAPI.borrowBook(bookId);
      toast.success('Book borrowed successfully!');
      // Refresh books list to update availability
      fetchBooks();
    } catch (error) {
      console.error('Error borrowing book:', error);
      toast.error(error.response?.data || 'Failed to borrow book');
    } finally {
      setBorrowingBook(null);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const sidebarItems = [
    { path: '/dashboard', icon: BookOpen, label: 'Browse Books' },
    { path: '/dashboard/profile', icon: User, label: 'My Profile' },
  ];

  const BookCard = ({ book }) => (
    <motion.div
      className="card p-6"
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col h-full">
        {/* Book Cover Placeholder */}
        <motion.div
          className="w-full h-48 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-lg mb-4 flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
        >
          <BookOpen className="h-16 w-16 text-white" />
        </motion.div>

        {/* Book Info */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-secondary-800 mb-2 line-clamp-2">
            {book.bookName}
          </h3>
          <p className="text-secondary-600 mb-2">by {book.bookAuthor}</p>
          <p className="text-sm text-secondary-500 mb-4">ISBN: {book.isbn}</p>
          
          {/* Availability */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div 
                className={`w-3 h-3 rounded-full ${
                  book.availableQuantity > 0 ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span className="text-sm text-secondary-600">
                {book.availableQuantity > 0 
                  ? `${book.availableQuantity} available`
                  : 'Not available'
                }
              </span>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="h-4 w-4 text-yellow-400 fill-current" 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          onClick={() => handleBorrowBook(book.bookId)}
          disabled={book.availableQuantity === 0 || borrowingBook === book.bookId}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
            book.availableQuantity > 0
              ? 'btn-primary'
              : 'bg-secondary-300 text-secondary-500 cursor-not-allowed'
          }`}
          whileHover={book.availableQuantity > 0 ? { scale: 1.02 } : {}}
          whileTap={book.availableQuantity > 0 ? { scale: 0.98 } : {}}
        >
          {borrowingBook === book.bookId ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Borrowing...</span>
            </div>
          ) : book.availableQuantity > 0 ? (
            'Borrow Book'
          ) : (
            'Not Available'
          )}
        </motion.button>
      </div>
    </motion.div>
  );

  const BrowseBooks = () => (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0"
      >
        <div>
          <h1 className="text-3xl font-bold text-secondary-800">Browse Books</h1>
          <p className="text-secondary-600">Discover your next great read</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
          <input
            type="text"
            placeholder="Search books, authors, or ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10 w-full"
          />
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="card p-6 text-center">
          <BookOpen className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-secondary-800">{filteredBooks.length}</h3>
          <p className="text-secondary-600">Available Books</p>
        </div>
        <div className="card p-6 text-center">
          <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-secondary-800">
            {filteredBooks.filter(book => book.availableQuantity > 0).length}
          </h3>
          <p className="text-secondary-600">In Stock</p>
        </div>
        <div className="card p-6 text-center">
          <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-secondary-800">0</h3>
          <p className="text-secondary-600">Favorites</p>
        </div>
      </motion.div>

      {/* Books Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" text="Loading books..." />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredBooks.map((book) => (
              <BookCard key={book.bookId} book={book} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {!loading && filteredBooks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <BookOpen className="h-24 w-24 text-secondary-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-secondary-600 mb-2">
            {searchTerm ? 'No books found' : 'No books available'}
          </h3>
          <p className="text-secondary-500">
            {searchTerm 
              ? `Try searching for something else`
              : 'Books will appear here when they are added to the library'
            }
          </p>
        </motion.div>
      )}
    </div>
  );

  const UserProfile = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold text-secondary-800">My Profile</h1>
      
      <div className="card p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-secondary-800">Library Member</h2>
            <p className="text-secondary-600">User ID: {user?.userId || 'N/A'}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-3">Account Information</h3>
            <div className="space-y-2">
              <p className="text-secondary-600">Role: Borrower</p>
              <p className="text-secondary-600">Status: Active</p>
              <p className="text-secondary-600">Member Since: 2024</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-3">Borrowing Stats</h3>
            <div className="space-y-2">
              <p className="text-secondary-600">Books Borrowed: 0</p>
              <p className="text-secondary-600">Currently Borrowed: 0</p>
              <p className="text-secondary-600">Overdue: 0</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="fixed left-0 top-0 h-full w-64 glass-effect border-r border-white/20 z-50 lg:translate-x-0 lg:static lg:z-auto"
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <BookOpen className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold gradient-text">LibraryMS</span>
          </div>

          {/* User Info */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-secondary-800">Borrower</p>
                <p className="text-sm text-secondary-600">Member</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-secondary-600 hover:bg-secondary-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-effect border-b border-white/20 px-6 py-4 sticky top-0 z-30"
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-secondary-600 hover:text-secondary-800"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="hidden lg:block">
              <h2 className="text-xl font-semibold text-secondary-800">
                Welcome to LibraryMS
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <motion.div
                className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <User className="h-5 w-5 text-primary-600" />
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<BrowseBooks />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;