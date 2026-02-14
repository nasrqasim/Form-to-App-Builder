'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Github, Instagram, Linkedin, Globe } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
    return (
        <footer className="bg-gray-900 dark:bg-black pt-24 pb-12 overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Column 1: Brand */}
                    <div className="space-y-8">
                        <Logo className="w-10 h-10" textClassName="text-2xl font-black text-white" />
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
                            Empowering developers and startups to transform ideas into production-ready full-stack applications instantly with AI-powered automation.
                        </p>
                        <div className="flex items-center space-x-5">
                            <a href="https://github.com/nasrqasim" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 dark:bg-gray-900 rounded-lg text-gray-400 hover:text-white hover:bg-indigo-600 transition-all">
                                <Github size={18} />
                            </a>
                            <a href="https://web.facebook.com/profile.php?id=61586629377577" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 dark:bg-gray-900 rounded-lg text-gray-400 hover:text-white hover:bg-indigo-600 transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="https://www.instagram.com/itsmecaptainnasr/" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 dark:bg-gray-900 rounded-lg text-gray-400 hover:text-white hover:bg-indigo-600 transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/nasr-qasim-roonjha/" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 dark:bg-gray-900 rounded-lg text-gray-400 hover:text-white hover:bg-indigo-600 transition-all">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Product</h4>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-gray-400 hover:text-indigo-400 text-sm font-medium transition-colors">Home</Link></li>
                            <li><Link href="/features" className="text-gray-400 hover:text-indigo-400 text-sm font-medium transition-colors">Features</Link></li>
                            <li><Link href="/pricing" className="text-gray-400 hover:text-indigo-400 text-sm font-medium transition-colors">Pricing</Link></li>
                            <li><Link href="/builder" className="text-gray-400 hover:text-indigo-400 text-sm font-medium transition-colors">Create App</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Company</h4>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-gray-400 hover:text-indigo-400 text-sm font-medium transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-indigo-400 text-sm font-medium transition-colors">Contact</Link></li>
                            <li><Link href="/privacy" className="text-gray-400 hover:text-indigo-400 text-sm font-medium transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-gray-400 hover:text-indigo-400 text-sm font-medium transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Contact Info</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start space-x-3 text-gray-400">
                                <Phone size={18} className="text-indigo-500 mt-0.5 shrink-0" />
                                <span className="text-sm font-medium">+92 315 2914836</span>
                            </li>
                            <li className="flex items-start space-x-3 text-gray-400">
                                <MapPin size={18} className="text-indigo-500 mt-0.5 shrink-0" />
                                <span className="text-sm font-medium">Lasbela, Balochistan, Pakistan</span>
                            </li>
                            <li className="flex items-start space-x-3 text-gray-400">
                                <Mail size={18} className="text-indigo-500 mt-0.5 shrink-0" />
                                <span className="text-sm font-medium">roonjhadevelopers@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-gray-800 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center">
                    <p className="text-gray-500 text-xs font-bold tracking-tight">
                        &copy; {new Date().getFullYear()} FormForge AI. All Rights Reserved.
                    </p>
                    <p className="text-gray-500 text-xs font-bold flex items-center">
                        <Globe size={14} className="mr-2" />
                        Powered by <span className="text-white ml-1">Roonjha Developers</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
