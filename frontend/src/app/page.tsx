'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, MapPinned, Radar, Truck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F4F1EB] overflow-hidden relative">
      {/* Grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-35">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:200px_200px]" />
      </div>

      {/* Hero rings */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] border border-[#FF6B1A] opacity-5 rounded-full right-[-150px] top-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute w-[900px] h-[900px] border border-[#FF6B1A] opacity-5 rounded-full right-[-300px] top-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute w-[1200px] h-[1200px] border border-[#FF6B1A] opacity-5 rounded-full right-[-450px] top-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-[5vw] py-5 backdrop-blur-sm bg-gradient-to-b from-[#0A0A0F]/95 to-transparent">
        <div>
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#7A7A8A] font-bold">Nexus</p>
          <div className="text-lg font-bold tracking-[-0.03em]">
            Nexus<span className="text-[#FF6B1A]">-SEZ</span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Link
            href="/auth/login"
            className="px-4 py-2 text-sm font-semibold text-[#F4F1EB] transition hover:opacity-70"
          >
            Sign in
          </Link>
          <Link
            href="/auth/signup"
            className="px-5 py-2 text-sm font-semibold bg-[#FF6B1A] text-white rounded-full transition hover:shadow-lg hover:shadow-[#FF6B1A33] hover:-translate-y-0.5"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 pt-32">
        {/* Hero section */}
        <section className="min-h-[60vh] flex flex-col justify-center items-start px-[5vw] pb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#00BFA620] border border-[#00BFA6] text-[#00BFA6] rounded-full px-3 py-1 text-[0.8rem] font-bold tracking-[0.08em] uppercase mb-6"
          >
            <span className="w-1.5 h-1.5 bg-[#00BFA6] rounded-full animate-pulse" />
            Live platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-black text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.02] tracking-[-0.03em] max-w-4xl mb-4"
          >
            Build, discover, and optimize <span className="text-[#FF6B1A]">India's industrial</span> geography.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[clamp(1rem,1.5vw,1.2rem)] text-[#F4F1EB] opacity-60 max-w-2xl mb-8 leading-relaxed"
          >
            Nexus-SEZ Pro India: sovereign-scale industrial mapping. Cluster discovery, corridor intelligence, logistics analysis, and role-based access.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-4 flex-wrap"
          >
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-[#FF6B1A] text-white px-7 py-3 rounded-full font-semibold text-base transition hover:shadow-lg hover:shadow-[#FF6B1A33] hover:-translate-y-1"
            >
              Get started <ArrowRight size={16} />
            </Link>
            <Link
              href="/app"
              className="inline-flex items-center gap-2 border border-[#2A2A38] text-[#F4F1EB] px-7 py-3 rounded-full font-semibold text-base transition hover:border-[#FF6B1A] hover:bg-[#FF6B1A33]"
            >
              Explore platform
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-8 mt-12 flex-wrap"
          >
            <div>
              <div className="font-black text-4xl text-[#F5C842]">63M+</div>
              <div className="text-[0.8rem] text-[#7A7A8A] mt-1 font-semibold">MSMEs in India</div>
            </div>
            <div>
              <div className="font-black text-4xl text-[#FF6B1A]">42+</div>
              <div className="text-[0.8rem] text-[#7A7A8A] mt-1 font-semibold">Industrial clusters</div>
            </div>
            <div>
              <div className="font-black text-4xl text-[#00BFA6]">5</div>
              <div className="text-[0.8rem] text-[#7A7A8A] mt-1 font-semibold">User roles supported</div>
            </div>
          </motion.div>
        </section>

        {/* Features section */}
        <section className="bg-[#0D0D14] py-20 px-[5vw]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <p className="text-[#FF6B1A] text-[0.75rem] font-bold tracking-[0.12em] uppercase mb-3">Core features</p>
              <h2 className="font-black text-[clamp(2rem,4vw,3rem)] tracking-[-0.03em] leading-[1.1] mb-3">
                What Nexus-SEZ delivers
              </h2>
              <p className="text-[#7A7A8A] text-lg max-w-2xl">
                Industrial intelligence built for India's manufacturing and logistics ecosystem.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="col-span-2 bg-gradient-to-br from-[#0D1A18] to-[#13131A] border border-[#2A2A38] rounded-2xl p-6 hover:border-[#FF6B1A] transition"
              >
                <div className="text-3xl mb-3">🗺️</div>
                <h3 className="font-bold text-xl mb-2">Industrial Radar</h3>
                <p className="text-[#7A7A8A]">See nearby clusters, sector concentration, and growth opportunities by geography across India.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-[#13131A] border border-[#2A2A38] rounded-2xl p-6 hover:border-[#00BFA6] transition"
              >
                <div className="text-2xl mb-3">📦</div>
                <h3 className="font-bold text-lg mb-2">Pooling Engine</h3>
                <p className="text-sm text-[#7A7A8A]">Aggregate demand and compare cluster buying power.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#13131A] border border-[#2A2A38] rounded-2xl p-6 hover:border-[#FF6B1A] transition"
              >
                <div className="text-2xl mb-3">🚚</div>
                <h3 className="font-bold text-lg mb-2">Logistics Routes</h3>
                <p className="text-sm text-[#7A7A8A]">Corridor-aware route planning for supply chains.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* MSME highlight section */}
        <section className="py-20 px-[5vw] relative overflow-hidden">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6"
            >
              <p className="text-[#00BFA6] text-sm font-bold tracking-[0.12em] uppercase">Market scale</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4"
            >
              <div className="font-black text-[clamp(3.5rem,12vw,7rem)] leading-[1] tracking-[-0.04em] text-[#FF6B1A] mb-2">
                63 Million
              </div>
              <p className="text-xl text-[#F4F1EB] opacity-80">
                MSMEs across India need better industrial visibility and logistics coordination.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[#7A7A8A] text-base max-w-2xl mx-auto leading-relaxed"
            >
              Nexus-SEZ Pro India connects manufacturers, logistics operators, and enterprises on a single sovereign platform designed for India's industrial ecosystem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10"
            >
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 bg-[#FF6B1A] text-white px-7 py-3 rounded-full font-semibold transition hover:shadow-lg hover:shadow-[#FF6B1A33] hover:-translate-y-1"
              >
                Create account to begin <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="bg-[#0D0D14] py-16 px-[5vw] border-t border-[#2A2A38]">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-black text-3xl mb-4">Ready to explore?</h3>
            <p className="text-[#7A7A8A] text-lg mb-8">Sign up by role and enter the industrial intelligence grid.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/auth/signup"
                className="bg-[#FF6B1A] text-white px-8 py-3 rounded-full font-semibold transition hover:shadow-lg hover:shadow-[#FF6B1A33]"
              >
                Create account
              </Link>
              <Link
                href="/auth/login"
                className="border border-[#2A2A38] text-[#F4F1EB] px-8 py-3 rounded-full font-semibold transition hover:border-[#FF6B1A]"
              >
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
