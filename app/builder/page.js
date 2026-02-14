'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Plus,
    Trash2,
    ChevronRight,
    Rocket,
    Settings,
    Type,
    Hash,
    Mail as MailIcon,
    Calendar,
    ToggleLeft,
    ListFilter,
    Image as ImageIcon,
    Loader2,
    CheckCircle2,
    Info
} from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

export default function AppBuilder() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        collectionName: '',
        projectLogo: '',
        theme: 'light',
        viewType: 'table',
        fields: [
            { fieldName: 'Name', fieldType: 'text', required: true },
            { fieldName: 'Description', fieldType: 'text', required: false }
        ]
    });

    const fieldTypes = [
        { id: 'text', label: 'Short Text', icon: Type },
        { id: 'number', label: 'Number', icon: Hash },
        { id: 'email', label: 'Email Address', icon: MailIcon },
        { id: 'date', label: 'Date Picker', icon: Calendar },
        { id: 'boolean', label: 'Checkbox/Boolean', icon: ToggleLeft },
        { id: 'select', label: 'Dropdown Select', icon: ListFilter },
        { id: 'image', label: 'Image Upload', icon: ImageIcon },
    ];

    const addField = () => {
        setFormData({
            ...formData,
            fields: [...formData.fields, { fieldName: '', fieldType: 'text', required: false }]
        });
    };

    const removeField = (index) => {
        if (formData.fields.length <= 2) {
            alert("Minimum 2 fields are required");
            return;
        }
        const newFields = formData.fields.filter((_, i) => i !== index);
        setFormData({ ...formData, fields: newFields });
    };

    const updateField = (index, updates) => {
        const newFields = [...formData.fields];
        newFields[index] = { ...newFields[index], ...updates };
        setFormData({ ...formData, fields: newFields });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/apps/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                router.push('/dashboard');
            } else {
                alert(data.error || 'Failed to create app');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-12 pb-24 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">App Builder</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Configure your dynamic application</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        {[1, 2].map((s) => (
                            <div
                                key={s}
                                className={`h-2 w-8 rounded-full transition-all duration-500 ${step === s ? 'bg-indigo-600 w-12' : 'bg-gray-200 dark:bg-gray-700'}`}
                            />
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {step === 1 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="p-8 border-b border-gray-50 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                        <Rocket className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">General Configuration</h2>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Essential details for your new application</p>
                            </div>

                            <div className="p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">App Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900/50 border-0 dark:border dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600"
                                            placeholder="e.g. Student Management"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">URL Slug</label>
                                        <div className="relative">
                                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 font-medium">/apps/</span>
                                            <input
                                                type="text"
                                                required
                                                className="w-full pl-20 pr-5 py-4 bg-gray-50 dark:bg-gray-900/50 border-0 dark:border dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600"
                                                placeholder="students"
                                                value={formData.slug}
                                                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 text-left">Project Logo (Optional)</label>
                                        <ImageUpload
                                            value={formData.projectLogo}
                                            onChange={(url) => setFormData({ ...formData, projectLogo: url })}
                                            label={null}
                                        />
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 flex items-center">
                                                Collection Name
                                                <Info className="w-4 h-4 ml-2 text-gray-400 dark:text-gray-500" />
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900/50 border-0 dark:border dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600"
                                                placeholder="e.g. students"
                                                value={formData.collectionName}
                                                onChange={(e) => setFormData({ ...formData, collectionName: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Preferred View</label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {['table', 'card'].map((type) => (
                                                    <button
                                                        key={type}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, viewType: type })}
                                                        className={`py-3 rounded-xl font-bold capitalize border-2 transition-all ${formData.viewType === type
                                                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none'
                                                            : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-indigo-200 dark:hover:border-indigo-500'
                                                            }`}
                                                    >
                                                        {type} View
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center"
                                >
                                    Next: Define Fields
                                    <ChevronRight className="ml-2 w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden">
                                <div className="p-8 border-b border-gray-50 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 flex justify-between items-center">
                                    <div>
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                                <Settings className="w-5 h-5" />
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Define Schema Fields</h2>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Add fields for your data collection</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addField}
                                        className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all"
                                    >
                                        <Plus className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="p-8 space-y-6">
                                    {formData.fields.map((field, index) => (
                                        <div
                                            key={index}
                                            className="group relative p-6 bg-gray-50 dark:bg-gray-900/40 rounded-2xl border border-transparent hover:border-indigo-200 dark:hover:border-indigo-900 transition-all"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                                                <div className="md:col-span-5 space-y-2">
                                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Field Label</label>
                                                    <input
                                                        type="text"
                                                        value={field.fieldName}
                                                        onChange={(e) => updateField(index, { fieldName: e.target.value })}
                                                        placeholder="e.g. Student Name"
                                                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-gray-900 dark:text-white"
                                                        required
                                                    />
                                                </div>
                                                <div className="md:col-span-4 space-y-2">
                                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Type</label>
                                                    <select
                                                        value={field.fieldType}
                                                        onChange={(e) => updateField(index, { fieldType: e.target.value })}
                                                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-gray-900 dark:text-white"
                                                    >
                                                        {fieldTypes.map(t => (
                                                            <option key={t.id} value={t.id}>{t.label}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="md:col-span-2 pb-3">
                                                    <label className="flex items-center space-x-2 cursor-pointer group/toggle">
                                                        <input
                                                            type="checkbox"
                                                            checked={field.required}
                                                            onChange={(e) => updateField(index, { required: e.target.checked })}
                                                            className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 bg-white dark:bg-gray-800"
                                                        />
                                                        <span className="text-sm font-bold text-gray-600 dark:text-gray-400 group-hover/toggle:text-indigo-600 dark:group-hover/toggle:text-indigo-400 transition-colors">Required</span>
                                                    </label>
                                                </div>
                                                <div className="md:col-span-1 flex justify-end pb-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeField(index)}
                                                        className="p-2 text-gray-400 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-8 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-gray-600 dark:text-gray-400 font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                        Back to Settings
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-10 py-4 bg-gray-900 dark:bg-indigo-600 text-white rounded-2xl font-black shadow-xl hover:bg-black dark:hover:bg-indigo-700 transition-all flex items-center disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                                Generating App...
                                            </>
                                        ) : (
                                            <>
                                                Deploy Application
                                                <Rocket className="ml-3 w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
