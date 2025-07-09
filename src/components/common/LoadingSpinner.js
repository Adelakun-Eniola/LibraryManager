import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Outer spinning ring */}
        <motion.div
          className={`${sizeClasses[size]} border-4 border-primary-200 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner spinning ring */}
        <motion.div
          className={`absolute top-0 left-0 ${sizeClasses[size]} border-4 border-transparent border-t-primary-600 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>
      
      {text && (
        <motion.p
          className="mt-4 text-secondary-600 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;