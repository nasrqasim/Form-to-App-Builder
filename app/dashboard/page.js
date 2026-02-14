'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Rocket, Plus, ExternalLink, Trash2, Layout, Database,
    Calendar, Loader2, LayoutGrid, List as ListIcon,
    ArrowRight, Globe, ShieldCheck
} from 'lucide-react';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchUserData();
        fetchApps();
    }, []);

    const fetchUserData = async () => {
        try {
            const res = await fetch('/api/auth/me');
            const data = await res.json();
            if (res.ok) {
                setUser(data.user);
            } else {
                router.push('/login');
            }
        } catch (err) {
            router.push('/login');
        }
    };

    const fetchApps = async () => {
        try {
            const res = await fetch('/api/apps/my-apps');
            const data = await res.json();
            if (res.ok) {
                setApps(data.apps);
            }
        } catch (err) {
            console.error('Failed to fetch apps');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteApp = async (id, name) => {
        if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) return;

        setDeletingId(id);
        try {
            const res = await fetch(`/api/apps/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setApps(apps.filter(app => app._id !== id));
            }
        } catch (err) {
            console.error('Delete failed');
        } finally {
            setDeletingId(null);
        }
    };

    if (loading && !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <Loader2 className="animate-spin text-indigo-600 dark:text-indigo-400 w-12 h-12" />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            {/* Professional Header / Hero */}
            <div className="relative pt-16 pb-24 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[300px] bg-gray-900 dark:bg-black -z-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest">
                                <ShieldCheck className="w-4 h-4" />
                                <span>Verified Developer Account</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                                Welcome back, <span className="text-indigo-400">{user?.name?.split(' ')[0]}</span>
                            </h1>
                            <p className="text-gray-400 text-lg max-w-xl">
                                You have {apps.length} active application{apps.length !== 1 ? 's' : ''} deployed on the network.
                            </p>
                        </div>
                        <Link
                            href="/builder"
                            className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all flex items-center justify-center group"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Create New App
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-700">
                        <Loader2 className="animate-spin text-indigo-600 dark:text-indigo-400 mb-4" size={40} />
                        <p className="text-gray-500 dark:text-gray-400 font-bold tracking-wide">Syncing your workspace...</p>
                    </div>
                ) : apps.length === 0 ? (
                    <div className="text-center py-32 bg-white dark:bg-gray-800 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-50 dark:bg-gray-900 rounded-3xl mb-8 text-gray-300 dark:text-gray-700">
                            <Rocket size={48} />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Your Workspace is Empty</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-sm mx-auto font-medium">
                            Generate your first full-stack application with Cloudinary support and dynamic schema building.
                        </p>
                        <Link
                            href="/builder"
                            className="inline-flex items-center gap-2 px-10 py-5 bg-gray-900 hover:bg-black text-white font-black rounded-2xl transition-all shadow-xl shadow-gray-200"
                        >
                            <Rocket size={20} className="mr-2" /> Start First Project
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {apps.map((app) => (
                            <div
                                key={app._id}
                                className="bg-white dark:bg-gray-800 rounded-[32px] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-1 group overflow-hidden"
                            >
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        {app.projectLogo ? (
                                            <img src={app.projectLogo} alt={app.name} className="w-14 h-14 rounded-2xl object-cover shadow-lg border border-gray-50 dark:border-gray-700" />
                                        ) : (
                                            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 dark:shadow-none">
                                                <Layout size={28} />
                                            </div>
                                        )}
                                        <button
                                            onClick={() => handleDeleteApp(app._id, app.name)}
                                            disabled={deletingId === app._id}
                                            className="p-3 text-gray-300 dark:text-gray-600 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all"
                                        >
                                            {deletingId === app._id ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
                                        </button>
                                    </div>

                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                                        {app.name}
                                    </h3>

                                    <div className="flex items-center text-gray-400 dark:text-gray-500 text-sm font-bold mb-8">
                                        <Globe className="w-4 h-4 mr-2" />
                                        <span className="truncate">/apps/{app.slug}</span>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 mb-8">
                                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl flex items-center justify-between border border-gray-100/50 dark:border-gray-700">
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-0.5">Collection</p>
                                                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{app.collectionName}</p>
                                            </div>
                                            <Database className="w-5 h-5 text-gray-300 dark:text-gray-700" />
                                        </div>
                                    </div>

                                    <Link
                                        href={`/apps/${app.slug}`}
                                        className="w-full py-4 bg-indigo-600 dark:bg-indigo-600 text-white rounded-[20px] font-black flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-500/10 dark:shadow-none hover:bg-indigo-700 dark:hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Manage App <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}

                        {/* Empty State Card */}
                        <Link
                            href="/builder"
                            className="border-4 border-dashed border-gray-100 dark:border-gray-800 rounded-[32px] p-8 flex flex-col items-center justify-center text-center group hover:border-indigo-100 dark:hover:border-indigo-900 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-all min-h-[400px]"
                        >
                            <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-300 dark:text-gray-600 mb-4 group-hover:scale-110 group-hover:text-indigo-400 transition-all shadow-sm">
                                <Plus size={32} />
                            </div>
                            <p className="font-black text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 uppercase tracking-widest text-sm transition-colors">Generate New</p>
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
