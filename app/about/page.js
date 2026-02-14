'use client';

import { Users, Target, ShieldCheck, Heart } from 'lucide-react';
import Logo from '@/components/Logo';

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Mission Hero */}
      <section className="pt-24 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 dark:bg-indigo-900/20 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-100 dark:border-indigo-800">
              Our Story
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-8 italic">
              Democratizing Software Creation with <span className="text-indigo-600 dark:text-indigo-400">AI</span>.
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
              FormForge AI was founded on a simple belief: the power to build software shouldn't be limited to those who know how to code complex backends.
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-32 bg-gray-50/50 dark:bg-gray-800/20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">Empowering Innovation</h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                Our platform empowers developers, startups, and businesses to generate scalable web applications instantly using AI-driven automation. We eliminate the friction between a business idea and a functional software product.
              </p>
              <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                By leveraging technologies like Next.js, MongoDB, and Cloudinary, we provide a foundation that is not only fast to build but also highly reliable for production use.
              </p>
              <div className="pt-8 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg">R</div>
                <div>
                  <p className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">Roonjha Developers</p>
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500">Founding Team</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: Users, title: "Community Driven", desc: "Built with the needs of independent developers at heart." },
                { icon: Target, title: "Precision Built", desc: "AI models trained to generate secure and optimized code." },
                { icon: ShieldCheck, title: "Security First", desc: "Built-in protection for your data and user privacy." },
                { icon: Heart, title: "Passion for Tech", desc: "Maintaining the highest standards of software craftsmanship." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 tracking-tight">{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Brand Display */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <Logo className="w-12 h-12 mb-10" textClassName="text-3xl font-black" />
          <p className="text-gray-400 dark:text-gray-500 font-bold max-w-lg text-center leading-relaxed italic">
            FormForge AI is a proud product of Roonjha Developers, dedicated to pushing the boundaries of web development and automation.
          </p>
        </div>
      </section>
    </div>
  );
}
