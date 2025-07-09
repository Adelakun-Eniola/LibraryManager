import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5070';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses and errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    toast.error(message);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Admin API calls
export const adminAPI = {
  register: (data) => api.post('/api/admin/register', data),
  login: (data) => api.post('/api/admin/login', data),
  registerLibrarian: (data) => api.post('/api/admin/librarian_registration', data),
};

// Librarian API calls
export const librarianAPI = {
  login: (data) => api.post('/api/librarian/librarian_login', data),
  getAllUsers: () => api.get('/api/librarian/users'),
  getAllTransactions: () => api.get('/api/librarian/transactions'),
};

// Book API calls
export const bookAPI = {
  register: (data) => api.post('/api/register/book', data),
  getAll: () => api.get('/api/books'), // Updated to use the new book endpoint
  getById: (bookId) => api.get(`/api/books/${bookId}`), // New endpoint for getting single book
};

// User API calls
export const userAPI = {
  register: (data) => api.post('/api/register/user', data),
  login: (data) => api.post('/api/login/user', data),
  borrowBook: (bookId) => api.post(`/api/user/borrow/${bookId}`),
  getAllBooks: () => api.get('/api/user/getAllBooks'), // Keep this for user-specific book access
};

// Authentication helpers
export const authHelpers = {
  setAuthData: (token, role, userId) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userId', userId);
  },
  
  getAuthData: () => ({
    token: localStorage.getItem('authToken'),
    role: localStorage.getItem('userRole'),
    userId: localStorage.getItem('userId'),
  }),
  
  clearAuthData: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
  },
  
  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    return !!token;
  },
  
  getUserRole: () => localStorage.getItem('userRole'),
};

export default api;