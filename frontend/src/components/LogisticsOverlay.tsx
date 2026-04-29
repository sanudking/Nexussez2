'use client';

import { motion } from 'framer-motion';
import { Route, CheckCircle, Clock } from 'lucide-react';
import type { Corridor } from '@/types';

const STATIC_CORRIDORS: Omit<Corridor, 'cluster_count' | 'clusters'>[] = [
  {
    id: 'delhi-mumbai',
    name: 'Delhi-Mumbai Industrial Corridor',
    length_km: 1483,
    status: 'Operational',
    states: ['Delhi', 'Haryana', 'Rajasthan', 'Gujarat', 'Maharashtra'],
  },
  {
    id: 'chennai-bengaluru',
    name: 'Chennai-Bengaluru Corridor',
    length_km: 560,
    status: 'Operational',
    states: ['Tamil Nadu', 'Karnataka', 'Andhra Pradesh'],
  },
  {
    id: 'amritsar-kolkata',
    name: 'Amritsar-Kolkata Freight Corridor',
    length_km: 1839,
    status: 'Operational',
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar', 'West Bengal'],
  },
  {
    id: 'eastern-dfc',
    name: 'Eastern DFC',
    length_km: 1856,
    status: 'Operational',
    states: ['West Bengal', 'Jharkhand', 'Odisha', 'Chhattisgarh'],
  },
  {
    id: 'western-dfc',
    name: 'Western DFC',
    length_km: 1504,
    status: 'Operational',
    states: ['Gujarat', 'Rajasthan', 'Haryana', 'Punjab'],
  },
];

const CORRIDOR_COLORS: Record<string, string> = {
  'delhi-mumbai':    'border-l-cyan-400',
  'chennai-bengaluru': 'border-l-green-400',
  'amritsar-kolkata': 'border-l-orange-400',
  'eastern-dfc':     'border-l-red-400',
  'western-dfc':     'border-l-purple-400',
};

export default function LogisticsOverlay() {
  return (
    <div className="bg-industrial-card border border-industrial-border rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-industrial-border flex items-center gap-2">
        <Route size={14} className="text-industrial-accent" />
        <h3 className="text-xs font-semibold text-industrial-text tracking-wider uppercase">
          Industrial Corridors
        </h3>
      </div>

      <div className="p-3 flex flex-col gap-2">
        {STATIC_CORRIDORS.map((corridor, i) => (
          <motion.div
            key={corridor.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`bg-industrial-dark border border-industrial-border border-l-2 ${
              CORRIDOR_COLORS[corridor.id] ?? 'border-l-industrial-accent'
            } rounded-r-lg p-3`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-industrial-text truncate">
                  {corridor.name}
                </p>
                <p className="text-[10px] text-industrial-muted mt-0.5">
                  {corridor.length_km.toLocaleString()} km ·{' '}
                  {corridor.states.length} states
                </p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {corridor.status === 'Operational' ? (
                  <CheckCircle size={11} className="text-green-400" />
                ) : (
                  <Clock size={11} className="text-yellow-400" />
                )}
                <span
                  className={`text-[9px] font-semibold ${
                    corridor.status === 'Operational' ? 'text-green-400' : 'text-yellow-400'
                  }`}
                >
                  {corridor.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mt-2">
              {corridor.states.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="text-[8px] px-1.5 py-0.5 rounded bg-industrial-border text-industrial-muted"
                >
                  {s}
                </span>
              ))}
              {corridor.states.length > 3 && (
                <span className="text-[8px] px-1.5 py-0.5 rounded bg-industrial-border text-industrial-muted">
                  +{corridor.states.length - 3}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
