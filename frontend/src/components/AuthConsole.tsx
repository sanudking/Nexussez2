'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  Building2,
  Factory,
  KeyRound,
  Landmark,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Truck,
  UserRound,
} from 'lucide-react';

const SAFFRON = '#FF6B1A';
const TEAL = '#00BFA6';
const GOLD = '#F5C842';

export type AuthMode = 'hub' | 'login' | 'signup';

const ROLES = [
  {
    id: 'msme',
    label: 'MSME / Manufacturer',
    icon: <Factory size={16} />,
    description: 'Factory teams, cluster operators, and production planners.',
  },
  {
    id: 'logistics',
    label: 'Logistics Operator',
    icon: <Truck size={16} />,
    description: 'Fleet, route, and warehouse intelligence access.',
  },

  {
    id: 'enterprise',
    label: 'Enterprise Buyer',
    icon: <Building2 size={16} />,
    description: 'Procurement, sourcing, and multi-cluster demand planning.',
  },
];

function FieldLabel({ children }: { children: ReactNode }) {
  return <label className="text-[10px] uppercase tracking-[0.35em] text-industrial-muted">{children}</label>;
}

function RoleCard({
  title,
  description,
  href,
  icon,
  accent,
}: {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  accent: 'accent' | 'accent2';
}) {
  const borderClass = accent === 'accent' ? 'hover:border-industrial-accent' : 'hover:border-industrial-accent2';
  const textClass = accent === 'accent' ? 'text-industrial-accent' : 'text-industrial-accent2';
  const boxClass = accent === 'accent'
    ? 'border-industrial-accent/40 text-industrial-accent'
    : 'border-industrial-accent2/40 text-industrial-accent2';

  return (
    <Link
      href={href}
      className={`group border border-industrial-border bg-industrial-card/70 p-4 transition-all ${borderClass}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 border ${boxClass} bg-industrial-dark flex items-center justify-center`}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-industrial-text">{title}</p>
            <p className="text-[10px] text-industrial-muted mt-0.5">{description}</p>
          </div>
        </div>
        <ArrowRight size={14} className={`${textClass} transition-transform group-hover:translate-x-1`} />
      </div>
    </Link>
  );
}

export default function AuthConsole({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const isLogin = mode === 'login';
  const isSignup = mode === 'signup';
  const isHub = mode === 'hub';

  const goToApp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/app');
  };

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
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-[5vw] py-5 backdrop-blur-sm bg-gradient-to-b from-[#0A0A0F]/95 to-transparent">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-lg font-bold tracking-[-0.03em]">
            Nexus<span className="text-[#FF6B1A]">-SEZ</span>
          </div>
        </Link>
        <Link href="/" className="text-sm font-semibold text-[#7A7A8A] hover:text-[#F4F1EB] transition">
          ← Back to home
        </Link>
      </nav>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-[5vw] pt-20">
        <div className="max-w-5xl mx-auto w-full">
          {(isHub || isSignup) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-[#00BFA620] border border-[#00BFA6] text-[#00BFA6] rounded-full px-3 py-1 text-[0.8rem] font-bold tracking-[0.08em] uppercase mb-4">
                <span className="w-1.5 h-1.5 bg-[#00BFA6] rounded-full animate-pulse" />
                Platform access
              </div>
              <h1 className="text-[clamp(2.5rem,8vw,4rem)] font-black leading-[1.02] tracking-[-0.03em] mb-4">
                Sign in or create your account to access <span className="text-[#FF6B1A]">industrial intelligence</span>.
              </h1>
              <p className="text-lg text-[#7A7A8A] max-w-2xl">
                {isHub ? 'Choose your role and enter the command center.' : 'Register by role to access cluster discovery, logistics analysis, and corridor intelligence.'}
              </p>
            </motion.div>
          )}

          {isLogin && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-lg"
            >
              <div className="inline-flex items-center gap-2 bg-[#FF6B1A20] border border-[#FF6B1A] text-[#FF6B1A] rounded-full px-3 py-1 text-[0.8rem] font-bold tracking-[0.08em] uppercase mb-4">
                <KeyRound size={14} />
                Sign in
              </div>
              <h1 className="text-[clamp(2rem,8vw,3rem)] font-black leading-[1.02] tracking-[-0.03em] mb-6">
                Welcome back.
              </h1>
            </motion.div>
          )}

          <div className="grid gap-8 lg:grid-cols-2 mt-8">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              {(isHub || !isLogin) && (
                <>
                  <div>
                    <p className="text-[#7A7A8A] text-xs uppercase tracking-[0.08em] font-bold mb-4">User types</p>
                    <div className="grid gap-3">
                      {ROLES.map((role) => (
                        <div key={role.id} className="border border-[#2A2A38] bg-[#13131A] rounded-lg p-4 hover:border-[#FF6B1A] transition">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 border border-[#FF6B1A]/30 bg-[#0A0A0F] flex items-center justify-center text-[#FF6B1A] rounded-lg">
                              {role.icon}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#F4F1EB]">{role.label}</p>
                              <p className="text-[10px] text-[#7A7A8A] mt-0.5">{role.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-[#2A2A38] bg-[#13131A] rounded-lg p-4">
                    <p className="text-[#7A7A8A] text-xs uppercase tracking-[0.08em] font-bold mb-3">What happens next</p>
                    <ul className="space-y-2 text-sm text-[#F4F1EB]">
                      <li className="flex gap-2">
                        <span className="text-[#FF6B1A]">•</span>
                        <span>Sign up with your role, organization, and region</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#FF6B1A]">•</span>
                        <span>Enter the dashboard and access cluster maps</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#FF6B1A]">•</span>
                        <span>Explore corridors, logistics, and analytics</span>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </motion.div>

            {/* Right form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border border-[#2A2A38] bg-[#13131A]/50 rounded-2xl p-8"
            >
              {(isHub || isSignup) && (
                <div className="grid gap-3 mb-8">
                  <Link
                    href="/auth/signup"
                    className="border border-[#FF6B1A] bg-[#FF6B1A] text-white px-6 py-3 rounded-lg font-semibold text-center transition hover:shadow-lg hover:shadow-[#FF6B1A33]"
                  >
                    Create account
                  </Link>
                  <Link
                    href="/auth/login"
                    className="border border-[#2A2A38] bg-transparent text-[#F4F1EB] px-6 py-3 rounded-lg font-semibold text-center transition hover:border-[#FF6B1A]"
                  >
                    Sign in
                  </Link>
                </div>
              )}

              {isLogin && (
                <form className="space-y-5" onSubmit={goToApp}>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.08em] text-[#7A7A8A] font-bold block mb-2">Email</label>
                    <div className="flex items-center gap-2 border border-[#2A2A38] bg-[#0A0A0F] rounded-lg px-4 py-3">
                      <Mail size={14} className="text-[#7A7A8A]" />
                      <input
                        type="email"
                        placeholder="name@organization.in"
                        className="w-full bg-transparent outline-none text-sm text-[#F4F1EB] placeholder-[#7A7A8A]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.08em] text-[#7A7A8A] font-bold block mb-2">Password</label>
                    <div className="flex items-center gap-2 border border-[#2A2A38] bg-[#0A0A0F] rounded-lg px-4 py-3">
                      <Lock size={14} className="text-[#7A7A8A]" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-transparent outline-none text-sm text-[#F4F1EB] placeholder-[#7A7A8A]"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#FF6B1A] text-white py-3 rounded-lg font-semibold transition hover:shadow-lg hover:shadow-[#FF6B1A33] hover:-translate-y-0.5"
                  >
                    Sign in
                  </button>
                  <p className="text-[10px] text-[#7A7A8A] text-center">
                    New here?{' '}
                    <Link className="text-[#FF6B1A] font-semibold hover:text-[#F5C842]" href="/auth/signup">
                      Create account
                    </Link>
                  </p>
                </form>
              )}

              {isSignup && (
                <form className="space-y-5" onSubmit={goToApp}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.08em] text-[#7A7A8A] font-bold block mb-2">Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="w-full border border-[#2A2A38] bg-[#0A0A0F] rounded-lg px-4 py-3 outline-none text-sm text-[#F4F1EB] placeholder-[#7A7A8A]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.08em] text-[#7A7A8A] font-bold block mb-2">Organization</label>
                      <input
                        type="text"
                        placeholder="Company"
                        className="w-full border border-[#2A2A38] bg-[#0A0A0F] rounded-lg px-4 py-3 outline-none text-sm text-[#F4F1EB] placeholder-[#7A7A8A]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.08em] text-[#7A7A8A] font-bold block mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="name@organization.in"
                      className="w-full border border-[#2A2A38] bg-[#0A0A0F] rounded-lg px-4 py-3 outline-none text-sm text-[#F4F1EB] placeholder-[#7A7A8A]"
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.08em] text-[#7A7A8A] font-bold block mb-2">User type</label>
                      <select className="w-full border border-[#2A2A38] bg-[#0A0A0F] rounded-lg px-4 py-3 outline-none text-sm text-[#F4F1EB]">
                        {ROLES.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.08em] text-[#7A7A8A] font-bold block mb-2">Region</label>
                      <input
                        type="text"
                        placeholder="State/city"
                        className="w-full border border-[#2A2A38] bg-[#0A0A0F] rounded-lg px-4 py-3 outline-none text-sm text-[#F4F1EB] placeholder-[#7A7A8A]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.08em] text-[#7A7A8A] font-bold block mb-2">Password</label>
                    <input
                      type="password"
                      placeholder="Create secure password"
                      className="w-full border border-[#2A2A38] bg-[#0A0A0F] rounded-lg px-4 py-3 outline-none text-sm text-[#F4F1EB] placeholder-[#7A7A8A]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#FF6B1A] text-white py-3 rounded-lg font-semibold transition hover:shadow-lg hover:shadow-[#FF6B1A33] hover:-translate-y-0.5"
                  >
                    Create account <ArrowRight size={16} className="ml-2 inline" />
                  </button>
                  <p className="text-[10px] text-[#7A7A8A] text-center">
                    Already registered?{' '}
                    <Link className="text-[#FF6B1A] font-semibold hover:text-[#F5C842]" href="/auth/login">
                      Sign in
                    </Link>
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
