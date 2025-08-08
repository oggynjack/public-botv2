import React from 'react';
import { motion } from 'framer-motion';

export default function Error({ code = 404, message = 'Page Not Found' }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-700 to-pink-900">
      <div className="bg-white rounded-xl shadow-2xl p-10 flex flex-col items-center gap-6">
        <h1 className="text-6xl font-bold text-red-700">{code}</h1>
        <p className="text-xl text-gray-700">{message}</p>
        <a href="/" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200">Go Home</a>
      </div>
    </motion.div>
  );
}
