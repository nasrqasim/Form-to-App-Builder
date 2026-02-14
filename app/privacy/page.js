import { Shield, Lock, Eye, Server, RefreshCw } from 'lucide-react';

export default function PrivacyPage() {
    const lastUpdated = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return (
        <div className="py-20 px-4 bg-slate-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-3xl mb-6 shadow-sm border border-indigo-200 dark:border-indigo-800">
                        <Shield size={40} />
                    </div>
                    <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                        Privacy Policy
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-gray-400 leading-relaxed font-medium">
                        Your privacy is our priority. Learn how we handle your data.
                    </p>
                    <p className="text-sm font-bold text-slate-400 dark:text-gray-500 mt-4 uppercase tracking-[0.2em]">
                        Last Updated: {lastUpdated}
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Section 1: Overview */}
                    <section className="bg-white dark:bg-gray-800 p-10 rounded-[40px] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-gray-700">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-3 rounded-2xl">
                                <Lock size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">1. Data Collection & Usage</h2>
                        </div>
                        <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-4">
                            AI Form-to-App Builder, developed by <strong>Roonjha Developer</strong>, collects minimum necessary info to provide application generation services. This includes:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-gray-400 ml-4 font-medium">
                            <li>Email address for account authentication</li>
                            <li>Encrypted password for secure access</li>
                            <li>App schemas and field definitions used for generation</li>
                            <li>Data entered into your generated applications</li>
                        </ul>
                    </section>

                    {/* Section 2: Security */}
                    <section className="bg-white dark:bg-gray-800 p-10 rounded-[40px] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-gray-700">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 p-3 rounded-2xl">
                                <Server size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">2. Security & Storage</h2>
                        </div>
                        <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-4">
                            We take security seriously. All passwords are hashed using industry-standard <strong>bcrypt</strong> before being stored in our database. We never store plain-text passwords.
                        </p>
                        <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                            Our infrastructure uses secure MongoDB Atlas clusters for data persistence, ensuring that your generated applications and their data are stored with high availability and security.
                        </p>
                    </section>

                    {/* Section 3: User Rights */}
                    <section className="bg-white dark:bg-gray-800 p-10 rounded-[40px] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-gray-700">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 p-3 rounded-2xl">
                                <RefreshCw size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">3. Your Data, Your Control</h2>
                        </div>
                        <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-4">
                            You own your data. You have the right to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-gray-400 ml-4 font-medium mb-6">
                            <li>Access all applications you've created via your Dashboard</li>
                            <li>Delete any of your generated applications at any time</li>
                            <li>Request full account deletion</li>
                        </ul>
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-800">
                            <p className="text-indigo-700 dark:text-indigo-400 text-sm font-bold flex items-center gap-2">
                                <Eye size={16} /> Note: Once you delete an application, its metadata and structure are permanently removed from our system.
                            </p>
                        </div>
                    </section>

                    {/* Contact Attribution */}\
                    <div className="text-center py-10">
                        <p className="text-slate-500 dark:text-gray-500 font-medium">
                            Questions about our privacy practices? Email us at:
                        </p>
                        <a href="mailto:roonjhadevelopers@gmail.com" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline text-lg">
                            roonjhadevelopers@gmail.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
