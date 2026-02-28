'use client';

import { motion } from 'framer-motion';
import { Cpu, Globe, Zap, ShieldCheck } from 'lucide-react';

export default function NeuralHero() {
    return (
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto text-center relative z-10">
                {/* Glow Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/5 text-[#22D3EE] text-[10px] font-bold tracking-[0.2em] uppercase mb-8 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                >
                    <Cpu size={12} className="animate-pulse" />
                    Neural Engine V3.0 Active
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    INTELLIGENCE <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#136DEC] via-[#22D3EE] to-[#136DEC] animate-gradient-x">
                        CONNECTS THE WORLD
                    </span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Experience the Aatithya360 Neural Architecture. Seamlessly integrating <span className="text-white">Smart Travel</span>, <span className="text-white">Hospitality</span>, and <span className="text-white">Expert Manpower</span> through an unified AI interface.
                </motion.p>

                {/* Neural Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
                    {[
                        { icon: Globe, text: "Global Heatmap" },
                        { icon: Zap, text: "Instant Synergy" },
                        { icon: ShieldCheck, text: "Neural Security" },
                        { icon: Cpu, text: "Guest Personalization" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                            className="p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm group hover:border-[#136DEC]/30 transition-all duration-500"
                        >
                            <item.icon size={24} className="text-[#136DEC] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                            <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{item.text}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Action Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <button
                        onClick={() => document.getElementById('neural-sync-form')?.scrollIntoView({ behavior: 'smooth' })}
                        className="relative group px-10 py-5 bg-[#136DEC] text-white font-black rounded-lg overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(19,109,236,0.5)] active:scale-95"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                        <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest">
                            Initialize Neural Sync
                            <Zap size={18} fill="currentColor" />
                        </span>
                    </button>
                </motion.div>
            </div>

            {/* Hero Grid Pulse */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none">
                <div className="w-full h-full border border-[#136DEC]/5 rounded-full animate-ping opacity-20"></div>
            </div>
        </section>
    );
}
