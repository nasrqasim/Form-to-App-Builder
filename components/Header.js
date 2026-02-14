'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
    Menu,
    X,
    LogOut,
    ChevronRight,
    LayoutDashboard
} from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        fetchUser();
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/auth/me');
            const data = await res.json();
            if (res.ok) setUser(data.user);
            else setUser(null);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setUser(null);
            router.push('/login');
        } catch (err) {
            console.error('Logout failed');
        }
    };

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    if (pathname.startsWith('/apps/')) return null;

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 shadow-sm' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/">
                        <Logo />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-bold tracking-tight transition-all hover:text-indigo-600 ${pathname === link.href ? 'text-indigo-600' : 'text-gray-500 dark:text-gray-400'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Auth */}
                    <div className="hidden lg:flex items-center space-x-6">
                        <ThemeToggle />
                        {!loading && (
                            <>
                                {user ? (
                                    <div className="flex items-center space-x-6">
                                        <Link href="/dashboard" className="flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            <LayoutDashboard className="w-4 h-4" />
                                            <span>Dashboard</span>
                                        </Link>
                                        <Link href="/builder" className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none">
                                            Create App
                                        </Link>
                                        <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                                            <LogOut size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-4">
                                        <Link href="/login" className="text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-4 transition-colors">
                                            Login
                                        </Link>
                                        <Link href="/builder" className="bg-gray-900 dark:bg-indigo-600 text-white px-7 py-3.5 rounded-xl text-sm font-black hover:bg-black dark:hover:bg-indigo-700 transition-all shadow-xl shadow-gray-200 dark:shadow-none flex items-center group">
                                            Create App
                                            <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center space-x-4">
                        <ThemeToggle />
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-900 dark:text-white p-2">
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 animate-in slide-in-from-top duration-300">
                    <div className="px-6 py-10 space-y-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-xl font-black text-gray-900 dark:text-white"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="pt-6 border-t border-gray-50 dark:border-gray-800 flex flex-col space-y-4">
                            {user ? (
                                <>
                                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-xl font-black text-gray-900 dark:text-white flex items-center space-x-2">
                                        <LayoutDashboard className="w-5 h-5" />
                                        <span>Dashboard</span>
                                    </Link>
                                    <Link href="/builder" onClick={() => setIsMenuOpen(false)} className="bg-indigo-600 text-white py-4 rounded-2xl text-center font-black">
                                        Create App
                                    </Link>
                                    <button onClick={handleLogout} className="flex items-center space-x-3 text-xl font-black text-red-600">
                                        <LogOut size={20} /> <span>Sign Out</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center py-4 rounded-2xl font-black text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">Login</Link>
                                    <Link href="/builder" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center py-4 rounded-2xl font-black text-white bg-indigo-600">Create App</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
