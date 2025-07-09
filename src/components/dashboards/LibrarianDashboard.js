import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  BookOpen, 
  Users, 
  History, 
  LogOut, 
  Plus, 
  Search,
  Menu,
  Book,
  User,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { librarianAPI, bookAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const LibrarianDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const sidebarItems = [
    { path: '/librarian', icon: Shield, label: 'Dashboard' },
    { path: '/librarian/books', icon: BookOpen, label: 'Manage Books' },
    { path: '/librarian/users', icon: Users, label: 'View Users' },
    { path: '/librarian/transactions', icon: History, label: 'Transactions' },
  ];

  // Book Management Component
  const ManageBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingBook, setAddingBook] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newBook, setNewBook] = useState({
      bookName: '',
      bookAuthor: '',
      isbn: '',
      quantityOfBook: '',
    });

    useEffect(() => {
      fetchBooks();
    }, []);

    const fetchBooks = async () => {
      try {
        const response = await bookAPI.getAll();
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        toast.error('Failed to load books');
      } finally {
        setLoading(false);
      }
    };

    const handleAddBook = async (e) => {
      e.preventDefault();
      setAddingBook(true);

      try {
        const bookData = {
          bookName: newBook.bookName,
          bookAuthor: newBook.bookAuthor,
          isbn: newBook.isbn,
          quantityOfBook: parseInt(newBook.quantityOfBook),
        };

        await bookAPI.register(bookData);
        toast.success('Book added successfully!');
        
        // Reset form and refresh books
        setNewBook({
          bookName: '',
          bookAuthor: '',
          isbn: '',
          quantityOfBook: '',
        });
        setShowAddForm(false);
        fetchBooks();
      } catch (error) {
        console.error('Error adding book:', error);
        toast.error(error.response?.data?.message || 'Failed to add book');
      } finally {
        setAddingBook(false);
      }
    };

    const filteredBooks = books.filter(book =>
      book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.bookAuthor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-secondary-800">Manage Books</h1>
            <p className="text-secondary-600">Add and manage library books</p>
          </div>
          
          <motion.button
            onClick={() => setShowAddForm(true)}
            className="btn-primary flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="h-5 w-5" />
            <span>Add New Book</span>
          </motion.button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        {/* Add Book Modal */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="glass-effect rounded-2xl p-8 w-full max-w-md"
              >
                <h2 className="text-2xl font-bold text-secondary-800 mb-6">Add New Book</h2>
                
                <form onSubmit={handleAddBook} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Book Name
                    </label>
                    <input
                      type="text"
                      value={newBook.bookName}
                      onChange={(e) => setNewBook({ ...newBook, bookName: e.target.value })}
                      className="input-field"
                      placeholder="Enter book name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      value={newBook.bookAuthor}
                      onChange={(e) => setNewBook({ ...newBook, bookAuthor: e.target.value })}
                      className="input-field"
                      placeholder="Enter author name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      ISBN
                    </label>
                    <input
                      type="text"
                      value={newBook.isbn}
                      onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                      className="input-field"
                      placeholder="Enter ISBN"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={newBook.quantityOfBook}
                      onChange={(e) => setNewBook({ ...newBook, quantityOfBook: e.target.value })}
                      className="input-field"
                      placeholder="Enter quantity"
                      min="1"
                      required
                    />
                  </div>
                  
                  <div className="flex space-x-4 pt-4">
                    <motion.button
                      type="submit"
                      disabled={addingBook}
                      className="flex-1 btn-primary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {addingBook ? 'Adding...' : 'Add Book'}
                    </motion.button>
                    
                    <motion.button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 btn-secondary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Books Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" text="Loading books..." />
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Book Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      ISBN
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Available
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-secondary-200">
                  {filteredBooks.map((book) => (
                    <motion.tr
                      key={book.bookId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-secondary-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                            <BookOpen className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-secondary-900">
                              {book.bookName}
                            </div>
                            <div className="text-sm text-secondary-500">
                              ID: {book.bookId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                        {book.bookAuthor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                        {book.isbn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                        {book.availableQuantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          book.availableQuantity > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {book.availableQuantity > 0 ? 'Available' : 'Out of Stock'}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-24 w-24 text-secondary-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-secondary-600 mb-2">
              {searchTerm ? 'No books found' : 'No books available'}
            </h3>
            <p className="text-secondary-500">
              {searchTerm 
                ? 'Try searching for something else'
                : 'Start by adding some books to the library'
              }
            </p>
          </div>
        )}
      </motion.div>
    );
  };

  // View Users Component
  const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      fetchUsers();
    }, []);

    const fetchUsers = async () => {
      try {
        const response = await librarianAPI.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    const filteredUsers = users.filter(user =>
      (user.firstName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.lastName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.emailAddress?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-secondary-800">Library Users</h1>
          <p className="text-secondary-600">View all registered users</p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" text="Loading users..." />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <motion.div
                key={user.borrowerId}
                className="card p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-800">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-sm text-secondary-500">Member</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-secondary-400" />
                    <span className="text-sm text-secondary-600">{user.emailAddress}</span>
                  </div>
                  {user.phoneNumber && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-secondary-400" />
                      <span className="text-sm text-secondary-600">{user.phoneNumber}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-secondary-400" />
                    <span className="text-sm text-secondary-600">Member since 2024</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-24 w-24 text-secondary-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-secondary-600 mb-2">
              {searchTerm ? 'No users found' : 'No users registered'}
            </h3>
            <p className="text-secondary-500">
              {searchTerm 
                ? 'Try searching for something else'
                : 'Users will appear here when they register'
              }
            </p>
          </div>
        )}
      </motion.div>
    );
  };

  // Transactions Component
  const ViewTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
      try {
        const response = await librarianAPI.getAllTransactions();
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        toast.error('Failed to load transactions');
      } finally {
        setLoading(false);
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-secondary-800">Transaction History</h1>
          <p className="text-secondary-600">View all borrowing transactions</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" text="Loading transactions..." />
          </div>
        ) : transactions.length > 0 ? (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Book
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Borrower
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-secondary-200">
                  {transactions.map((transaction) => (
                    <motion.tr
                      key={transaction.transactionId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-secondary-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                        {transaction.transactionId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                        {transaction.bookName || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                        {transaction.borrowerName || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                        {transaction.transactionDate || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          transaction.status === 'COMPLETED' 
                            ? 'bg-green-100 text-green-800'
                            : transaction.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status || 'PENDING'}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <History className="h-24 w-24 text-secondary-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-secondary-600 mb-2">
              No transactions yet
            </h3>
            <p className="text-secondary-500">
              Transactions will appear here when users borrow books
            </p>
          </div>
        )}
      </motion.div>
    );
  };

  // Librarian Dashboard Overview
  const LibrarianOverview = () => {
    const [stats, setStats] = useState({
      totalBooks: 0,
      totalUsers: 0,
      totalTransactions: 0,
      booksAvailable: 0,
    });

    useEffect(() => {
      // Fetch overview stats
      fetchOverviewStats();
    }, []);

    const fetchOverviewStats = async () => {
      try {
        // You can make parallel API calls here to get stats
        // For now, we'll use placeholder values
        setStats({
          totalBooks: 0,
          totalUsers: 0,
          totalTransactions: 0,
          booksAvailable: 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-secondary-800">Librarian Dashboard</h1>
          <p className="text-secondary-600">Library management overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            className="card p-6 text-center"
            whileHover={{ y: -5 }}
          >
            <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-secondary-800">{stats.totalBooks}</h3>
            <p className="text-secondary-600">Total Books</p>
          </motion.div>
          
          <motion.div 
            className="card p-6 text-center"
            whileHover={{ y: -5 }}
          >
            <Users className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-secondary-800">{stats.totalUsers}</h3>
            <p className="text-secondary-600">Registered Users</p>
          </motion.div>
          
          <motion.div 
            className="card p-6 text-center"
            whileHover={{ y: -5 }}
          >
            <History className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-secondary-800">{stats.totalTransactions}</h3>
            <p className="text-secondary-600">Total Transactions</p>
          </motion.div>
          
          <motion.div 
            className="card p-6 text-center"
            whileHover={{ y: -5 }}
          >
            <CheckCircle className="h-8 w-8 text-orange-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-secondary-800">{stats.booksAvailable}</h3>
            <p className="text-secondary-600">Available Books</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-secondary-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/librarian/books">
              <motion.button 
                className="w-full btn-primary p-4 flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <BookOpen className="h-5 w-5" />
                <span>Manage Books</span>
              </motion.button>
            </Link>
            
            <Link to="/librarian/users">
              <motion.button 
                className="w-full btn-secondary p-4 flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Users className="h-5 w-5" />
                <span>View Users</span>
              </motion.button>
            </Link>
            
            <Link to="/librarian/transactions">
              <motion.button 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <History className="h-5 w-5" />
                <span>View Transactions</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    );
  };

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
            <Shield className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold gradient-text">Librarian</span>
          </div>

          {/* User Info */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-secondary-800">Librarian</p>
                <p className="text-sm text-secondary-600">Staff Member</p>
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
                    ? 'bg-green-100 text-green-700'
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
                LibraryMS - Librarian Portal
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <motion.div
                className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <Shield className="h-5 w-5 text-green-600" />
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<LibrarianOverview />} />
            <Route path="/books" element={<ManageBooks />} />
            <Route path="/users" element={<ViewUsers />} />
            <Route path="/transactions" element={<ViewTransactions />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default LibrarianDashboard;