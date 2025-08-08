import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Notification from '../components/Notification';
import { startBot, stopBot, restartBot, socket } from '../utils/api';

export default function UserDashboard() {
  const [active, setActive] = useState(0);
  const [role] = useState('Premium+ User');
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [botStatus, setBotStatus] = useState('Offline');
  const [uptime, setUptime] = useState('0m');

  useEffect(() => {
    socket.on('botStatus', ({ status, uptime }) => {
      setBotStatus(status);
      setUptime(uptime);
    });
    return () => {
      socket.off('botStatus');
    };
  }, []);

  const handleStart = async () => {
    const res = await startBot();
    if (res.success) {
      setNotification({ show: true, message: 'Bot started!', type: 'success' });
    } else {
      setNotification({ show: true, message: 'Failed to start bot.', type: 'error' });
    }
  };
  const handleStop = async () => {
    const res = await stopBot();
    if (res.success) {
      setNotification({ show: true, message: 'Bot stopped!', type: 'success' });
    } else {
      setNotification({ show: true, message: 'Failed to stop bot.', type: 'error' });
    }
  };
  const handleRestart = async () => {
    const res = await restartBot();
    if (res.success) {
      setNotification({ show: true, message: 'Bot restarted!', type: 'success' });
    } else {
      setNotification({ show: true, message: 'Failed to restart bot.', type: 'error' });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Navbar active={active} onNavigate={setActive} />
      <Sidebar role={role} />
      <main className="flex-1 p-10 text-white">
        <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-3xl font-bold mb-6">Welcome, Premium+ User!</motion.h1>
        <div className="mb-8">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-indigo-800 rounded-xl p-6 shadow-lg flex items-center gap-8">
            <div>
              <div className="text-lg font-semibold">Bot Status:</div>
              <div className={`font-bold text-xl ${botStatus === 'Online' ? 'text-green-400 animate-pulse' : 'text-red-400'}`}>{botStatus}</div>
              <div className="text-sm mt-2">Uptime: {uptime}</div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold" onClick={handleStart}>Start</button>
              <button className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg font-semibold" onClick={handleRestart}>Restart</button>
              <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold" onClick={handleStop}>Stop</button>
            </div>
          </motion.div>
        </div>
        {/* ...existing code... */}
        <Notification {...notification} onClose={() => setNotification({ ...notification, show: false })} />
      </main>
    </div>
  );
}
