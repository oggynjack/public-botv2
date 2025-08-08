import React from 'react';
import { motion } from 'framer-motion';

export default function Login() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-700 to-purple-900">
      <div className="bg-white rounded-xl shadow-2xl p-10 flex flex-col items-center gap-6">
        <img src="/logo.svg" alt="Premium+" className="h-16 mb-2 animate-bounce" />
        <h1 className="text-3xl font-bold text-indigo-700">Premium+ Music Bot Hosting</h1>
        <p className="text-gray-600">Login with Discord to continue</p>
        <a href="/api/auth/discord" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 flex items-center gap-2">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.447.864-.614 1.249-1.844-.276-3.68-.276-5.486 0-.167-.385-.403-.874-.614-1.249a.077.077 0 00-.079-.037A19.736 19.736 0 003.683 4.369a.07.07 0 00-.032.027C.533 8.13-.32 11.81.099 15.444a.082.082 0 00.031.056c2.073 1.522 4.084 2.444 6.092 3.066a.077.077 0 00.084-.027c.47-.646.888-1.328 1.249-2.049a.076.076 0 00-.041-.104c-.662-.251-1.294-.549-1.91-.892a.077.077 0 01-.008-.127c.128-.096.256-.192.381-.291a.074.074 0 01.077-.01c4.01 1.827 8.356 1.827 12.319 0a.075.075 0 01.078.009c.125.099.253.195.381.291a.077.077 0 01-.008.127c-.616.343-1.248.641-1.91.892a.076.076 0 00-.04.104c.36.721.778 1.403 1.249 2.049a.076.076 0 00.084.027c2.008-.622 4.019-1.544 6.092-3.066a.082.082 0 00.031-.056c.5-4.177-.838-7.857-3.552-11.048a.061.061 0 00-.032-.027z"/></svg>
          Login with Discord
        </a>
      </div>
    </motion.div>
  );
}
