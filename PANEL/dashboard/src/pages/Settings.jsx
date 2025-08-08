import React from 'react';
import { motion } from 'framer-motion';

export default function Settings() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-700 to-purple-900">
      <div className="bg-white rounded-xl shadow-2xl p-10 flex flex-col items-center gap-6 w-96">
        <h1 className="text-2xl font-bold text-indigo-700">Account Settings</h1>
        <input type="email" placeholder="Change Email" className="w-full mb-2 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <input type="password" placeholder="Change Password" className="w-full mb-2 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg transition-all duration-200 w-full">Save Changes</button>
        <a href="/logout" className="text-indigo-600 hover:underline mt-4">Logout</a>
      </div>
    </motion.div>
  );
}
