'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layout, PlusCircle, List, Home, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function ProjectNavbar({ appName, logo, slug }) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: `/apps/${slug}`, icon: Home },
        { name: 'Add Record', href: `/apps/${slug}/create`, icon: PlusCircle },
        { name: 'View Records', href: `/apps/${slug}/list`, icon: List },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo & Name */}
                    <div className="flex items-center">
                        <Link href={`/apps/${slug}`} className="flex items-center space-x-3 group">
                            {logo ? (
                                <img
                                    src={logo}
                                    alt={appName}
                                    className="w-8 h-8 rounded-lg object-contain shadow-sm group-hover:scale-110 transition-transform"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
                                    <Layout className="w-5 h-5" />
                                </div>
                            )}
                            <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">{appName}</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`flex items-center space-x-2 text-sm font-semibold transition-all py-2 px-3 rounded-lg ${isActive
                                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
                                    <span>{link.name}</span>
                                </Link>
                            );
                        })}
                        <Link
                            href="/dashboard"
                            className="bg-gray-900 dark:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 dark:hover:bg-indigo-700 transition-colors shadow-lg shadow-gray-200 dark:shadow-none"
                        >
                            Exit App
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-2"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 animate-slide-down">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-bold transition-all ${isActive
                                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 shadow-inner'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/50'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{link.name}</span>
                                </Link>
                            );
                        })}
                        <div className="pt-4 px-4">
                            <Link
                                href="/dashboard"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full flex justify-center bg-gray-900 dark:bg-indigo-600 text-white py-3 rounded-xl font-bold"
                            >
                                Exit App
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
