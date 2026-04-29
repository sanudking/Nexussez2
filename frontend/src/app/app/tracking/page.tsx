'use client';

import { useState, useEffect } from 'react';
import { MapPin, Truck, Clock, Navigation, CheckCircle2, ChevronRight, Package, Route } from 'lucide-react';
import Link from 'next/link';
import { MOCK_SUPPLIERS } from '@/lib/marketplaceData';

export default function TrackingPage() {
  const [progress, setProgress] = useState(65);
  const supplier = MOCK_SUPPLIERS[0]; // Just picking the first one for the demo

  // Simulate truck moving
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 100 : p + 0.1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-industrial-black text-industrial-text overflow-hidden">
      {/* Header Bar */}
      <header className="h-16 border-b border-industrial-border bg-industrial-dark flex items-center px-6 justify-between flex-shrink-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/app/marketplace" className="text-industrial-muted hover:text-industrial-accent">
            ← Back to Marketplace
          </Link>
          <div className="h-4 w-px bg-industrial-border" />
          <h1 className="text-lg font-bold flex items-center gap-2"><Truck size={20} /> Live GPS Tracking</h1>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Map Area */}
        <div className="flex-1 bg-industrial-dark relative overflow-hidden">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-[#0D1A18]/50 opacity-40">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,191,166,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,191,166,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Route Line */}
            <svg className="w-full h-full absolute" style={{ opacity: 0.3 }}>
              <path d="M 200,800 Q 400,600 500,400 T 800,200" fill="none" stroke="#00BFA6" strokeWidth="4" strokeDasharray="10,10" />
            </svg>
            
            {/* Start point */}
            <div className="absolute left-[200px] bottom-[200px] flex flex-col items-center">
              <div className="w-4 h-4 bg-industrial-muted rounded-full border-2 border-industrial-black" />
              <span className="text-xs font-bold mt-2 bg-industrial-black px-2 py-1 rounded">Supplier Factory</span>
            </div>

            {/* End point */}
            <div className="absolute right-[200px] top-[200px] flex flex-col items-center">
              <div className="w-6 h-6 bg-industrial-accent rounded-full border-4 border-[#FF6B1A]/30 animate-pulse" />
              <span className="text-xs font-bold mt-2 bg-industrial-black px-2 py-1 rounded text-industrial-accent">Your Facility</span>
            </div>

            {/* Truck Marker (moving based on progress) */}
            <div 
              className="absolute transition-all duration-1000 ease-linear flex flex-col items-center shadow-glow-green"
              style={{
                left: `calc(200px + (100vw - 400px) * ${progress / 100})`,
                bottom: `calc(200px + (100vh - 400px) * ${progress / 100})`,
              }}
            >
              <div className="bg-industrial-accent2 text-industrial-black p-2 rounded-full mb-1">
                <Truck size={20} />
              </div>
              <div className="bg-industrial-card border border-industrial-accent2 text-xs px-2 py-1 rounded shadow-lg text-industrial-accent2 font-bold whitespace-nowrap">
                Vehicle: MH-12-PQ-8492
              </div>
            </div>
          </div>
        </div>

        {/* Info Sidebar */}
        <aside className="w-[400px] bg-industrial-card border-l border-industrial-border flex flex-col z-10 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
          <div className="p-6 border-b border-industrial-border space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">Order #ORD-88291</h2>
                <p className="text-sm text-industrial-muted mt-1">{supplier.name}</p>
              </div>
              <div className="bg-industrial-accent2/10 text-industrial-accent2 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border border-industrial-accent2/20">
                In Transit
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-industrial-dark p-3 rounded border border-industrial-border">
                <div className="text-[10px] text-industrial-muted uppercase tracking-wider mb-1 flex items-center gap-1"><Clock size={12} /> ETA</div>
                <div className="text-lg font-bold text-industrial-accent2">Today, 4:30 PM</div>
              </div>
              <div className="bg-industrial-dark p-3 rounded border border-industrial-border">
                <div className="text-[10px] text-industrial-muted uppercase tracking-wider mb-1 flex items-center gap-1"><Route size={12} /> Distance</div>
                <div className="text-lg font-bold">142 km</div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-xs mb-2 font-bold">
                <span className="text-industrial-accent2">Dispatched</span>
                <span>{progress.toFixed(0)}% Completed</span>
                <span className="text-industrial-muted">Delivered</span>
              </div>
              <div className="h-2 bg-industrial-dark rounded-full overflow-hidden">
                <div className="h-full bg-industrial-accent2 transition-all duration-1000 ease-linear" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Shipment Details */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-industrial-muted">Shipment Details</h3>
              <div className="bg-industrial-dark border border-industrial-border rounded p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-industrial-muted">Material:</span>
                  <span className="font-semibold">TMT Steel Rods (8mm)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-industrial-muted">Quantity:</span>
                  <span className="font-semibold">5000 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-industrial-muted">Driver:</span>
                  <span className="font-semibold flex items-center gap-2">Ramesh Kumar <span className="text-industrial-accent">★ 4.8</span></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-industrial-muted">Contact:</span>
                  <span className="font-semibold">+91 98765 43210</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-industrial-muted">Status Timeline</h3>
              <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-industrial-border before:to-transparent">
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-6">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-industrial-accent2 bg-industrial-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-glow-green z-10">
                    <div className="w-2 h-2 bg-industrial-accent2 rounded-full"></div>
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] bg-industrial-dark p-3 rounded border border-industrial-border">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-bold text-sm text-industrial-accent2">In Transit</div>
                      <time className="text-xs text-industrial-muted">12:45 PM</time>
                    </div>
                    <div className="text-xs text-industrial-muted">Crossed NH-48 Toll Plaza</div>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-6">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-industrial-muted bg-industrial-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <CheckCircle2 size={14} className="text-industrial-muted" />
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] bg-industrial-black p-3 rounded border border-industrial-border opacity-70">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-bold text-sm">Dispatched</div>
                      <time className="text-xs text-industrial-muted">08:30 AM</time>
                    </div>
                    <div className="text-xs text-industrial-muted">Left Supplier Facility</div>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-industrial-muted bg-industrial-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <CheckCircle2 size={14} className="text-industrial-muted" />
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] bg-industrial-black p-3 rounded border border-industrial-border opacity-70">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-bold text-sm">Order Confirmed</div>
                      <time className="text-xs text-industrial-muted">Yesterday</time>
                    </div>
                    <div className="text-xs text-industrial-muted">Payment verified</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-industrial-border bg-industrial-dark">
             <button className="w-full bg-industrial-accent hover:bg-white text-industrial-black transition py-3 rounded text-sm font-bold shadow-[0_0_15px_rgba(255,107,26,0.3)]">
                Contact Driver
             </button>
          </div>
        </aside>
      </main>
    </div>
  );
}
