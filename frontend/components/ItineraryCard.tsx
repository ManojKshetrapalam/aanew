'use client';

import { useState } from 'react';
import api from '@/utils/api';
import { ChevronDown, CheckCircle } from 'lucide-react';

export default function ItineraryCard({ itinerary, onSelect, status }: { itinerary: any, onSelect: () => void, status: string }) {
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSelect = async () => {
        setLoading(true);
        try {
            await api.post(`/itineraries/${itinerary.id}/select`);
            onSelect();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const imageUrl = itinerary.data.image_url || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop";

    return (
        <div className={`group flex flex-col rounded-[2rem] overflow-hidden transition-all duration-700 transform hover:-translate-y-4 ${itinerary.is_selected ? 'ring-4 ring-[#136DEC]/50 glass-v2' : 'glass-v2'}`}>
            <div className="h-64 overflow-hidden relative">
                <img
                    src={imageUrl}
                    alt={itinerary.data.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                    <span className="text-sm font-black uppercase tracking-[0.2em] bg-[#136DEC] text-white px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(19,109,236,0.4)]">
                        {itinerary.data.cost}
                    </span>
                </div>
            </div>
            <div className="p-8 flex-grow">
                <div className="mb-4">
                    <h4 className="font-extrabold text-white text-2xl leading-tight group-hover:text-[#22D3EE] transition-colors duration-500">{itinerary.data.title}</h4>
                </div>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed font-light line-clamp-3">
                    {itinerary.data.summary}
                </p>

                <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-[10px] font-black tracking-[0.2em] text-[#22D3EE] uppercase flex items-center group-hover:text-white transition-colors"
                >
                    {expanded ? 'DISMISS DETAILS' : 'REVEAL FULL JOURNEY'}
                    <ChevronDown className={`w-4 h-4 ml-1.5 transform transition-transform duration-500 ${expanded ? 'rotate-180' : ''}`} />
                </button>

                {expanded && (
                    <div className="mt-8 space-y-6 border-t border-white/5 pt-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        {itinerary.data.days.map((day: any) => (
                            <div key={day.day} className="relative pl-6 border-l border-[#136DEC]/20">
                                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-[#136DEC] rounded-full shadow-[0_0_10px_rgba(19,109,236,0.5)]"></div>
                                <p className="text-[10px] font-black text-[#22D3EE] uppercase tracking-widest mb-1">Day {day.day}</p>
                                <div className="text-gray-300 text-xs leading-relaxed font-light">{day.description}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-8 pt-0">
                {!itinerary.is_selected && status !== 'selected' ? (
                    <button
                        onClick={handleSelect}
                        disabled={loading}
                        className="w-full flex justify-center items-center px-6 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] text-white uppercase tracking-[0.2em] hover:bg-[#136DEC] hover:text-white hover:border-[#136DEC] transition-all duration-500 disabled:opacity-50"
                    >
                        {loading ? 'SECURING...' : 'LOCK THIS JOURNEY'}
                    </button>
                ) : itinerary.is_selected ? (
                    <div className="w-full py-4 bg-[#136DEC]/10 border border-[#136DEC]/30 rounded-2xl flex items-center justify-center">
                        <span className="text-[#22D3EE] font-black text-[10px] uppercase tracking-[0.2em] flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            SELECTED DESTINY
                        </span>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
