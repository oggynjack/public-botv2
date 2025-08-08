import React from 'react';
import { HomeIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, MusicalNoteIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Dashboard', icon: <HomeIcon className="h-6 w-6" /> },
  { name: 'Bot Controls', icon: <MusicalNoteIcon className="h-6 w-6" /> },
  { name: 'Account Settings', icon: <Cog6ToothIcon className="h-6 w-6" /> },
  { name: 'Logout', icon: <ArrowRightOnRectangleIcon className="h-6 w-6" /> },
];

export default function Navbar({ active, onNavigate }) {
  return (
    <motion.nav initial={{ x: -100 }} animate={{ x: 0 }} className="bg-gray-900 text-white w-64 min-h-screen p-6 flex flex-col shadow-lg">
      <div className="mb-8 flex items-center gap-2">
        <UserGroupIcon className="h-8 w-8 text-indigo-400" />
        <span className="text-2xl font-bold tracking-wide">Premium+ Dashboard</span>
      </div>
      <ul className="flex-1 space-y-4">
        {navItems.map((item, idx) => (
          <li key={item.name}>
            <button
              className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full transition-colors duration-200 ${active === idx ? 'bg-indigo-600' : 'hover:bg-gray-800'}`}
              onClick={() => onNavigate(idx)}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
