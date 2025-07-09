import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Crown, 
  Users, 
  Shield, 
  Settings, 
  LogOut, 
  UserPlus, 
  BookOpen,
  Menu,
  Eye,
  EyeOff,
  Mail,
  User,
  Phone,
  Lock
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { adminAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const sidebarItems = [
    { path: '/admin', icon: Crown, label: 'Dashboard' },
    { path: '/admin/register-admin', icon: UserPlus, label: 'Register Admin' },
    { path: '/admin/register-librarian', icon: Shield, label: 'Register Librarian' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  // Register Admin Component
  const RegisterAdmin = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      emailAddress: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const validateForm = () => {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return false;
      }
      return true;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!validateForm()) {
        return;
      }

      setLoading(true);

      try {
        const registrationData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailAddress: formData.emailAddress,
          phoneNumber: parseInt(formData.phoneNumber),
          password: formData.password,
        };

        const response = await adminAPI.register(registrationData);
        toast.success('Admin registered successfully!');
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          emailAddress: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        });
      } catch (error) {
        console.error('Registration error:', error);
        toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
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
          <h1 className="text-3xl font-bold text-secondary-800">Register New Admin</h1>
          <p className="text-secondary-600">Create a new administrator account</p>
        </div>

        <div className="card p-8 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="input-field pl-10"
                    placeholder="John"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="input-field pl-10"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  className="input-field pl-10"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="input-field pl-10"
                  placeholder="1234567890"
                  required
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input-field pl-10 pr-10"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-400 hover:text-secondary-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="input-field pl-10 pr-10"
                    placeholder="Confirm password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-400 hover:text-secondary-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full btn-primary py-3 flex items-center justify-center space-x-2"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Registering...</span>
                </div>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  <span>Register Admin</span>
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    );
  };

  // Register Librarian Component
  const RegisterLibrarian = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      emailAddress: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const validateForm = () => {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return false;
      }
      return true;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!validateForm()) {
        return;
      }

      setLoading(true);

      try {
        const registrationData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailAddress: formData.emailAddress,
          phoneNumber: parseInt(formData.phoneNumber),
          password: formData.password,
        };

        const response = await adminAPI.registerLibrarian(registrationData);
        toast.success('Librarian registered successfully!');
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          emailAddress: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        });
      } catch (error) {
        console.error('Registration error:', error);
        toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
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
          <h1 className="text-3xl font-bold text-secondary-800">Register New Librarian</h1>
          <p className="text-secondary-600">Create a new librarian account</p>
        </div>

        <div className="card p-8 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="input-field pl-10"
                    placeholder="Jane"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="input-field pl-10"
                    placeholder="Smith"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  className="input-field pl-10"
                  placeholder="librarian@example.com"
                  required
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="input-field pl-10"
                  placeholder="1234567890"
                  required
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input-field pl-10 pr-10"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-400 hover:text-secondary-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="input-field pl-10 pr-10"
                    placeholder="Confirm password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-400 hover:text-secondary-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full btn-primary py-3 flex items-center justify-center space-x-2"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Registering...</span>
                </div>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  <span>Register Librarian</span>
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    );
  };

  // Admin Dashboard Overview
  const AdminOverview = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-secondary-800">Admin Dashboard</h1>
        <p className="text-secondary-600">System administration and management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          className="card p-6 text-center"
          whileHover={{ y: -5 }}
        >
          <Crown className="h-8 w-8 text-purple-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-secondary-800">1</h3>
          <p className="text-secondary-600">Active Admins</p>
        </motion.div>
        
        <motion.div 
          className="card p-6 text-center"
          whileHover={{ y: -5 }}
        >
          <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-secondary-800">0</h3>
          <p className="text-secondary-600">Librarians</p>
        </motion.div>
        
        <motion.div 
          className="card p-6 text-center"
          whileHover={{ y: -5 }}
        >
          <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-secondary-800">0</h3>
          <p className="text-secondary-600">Total Users</p>
        </motion.div>
        
        <motion.div 
          className="card p-6 text-center"
          whileHover={{ y: -5 }}
        >
          <BookOpen className="h-8 w-8 text-orange-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-secondary-800">0</h3>
          <p className="text-secondary-600">Total Books</p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-secondary-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/admin/register-admin">
            <motion.button 
              className="w-full btn-primary p-4 flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <UserPlus className="h-5 w-5" />
              <span>Register New Admin</span>
            </motion.button>
          </Link>
          
          <Link to="/admin/register-librarian">
            <motion.button 
              className="w-full btn-secondary p-4 flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Shield className="h-5 w-5" />
              <span>Register New Librarian</span>
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );

  // Settings Component
  const AdminSettings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-secondary-800">System Settings</h1>
        <p className="text-secondary-600">Configure system preferences and settings</p>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-semibold text-secondary-800 mb-4">General Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Library Name
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Central Library"
              defaultValue="LibraryMS System"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              System Email
            </label>
            <input
              type="email"
              className="input-field"
              placeholder="system@library.com"
            />
          </div>
          
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Save Settings
          </motion.button>
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
            <Crown className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold gradient-text">Admin Panel</span>
          </div>

          {/* User Info */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Crown className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-secondary-800">Administrator</p>
                <p className="text-sm text-secondary-600">System Admin</p>
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
                    ? 'bg-purple-100 text-purple-700'
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
                LibraryMS Administration
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <motion.div
                className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <Crown className="h-5 w-5 text-purple-600" />
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/register-admin" element={<RegisterAdmin />} />
            <Route path="/register-librarian" element={<RegisterLibrarian />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;