'use client';

import { MOCK_POOLED_ORDERS, MOCK_MATERIALS, MOCK_SUPPLIERS } from '@/lib/marketplaceData';
import { TrendingDown, Clock, Users, ShieldCheck, ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';

export default function PooledOrdersPage() {
  return (
    <div className="flex flex-col h-screen overflow-y-auto bg-industrial-black text-industrial-text">
      <header className="h-16 border-b border-industrial-border bg-industrial-dark flex items-center px-6 justify-between flex-shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/app/marketplace" className="text-industrial-muted hover:text-industrial-accent">
            ← Back to Marketplace
          </Link>
          <div className="h-4 w-px bg-industrial-border" />
          <h1 className="text-lg font-bold flex items-center gap-2"><TrendingDown size={20} /> Pooled Bulk Orders & Bidding</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto w-full p-6 space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black text-white">Live Pooled Demand</h2>
            <p className="text-industrial-muted mt-2 max-w-2xl">
              Combine your requirements with other small factories to achieve high volume. Suppliers compete to offer the best rates in real-time reverse bidding.
            </p>
          </div>
          <button className="bg-industrial-accent2 text-industrial-black px-6 py-3 rounded-lg font-bold hover:bg-white transition shadow-glow-green">
            Create New Pool +
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {MOCK_POOLED_ORDERS.map(order => {
            const material = MOCK_MATERIALS.find(m => m.id === order.materialId)!;
            const topBid = order.bids.length > 0 
              ? order.bids.reduce((prev, curr) => prev.bidPricePerUnit < curr.bidPricePerUnit ? prev : curr) 
              : null;
            const topSupplier = topBid ? MOCK_SUPPLIERS.find(s => s.id === topBid.supplierId) : null;

            return (
              <div key={order.id} className="bg-industrial-card border border-industrial-border rounded-2xl overflow-hidden hover:border-industrial-accent2/50 transition">
                <div className="flex flex-col md:flex-row">
                  {/* Left info */}
                  <div className="p-6 md:w-1/3 border-r border-industrial-border bg-industrial-dark relative">
                    <div className={`absolute top-4 right-4 text-[10px] uppercase font-bold px-2 py-1 rounded ${
                      order.status === 'bidding' ? 'bg-industrial-warning/20 text-industrial-warning border border-industrial-warning/50 animate-pulse' : 'bg-industrial-muted/20 text-industrial-muted border border-industrial-muted'
                    }`}>
                      {order.status === 'bidding' ? 'Live Bidding' : 'Open for Joining'}
                    </div>

                    <div className="text-[10px] text-industrial-accent uppercase tracking-wider mb-2">{material.category} &gt; {material.subCategory}</div>
                    <h3 className="text-2xl font-bold mb-4">{material.name}</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs text-industrial-muted uppercase tracking-wider mb-1">Target Price</div>
                        <div className="text-xl font-bold">₹{order.targetPricePerUnit}<span className="text-xs font-normal text-industrial-muted">/{order.unit}</span></div>
                      </div>
                      <div>
                        <div className="text-xs text-industrial-muted uppercase tracking-wider mb-1">Total Pooled Volume</div>
                        <div className="text-xl font-black text-industrial-accent2">{order.totalVolume.toLocaleString()} {order.unit}</div>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-industrial-warning pt-4 border-t border-industrial-border">
                        <Clock size={16} /> Ends in {order.timeRemaining}
                      </div>
                    </div>
                  </div>

                  {/* Right info - Bids */}
                  <div className="p-6 md:w-2/3 bg-industrial-black flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-industrial-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                        <TrendingDown size={16} /> Current Best Bid
                      </h4>
                      
                      {topBid && topSupplier ? (
                        <div className="bg-gradient-to-r from-industrial-dark to-industrial-card border border-industrial-accent2/30 rounded-xl p-5 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-industrial-accent2/10 rounded-full blur-2xl -mr-4 -mt-4"></div>
                          <div className="flex justify-between items-center relative z-10">
                            <div>
                              <div className="text-xs text-industrial-muted mb-1">Supplier</div>
                              <div className="font-bold text-lg flex items-center gap-2 text-white">
                                {topSupplier.name}
                                <ShieldCheck size={16} className="text-industrial-accent2" />
                              </div>
                              <div className="text-xs text-industrial-muted mt-1">Delivery in {topBid.deliveryDays} days</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-industrial-muted mb-1">Bid Price</div>
                              <div className="text-3xl font-black text-industrial-accent2">₹{topBid.bidPricePerUnit}<span className="text-sm font-normal text-industrial-muted">/{order.unit}</span></div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-industrial-dark border border-dashed border-industrial-border rounded-xl p-8 text-center text-industrial-muted">
                          <Package className="mx-auto mb-2 opacity-50" />
                          Waiting for supplier bids...
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button className="flex-1 bg-industrial-dark border border-industrial-border hover:border-industrial-muted transition py-3 rounded-lg text-sm font-bold">
                        View All {order.bids.length} Bids
                      </button>
                      <button className="flex-1 bg-industrial-accent text-industrial-black hover:bg-white transition py-3 rounded-lg text-sm font-bold flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(255,107,26,0.3)]">
                        Add My Demand to Pool <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
