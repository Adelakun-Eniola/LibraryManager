import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Eye, EyeOff, LogIn, User, Shield, Crown } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { adminAPI, librarianAPI, userAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    emailAddress: '',
    password: '',
    role: 'USER', // Default role
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const roles = [
    { value: 'USER', label: 'Borrower', icon: User, color: 'text-blue-600' },
    { value: 'LIBRARIAN', label: 'Librarian', icon: Shield, color: 'text-green-600' },
    { value: 'ADMIN', label: 'Administrator', icon: Crown, color: 'text-purple-600' },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (role) => {
    setFormData({
      ...formData,
      role,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      let userData;

      // Call appropriate API based on role
      switch (formData.role) {
        case 'ADMIN':
          response = await adminAPI.login({
            emailAddress: formData.emailAddress,
            password: formData.password,
          });
          userData = response.data;
          break;
          
        case 'LIBRARIAN':
          response = await librarianAPI.login({
            emailAddress: formData.emailAddress,
            password: formData.password,
          });
          userData = response.data;
          break;
          
        case 'USER':
        default:
          response = await userAPI.login({
            emailAddress: formData.emailAddress,
            password: formData.password,
          });
          userData = response.data;
          break;
      }

      // Extract token and user info (adjust based on actual API response structure)
      const token = userData.token || userData.accessToken || 'dummy-token';
      const userId = userData.userId || userData.id || userData.borrowerId;

      // Store auth data and redirect
      login(token, formData.role, userId);
      toast.success(`Welcome back!`);

      // Redirect based on role
      switch (formData.role) {
        case 'ADMIN':
          navigate('/admin');
          break;
        case 'LIBRARIAN':
          navigate('/librarian');
          break;
        case 'USER':
        default:
          navigate('/dashboard');
          break;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Signing you in..." />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full opacity-20"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full opacity-20"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="glass-effect rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <BookOpen className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold gradient-text">LibraryMS</span>
          </Link>
          <h1 className="text-3xl font-bold text-secondary-800 mb-2">Welcome Back</h1>
          <p className="text-secondary-600">Sign in to access your account</p>
        </motion.div>

        {/* Role Selection */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <label className="block text-sm font-medium text-secondary-700 mb-3">
            Login as
          </label>
          <div className="grid grid-cols-3 gap-2">
            {roles.map((role) => (
              <motion.button
                key={role.value}
                type="button"
                onClick={() => handleRoleChange(role.value)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  formData.role === role.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-secondary-200 hover:border-primary-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <role.icon className={`h-6 w-6 mx-auto mb-1 ${role.color}`} />
                <span className="text-xs font-medium text-secondary-700">
                  {role.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Login Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Email Address
            </label>
            <motion.input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter your email"
              required
              whileFocus={{ scale: 1.01 }}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Password
            </label>
            <div className="relative">
              <motion.input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-field pr-10"
                placeholder="Enter your password"
                required
                whileFocus={{ scale: 1.01 }}
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

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full btn-primary py-3 flex items-center justify-center space-x-2"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogIn className="h-5 w-5" />
            <span>Sign In</span>
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="text-sm text-secondary-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
              Sign up here
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;