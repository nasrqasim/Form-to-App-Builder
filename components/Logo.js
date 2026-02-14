'use client';

import { Box } from 'lucide-react';

export default function Logo({ className = "w-8 h-8", textClassName = "text-xl font-black" }) {
    return (
        <div className="flex items-center space-x-2 group cursor-pointer">
            <div className={`relative ${className} flex items-center justify-center`}>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl -rotate-6 group-hover:rotate-0 transition-transform duration-300 border border-white/20"></div>
                <span className="relative text-white font-black text-lg select-none">F</span>
            </div>
            <span className={`tracking-tight text-gray-900 dark:text-white ${textClassName}`}>
                FormForge<span className="text-indigo-600">AI</span>
            </span>
        </div>
    );
}
