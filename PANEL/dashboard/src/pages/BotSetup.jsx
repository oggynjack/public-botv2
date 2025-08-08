import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function BotSetup({ onSetup }) {
  const [token, setToken] = useState('');
  const [appId, setAppId] = useState('');
  const [consent, setConsent] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-700 to-purple-900">
      <div className="bg-white rounded-xl shadow-2xl p-10 flex flex-col items-center gap-6 w-96">
        <h1 className="text-2xl font-bold text-indigo-700">Bot Setup</h1>
        <input
          type="text"
          placeholder="Bot Token"
          value={token}
          onChange={e => setToken(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          placeholder="Application ID"
          value={appId}
          onChange={e => setAppId(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
          <span>I consent to hosting my bot</span>
        </label>
        <button
          className={`bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg transition-all duration-200 w-full ${!token || !appId || !consent ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!token || !appId || !consent}
          onClick={() => onSetup(token, appId)}
        >
          Save & Launch
        </button>
      </div>
    </motion.div>
  );
}
