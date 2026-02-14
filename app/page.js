'use client';

import Link from 'next/link';
import {
    Rocket,
    ArrowRight,
    Zap,
    Shield,
    Code,
    Layout,
    Database,
    Image as ImageIcon,
    CheckCircle2,
    Play
} from 'lucide-react';

export default function Home() {
    return (
        <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-indigo-50/50 dark:bg-indigo-900/10 rounded-full blur-3xl -z-10 -translate-y-1/2"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest mb-10 border border-indigo-100 dark:border-indigo-800 animate-in zoom-in duration-700">
                        <Zap className="w-4 h-4" />
                        <span>AI-Powered Innovation</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white tracking-tight leading-[0.9] mb-8 animate-in slide-in-from-bottom-6 duration-700">
                        Turn Your Forms Into <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                            Professional Apps
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 font-medium mb-12 leading-relaxed animate-in slide-in-from-bottom-8 duration-700 delay-100">
                        Build, customize, and deploy production-ready CRUD apps instantly with AI-powered automation. No backend coding required.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-in slide-in-from-bottom-10 duration-700 delay-200">
                        <Link
                            href="/builder"
                            className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-2xl shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center justify-center group"
                        >
                            Get Started
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-100 dark:border-gray-700 rounded-2xl font-black text-lg hover:border-indigo-200 dark:hover:border-indigo-500 hover:-translate-y-1 transition-all flex items-center justify-center group">
                            <Play className="mr-2 w-5 h-5 fill-indigo-600 text-indigo-600" />
                            View Demo
                        </button>
                    </div>

                    {/* Trust badges/Social Proof */}
                    <div className="mt-24 pt-12 border-t border-gray-100 dark:border-gray-800 max-w-4xl mx-auto">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8">Trusted by innovators worldwide</p>
                        <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale pointer-events-none">
                            <div className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white italic">Vercel</div>
                            <div className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white italic">MongoDB</div>
                            <div className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white italic">Cloudinary</div>
                            <div className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white italic">SaaS.io</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-32 bg-gray-50/50 dark:bg-gray-800/20 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">How It Works</h2>
                        <p className="text-gray-500 dark:text-gray-400 font-medium max-w-xl mx-auto">Launch your app in three simple steps without writing a single line of backend code.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { step: "01", title: "Define Your Data Structure", desc: "Easily specify fields, types, and relationships using our visual schema builder." },
                            { step: "02", title: "Customize Design & Features", desc: "Choose themes, layouts, and feature sets like image support and authentication." },
                            { step: "03", title: "Launch Your App Instantly", desc: "Review your configuration and click deploy. Your full-stack app is live in seconds." }
                        ].map((item, i) => (
                            <div key={i} className="relative p-10 bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none group hover:-translate-y-2 transition-all">
                                <span className="absolute -top-6 left-10 text-6xl font-black text-indigo-50 dark:text-indigo-900/20 leading-none group-hover:text-indigo-100 dark:group-hover:text-indigo-800 transition-colors">{item.step}</span>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-4 leading-tight">{item.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-8">
                                Why Choose <span className="text-indigo-600 dark:text-indigo-400">FormForge AI</span>?
                            </h2>
                            <p className="text-lg text-gray-500 font-medium mb-12">
                                We combine the speed of AI with the reliability of modern stack to deliver a seamless app building experience.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                {[
                                    { icon: Rocket, label: "AI Powered Generation" },
                                    { icon: Database, label: "MongoDB Atlas Integration" },
                                    { icon: Shield, label: "Secure Authentication" },
                                    { icon: ImageIcon, label: "Cloudinary Support" },
                                    { icon: Layout, label: "Custom App Branding" },
                                    { icon: Code, label: "Production Ready UI" }
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center space-x-4 group">
                                        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                            <feature.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{feature.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-indigo-600 rounded-[40px] rotate-3 -z-10 opacity-10"></div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-[40px] shadow-2xl shadow-gray-200 dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden text-left">
                                <div className="bg-gray-900 rounded-[32px] p-6 space-y-6 shadow-3xl">
                                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                        <div className="flex space-x-2">
                                            <div className="w-2.5 h-2.5 bg-[#FF5F56] rounded-full"></div>
                                            <div className="w-2.5 h-2.5 bg-[#FFBD2E] rounded-full"></div>
                                            <div className="w-2.5 h-2.5 bg-[#27C93F] rounded-full"></div>
                                        </div>
                                        <div className="px-3 py-1 bg-white/5 rounded-full text-[9px] text-indigo-400 font-bold tracking-widest uppercase border border-white/5">PRO DASHBOARD</div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1">Total Users</p>
                                            <p className="text-xl font-black text-white">1,284</p>
                                            <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                                                <div className="w-2/3 h-full bg-indigo-500 rounded-full"></div>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1">Revenue</p>
                                            <p className="text-xl font-black text-white">$12.4k</p>
                                            <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                                                <div className="w-1/2 h-full bg-emerald-500 rounded-full"></div>
                                            </div>
                                        </div>
                                        <div className="p-4 col-span-2 bg-indigo-600/10 rounded-2xl border border-indigo-500/20">
                                            <div className="flex justify-between items-center mb-3">
                                                <p className="text-[9px] text-indigo-300 font-bold uppercase tracking-widest">Active Sessions</p>
                                                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></div>
                                            </div>
                                            <div className="flex items-end space-x-1 h-12">
                                                <div className="w-full bg-indigo-500/20 rounded-t h-4 transition-all hover:h-8 hover:bg-indigo-500"></div>
                                                <div className="w-full bg-indigo-500/20 rounded-t h-10 transition-all hover:h-8 hover:bg-indigo-500"></div>
                                                <div className="w-full bg-indigo-500/20 rounded-t h-6 transition-all hover:h-8 hover:bg-indigo-500"></div>
                                                <div className="w-full bg-indigo-500/20 rounded-t h-12 transition-all hover:h-8 hover:bg-indigo-500"></div>
                                                <div className="w-full bg-indigo-500/20 rounded-t h-2 transition-all hover:h-8 hover:bg-indigo-500"></div>
                                                <div className="w-full bg-indigo-500/20 rounded-t h-9 transition-all hover:h-8 hover:bg-indigo-500"></div>
                                                <div className="w-full bg-indigo-500/20 rounded-t h-7 transition-all hover:h-8 hover:bg-indigo-500"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                                                <Zap className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="text-[10px] font-bold text-white tracking-wide">Sync Complete</div>
                                        </div>
                                        <div className="text-[9px] font-black text-indigo-400">98%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Demo Preview Section */}
            <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-24">Experience the <span className="text-indigo-400">Premium</span> Output</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Sample Project Card */}
                        <div className="space-y-6 text-left">
                            <p className="text-xs font-black uppercase tracking-widest text-indigo-400 ml-1">Generated Records View</p>
                            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl border border-white/10 overflow-hidden">
                                <div className="aspect-video bg-gray-100 rounded-2xl mb-6 relative overflow-hidden group">
                                    <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80" alt="Demo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/80 backdrop-blur rounded-full text-xs font-black text-indigo-600">Project View</div>
                                </div>
                                <h4 className="text-gray-900 dark:text-white font-black text-xl mb-2">Modern SaaS Template</h4>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-6">Fully responsive, accessible, and clean design generated for your custom collection.</p>
                                <div className="flex items-center space-x-2 text-left">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs uppercase text-left italic">R</div>
                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300 italic">Roonjha Dev</span>
                                </div>
                                <span className="text-xs font-bold text-green-500">Live Status</span>
                            </div>
                        </div>

                        {/* Sample List Item */}
                        <div className="space-y-6 text-left">
                            <p className="text-xs font-black uppercase tracking-widest text-indigo-400 ml-1">Data Management View</p>
                            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-white/10">
                                <div className="space-y-6">
                                    {[
                                        { name: "John Doe", role: "Software Engineer", status: "Active" },
                                        { name: "Sarah Smith", role: "Designer", status: "Pending" },
                                        { name: "Mike Ross", role: "Manager", status: "Active" }
                                    ].map((user, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-600 shadow-sm overflow-hidden flex items-center justify-center text-gray-400 font-bold text-sm">
                                                    {user.name[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-gray-900 dark:text-white line-clamp-1">{user.name}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{user.role}</p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${user.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                                {user.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gray-50 dark:bg-gray-800 rounded-[48px] p-16 md:p-24 border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 dark:bg-indigo-400/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-8">
                        Ready to Build Your <br className="hidden md:block" />
                        Next Big Application?
                    </h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-medium mb-12 max-w-xl mx-auto">
                        Join developers who are saving weeks of coding by generating their apps with FormForge AI.
                    </p>
                    <Link
                        href="/builder"
                        className="inline-flex px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-2xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all group"
                    >
                        Build Your App Now
                        <Rocket className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
