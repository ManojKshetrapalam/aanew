'use client';

import { useState, useEffect } from 'react';
import api from '@/utils/api';
import TravelForm from '@/components/TravelForm';
import ItineraryCard from '@/components/ItineraryCard';
import { Plane, Plus } from 'lucide-react';
import NeuralBackground from '@/components/NeuralBackground';
import NeuralHero from '@/components/NeuralHero';
import NeuralProcessingInterface from '@/components/NeuralProcessingInterface';
import HeatmapSection from '@/components/HeatmapSection';

export default function TravelPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await api.get('/travel');
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 10000); // Polling for AI updates
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative font-sans">
      <NeuralBackground />

      <div className="relative z-10">
        <NeuralHero />

        <div id="neural-sync-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 mb-32">
          {!showForm && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowForm(true)}
                className="group relative px-12 py-6 bg-neural-blue text-white font-black rounded-lg hover:shadow-[0_0_50px_rgba(19,109,236,0.6)] transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                <span className="relative z-10 text-xl tracking-[0.2em] uppercase">Connect to Neural Sync</span>
              </button>
            </div>
          )}
        </div>

        <NeuralProcessingInterface />
        <HeatmapSection />

        {showForm && (
          <div className="mb-20 animate-in zoom-in-95 duration-500">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white tracking-tight">Trip Configuration</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-aatithya-secondary hover:text-white uppercase text-xs font-bold tracking-widest border border-aatithya-secondary/30 px-4 py-2 rounded-full transition"
              >
                Close
              </button>
            </div>
            <TravelForm onSuccess={() => { setShowForm(false); fetchRequests(); }} />
          </div>
        )}

        <div className="space-y-12 pb-32">
          {loading && requests.length === 0 ? (
            <div className="text-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#136DEC] mx-auto shadow-[0_0_15px_#136DEC]"></div>
              <p className="mt-4 text-[#136DEC] font-bold tracking-widest uppercase text-xs animate-pulse">Synchronizing Neural Data...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-32 glass-v2 rounded-[3.5rem] border-dashed border-[#136DEC]/20">
              <div className="relative h-20 w-20 mx-auto mb-8">
                <Plane className="h-full w-full text-[#136DEC]/40" />
                <div className="absolute inset-0 bg-[#136DEC]/10 blur-xl rounded-full"></div>
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Neural Link Idle</h3>
              <p className="text-white/40 font-medium max-w-md mx-auto">Your journey has not yet been initialized. Connect to the neural sync to begin your expedition.</p>
              <div className="mt-10">
                <button
                  onClick={() => setShowForm(true)}
                  className="px-8 py-3 bg-[#136DEC]/10 border border-[#136DEC]/50 text-[#22D3EE] rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#136DEC] hover:text-white transition-all shadow-[0_0_20px_rgba(19,109,236,0.1)]"
                >
                  <Plus className="inline mr-2 w-3 h-3" />
                  Initialize Link
                </button>
              </div>
            </div>
          ) : (
            requests.map((request: any) => (
              <div key={request.id} className="glass-v2 rounded-[3rem] overflow-hidden mb-20 border-t border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="p-10 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center bg-white/[0.01]">
                  <div>
                    <h3 className="text-4xl font-black text-white mb-2 tracking-tighter">{request.origin} <span className="text-[#136DEC] mx-1">/</span> {request.destination}</h3>
                    <div className="flex flex-wrap items-center gap-6 text-[10px] text-[#22D3EE] font-black tracking-[0.2em] uppercase">
                      <div className="flex items-center">
                        <span className="opacity-40 mr-2 lowercase">start:</span>
                        {new Date(request.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="w-1 h-1 bg-[#136DEC]/40 rounded-full hidden md:block"></div>
                      <div className="flex items-center">
                        <span className="opacity-40 mr-2">class:</span>
                        {request.travel_type}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <span className={`px-6 py-2 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] border shadow-[0_0_15px_rgba(0,0,0,0.3)] ${request.status === 'pending' ? 'bg-[#136DEC]/10 border-[#136DEC] text-[#22D3EE] animate-pulse' :
                      request.status === 'processed' ? 'bg-white/5 border-white/20 text-white/50' :
                        'bg-[#22D3EE]/10 border-[#22D3EE] text-[#22D3EE]'
                      }`}>
                      Neural State: {request.status}
                    </span>
                  </div>
                </div>
                <div className="p-10">
                  {request.status === 'pending' ? (
                    <div className="py-24 text-center">
                      <div className="mb-10 relative h-32 w-32 mx-auto">
                        <div className="absolute inset-0 rounded-full border border-[#136DEC]/20 animate-ping"></div>
                        <div className="absolute inset-0 rounded-full border-2 border-t-[#22D3EE] animate-spin duration-1000"></div>
                        <div className="absolute inset-4 rounded-full border border-[#136DEC]/10 animate-pulse"></div>
                      </div>
                      <h4 className="text-white text-2xl font-black tracking-tighter mb-2 uppercase">Synthesizing Experience</h4>
                      <p className="text-[#22D3EE]/60 font-mono text-[11px] tracking-wider">&gt; Neural Synapse Active: Resolving Luxury Temporal Paths...</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      {request.itineraries.map((itinerary: any) => (
                        <ItineraryCard
                          key={itinerary.id}
                          itinerary={itinerary}
                          onSelect={fetchRequests}
                          status={request.status}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
