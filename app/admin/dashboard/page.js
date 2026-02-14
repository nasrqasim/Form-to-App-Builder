'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Users,
    CreditCard,
    CheckCircle,
    XCircle,
    Loader2,
    LogOut,
    Search,
    Filter
} from 'lucide-react';

export default function AdminDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [requests, setRequests] = useState([]);
    const [processingId, setProcessingId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/admin/dashboard');
            if (res.status === 401 || res.status === 403) {
                router.push('/admin/login');
                return;
            }
            const data = await res.json();
            if (data.success) {
                setStats(data.stats);
                setRequests(data.requests);
            }
        } catch (error) {
            console.error('Failed to fetch dashboard data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, action) => {
        setProcessingId(id);
        try {
            const res = await fetch('/api/admin/upgrade-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ requestId: id, action })
            });
            const data = await res.json();
            if (data.success) {
                fetchData(); // Refresh data
            } else {
                alert(data.message || 'Action failed');
            }
        } catch (error) {
            console.error('Action error', error);
        } finally {
            setProcessingId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
                <Loader2 className="animate-spin mr-2" /> Loading Dashboard...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6">
            {/* Header */}
            <header className="flex justify-between items-center mb-10 bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <div>
                    <h1 className="text-3xl font-black tracking-tight">Admin Dashboard</h1>
                    <p className="text-slate-400 mt-1">Manage users and payment verifications</p>
                </div>
                <button
                    onClick={() => router.push('/logout')}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-sm font-medium"
                >
                    <LogOut size={16} /> Logout
                </button>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title="Total Users"
                    value={stats?.totalUsers || 0}
                    icon={Users}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Free Plan"
                    value={stats?.freeUsers || 0}
                    icon={Users}
                    color="bg-slate-500"
                />
                <StatCard
                    title="Pro Users"
                    value={stats?.proUsers || 0}
                    icon={CheckCircle}
                    color="bg-green-500"
                />
                <StatCard
                    title="Pending Requests"
                    value={stats?.pendingRequests || 0}
                    icon={CreditCard}
                    color="bg-amber-500"
                />
            </div>

            {/* Requests Table */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <CreditCard className="text-amber-500" size={24} />
                        Upgrade Requests
                    </h2>
                    <div className="flex gap-2">
                        {/* Future: Search/Filter */}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-900/50 text-slate-400 text-sm uppercase font-bold tracking-wider">
                            <tr>
                                <th className="p-6">User</th>
                                <th className="p-6">Plan</th>
                                <th className="p-6">Method</th>
                                <th className="p-6">Payment Details</th>
                                <th className="p-6">Time</th>
                                <th className="p-6">Status</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700 text-sm">
                            {requests.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="p-8 text-center text-slate-500">
                                        No pending requests found.
                                    </td>
                                </tr>
                            ) : (
                                requests.map((req) => (
                                    <tr key={req.id} className="hover:bg-slate-700/30 transition-colors">
                                        <td className="p-6 font-medium">
                                            {req.user?.email || 'Unknown User'}
                                            <div className="text-xs text-slate-500 mt-0.5">{req.userId}</div>
                                        </td>
                                        <td className="p-6">
                                            <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-xs font-bold uppercase">
                                                {req.planRequested}
                                            </span>
                                        </td>
                                        <td className="p-6 font-medium text-slate-300">
                                            {req.paymentMethod}
                                        </td>
                                        <td className="p-6">
                                            <div className="space-y-1">
                                                <div className="text-slate-300 font-medium">{req.accountName}</div>
                                                <div className="text-slate-400 text-xs tracking-wider">{req.accountNumber}</div>
                                                <div className="text-emerald-400 text-xs font-mono bg-emerald-900/20 px-1.5 py-0.5 rounded inline-block">
                                                    Ref: {req.referenceNumber}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 text-slate-400">
                                            {new Date(req.createdAt).toLocaleDateString()}
                                            <div className="text-xs opacity-60">
                                                {new Date(req.createdAt).toLocaleTimeString()}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <StatusBadge status={req.status} />
                                        </td>
                                        <td className="p-6 text-right">
                                            {req.status === 'PENDING' && (
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleAction(req.id, 'APPROVE')}
                                                        disabled={!!processingId}
                                                        className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors disabled:opacity-50"
                                                        title="Approve"
                                                    >
                                                        {processingId === req.id ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle size={16} />}
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(req.id, 'REJECT')}
                                                        disabled={!!processingId}
                                                        className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors disabled:opacity-50"
                                                        title="Reject"
                                                    >
                                                        {processingId === req.id ? <Loader2 className="animate-spin" size={16} /> : <XCircle size={16} />}
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color }) {
    return (
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex items-center justify-between">
            <div>
                <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-black">{value}</h3>
            </div>
            <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                <Icon size={24} />
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        PENDING: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        APPROVED: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        REJECTED: "bg-red-500/20 text-red-300 border-red-500/30"
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || styles.PENDING}`}>
            {status}
        </span>
    );
}
