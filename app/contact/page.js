'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, Globe, MessageSquare } from 'lucide-react';

export default function ContactPage() {
    const [status, setStatus] = useState('idle'); // idle, loading, success

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        // Simulated submission
        setTimeout(() => setStatus('success'), 1500);
    };

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            {/* Premium Header */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-gray-900 dark:bg-black transition-colors duration-300">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -z-0"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] -z-0"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 text-indigo-400 rounded-lg text-[10px] font-black uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-md">
                            <Globe className="w-3 h-3" />
                            <span>Global Support</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1] mb-8">
                            Let's Build Something <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 italic">Extraordinary</span>.
                        </h1>
                        <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-2xl">
                            Whether you're a developer scaling a product or a startup building from scratch, our team is ready to help you forge your vision into reality.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-32 -mt-12 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                        {/* Contact Info Column (Left) */}
                        <div className="lg:col-span-5 space-y-12">
                            <div className="grid grid-cols-1 gap-6">
                                {[
                                    { icon: Phone, title: "Quick Call", value: "+92 315 2914836", desc: "Mon - Fri, 9am - 6pm PST", color: "bg-blue-50 text-blue-600" },
                                    { icon: Mail, title: "Email Support", value: "roonjhadevelopers@gmail.com", desc: "24/7 Response Target", color: "bg-indigo-50 text-indigo-600" },
                                    { icon: MapPin, title: "Main Office", value: "Lasbela, Pakistan", desc: "Balochistan Tech Hub", color: "bg-emerald-50 text-emerald-600" }
                                ].map((item, i) => (
                                    <div key={i} className="p-8 bg-white dark:bg-gray-800 rounded-[32px] border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-none hover:border-indigo-100 dark:hover:border-indigo-500 transition-all group">
                                        <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.title}</h4>
                                        <p className="text-xl font-black text-gray-900 dark:text-white mb-2">{item.value}</p>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Social Presence */}
                            <div className="p-10 bg-gray-50 dark:bg-gray-800 rounded-[40px] border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center space-y-6">
                                <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">Join our Community</h4>
                                <div className="flex space-x-6">
                                    <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-2xl shadow-sm flex items-center justify-center text-gray-400 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors border border-gray-100 dark:border-gray-600"><MessageSquare size={20} /></div>
                                    <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-2xl shadow-sm flex items-center justify-center text-gray-400 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-colors border border-gray-100 dark:border-gray-600"><Globe size={20} /></div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form Column (Right) */}
                        <div className="lg:col-span-7">
                            <div className="bg-white dark:bg-gray-800 p-8 md:p-14 rounded-[48px] border border-gray-100 dark:border-gray-700 shadow-3xl dark:shadow-none relative overflow-hidden">
                                <div className="max-w-lg">
                                    <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-4">Send us a Message</h2>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium mb-12">Fill out the form below and we'll get back to you within 24 hours.</p>
                                </div>

                                {status === 'success' ? (
                                    <div className="text-center py-20 animate-in zoom-in duration-500">
                                        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10">
                                            <CheckCircle2 size={48} />
                                        </div>
                                        <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter italic">Message Delivered!</h3>
                                        <p className="text-gray-500 dark:text-gray-400 font-medium max-w-sm mx-auto">We've received your request. One of our specialists will reach out shortly.</p>
                                        <button onClick={() => setStatus('idle')} className="mt-12 px-10 py-5 bg-gray-900 dark:bg-indigo-600 text-white rounded-2xl font-black tracking-tight hover:bg-black dark:hover:bg-indigo-700 transition-all">Send Another</button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Your Identity</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="e.g. John Doe"
                                                    className="w-full px-7 py-5 bg-gray-50 dark:bg-gray-900/50 border-2 border-transparent dark:border-gray-700 rounded-2xl focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Secure Email</label>
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="john@formforge.ai"
                                                    className="w-full px-7 py-5 bg-gray-50 dark:bg-gray-900/50 border-2 border-transparent dark:border-gray-700 rounded-2xl focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subject of interest</label>
                                            <select className="w-full px-7 py-5 bg-gray-50 dark:bg-gray-900/50 border-2 border-transparent dark:border-gray-700 rounded-2xl focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all font-bold text-gray-900 dark:text-white cursor-pointer appearance-none">
                                                <option>Custom App Development</option>
                                                <option>Technical Support</option>
                                                <option>Partnership Inquiry</option>
                                                <option>Feedback & Suggestions</option>
                                            </select>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Detailed Message</label>
                                            <textarea
                                                required
                                                rows={6}
                                                placeholder="Tell us everything about your requirements..."
                                                className="w-full px-7 py-5 bg-gray-50 dark:bg-gray-900/50 border-2 border-transparent dark:border-gray-700 rounded-3xl focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600 resize-none"
                                            ></textarea>
                                        </div>

                                        <button
                                            disabled={status === 'loading'}
                                            className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center justify-center group disabled:opacity-50"
                                        >
                                            {status === 'loading' ? <Loader2 className="animate-spin w-8 h-8" /> : (
                                                <>
                                                    Forge Message
                                                    <Send className="ml-3 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
