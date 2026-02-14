'use client';

import {
    Zap,
    Shield,
    Database,
    Image as ImageIcon,
    Layout,
    Smartphone,
    Lock,
    Cloud,
    Settings,
    Users,
    Code,
    BarChart
} from 'lucide-react';

export default function FeaturesPage() {
    const mainFeatures = [
        {
            icon: Zap,
            title: "Instant CRUD Generation",
            desc: "Generate complete Create, Read, Update, and Delete operations for any data structure in seconds. No repetitive coding required.",
            color: "text-amber-500",
            bg: "bg-amber-50"
        },
        {
            icon: Lock,
            title: "Advanced Authentication",
            desc: "Production-ready auth system out of the box. Secure your data with built-in login, registration, and role-based access control.",
            color: "text-indigo-600",
            bg: "bg-indigo-50"
        },
        {
            icon: ImageIcon,
            title: "Smart Image Handling",
            desc: "Seamless Cloudinary integration for lightning-fast image uploads, automated resizing, and high-performance CDN delivery.",
            color: "text-pink-500",
            bg: "bg-pink-50"
        },
        {
            icon: Database,
            title: "MongoDB Persistence",
            desc: "Highly scalable NoSQL database integration. Your data is stored securely and optimized for high-traffic applications.",
            color: "text-emerald-500",
            bg: "bg-emerald-50"
        },
        {
            icon: Layout,
            title: "Modern UI Design",
            desc: "Premium, glassmorphic layouts that adapt to your brand. Responsive, accessible, and designed for a superior user experience.",
            color: "text-blue-500",
            bg: "bg-blue-50"
        },
        {
            icon: Settings,
            title: "Custom App Rules",
            desc: "Define custom validation, required fields, and unique constraints for every data collection you generate.",
            color: "text-violet-500",
            bg: "bg-violet-50"
        }
    ];

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            {/* Header Section */}
            <section className="pt-24 pb-20 bg-gray-50/50 dark:bg-gray-800/20 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-left">
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                        Everything You Need to <br />
                        <span className="text-indigo-600 dark:text-indigo-400">Scale Your Business</span>
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto">
                        Explore the powerful features that make FormForge AI the most versatile app generator on the market.
                    </p>
                </div>
            </section>

            {/* Main Features Grid */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                        {mainFeatures.map((f, i) => (
                            <div key={i} className="group cursor-default">
                                <div className={`w-16 h-16 ${f.bg} dark:bg-opacity-20 ${f.color} rounded-[20px] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                                    <f.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">{f.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deep Dive Section */}
            <section className="py-32 bg-gray-900 text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_-20%,rgba(79,70,229,0.15),transparent)] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 space-y-12">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">Built for Developers, <br /> Loved by Everyone</h2>

                            <div className="space-y-8">
                                {[
                                    { icon: Smartphone, title: "Mobile First Architecture", desc: "Every generated app is natively responsive and works flawlessly on any device." },
                                    { icon: Cloud, title: "Cloud Native Scalability", desc: "Infrastructure designed to scale with your user base without any configuration." },
                                    { icon: Code, title: "Custom API Endpoints", desc: "Automatically generated RESTful APIs for integration with other third-party services." }
                                ].map((item, i) => (
                                    <div key={i} className="flex space-x-6">
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 shrink-0">
                                            <item.icon className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold mb-2 tracking-tight">{item.title}</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 relative">
                            <div className="bg-white/5 p-1 rounded-[48px] border border-white/10">
                                <div className="bg-gray-800 rounded-[44px] overflow-hidden p-8 border border-white/10 shadow-3xl">
                                    <div className="flex space-x-2 mb-8">
                                        <div className="w-3 h-3 bg-red-400 rounded-full opacity-50"></div>
                                        <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-50"></div>
                                        <div className="w-3 h-3 bg-green-400 rounded-full opacity-50"></div>
                                    </div>
                                    <pre className="text-xs text-indigo-300 font-mono leading-relaxed overflow-x-auto">
                                        {`{
  "appName": "Project Tracker",
  "status": "Production Ready",
  "features": [
    "Secure-Auth-v2",
    "Cloudinary-CDN",
    "MongoDB-Persistence",
    "Auto-Index-Scanning"
  ],
  "latency": "14ms",
  "vitals": {
    "LCP": "0.8s",
    "CLS": "0.0",
    "FID": "4ms"
  }
}`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Ready to Experience These Features?</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mb-10">Stop building boilerplates. Start building products.</p>
                    <a href="/builder" className="inline-flex px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 uppercase tracking-widest">
                        Get Started Now
                    </a>
                </div>
            </section>
        </div>
    );
}
