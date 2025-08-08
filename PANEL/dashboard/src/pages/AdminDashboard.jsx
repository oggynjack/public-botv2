import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Notification from '../components/Notification';
import { getAdminUsers, grantPremium } from '../utils/api';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    getAdminUsers().then(setUsers);
  }, []);

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.id.includes(search)
  );

  const handleGrantPremium = async (userId) => {
    const res = await grantPremium(userId);
    if (res.success) {
      setNotification({ show: true, message: 'Premium+ granted!', type: 'success' });
      getAdminUsers().then(setUsers);
    } else {
      setNotification({ show: true, message: 'Failed to grant Premium+', type: 'error' });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Navbar active={0} onNavigate={() => {}} />
      <Sidebar role="Admin" />
      <main className="flex-1 p-10 text-white">
        <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-3xl font-bold mb-6">Admin Panel</motion.h1>
        <div className="grid grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="font-bold mb-2">User Management</div>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by Discord ID/username" className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-700 text-white" />
            <ul className="max-h-64 overflow-y-auto">
              {filteredUsers.map(u => (
                <li key={u.id} className="flex items-center justify-between py-2 border-b border-gray-700">
                  <span>{u.username} ({u.id})</span>
                  <span className="ml-2 text-sm text-yellow-400">{u.roles.join(', ')}</span>
                  <button className="ml-4 bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-lg text-white text-xs" onClick={() => handleGrantPremium(u.id)}>Grant Premium+</button>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="font-bold mb-2">Bot Management</div>
            {/* Add bot management controls here */}
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10 bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="font-bold mb-2">Payment & Subscription Control</div>
          {/* Add payment controls here */}
        </motion.div>
        <Notification {...notification} onClose={() => setNotification({ ...notification, show: false })} />
      </main>
    </div>
  );
}
