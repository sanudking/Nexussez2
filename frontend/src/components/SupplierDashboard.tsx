'use client';

import Link from 'next/link';
import { Package, Activity, PackageOpen, BrainCircuit, ArrowRight, TrendingUp } from 'lucide-react';
import { MOCK_SUPPLIERS, MOCK_POOLED_ORDERS, MOCK_MATERIALS } from '@/lib/marketplaceData';

export function SupplierDashboard() {
  const currentSupplierId = 'sup-1'; 
  const supplier = MOCK_SUPPLIERS.find(s => s.id === currentSupplierId)!;
  const activePools = MOCK_POOLED_ORDERS.filter(p => p.status === 'bidding');

  const tiles = [
    {
      title: 'My Listings',
      description: 'Manage your active raw material listings and pricing.',
      icon: <Package size={48} className="text-industrial-accent" />,
      color: 'border-industrial-accent'
    },
    {
      title: 'Pooled Orders',
      description: 'View active bulk requests and place your bids.',
      icon: <Activity size={48} className="text-industrial-accent2" />,
      color: 'border-industrial-accent2'
    },
    {
      title: 'Catalog Management',
      description: 'Upload product images, demo videos, and brochures.',
      icon: <PackageOpen size={48} className="text-industrial-warning" />,
      color: 'border-industrial-warning'
    },
    {
      title: 'AI Demand Prediction',
      description: 'Forecast upcoming regional material demands using predictive AI.',
      icon: <BrainCircuit size={48} className="text-industrial-accent" />,
      color: 'border-industrial-accent',
      ai: true
    }
  ];

  return (
    <div className="min-h-screen bg-industrial-black text-industrial-text p-8 md:p-12 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-12 mt-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-industrial-border pb-6 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Link href="/app" className="text-industrial-muted hover:text-industrial-accent transition text-sm">
                ← Back to Home
              </Link>
              <div className="h-4 w-px bg-industrial-border" />
              <span className="text-sm font-bold text-industrial-accent uppercase tracking-widest">Supplier Portal</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Welcome, {supplier.name}</h1>
            <p className="text-industrial-muted">Trust Score: <span className="text-industrial-accent2 font-bold">{supplier.trustScore}/100</span> • Rating: <span className="text-industrial-warning font-bold">{supplier.ratings}/5</span></p>
          </div>
          <div className="flex items-center gap-4">
            <img src={supplier.image} alt={supplier.name} className="w-14 h-14 rounded-full border-2 border-industrial-border object-cover" />
            <Link href="/app/marketplace" className="border border-industrial-border hover:border-industrial-accent px-4 py-2 text-sm font-semibold rounded-lg transition bg-industrial-dark">
              Switch to Buyer View
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiles.map((tile, idx) => (
            <div 
              key={idx} 
              className={`group flex flex-col justify-between bg-industrial-dark border border-industrial-border rounded-2xl p-8 hover:border-transparent transition-all hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden cursor-pointer`}
            >
              <div className={`absolute inset-0 border-2 ${tile.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              {tile.ai && (
                <div className="absolute top-6 right-6 bg-industrial-accent/10 text-industrial-accent border border-industrial-accent/30 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1 animate-pulse">
                  <TrendingUp size={12} /> Beta AI
                </div>
              )}

              <div>
                <div className="mb-6 bg-industrial-black inline-block p-4 rounded-xl border border-industrial-border group-hover:border-transparent transition-colors">
                  {tile.icon}
                </div>
                <h2 className="text-2xl font-bold mb-2 text-white">{tile.title}</h2>
                <p className="text-industrial-muted">{tile.description}</p>
              </div>
              <div className="mt-8 flex items-center gap-2 font-bold text-sm tracking-widest uppercase group-hover:text-white transition-colors text-industrial-muted">
                Manage <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <section className="pt-8 border-t border-industrial-border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold flex items-center gap-3"><Activity className="text-industrial-accent2" /> Active Polling / Pooled Requests</h3>
            <span className="text-sm font-bold text-industrial-accent2 bg-industrial-accent2/10 px-4 py-2 rounded-lg">All Supplier Demands</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activePools.map(pool => {
              const material = MOCK_MATERIALS.find(m => m.id === pool.materialId)!;
              const myBid = pool.bids.find(b => b.supplierId === currentSupplierId);
              const lowestBid = pool.bids.length > 0 ? Math.min(...pool.bids.map(b => b.bidPricePerUnit)) : null;
              
              return (
                <div key={pool.id} className="bg-industrial-card border border-industrial-border p-6 rounded-xl hover:border-industrial-accent2/50 transition">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-xs text-industrial-warning font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                        <TrendingUp size={14} /> Bulk Demand
                      </div>
                      <h4 className="font-bold text-xl text-white">{material?.name || 'Unknown Material'}</h4>
                      <p className="text-sm text-industrial-muted mt-1">Volume: <span className="text-industrial-text font-bold">{pool.totalVolume.toLocaleString()} {pool.unit}</span></p>
                    </div>
                    <div className="text-right bg-industrial-dark p-3 rounded-lg border border-industrial-border">
                      <div className="text-xs text-industrial-muted uppercase tracking-wider mb-1">Target Price</div>
                      <div className="font-black text-xl">₹{pool.targetPricePerUnit}<span className="text-sm text-industrial-muted font-normal">/{pool.unit}</span></div>
                    </div>
                  </div>

                  <div className="bg-industrial-dark rounded-lg p-4 mb-5 flex justify-between items-center border border-industrial-border">
                    <div className="text-sm">
                      <span className="text-industrial-muted">Lowest current bid:</span>
                      {lowestBid !== null ? (
                        <span className="ml-2 font-black text-industrial-accent2 text-lg">₹{lowestBid}</span>
                      ) : (
                        <span className="ml-2 font-bold text-industrial-muted">No bids yet</span>
                      )}
                    </div>
                    <div className="text-sm font-bold text-industrial-warning flex items-center gap-1">
                      Closes in: {pool.timeRemaining}
                    </div>
                  </div>

                  {myBid ? (
                    <div className="flex items-center justify-between border border-industrial-accent2/40 bg-industrial-accent2/10 rounded-lg p-4">
                      <div className="text-sm">Your active bid: <span className="font-black text-industrial-accent2 text-lg ml-1">₹{myBid.bidPricePerUnit}/{pool.unit}</span></div>
                      <button className="text-sm font-bold bg-industrial-dark border border-industrial-border px-4 py-2 rounded hover:border-industrial-accent2 hover:text-white transition">Update Bid</button>
                    </div>
                  ) : (
                    <button className="w-full bg-industrial-accent text-industrial-black font-black py-3 rounded-lg hover:bg-industrial-accent/90 transition flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,107,26,0.2)]">
                      Place a Bid <ArrowRight size={18} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
