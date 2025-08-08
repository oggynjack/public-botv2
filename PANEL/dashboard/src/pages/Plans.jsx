import React from 'react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Free',
    price: '$0',
    features: ['Basic bot hosting', 'Limited music features'],
    color: 'bg-gray-300',
  },
  {
    name: 'Premium',
    price: '$5/mo',
    features: ['Advanced music features', 'Priority support'],
    color: 'bg-indigo-300',
  },
  {
    name: 'Premium+',
    price: '$15/mo',
    features: ['Full music bot hosting', 'HQ streaming', 'Admin controls', 'All features unlocked'],
    color: 'bg-purple-400',
  },
];

export default function Plans() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-700 to-purple-900">
      <h1 className="text-4xl font-bold text-white mb-8">Choose Your Plan</h1>
      <div className="flex gap-8">
        {plans.map((plan) => (
          <motion.div key={plan.name} whileHover={{ scale: 1.05 }} className={`rounded-xl shadow-2xl p-8 w-72 flex flex-col items-center ${plan.color} transition-all duration-200`}>
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <div className="text-3xl font-extrabold mb-4">{plan.price}</div>
            <ul className="mb-6 text-left list-disc list-inside">
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg transition-all duration-200">Upgrade</button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
