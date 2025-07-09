import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Shield, Clock, Award, ChevronRight } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Book Management',
      description: 'Efficiently manage your library collection with our intuitive book management system.',
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Handle multiple user roles including administrators, librarians, and borrowers.',
    },
    {
      icon: Shield,
      title: 'Secure Access',
      description: 'Role-based authentication ensures secure access to different features.',
    },
    {
      icon: Clock,
      title: 'Real-time Tracking',
      description: 'Track book borrowing and returns in real-time with comprehensive logs.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <motion.nav
        className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <BookOpen className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold gradient-text">LibraryMS</span>
            </motion.div>
            
            <div className="flex space-x-4">
              <Link to="/login">
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/register">
                <motion.button
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        className="relative px-4 py-20 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full opacity-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full opacity-20"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            variants={itemVariants}
          >
            <span className="gradient-text">Modern Library</span>
            <br />
            <span className="text-secondary-800">Management System</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-secondary-600 mb-8 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Streamline your library operations with our comprehensive management system.
            Handle books, users, and transactions effortlessly.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Link to="/register">
              <motion.button
                className="btn-primary px-8 py-3 text-lg flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                className="btn-secondary px-8 py-3 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Everything you need to manage your library efficiently
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card p-6 text-center"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </motion.div>
                <h3 className="text-xl font-semibold text-secondary-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4 bg-gradient-to-r from-primary-600 to-secondary-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Library?
          </motion.h2>
          <motion.p
            className="text-xl text-white/90 mb-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join thousands of libraries already using our system
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link to="/register">
              <motion.button
                className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Free Trial
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">LibraryMS</span>
          </div>
          <p className="text-secondary-400">
            © 2024 LibraryMS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;