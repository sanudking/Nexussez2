'use client';

import { useState } from 'react';
import { ShieldCheck, Truck, Star, Award, TrendingDown, ArrowRight, ArrowLeft, Package, Clock, Eye } from 'lucide-react';
import { MOCK_MATERIALS, MOCK_SUPPLIERS, MOCK_LISTINGS, MOCK_POOLED_ORDERS } from '@/lib/marketplaceData';
import Link from 'next/link';

export function MarketplaceBuyer() {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);

  const selectedMaterial = MOCK_MATERIALS.find(m => m.id === selectedMaterialId);
  const relevantListings = MOCK_LISTINGS.filter(l => l.materialId === selectedMaterialId);

  // Group materials by category
  const categories = ['Textile', 'Steel', 'Furniture', 'Electronics'];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-industrial-black text-industrial-text">
      {/* Top Bar */}
      <header className="h-16 border-b border-industrial-border bg-industrial-dark flex items-center px-6 justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/app" className="text-industrial-muted hover:text-industrial-accent">
            ← Back to Map
          </Link>
          <div className="h-4 w-px bg-industrial-border" />
          <h1 className="text-lg font-bold">B2B Raw Material Marketplace</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/app/tracking" className="text-sm text-industrial-accent2 hover:underline flex items-center gap-1 border border-industrial-border px-3 py-1.5 rounded bg-industrial-card">
            <Truck size={14} /> Live Tracking
          </Link>
          <span className="text-xs text-industrial-muted ml-4">Role: Buyer (Factory)</span>
          <Link href="/app/supplier" className="border border-industrial-accent text-industrial-accent px-3 py-1.5 text-xs font-semibold rounded hover:bg-industrial-accent/10 transition">
            Switch to Supplier View
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Materials */}
        <aside className="w-80 flex-shrink-0 bg-industrial-dark border-r border-industrial-border flex flex-col overflow-hidden">
          <div className="p-4 border-b border-industrial-border">
            <h2 className="text-sm font-bold text-industrial-accent tracking-wide uppercase">Select Category</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {categories.map(category => {
              const categoryMaterials = MOCK_MATERIALS.filter(m => m.category === category);
              if (categoryMaterials.length === 0) return null;
              return (
                <div key={category}>
                  <h3 className="text-xs font-bold text-industrial-muted uppercase tracking-wider mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-industrial-accent" />
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {categoryMaterials.map(material => (
                      <button
                        key={material.id}
                        onClick={() => setSelectedMaterialId(material.id)}
                        className={`w-full text-left p-3 rounded-lg border transition ${
                          selectedMaterialId === material.id
                            ? 'bg-industrial-card border-industrial-accent'
                            : 'border-industrial-border hover:border-industrial-accent/50'
                        }`}
                      >
                        <div className="text-[10px] text-industrial-muted uppercase tracking-wider">{material.subCategory}</div>
                        <div className="font-semibold text-sm mt-0.5">{material.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Main Content - Comparison */}
        <main className="flex-1 overflow-y-auto bg-industrial-black p-6">
          {!selectedMaterial ? (
            <div className="h-full flex flex-col items-center justify-center text-industrial-muted">
              <Package className="w-12 h-12 mb-4 opacity-20" />
              <p>Select a material from the left to view and compare suppliers.</p>
            </div>
          ) : (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex items-center justify-between bg-industrial-dark p-6 rounded-xl border border-industrial-border">
                <div>
                  <div className="text-industrial-accent text-sm font-bold uppercase tracking-wider mb-1">{selectedMaterial.category} &gt; {selectedMaterial.subCategory}</div>
                  <h2 className="text-3xl font-black text-industrial-text">{selectedMaterial.name}</h2>
                  <p className="text-sm text-industrial-muted mt-2 max-w-2xl">{selectedMaterial.description}</p>
                </div>
                <Link href="/app/pooled-orders" className="bg-industrial-accent2/10 text-industrial-accent2 border border-industrial-accent2 px-6 py-3 rounded-lg font-bold hover:bg-industrial-accent2 hover:text-industrial-black transition flex items-center gap-2">
                  <TrendingDown size={18} />
                  Initiate Pooled Bulk Order
                </Link>
              </div>

              {MOCK_POOLED_ORDERS.filter(p => p.materialId === selectedMaterialId && p.status === 'bidding').length > 0 && (
                <div className="mt-8 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-industrial-accent2 flex items-center gap-2">
                      <TrendingDown size={18} /> Active Polling / Bulk Requests
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {MOCK_POOLED_ORDERS.filter(p => p.materialId === selectedMaterialId && p.status === 'bidding').map(pool => (
                      <div key={pool.id} className="bg-industrial-card border border-industrial-border p-5 rounded-xl flex flex-wrap items-center justify-between gap-4 hover:border-industrial-accent2/50 transition">
                        <div>
                          <div className="text-xs text-industrial-muted uppercase tracking-wider mb-1">Total Volume Needed</div>
                          <div className="text-xl font-black text-white">{pool.totalVolume.toLocaleString()} {pool.unit}</div>
                        </div>
                        <div>
                          <div className="text-xs text-industrial-muted uppercase tracking-wider mb-1">Target Price</div>
                          <div className="text-xl font-bold text-industrial-accent2">₹{pool.targetPricePerUnit}/{pool.unit}</div>
                        </div>
                        <div>
                          <div className="text-xs text-industrial-muted uppercase tracking-wider mb-1">Active Bids</div>
                          <div className="text-xl font-bold text-white">{pool.bids.length} Supplier(s)</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-industrial-warning font-bold flex items-center justify-end gap-1 mb-2">
                            <Clock size={12} /> Ends in {pool.timeRemaining}
                          </div>
                          <button className="bg-industrial-accent2 text-industrial-black text-sm font-bold px-4 py-2 rounded hover:bg-industrial-accent2/90 transition shadow-[0_0_10px_rgba(0,191,166,0.3)]">
                            Join Bulk Pool
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-8 mb-4">
                <h3 className="text-lg font-bold text-industrial-text flex items-center gap-2">
                  <Eye size={18} className="text-industrial-muted" /> Compare Verified Suppliers
                </h3>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {relevantListings.map(listing => {
                  const supplier = MOCK_SUPPLIERS.find(s => s.id === listing.supplierId)!;
                  return (
                    <div key={listing.id} className="bg-industrial-card border border-industrial-border rounded-xl overflow-hidden hover:border-industrial-accent/50 transition flex flex-col">
                      <div className="h-40 bg-industrial-dark relative">
                        <img src={supplier.image} alt={supplier.name} className="w-full h-full object-cover opacity-50 mix-blend-overlay" />
                        <div className="absolute inset-0 bg-gradient-to-t from-industrial-card to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                          <div>
                            <h3 className="text-xl font-bold text-industrial-text flex items-center gap-2">
                              {supplier.name}
                              <ShieldCheck size={16} className="text-industrial-accent2" />
                            </h3>
                            <div className="flex items-center gap-1 text-xs text-industrial-warning mt-1 font-semibold">
                              <Star size={12} fill="currentColor" />
                              <span>{supplier.ratings} ({supplier.reviewsCount} reviews)</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <div className="bg-industrial-dark/80 px-2 py-1 rounded text-xs text-industrial-accent2 border border-industrial-accent2/30 font-bold tracking-wide">
                              Trust Score: {supplier.trustScore}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <div className="grid grid-cols-2 gap-4 mb-5">
                          <div className="bg-industrial-black p-3 rounded border border-industrial-border">
                            <div className="text-[10px] text-industrial-muted uppercase tracking-wider mb-1">Pricing</div>
                            <div className="text-2xl font-black text-industrial-accent">
                              ₹{listing.pricePerUnit}<span className="text-sm text-industrial-muted font-normal">/{listing.unit}</span>
                            </div>
                            <div className="text-xs text-industrial-muted mt-1">Delivery: ₹{listing.deliveryCharge}</div>
                          </div>
                          <div className="bg-industrial-black p-3 rounded border border-industrial-border">
                            <div className="text-[10px] text-industrial-muted uppercase tracking-wider mb-1">Logistics & MOQ</div>
                            <div className="text-sm font-semibold flex items-center gap-1">
                              <Truck size={14} className="text-industrial-muted" /> ETA: {listing.expectedDeliveryTime}
                            </div>
                            <div className="text-xs text-industrial-muted mt-1">MOQ: {listing.moq} {listing.unit}</div>
                          </div>
                        </div>

                        <div className="space-y-4 flex-1">
                          <div>
                            <div className="text-[10px] text-industrial-muted uppercase tracking-wider border-b border-industrial-border pb-1 mb-2">Material Specifications</div>
                            <div className="grid grid-cols-2 gap-y-2 text-xs">
                              <div className="flex justify-between pr-4"><span className="text-industrial-muted">Grade:</span> <span className="font-semibold">{listing.qualityGrade}</span></div>
                              <div className="flex justify-between"><span className="text-industrial-muted">Durability:</span> <span className="font-semibold text-industrial-warning">{listing.durabilityScore}/10</span></div>
                              <div className="flex justify-between pr-4"><span className="text-industrial-muted">Stock Avail:</span> <span className="font-semibold text-industrial-accent2">{listing.stockAvailability} {listing.unit}</span></div>
                              <div className="flex justify-between"><span className="text-industrial-muted">Source:</span> <span className="font-semibold">{supplier.sourcingMethod}</span></div>
                            </div>
                          </div>

                          <div>
                            <div className="text-[10px] text-industrial-muted uppercase tracking-wider border-b border-industrial-border pb-1 mb-2">Certifications & USPs</div>
                            <div className="flex flex-wrap gap-1.5">
                              {supplier.certifications.map(cert => (
                                <span key={cert} className="text-[9px] bg-[#0A0A0F] border border-industrial-border px-1.5 py-0.5 rounded flex items-center gap-1 font-semibold text-industrial-muted">
                                  <Award size={10} className="text-industrial-warning" /> {cert}
                                </span>
                              ))}
                              {supplier.usps.map(usp => (
                                <span key={usp} className="text-[9px] bg-industrial-accent/10 border border-industrial-accent/30 px-1.5 py-0.5 rounded text-industrial-accent font-semibold">
                                  {usp}
                                </span>
                              ))}
                            </div>
                          </div>

                          {listing.bulkDiscounts.length > 0 && (
                            <div className="bg-gradient-to-r from-industrial-dark to-industrial-card rounded p-3 border border-industrial-accent2/20">
                              <div className="text-[10px] text-industrial-accent2 font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                                <TrendingDown size={12} /> Bulk Order Discounts Available
                              </div>
                              <div className="flex gap-4">
                                {listing.bulkDiscounts.map((discount, i) => (
                                  <div key={i} className="text-xs bg-industrial-black px-2 py-1 rounded border border-industrial-border">
                                    <span className="text-industrial-muted">≥ {discount.threshold} {listing.unit}:</span>{' '}
                                    <span className="text-industrial-accent2 font-bold">{discount.discountPercent}% OFF</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-6">
                          <Link href={`/app/supplier/${supplier.id}`} className="bg-industrial-dark border border-industrial-border hover:border-industrial-muted transition py-2.5 rounded text-sm font-bold flex items-center justify-center gap-2">
                            View Full Profile
                          </Link>
                          <button className="bg-industrial-accent text-industrial-black hover:bg-white transition py-2.5 rounded text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,107,26,0.3)]">
                            Place Order <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {relevantListings.length === 0 && (
                  <div className="col-span-2 text-center py-20 bg-industrial-dark text-industrial-muted border border-dashed border-industrial-border rounded-xl">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">No suppliers found for this material yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

