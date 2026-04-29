'use client';

import { motion } from 'framer-motion';
import { Factory, Map, Package, Zap } from 'lucide-react';
import type { NationalSummary } from '@/types';

interface Props {
  summary: NationalSummary;
  activeCount: number;
}

function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="font-bold"
    >
      {value.toFixed(decimals)}
    </motion.span>
  );
}

export default function StatsBar({ summary, activeCount }: Props) {
  const demandMT = summary.total_demand_kg / 1_000_000;

  const stats = [
    {
      icon: <Factory size={13} className="text-industrial-accent" />,
      label: 'Industrial Clusters',
      value: <AnimatedNumber value={activeCount} />,
      sub: `of ${summary.total_clusters} total`,
      color: 'text-industrial-accent',
    },
    {
      icon: <Map size={13} className="text-industrial-accent2" />,
      label: 'States Covered',
      value: <AnimatedNumber value={summary.total_states} />,
      sub: 'across India',
      color: 'text-industrial-accent2',
    },
    {
      icon: <Package size={13} className="text-industrial-warning" />,
      label: 'Monthly Demand',
      value: (
        <span>
          <AnimatedNumber value={demandMT} decimals={1} />
          <span className="text-xs font-normal ml-1">MT</span>
        </span>
      ),
      sub: 'raw material/month',
      color: 'text-industrial-warning',
    },
    {
      icon: <Zap size={13} className="text-yellow-400" />,
      label: 'Avg Logistics Score',
      value: (
        <span>
          <AnimatedNumber value={summary.avg_logistics_score} decimals={1} />
          <span className="text-xs font-normal ml-0.5">/10</span>
        </span>
      ),
      sub: 'national average',
      color: 'text-yellow-400',
    },
  ];

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-12 flex-shrink-0 bg-industrial-dark border-b border-industrial-border flex items-center px-4 gap-1 overflow-x-auto"
    >
      {stats.map((s, i) => (
        <div
          key={i}
          className="flex items-center gap-2 px-3 py-1 border-r border-industrial-border/50 last:border-r-0 flex-shrink-0"
        >
          {s.icon}
          <div className="flex flex-col leading-none">
            <p className="text-[9px] text-industrial-muted uppercase tracking-wide">{s.label}</p>
            <p className={`text-sm ${s.color}`}>{s.value}</p>
          </div>
        </div>
      ))}

      {/* Live indicator */}
      <div className="ml-auto flex items-center gap-1.5 flex-shrink-0 pl-3">
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-industrial-danger"
        />
        <span className="text-[9px] text-industrial-danger font-semibold tracking-widest uppercase">
          Live Data
        </span>
      </div>
    </motion.div>
  );
}
