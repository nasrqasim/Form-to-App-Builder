'use client';

import { useRouter } from 'next/navigation';
import PricingCard from '@/components/PricingCard';

export default function PricingPage() {
    const router = useRouter();
    const plans = [
        {
            plan: "Starter",
            price: "Free",
            description: "Perfect for students and small personal projects.",
            features: [
                "1 Active Application",
                "Up to 100 Data Entries",
                "Basic Table View",
                "Standard App Logo",
                "Community Support"
            ],
            path: "/register"
        },
        {
            plan: "Pro",
            price: "29",
            description: "Best for startups and growing businesses.",
            features: [
                "Unlimited Applications",
                "Unlimited Data Entries",
                "Custom App Branding",
                "Image & File Support",
                "Advanced Card Views",
                "Priority Email Support"
            ],
            highlighted: true,
            path: "/upgrade"
        },
        {
            plan: "Business",
            price: "99",
            description: "Dedicated resources for large scale operations.",
            features: [
                "Everything in Pro",
                "Dedicated MongoDB Cluster",
                "Custom Domain Support",
                "Advanced Analytics",
                "API Keys Access",
                "24/7 Phone Support"
            ],
            path: "/contact"
        }
    ];

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            {/* Header */}
            <section className="pt-24 pb-20 bg-gray-50/50 dark:bg-gray-800/20 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-6">
                        Predictable <span className="text-indigo-600 dark:text-indigo-400">Pricing</span>
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-xl mx-auto">
                        Simple, transparent plans designed to scale with your ambition. No hidden fees.
                    </p>
                </div>
            </section>

            {/* Pricing Grid */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
                        {plans.map((p, i) => (
                            <PricingCard
                                key={i}
                                {...p}
                                onAction={() => router.push(p.path)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Preview */}
            <section className="py-24 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-12 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-10">
                        {[
                            { q: "Can I cancel my subscription anytime?", a: "Yes, you can cancel your subscription at any time from your account settings. There are no contracts." },
                            { q: "What happens if I reach my data limit?", a: "On the Starter plan, you'll be notified to upgrade once you reach 100 entries. Your data remains safe." },
                            { q: "Do you offer custom enterprise solutions?", a: "Absolutely. Contact our sales team for custom integrations, specialized support, or dedicated infrastructure." }
                        ].map((faq, i) => (
                            <div key={i} className="space-y-3">
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">{faq.q}</h4>
                                <p className="text-gray-500 dark:text-gray-400 font-medium">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
