import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Eye, EyeOff, UserPlus, User, Mail, Phone, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { userAPI } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const RegisterPage = () => {
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
  const navigate = useNavigate();

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
    if (formData.phoneNumber && formData.phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
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
        phoneNumber: parseInt(formData.phoneNumber), // Convert to number as expected by backend
        password: formData.password,
      };

      const response = await userAPI.register(registrationData);
      
      if (response.data && response.data.successful !== false) {
        toast.success('Registration successful! Please log in to continue.');
        navigate('/login');
      } else {
        toast.error(response.data?.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Creating your account..." />;
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
          <h1 className="text-3xl font-bold text-secondary-800 mb-2">Create Account</h1>
          <p className="text-secondary-600">Join our library community</p>
        </motion.div>

        {/* Registration Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                <motion.input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="input-field pl-10"
                  placeholder="John"
                  required
                  whileFocus={{ scale: 1.01 }}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                <motion.input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="input-field pl-10"
                  placeholder="Doe"
                  required
                  whileFocus={{ scale: 1.01 }}
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
              <motion.input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                className="input-field pl-10"
                placeholder="john.doe@email.com"
                required
                whileFocus={{ scale: 1.01 }}
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
              <motion.input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="input-field pl-10"
                placeholder="1234567890"
                required
                whileFocus={{ scale: 1.01 }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
              <motion.input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-field pl-10 pr-10"
                placeholder="Create a password"
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

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
              <motion.input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="input-field pl-10 pr-10"
                placeholder="Confirm your password"
                required
                whileFocus={{ scale: 1.01 }}
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

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full btn-primary py-3 flex items-center justify-center space-x-2 mt-6"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <UserPlus className="h-5 w-5" />
            <span>Create Account</span>
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
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Sign in here
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;