'use client';

import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { LayoutDashboard, Users, Filter, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
    const [leads, setLeads] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [selectedLead, setSelectedLead] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('');

    const [updateForm, setUpdateForm] = useState({
        assigned_to: '',
        followup_status: 'new',
        notes: '',
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/crm', { params: { status: filterStatus } });
            setLeads(res.data.leads);
            setUsers(res.data.users);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filterStatus]);

    const handleSelectLead = (lead: any) => {
        setSelectedLead(lead);
        setUpdateForm({
            assigned_to: lead.assigned_to || '',
            followup_status: lead.followup_status,
            notes: lead.notes || '',
        });
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.patch(`/admin/crm/${selectedLead.id}`, updateForm);
            fetchData();
            // Refresh local selection too
            const updatedLead = leads.find(l => l.id === selectedLead.id);
            if (updatedLead) handleSelectLead(updatedLead);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-aatithya-primary/20 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-aatithya-secondary/10 blur-[120px] rounded-full"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 text-center md:text-left animate-in fade-in slide-in-from-top-10 duration-1000">
                    <div className="flex flex-col items-center md:items-start">
                        <img src="/logo.png" alt="Aatithya360" className="h-28 w-auto mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]" />
                        <div className="h-0.5 w-12 bg-aatithya-secondary/30 mt-2 mb-2"></div>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-aatithya-secondary">Administrative Control Center</h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        {['', 'new', 'followed-up', 'converted'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-6 py-2.5 text-[10px] font-black rounded-full border transition-all duration-500 uppercase tracking-widest ${filterStatus === status ? 'bg-aatithya-secondary text-black border-aatithya-secondary shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'glass-v2 text-gray-400 border-white/10 hover:border-aatithya-secondary/50'}`}
                            >
                                {status === '' ? 'Omni-View' : status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Leads List */}
                    <div className="flex-grow w-full glass-v2 rounded-[2.5rem] overflow-hidden animate-in fade-in slide-in-from-left-4 duration-700">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-white/[0.03] uppercase text-aatithya-secondary font-black border-b border-white/10 text-[10px] tracking-[0.2em]">
                                    <tr>
                                        <th className="px-8 py-6 uppercase">Expedition Essence</th>
                                        <th className="px-8 py-6 uppercase">Current Phase</th>
                                        <th className="px-8 py-6 uppercase">Custodian</th>
                                        <th className="px-8 py-6 text-right uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 font-light">
                                    {loading ? (
                                        <tr><td colSpan={4} className="px-8 py-20 text-center">
                                            <div className="animate-pulse text-aatithya-secondary font-bold tracking-widest text-[10px] uppercase italic">Synchronizing Legacy Data...</div>
                                        </td></tr>
                                    ) : leads.length === 0 ? (
                                        <tr><td colSpan={4} className="px-8 py-20 text-center text-gray-500 font-light italic">No expeditions found in this quadrant.</td></tr>
                                    ) : (
                                        leads.map((lead) => (
                                            <tr
                                                key={lead.id}
                                                className={`group hover:bg-white/[0.02] transition-colors cursor-pointer border-l-4 ${selectedLead?.id === lead.id ? 'bg-white/[0.05] border-aatithya-secondary' : 'border-transparent'}`}
                                                onClick={() => handleSelectLead(lead)}
                                            >
                                                <td className="px-8 py-6">
                                                    <div className="font-extrabold text-white text-lg group-hover:text-aatithya-secondary transition-colors duration-300">{lead.travel_request.destination}</div>
                                                    <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Origin: {lead.travel_request.origin} · {lead.travel_request.travel_type}</div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`inline-flex items-center px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${lead.followup_status === 'new' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                                                        lead.followup_status === 'followed-up' ? 'bg-aatithya-secondary/10 border-aatithya-secondary/30 text-aatithya-secondary' :
                                                            'bg-green-500/10 border-green-500/30 text-green-400'
                                                        }`}>
                                                        {lead.followup_status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-gray-400 text-xs">
                                                    {lead.assigned_to ? (
                                                        <div className="flex items-center font-medium">
                                                            <Users className="w-3.5 h-3.5 mr-2 text-aatithya-secondary opacity-50" />
                                                            {lead.assignedTo?.name || 'Authorized Personnel'}
                                                        </div>
                                                    ) : <span className="opacity-30 italic">Unassigned</span>}
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button className="text-[10px] font-black uppercase tracking-widest text-aatithya-secondary group-hover:text-white transition-colors duration-300">ENGAGE</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Manage Panel */}
                    <div className="w-full lg:w-[400px] flex-shrink-0 animate-in fade-in slide-in-from-right-4 duration-1000 delay-200">
                        {selectedLead ? (
                            <div className="glass-v2 rounded-[2.5rem] overflow-hidden sticky top-12 border-t border-white/20">
                                <div className="p-10 border-b border-white/10 bg-white/[0.02]">
                                    <h3 className="text-xl font-extrabold text-white mb-1">Expedition Command</h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-aatithya-secondary opacity-80">Reference ID: #{selectedLead.id}</p>
                                </div>
                                <div className="p-10">
                                    <form onSubmit={handleUpdate} className="space-y-10">
                                        <div className="group">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-aatithya-secondary mb-3 group-focus-within:text-white transition-colors">Assigned Personnel</label>
                                            <select
                                                className="block w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-aatithya-secondary focus:bg-white/[0.07] transition-all duration-300 appearance-none cursor-pointer"
                                                value={updateForm.assigned_to}
                                                onChange={(e) => setUpdateForm({ ...updateForm, assigned_to: e.target.value })}
                                            >
                                                <option className="bg-[#001a14]" value="">UNASSIGNED</option>
                                                {users.map((u) => <option className="bg-[#001a14]" key={u.id} value={u.id}>{u.name}</option>)}
                                            </select>
                                        </div>

                                        <div className="group">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-aatithya-secondary mb-3 group-focus-within:text-white transition-colors">Expedition Phase</label>
                                            <select
                                                className="block w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-aatithya-secondary focus:bg-white/[0.07] transition-all duration-300 appearance-none cursor-pointer"
                                                value={updateForm.followup_status}
                                                onChange={(e) => setUpdateForm({ ...updateForm, followup_status: e.target.value })}
                                            >
                                                <option className="bg-[#001a14]" value="new">NEW INQUIRY</option>
                                                <option className="bg-[#001a14]" value="followed-up">ENGAGED</option>
                                                <option className="bg-[#001a14]" value="converted">MISSION SUCCESS</option>
                                                <option className="bg-[#001a14]" value="lost">LOST OPPORTUNITY</option>
                                            </select>
                                        </div>

                                        <div className="group">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-aatithya-secondary mb-3 group-focus-within:text-white transition-colors">Strategic Intelligence</label>
                                            <textarea
                                                className="block w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-aatithya-secondary focus:bg-white/[0.07] transition-all duration-300 h-32 p-4 font-light text-sm"
                                                value={updateForm.notes}
                                                onChange={(e) => setUpdateForm({ ...updateForm, notes: e.target.value })}
                                                placeholder="Enter mission updates..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full flex justify-center py-5 border border-aatithya-secondary rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.2)] text-[10px] font-black uppercase tracking-[0.3em] text-black bg-aatithya-secondary hover:bg-white hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-500"
                                        >
                                            SYNC GLOBAL STATUS
                                        </button>
                                    </form>
                                </div>
                                <div className="p-6 bg-white/[0.02] border-t border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 flex items-center justify-center">
                                    <Clock className="w-3 h-3 mr-2 opacity-30" />
                                    Last Satellite Link-Up: {new Date().toLocaleTimeString()}
                                </div>
                            </div>
                        ) : (
                            <div className="h-96 glass-v2 rounded-[2.5rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-12 text-center">
                                <Users className="w-16 h-16 mb-6 text-aatithya-secondary opacity-10" />
                                <h4 className="text-white text-sm font-bold opacity-50 mb-2 uppercase tracking-widest">Awaiting Command</h4>
                                <p className="text-xs text-gray-500 font-light leading-relaxed">Select an expedition representative from the relay to manage intelligence and custodianship.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
