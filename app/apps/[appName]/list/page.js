'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
    Plus,
    Edit,
    Trash2,
    Loader2,
    LayoutGrid,
    Table2,
    UserCircle,
    Search,
    X,
    Maximize2,
    Download
} from 'lucide-react';
import ProjectNavbar from '@/components/ProjectNavbar';

export default function ListPage({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const { appName } = params;
    const [items, setItems] = useState([]);
    const [appMeta, setAppMeta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [viewMode, setViewMode] = useState('table');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchData();
    }, [appName]);

    const fetchData = async () => {
        try {
            const res = await fetch(`/api/apps/${appName}/list`);
            const data = await res.json();
            if (res.ok) {
                setItems(data.items);
                setAppMeta(data.appMeta);
                if (data.appMeta.viewType) {
                    setViewMode(data.appMeta.viewType);
                }
            } else {
                setError(data.message || 'Failed to fetch data');
            }
        } catch (err) {
            setError('An error occurred while fetching data');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this record?')) return;
        try {
            const res = await fetch(`/api/apps/${appName}/delete/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setItems(items.filter(item => item._id !== id));
            } else {
                alert('Failed to delete item');
            }
        } catch (err) {
            alert('An error occurred during deletion');
        }
    };

    // Filter items based on search term
    const filteredItems = items.filter(item => {
        if (!searchTerm) return true;
        return Object.values(item).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const formatFieldValue = (field, value) => {
        if (field.fieldType === 'image') {
            return (
                <div
                    className="relative group cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (value) setSelectedImage(value);
                    }}
                >
                    {value ? (
                        <div className="relative">
                            <img src={value} alt="Profile" className="w-10 h-10 rounded-full object-cover border border-gray-200 transition-transform group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <Maximize2 className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                            <UserCircle className="w-6 h-6" />
                        </div>
                    )}
                </div>
            );
        }
        if (field.fieldType === 'boolean') return value ? '✅ Yes' : '❌ No';
        if (field.fieldType === 'date' && value) return new Date(value).toLocaleDateString();
        return String(value ?? '-');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-indigo-600 w-12 h-12" />
            </div>
        );
    }

    if (error || !appMeta) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 text-center">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">App Not Found</h2>
                    <p className="text-gray-500 mb-8">{error || 'The requested application could not be loaded.'}</p>
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

            {/* Image Preview Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="relative max-w-2xl max-h-[70vh] w-full" onClick={e => e.stopPropagation()}>
                        <img
                            src={selectedImage}
                            alt="Full View"
                            className="w-full h-full max-h-[60vh] object-contain rounded-2xl shadow-2xl"
                        />
                        <div className="mt-4 flex justify-center gap-4">
                            <a
                                href={selectedImage}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-bold flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <Download className="w-5 h-5 mr-2" /> Download Image
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight capitalize">
                            {appMeta.name} Records
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">{filteredItems.length} {filteredItems.length === 1 ? 'entry' : 'entries'} found</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        {/* Search Bar */}
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                            <input
                                type="text"
                                placeholder={`Search ${appMeta.name}...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none transition-all shadow-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className="bg-white dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 flex shadow-sm">
                                <button
                                    onClick={() => setViewMode('table')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}`}
                                >
                                    <Table2 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('card')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'card' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}`}
                                >
                                    <LayoutGrid className="w-5 h-5" />
                                </button>
                            </div>

                            <Link
                                href={`/apps/${appName}/create`}
                                className="flex-1 sm:flex-none justify-center bg-indigo-600 dark:bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-100 dark:shadow-none flex items-center"
                            >
                                <Plus className="w-5 h-5 mr-2" /> Add Record
                            </Link>
                        </div>
                    </div>
                </div>

                {viewMode === 'table' ? (
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                                        {appMeta.fields.map((field) => (
                                            <th key={field.fieldName} className="px-6 py-5 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                                {field.fieldName.replace(/([A-Z])/g, ' $1').trim()}
                                            </th>
                                        ))}
                                        <th className="px-6 py-5 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                                    {filteredItems.length === 0 ? (
                                        <tr>
                                            <td colSpan={appMeta.fields.length + 1} className="px-6 py-12 text-center text-gray-400 dark:text-gray-500 font-medium">
                                                {searchTerm ? `No results matching "${searchTerm}"` : 'No records available yet.'}
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredItems.map((item) => (
                                            <tr key={item._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors group">
                                                {appMeta.fields.map((field) => (
                                                    <td key={field.fieldName} className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                                                        {formatFieldValue(field, item[field.fieldName])}
                                                    </td>
                                                ))}
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end space-x-2">
                                                        <Link
                                                            href={`/apps/${appName}/edit/${item._id}`}
                                                            className="p-2 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(item._id)}
                                                            className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.length === 0 ? (
                            <div className="col-span-full py-12 text-center text-gray-400 dark:text-gray-500 font-medium">
                                {searchTerm ? `No results matching "${searchTerm}"` : 'No records available yet.'}
                            </div>
                        ) : (
                            filteredItems.map((item) => {
                                const imageField = appMeta.fields.find(f => f.fieldType === 'image');
                                const imageUrl = imageField ? item[imageField.fieldName] : null;
                                const titleField = appMeta.fields.find(f => f.fieldType === 'text') || appMeta.fields[0];

                                return (
                                    <div key={item._id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all group">
                                        <div
                                            className="relative h-64 bg-gray-100 dark:bg-gray-900 cursor-zoom-in"
                                            onClick={() => imageUrl && setSelectedImage(imageUrl)}
                                        >
                                            {imageUrl ? (
                                                <img src={imageUrl} alt="Card" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-700">
                                                    <UserCircle className="w-24 h-24" />
                                                </div>
                                            )}
                                            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/apps/${appName}/edit/${item._id}`}
                                                    className="p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-lg rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-white dark:hover:bg-gray-700 text-xs font-bold flex items-center transition-colors"
                                                    onClick={e => e.stopPropagation()}
                                                >
                                                    <Edit className="w-4 h-4 mr-1" /> Edit
                                                </Link>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(item._id);
                                                    }}
                                                    className="p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-lg rounded-xl text-red-600 dark:text-red-400 hover:bg-white dark:hover:bg-gray-700 text-xs font-bold flex items-center transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                                                </button>
                                            </div>
                                            {imageUrl && (
                                                <div className="absolute bottom-4 left-4 p-2 bg-black/40 dark:bg-white/10 backdrop-blur rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Search className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 truncate uppercase tracking-tight">
                                                {item[titleField.fieldName] || 'Untitled Record'}
                                            </h3>
                                            <div className="space-y-4">
                                                {appMeta.fields.filter(f => f.fieldType !== 'image' && f.fieldName !== titleField.fieldName).slice(0, 4).map(field => (
                                                    <div key={field.fieldName}>
                                                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
                                                            {field.fieldName.replace(/([A-Z])/g, ' $1').trim()}
                                                        </p>
                                                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate">
                                                            {formatFieldValue(field, item[field.fieldName])}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
