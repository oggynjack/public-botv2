import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Notification({ message, type, show, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg text-white ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
        >
          <div className="flex items-center justify-between gap-4">
            <span>{message}</span>
            <button onClick={onClose} className="ml-4 text-lg font-bold">×</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
