'use client';

import { CheckCircle2 } from 'lucide-react';

export default function PricingCard({ plan, price, description, features, highlighted = false }) {
    return (
        <div className={`relative p-8 rounded-[32px] border transition-all duration-300 ${highlighted
            ? 'bg-gray-900 text-white border-gray-800 dark:bg-indigo-600 dark:border-indigo-500 shadow-2xl scale-105 z-10'
            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-100 dark:border-gray-700 hover:border-indigo-100 dark:hover:border-indigo-500 shadow-xl shadow-gray-200/50 dark:shadow-none'
            }`}>
            {highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 dark:bg-white dark:text-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                    Most Popular
                </div>
            )}

            <div className="mb-8">
                <h3 className={`text-xl font-bold mb-2 ${highlighted ? 'text-indigo-400 dark:text-white' : 'text-gray-900 dark:text-white'}`}>{plan}</h3>
                <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black">${price === 'Free' ? '0' : price}</span>
                    <span className={`text-sm font-medium ${highlighted ? 'text-gray-400 dark:text-indigo-100' : 'text-gray-500 dark:text-gray-400'}`}>/month</span>
                </div>
                <p className={`mt-4 text-sm ${highlighted ? 'text-gray-400 dark:text-indigo-50' : 'text-gray-500 dark:text-gray-400'}`}>
                    {description}
                </p>
            </div>

            <ul className="space-y-4 mb-10">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3 text-sm">
                        <CheckCircle2 className={`w-5 h-5 shrink-0 ${highlighted ? 'text-indigo-400 dark:text-white' : 'text-indigo-500'}`} />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <button className={`w-full py-4 rounded-2xl font-black transition-all ${highlighted
                ? 'bg-indigo-600 hover:bg-indigo-700 dark:bg-white dark:hover:bg-gray-100 dark:text-indigo-600 text-white shadow-lg shadow-indigo-500/20 dark:shadow-none'
                : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                }`}>
                {price === 'Free' ? 'Get Started' : 'Subscribe Now'}
            </button>
        </div>
    );
}
