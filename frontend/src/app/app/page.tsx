'use client';

import Link from 'next/link';
import { ShoppingBag, Map, Factory, Truck, UserCircle, ArrowRight } from 'lucide-react';

export default function AppDashboard() {
  const tiles = [
    {
      title: 'Marketplace',
      description: 'Browse materials, compare suppliers, and place orders.',
      icon: <ShoppingBag size={48} className="text-industrial-accent" />,
      href: '/app/marketplace',
      color: 'border-industrial-accent'
    },
    {
      title: 'Industrial Map',
      description: 'Explore clusters, logistics scores, and regional data.',
      icon: <Map size={48} className="text-industrial-accent2" />,
      href: '/app/map',
      color: 'border-industrial-accent2'
    },
    {
      title: 'Supplier Infoboard',
      description: 'Manage your listings, bids, and catalog.',
      icon: <Factory size={48} className="text-industrial-warning" />,
      href: '/app/supplier',
      color: 'border-industrial-warning'
    },
    {
      title: 'Live Tracking',
      description: 'Track active shipments and logistics data.',
      icon: <Truck size={48} className="text-industrial-accent" />,
      href: '/app/tracking',
      color: 'border-industrial-accent'
    },
    {
      title: 'My Profile',
      description: 'View your active orders, cart, and profile settings.',
      icon: <UserCircle size={48} className="text-industrial-accent2" />,
      href: '/app/profile',
      color: 'border-industrial-accent2'
    }
  ];

  return (
    <div className="min-h-screen bg-industrial-black text-industrial-text p-8 md:p-12 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-12 mt-8">
        <header className="flex items-center justify-between border-b border-industrial-border pb-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Welcome back.</h1>
            <p className="text-industrial-muted">Select a module to continue your industrial operations.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/app/profile" className="w-12 h-12 rounded-full bg-industrial-dark border border-industrial-border flex items-center justify-center hover:border-industrial-accent transition">
              <UserCircle size={24} className="text-industrial-text" />
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiles.map((tile, idx) => (
            <Link 
              key={idx} 
              href={tile.href}
              className={`group flex flex-col justify-between bg-industrial-dark border border-industrial-border rounded-2xl p-8 hover:border-transparent transition-all hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden`}
            >
              <div className={`absolute inset-0 border-2 ${tile.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div>
                <div className="mb-6 bg-industrial-black inline-block p-4 rounded-xl border border-industrial-border group-hover:border-transparent transition-colors">
                  {tile.icon}
                </div>
                <h2 className="text-2xl font-bold mb-2 text-white">{tile.title}</h2>
                <p className="text-industrial-muted">{tile.description}</p>
              </div>
              <div className="mt-8 flex items-center gap-2 font-bold text-sm tracking-widest uppercase group-hover:text-white transition-colors text-industrial-muted">
                Open Module <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}