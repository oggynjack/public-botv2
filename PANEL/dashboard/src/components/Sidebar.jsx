import React from 'react';
import { motion } from 'framer-motion';
import { UserIcon, ShieldCheckIcon, ServerIcon } from '@heroicons/react/outline';

const roles = [
  { name: 'Free User', icon: <UserIcon className="h-5 w-5" /> },
  { name: 'Premium User', icon: <ShieldCheckIcon className="h-5 w-5" /> },
  { name: 'Premium+ User', icon: <ServerIcon className="h-5 w-5" /> },
];

export default function Sidebar({ role }) {
  return (
    <motion.aside initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-gray-800 text-white w-48 p-4 rounded-r-xl shadow-lg flex flex-col gap-6">
      <div className="text-lg font-semibold mb-4">Role</div>
      <ul className="space-y-3">
        {roles.map((r) => (
          <li key={r.name} className={`flex items-center gap-2 ${role === r.name ? 'text-indigo-400 font-bold' : ''}`}>
            {r.icon}
            <span>{r.name}</span>
          </li>
        ))}
      </ul>
    </motion.aside>
  );
}
