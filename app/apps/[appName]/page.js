'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
    PlusCircle,
    List,
    ArrowRight,
    Layout,
    Loader2,
    Database,
    Clock,
    UserCircle
} from 'lucide-react';
import ProjectNavbar from '@/components/ProjectNavbar';

export default function AppPage({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const { appName } = params;
    const [appMeta, setAppMeta] = useState(null);
    const [stats, setStats] = useState({ count: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppData();
    }, [appName]);

    const fetchAppData = async () => {
        try {
            const res = await fetch(`/api/apps/${appName}/list`);
            const data = await res.json();
            if (res.ok) {
                setAppMeta(data.appMeta);
                setStats({ count: data.items.length });
            }
        } catch (err) {
            console.error('Error fetching app data:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-indigo-600 w-12 h-12" />
            </div>
        );
    }

    if (!appMeta) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 font-sans text-center">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">App Not Found</h1>
                    <p className="text-gray-500 mb-8 text-center">The application you are looking for does not exist or has been deleted.</p>
                    <Link href="/dashboard" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <ProjectNavbar
                appName={appMeta.name}
                logo={appMeta.projectLogo}
                slug={appMeta.slug}
            />

            <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                {/* Hero / Header */}
                <div className="bg-white dark:bg-gray-800 rounded-[40px] p-12 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 mb-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/10 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700 -z-0" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                        <div className="shrink-0">
                            {appMeta.projectLogo ? (
                                <img
                                    src={appMeta.projectLogo}
                                    alt={appMeta.name}
                                    className="w-32 h-32 rounded-3xl object-contain shadow-2xl border-4 border-white dark:border-gray-700 transform -rotate-3 hover:rotate-0 transition-transform"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-3xl bg-indigo-600 flex items-center justify-center text-white shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform">
                                    <Layout className="w-16 h-16" />
                                </div>
                            )}
                        </div>

                        <div className="text-center md:text-left">
                            <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tight capitalize mb-4">
                                Welcome to {appMeta.name}
                            </h1>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-xl text-sm font-bold flex items-center">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                                    Active Deployment
                                </span>
                                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-xl text-sm font-bold flex items-center">
                                    <Database className="w-4 h-4 mr-2" />
                                    {stats.count} Total Records
                                </span>
                                <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">
                                    Created {new Date(appMeta.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Link
                        href={`/apps/${appMeta.slug}/create`}
                        className="group bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-1 relative overflow-hidden"
                    >
                        <div className="absolute bottom-0 right-0 opacity-5 dark:opacity-10 dark:text-white group-hover:scale-110 transition-transform">
                            <PlusCircle size={140} />
                        </div>
                        <div className="flex flex-col h-full">
                            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-100 dark:shadow-none">
                                <PlusCircle className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create New Record</h2>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs">Add a new entry to your {appMeta.name} database mapping all predefined fields.</p>
                            <div className="mt-auto flex items-center font-bold text-indigo-600 dark:text-indigo-400">
                                Get Started <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    <Link
                        href={`/apps/${appMeta.slug}/list`}
                        className="group bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-1 relative overflow-hidden"
                    >
                        <div className="absolute bottom-0 right-0 opacity-5 dark:opacity-10 dark:text-indigo-400 group-hover:scale-110 transition-transform text-indigo-600">
                            <List size={140} />
                        </div>
                        <div className="flex flex-col h-full">
                            <div className="w-14 h-14 bg-gray-900 dark:bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-gray-200 dark:shadow-none">
                                <List className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Manage All Data</h2>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs">View, filter, edit and delete all records in your {appMeta.collectionName} collection.</p>
                            <div className="mt-auto flex items-center font-bold text-gray-900 dark:text-gray-200">
                                View Records <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* System Overview */}
                <div className="mt-12 bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                            <Clock className="w-6 h-6 mr-3 text-indigo-600 dark:text-indigo-400" />
                            System Overview
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl transition-colors">
                            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Status</p>
                            <p className="text-lg font-bold text-green-600 dark:text-green-400">Healthy</p>
                        </div>
                        <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl transition-colors">
                            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">API Endpoint</p>
                            <p className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400 truncate">/api/apps/{appMeta.slug}</p>
                        </div>
                        <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl transition-colors">
                            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Primary Collection</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-gray-200 capitalize">{appMeta.collectionName}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
