'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Banknote, User, Hash, FileText, CheckCircle, Loader2 } from 'lucide-react';

export default function UpgradePage() {
    const router = useRouter();
    const [method, setMethod] = useState('EASYPAISA');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        accountName: '',
        accountNumber: '',
        referenceNumber: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/upgrade', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    paymentMethod: method,
                    planRequested: 'PRO',
                    ...formData
                })
            });

            const data = await res.json();
            if (res.ok) {
                setSuccess(true);
            } else {
                alert(data.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Upgrade submission error', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
                        <CheckCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Request Submitted!</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Your payment verification is pending. Once approved by the admin, your account will be upgraded to Pro automatically.
                    </p>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
                        Upgrade to <span className="text-indigo-600 dark:text-indigo-400">Pro</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Complete your payment to unlock exclusive features.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Payment Instructions */}
                    <div className="space-y-6">
                        <div
                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${method === 'EASYPAISA'
                                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-500'
                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-300'
                                }`}
                            onClick={() => setMethod('EASYPAISA')}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <Banknote className="text-green-600" /> Easypaisa
                                </h3>
                                {method === 'EASYPAISA' && <div className="w-4 h-4 bg-indigo-600 rounded-full" />}
                            </div>
                            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
                                <div className="flex justify-between">
                                    <span>Account Title:</span>
                                    <span className="font-mono font-bold">Roonjha Developer</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Account Number:</span>
                                    <span className="font-mono font-bold text-lg select-all">03123456789</span>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${method === 'BANK'
                                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-500'
                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-300'
                                }`}
                            onClick={() => setMethod('BANK')}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <CreditCard className="text-blue-600" /> Bank Transfer
                                </h3>
                                {method === 'BANK' && <div className="w-4 h-4 bg-indigo-600 rounded-full" />}
                            </div>
                            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl">
                                <div className="flex justify-between">
                                    <span>Bank Name:</span>
                                    <span className="font-bold">HBL (Habib Bank Ltd)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Account Title:</span>
                                    <span className="font-mono font-bold">Roonjha Tech</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Account Number:</span>
                                    <span className="font-mono font-bold select-all">1234-5678-9012-34</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <FileText className="text-indigo-600" />
                            Submit Payment Details
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    <User size={16} /> Sender Account Name
                                </label>
                                <input
                                    name="accountName"
                                    required
                                    value={formData.accountName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. John Doe"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    <Hash size={16} /> Sender Account Number
                                </label>
                                <input
                                    name="accountNumber"
                                    required
                                    value={formData.accountNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. 03001234567"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    <FileText size={16} /> Transaction ID / Reference No.
                                </label>
                                <input
                                    name="referenceNumber"
                                    required
                                    value={formData.referenceNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all uppercase tracking-widest font-mono"
                                    placeholder="e.g. TRX123456789"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : 'Confirm Payment'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
