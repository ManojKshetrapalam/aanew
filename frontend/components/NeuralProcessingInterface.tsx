'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Network, Database, Cpu, Activity } from 'lucide-react';

export default function NeuralProcessingInterface() {
    const [pulse, setPulse] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPulse((p) => (p + 1) % 4);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const steps = [
        { icon: Network, label: "Input Node", color: "text-blue-400" },
        { icon: Database, label: "Neural Sink", color: "text-cyan-400" },
        { icon: Cpu, label: "Processing", color: "text-indigo-400" },
        { icon: Activity, label: "Guest Output", color: "text-emerald-400" }
    ];

    return (
        <section className="py-24 px-4 bg-black/50 backdrop-blur-xl relative border-y border-white/5 overflow-hidden">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black text-white tracking-widest uppercase mb-4">Neural Processing Interface</h2>
                    <div className="h-1 w-20 bg-[#136DEC] mx-auto rounded-full shadow-[0_0_10px_#136DEC]"></div>
                </div>

                <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
                    {/* Connection Lines */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#136DEC]/20 to-transparent hidden md:block"></div>

                    {steps.map((step, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center">
                            <motion.div
                                animate={{
                                    scale: pulse === i ? [1, 1.2, 1] : 1,
                                    boxShadow: pulse === i ? "0 0 30px rgba(19, 109, 236, 0.4)" : "0 0 10px rgba(255, 255, 255, 0.05)"
                                }}
                                className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-black border-2 ${pulse === i ? 'border-[#136DEC]' : 'border-white/5'} transition-colors duration-500`}
                            >
                                <step.icon size={32} className={`${pulse === i ? 'text-white' : 'text-white/20'} transition-colors`} />
                            </motion.div>
                            <div className="mt-4 text-center">
                                <span className={`text-[10px] font-black uppercase tracking-widest transition-opacity duration-500 ${pulse === i ? 'text-white opacity-100' : 'text-white/20 opacity-50'}`}>
                                    {step.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Data Stream Simulation */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Live Neural Log</span>
                        </div>
                        <div className="space-y-3 font-mono text-[11px]">
                            <p className="text-[#136DEC]">&gt; Initializing Synapse Layer 7...</p>
                            <p className="text-white/40">&gt; Encrypting Guest Identity via Quantum Mesh</p>
                            <p className="text-white/80">&gt; Analyzing Travel Style: LUXURY / ADVENTURE / ESCAPED</p>
                            <p className="text-cyan-400">&gt; Success: Itinerary Resolved in 12ms</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="text-center">
                            <span className="text-4xl font-black text-white tabular-nums">99.9<span className="text-[#136DEC]">%</span></span>
                            <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] mt-2 font-bold">Accuracy Index</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
