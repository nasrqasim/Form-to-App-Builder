'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, Rocket, ArrowLeft } from 'lucide-react';
import ProjectNavbar from '@/components/ProjectNavbar';
import ImageUpload from '@/components/ImageUpload';

export default function CreatePage({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const { appName } = params;
    const router = useRouter();
    const [appMeta, setAppMeta] = useState(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMeta();
    }, [appName]);

    const fetchMeta = async () => {
        try {
            const res = await fetch(`/api/apps/${appName}/list`);
            const data = await res.json();
            if (res.ok) {
                setAppMeta(data.appMeta);
                const initial = {};
                data.appMeta.fields.forEach(f => {
                    if (f.fieldType === 'boolean') initial[f.fieldName] = false;
                    else initial[f.fieldName] = f.defaultValue || '';
                });
                setFormData(initial);
            } else {
                setError(data.message || 'Failed to fetch app schema');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (fieldName, value) => {
        setFormData(prev => ({ ...prev, [fieldName]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const res = await fetch(`/api/apps/${appName}/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push(`/apps/${appName}/list`);
            } else {
                const data = await res.json();
                setError(data.message || 'Failed to create record');
            }
        } catch (err) {
            setError('An error occurred during submission');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-indigo-600 w-12 h-12" />
            </div>
        );
    }

    if (!appMeta) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
            <ProjectNavbar
                appName={appMeta.name}
                logo={appMeta.projectLogo}
                slug={appMeta.slug}
            />

            <main className="max-w-3xl mx-auto py-12 px-4">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Add New Entry</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Fill in the details below for your {appMeta.name} collection</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-10 space-y-8">
                        {appMeta.fields.map((field) => (
                            <div key={field.fieldName} className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                                    {field.fieldName.replace(/([A-Z])/g, ' $1').trim()}
                                    {field.required && <span className="text-red-500 ml-1">*</span>}
                                </label>

                                {field.fieldType === 'image' ? (
                                    <ImageUpload
                                        value={formData[field.fieldName]}
                                        onChange={(url) => handleInputChange(field.fieldName, url)}
                                        label={null}
                                    />
                                ) : field.fieldType === 'select' ? (
                                    <select
                                        value={formData[field.fieldName] || ''}
                                        onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
                                        required={field.required}
                                        className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border-0 rounded-2xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:text-white transition-all font-medium"
                                    >
                                        <option value="">Select Option</option>
                                        {field.options?.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                ) : field.fieldType === 'boolean' ? (
                                    <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900 transition-all cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData[field.fieldName] || false}
                                            onChange={(e) => handleInputChange(field.fieldName, e.target.checked)}
                                            className="w-5 h-5 rounded border-gray-300 dark:border-gray-700 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="font-bold text-gray-600 dark:text-gray-400">Yes / Enabled</span>
                                    </div>
                                ) : (
                                    <input
                                        type={field.fieldType === 'number' ? 'number' :
                                            field.fieldType === 'email' ? 'email' :
                                                field.fieldType === 'date' ? 'date' : 'text'}
                                        value={formData[field.fieldName] || ''}
                                        onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
                                        required={field.required}
                                        className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border-0 rounded-2xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:text-white transition-all font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                        placeholder={`Enter ${field.fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                                    />
                                )}
                            </div>
                        ))}

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-2xl border border-red-100 dark:border-red-900/50 text-sm font-bold flex items-center">
                                <span className="mr-2">⚠️</span> {error}
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex-1 py-4 bg-indigo-600 dark:bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-all flex items-center justify-center disabled:opacity-50"
                            >
                                {submitting ? <Loader2 className="animate-spin mr-2" /> : <Rocket className="mr-2 w-5 h-5" />}
                                {submitting ? 'Saving...' : 'Create Entry'}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-8 py-4 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-800 transition-all flex items-center justify-center"
                            >
                                <ArrowLeft className="mr-2 w-5 h-5" /> Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
