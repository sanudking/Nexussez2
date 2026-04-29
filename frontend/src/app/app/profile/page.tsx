'use client';

import Link from 'next/link';
import { Package, ShoppingCart, Clock, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const activeOrders = [
    { id: 'ORD-8923', item: 'Industrial Grade Steel (A36)', status: 'In Transit', date: '2026-04-28' },
    { id: 'ORD-8924', item: 'Polymer Pellets (HDPE)', status: 'Processing', date: '2026-04-29' },
  ];

  const cartItems = [
    { id: 'CRT-1', item: 'Aluminum Sheets (5mm)', qty: 50, unit: 'sheets', price: 1200 },
    { id: 'CRT-2', item: 'Copper Wire (2mm)', qty: 100, unit: 'kg', price: 850 },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F4F1EB] p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex items-center justify-between border-b border-[#2A2A38] pb-6">
          <div className="flex items-center gap-4">
            <Link href="/app" className="text-[#7A7A8A] hover:text-[#FF6B1A] transition">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-black tracking-tight text-white">My Profile</h1>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Active Orders Section */}
          <section className="bg-[#13131A] border border-[#2A2A38] rounded-xl p-6">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <Package className="text-[#FF6B1A]" />
              Active Orders
            </h2>
            <div className="space-y-4">
              {activeOrders.map(order => (
                <div key={order.id} className="p-4 bg-[#0A0A0F] border border-[#2A2A38] rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white">{order.item}</h3>
                    <span className="text-xs font-mono text-[#7A7A8A]">{order.id}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className={`flex items-center gap-1 ${order.status === 'In Transit' ? 'text-[#00BFA6]' : 'text-[#F5C842]'}`}>
                      {order.status === 'In Transit' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                      {order.status}
                    </span>
                    <span className="text-[#7A7A8A]">Ordered: {order.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cart Section */}
          <section className="bg-[#13131A] border border-[#2A2A38] rounded-xl p-6">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <ShoppingCart className="text-[#00BFA6]" />
              My Cart
            </h2>
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="p-4 bg-[#0A0A0F] border border-[#2A2A38] rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-white">{item.item}</h3>
                    <p className="text-xs text-[#7A7A8A] mt-1">Qty: {item.qty} {item.unit}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#00BFA6]">₹{item.price * item.qty}</div>
                    <div className="text-[10px] text-[#7A7A8A]">₹{item.price} / {item.unit}</div>
                  </div>
                </div>
              ))}
            </div>
            {cartItems.length > 0 && (
              <button className="w-full mt-6 bg-[#00BFA6] hover:bg-[#00BFA6]/90 text-[#0A0A0F] font-bold py-3 rounded-lg transition">
                Proceed to Checkout
              </button>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
