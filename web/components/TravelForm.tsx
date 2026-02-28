'use client';

import { useState } from 'react';
import api from '@/utils/api';

export default function TravelForm({ onSuccess }: { onSuccess: () => void }) {
    const [formData, setFormData] = useState({
        origin: '',
        destination: '',
        budget: '',
        start_date: '',
        end_date: '',
        travel_type: 'Leisure',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await api.post('/travel', formData);
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="glass-v2 p-10 md:p-16 rounded-[3rem] space-y-10 max-w-4xl mx-auto border-t border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#22D3EE] mb-3 group-focus-within:text-white transition-colors">Point of Departure</label>
                    <input
                        type="text"
                        required
                        placeholder="e.g. London"
                        className="block w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-aatithya-secondary focus:bg-white/[0.07] transition-all duration-300"
                        value={formData.origin}
                        onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    />
                </div>
                <div className="group">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#22D3EE] mb-3 group-focus-within:text-white transition-colors">Desired Destination</label>
                    <input
                        type="text"
                        required
                        placeholder="e.g. Maldives"
                        className="block w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-aatithya-secondary focus:bg-white/[0.07] transition-all duration-300"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#22D3EE] mb-3 group-focus-within:text-white transition-colors">Investment (INR)</label>
                    <input
                        type="number"
                        required
                        className="block w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-aatithya-secondary focus:bg-white/[0.07] transition-all duration-300"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    />
                </div>
                <div className="group">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#22D3EE] mb-3 group-focus-within:text-white transition-colors">Expedition Style</label>
                    <select
                        className="block w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-aatithya-secondary focus:bg-white/[0.07] transition-all duration-300 appearance-none cursor-pointer"
                        value={formData.travel_type}
                        onChange={(e) => setFormData({ ...formData, travel_type: e.target.value })}
                    >
                        <option className="bg-[#000000]">Leisure</option>
                        <option className="bg-[#000000]">Business Elite</option>
                        <option className="bg-[#000000]">Adventure</option>
                        <option className="bg-[#000000]">Romantic Escape</option>
                        <option className="bg-[#000000]">Family Legacy</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#22D3EE] mb-3 group-focus-within:text-white transition-colors">Arrival Date</label>
                    <input
                        type="date"
                        required
                        className="block w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-aatithya-secondary focus:bg-white/[0.07] transition-all duration-300"
                        value={formData.start_date}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    />
                </div>
                <div className="group">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#22D3EE] mb-3 group-focus-within:text-white transition-colors">Departure Date</label>
                    <input
                        type="date"
                        required
                        className="block w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-aatithya-secondary focus:bg-white/[0.07] transition-all duration-300"
                        value={formData.end_date}
                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    />
                </div>
            </div>

            {error && <p className="text-red-400 text-xs font-bold tracking-widest uppercase text-center">{error}</p>}

            <div className="pt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-5 border border-[#136DEC] rounded-2xl shadow-[0_0_30px_rgba(19,109,236,0.2)] text-[10px] font-black uppercase tracking-[0.3em] text-white bg-[#136DEC] hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-500 disabled:opacity-50"
                >
                    {loading ? 'CURATING YOUR EXPERIENCE...' : 'INITIATE AI EXPEDITION'}
                </button>
            </div>
        </form>
    );
}
