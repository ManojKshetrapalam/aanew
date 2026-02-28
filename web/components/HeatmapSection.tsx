'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '@/utils/api';
import { Globe, MapPin, Users, Hotel } from 'lucide-react';

export default function HeatmapSection() {
    const [stats, setStats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/neural/stats');
                setStats(res.data);
            } catch (err) {
                console.error("Heatmap Load Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <section className="py-24 px-4 bg-black relative">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Interactive Map Visual */}
                    <div className="relative aspect-square bg-[#136DEC]/5 rounded-[3rem] border border-[#136DEC]/10 overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>

                        {/* Dynamic Map Pins */}
                        {!loading && stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.2 }}
                                className="absolute"
                                style={{
                                    top: `${20 + i * 25}%`,
                                    left: `${30 + i * 20}%`
                                }}
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-[#22D3EE] blur-md rounded-full animate-pulse opacity-50"></div>
                                    <MapPin className="text-[#22D3EE] relative z-10" size={32} />
                                </div>
                                <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-white/10 p-2 rounded-lg whitespace-nowrap">
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest">{stat.region}</p>
                                    <p className="text-[8px] text-[#22D3EE] font-bold mt-1">{stat.manpower_count} Neural Staff</p>
                                </div>
                            </motion.div>
                        ))}

                        <Globe size={300} className="text-[#136DEC]/10 animate-spin-slow" />
                    </div>

                    {/* Right: Statistics Data */}
                    <div>
                        <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-6 leading-tight">
                            Global <br /> <span className="text-[#136DEC]">Neural Presence</span>
                        </h2>
                        <p className="text-white/40 mb-12 font-medium leading-relaxed">
                            Our AI-driven ecosystem operates across the most exclusive territories, managing luxury properties and elite manpower through a singular data-mesh.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {loading ? (
                                <div className="col-span-2 text-center py-10 opacity-50 italic">Syncing Global Data...</div>
                            ) : stats.map((stat, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#136DEC]/20 transition-all">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-[#136DEC]/10 flex items-center justify-center">
                                            <Hotel size={16} className="text-[#136DEC]" />
                                        </div>
                                        <span className="text-sm font-black text-white uppercase tracking-widest">{stat.region}</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] text-white/40 font-bold uppercase">Active Properties</span>
                                            <span className="text-xs text-white font-mono">{stat.active_properties}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] text-white/40 font-bold uppercase">Manpower Flow</span>
                                            <span className="text-xs text-[#22D3EE] font-mono">{stat.manpower_count}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
