'use client';

import { MOCK_SUPPLIERS, MOCK_LISTINGS, MOCK_MATERIALS } from '@/lib/marketplaceData';
import { ShieldCheck, Star, Award, MapPin, CheckCircle, PackageOpen, Truck, Video, FileText, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function SupplierProfile({ params }: { params: { id: string } }) {
  const supplier = MOCK_SUPPLIERS.find(s => s.id === params.id);

  if (!supplier) {
    return notFound();
  }

  const supplierListings = MOCK_LISTINGS.filter(l => l.supplierId === supplier.id);

  return (
    <div className="flex flex-col h-screen overflow-y-auto bg-industrial-black text-industrial-text">
      {/* Header Bar */}
      <header className="h-16 border-b border-industrial-border bg-industrial-dark flex items-center px-6 justify-between flex-shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/app/marketplace" className="text-industrial-muted hover:text-industrial-accent">
            ← Back to Marketplace
          </Link>
          <div className="h-4 w-px bg-industrial-border" />
          <h1 className="text-lg font-bold">Supplier Profile</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto w-full p-6 space-y-8">
        {/* Profile Header section */}
        <section className="bg-industrial-card border border-industrial-border rounded-2xl overflow-hidden relative">
          <div className="h-48 relative">
            <img src={supplier.image} alt={supplier.name} className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-industrial-card via-industrial-card/80 to-transparent" />
          </div>
          <div className="px-8 pb-8 relative -mt-16">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-4xl font-black text-white flex items-center gap-3">
                  {supplier.name}
                  <ShieldCheck size={28} className="text-industrial-accent2" />
                </h1>
                <div className="flex items-center gap-6 mt-3 text-sm">
                  <div className="flex items-center gap-1 text-industrial-warning font-bold">
                    <Star size={16} fill="currentColor" /> {supplier.ratings} ({supplier.reviewsCount} verified reviews)
                  </div>
                  <div className="flex items-center gap-1 text-industrial-muted">
                    <MapPin size={16} /> Verified Factory Location
                  </div>
                </div>
              </div>
              <div className="bg-industrial-black border border-industrial-border p-4 rounded-xl text-center">
                <div className="text-xs text-industrial-muted uppercase tracking-wider mb-1">Trust Score</div>
                <div className="text-3xl font-black text-industrial-accent2">{supplier.trustScore}/100</div>
              </div>
            </div>
          </div>
        </section>

        {/* USPs and Certifications */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-industrial-dark p-6 rounded-xl border border-industrial-border">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Award size={20} className="text-industrial-accent" /> Certifications & Compliance
            </h2>
            <div className="space-y-3">
              {supplier.certifications.map(cert => (
                <div key={cert} className="flex items-center gap-3 bg-industrial-card p-3 rounded border border-industrial-border">
                  <CheckCircle size={16} className="text-industrial-accent2" />
                  <span className="font-semibold">{cert}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-industrial-border">
              <span className="text-sm text-industrial-muted">Sourcing Method:</span>
              <p className="font-bold text-white mt-1">{supplier.sourcingMethod}</p>
            </div>
          </div>

          <div className="bg-industrial-dark p-6 rounded-xl border border-industrial-border">
            <h2 className="text-lg font-bold mb-4">Unique Selling Propositions</h2>
            <div className="flex flex-wrap gap-3">
              {supplier.usps.map(usp => (
                <div key={usp} className="bg-industrial-accent/10 border border-industrial-accent/30 text-industrial-accent px-4 py-2 rounded-full font-bold text-sm">
                  {usp}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Listed Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supplierListings.map(listing => {
              const material = MOCK_MATERIALS.find(m => m.id === listing.materialId)!;
              return (
                <div key={listing.id} className="bg-industrial-dark border border-industrial-border rounded-xl p-5 hover:border-industrial-accent transition">
                  <div className="text-[10px] text-industrial-accent uppercase tracking-wider mb-1">{material.category} &gt; {material.subCategory}</div>
                  <h3 className="text-xl font-bold mb-3">{material.name}</h3>
                  <div className="text-2xl font-black text-industrial-text mb-4">
                    ₹{listing.pricePerUnit}<span className="text-sm text-industrial-muted font-normal">/{listing.unit}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-industrial-muted">Quality Grade:</span> <span>{listing.qualityGrade}</span></div>
                    <div className="flex justify-between"><span className="text-industrial-muted">MOQ:</span> <span>{listing.moq} {listing.unit}</span></div>
                    <div className="flex justify-between"><span className="text-industrial-muted">Stock:</span> <span className="text-industrial-accent2">{listing.stockAvailability} {listing.unit}</span></div>
                  </div>
                </div>
              );
            })}
            {supplierListings.length === 0 && (
              <div className="col-span-3 py-10 text-center text-industrial-muted border border-dashed border-industrial-border rounded-xl">
                No active listings.
              </div>
            )}
          </div>
        </section>

        {/* Catalog */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><PackageOpen size={24} /> Supplier Catalog</h2>
          {supplier.catalog.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {supplier.catalog.map((item, idx) => (
                <div key={idx} className="bg-industrial-card border border-industrial-border rounded-xl p-4 flex flex-col items-center justify-center text-center gap-3 hover:bg-industrial-dark transition cursor-pointer">
                  {item.type === 'image' && <ImageIcon size={32} className="text-industrial-muted" />}
                  {item.type === 'video' && <Video size={32} className="text-industrial-accent" />}
                  {item.type === 'brochure' && <FileText size={32} className="text-industrial-warning" />}
                  {item.type === 'sample' && <PackageOpen size={32} className="text-industrial-accent2" />}
                  <span className="text-sm font-semibold">{item.title}</span>
                  <span className="text-[10px] uppercase text-industrial-muted tracking-wider">{item.type}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-industrial-muted border border-dashed border-industrial-border rounded-xl">
              Catalog not updated by supplier.
            </div>
          )}
        </section>

        {/* Reviews */}
        <section className="pb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Star size={24} className="text-industrial-warning" /> Verified Buyer Reviews</h2>
          {supplier.reviews.length > 0 ? (
            <div className="space-y-4">
              {supplier.reviews.map(review => (
                <div key={review.id} className="bg-industrial-dark border border-industrial-border rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="font-bold flex items-center gap-2">
                        {review.buyerName}
                        {review.verified && <span className="text-[10px] bg-industrial-accent2/20 text-industrial-accent2 px-2 py-0.5 rounded uppercase font-semibold">Verified Buyer</span>}
                      </div>
                      <div className="text-xs text-industrial-muted mt-1">{review.date}</div>
                    </div>
                    <div className="flex gap-1 text-industrial-warning">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? 'currentColor' : 'none'} className={i >= review.rating ? 'text-industrial-border' : ''} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-[#e0e0e0] mb-4">"{review.feedback}"</p>
                  <div className="flex gap-6 text-xs text-industrial-muted bg-industrial-black p-3 rounded">
                    <div>Quality: <span className="text-white font-bold">{review.qualityRating}/5</span></div>
                    <div>Packaging: <span className="text-white font-bold">{review.packagingRating}/5</span></div>
                    <div>Delivery: <span className="text-white font-bold">{review.deliveryRating}/5</span></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-industrial-muted border border-dashed border-industrial-border rounded-xl">
              No reviews available yet.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
