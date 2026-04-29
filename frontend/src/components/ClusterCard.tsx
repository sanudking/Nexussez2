'use client';

import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Package } from 'lucide-react';
import type { IndustrialCluster } from '@/types';
import clsx from 'clsx';

interface Props {
  cluster: IndustrialCluster;
  isSelected: boolean;
  onClick: () => void;
}

const INDUSTRY_BADGE_COLORS: Record<string, string> = {
  Automobile:                'bg-orange-900/40 text-orange-300 border-orange-700/40',
  'Auto Components':         'bg-orange-900/40 text-orange-300 border-orange-700/40',
  Electronics:               'bg-cyan-900/40 text-cyan-300 border-cyan-700/40',
  'Electronics & Aerospace': 'bg-cyan-900/40 text-cyan-300 border-cyan-700/40',
  Textile:                   'bg-purple-900/40 text-purple-300 border-purple-700/40',
  Pharmaceuticals:           'bg-green-900/40 text-green-300 border-green-700/40',
  Steel:                     'bg-red-900/40 text-red-300 border-red-700/40',
  Engineering:               'bg-yellow-900/40 text-yellow-300 border-yellow-700/40',
  Chemicals:                 'bg-pink-900/40 text-pink-300 border-pink-700/40',
  Logistics:                 'bg-sky-900/40 text-sky-300 border-sky-700/40',
};

function getBadgeClass(type: string): string {
  return INDUSTRY_BADGE_COLORS[type] ?? 'bg-slate-800/40 text-slate-300 border-slate-600/40';
}

function scoreColor(score: number): string {
  if (score >= 8) return 'text-green-400';
  if (score >= 6) return 'text-yellow-400';
  return 'text-red-400';
}

export default function ClusterCard({ cluster, isSelected, onClick }: Props) {
  const demandMT = (cluster.avg_monthly_raw_material_demand_kg / 1_000_000).toFixed(2);

  return (
    <motion.button
      whileHover={{ scale: 1.01, x: 2 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={clsx(
        'w-full text-left rounded-lg border p-3 transition-all cursor-pointer',
        isSelected
          ? 'bg-industrial-card border-industrial-accent shadow-glow-accent'
          : 'bg-industrial-card/60 border-industrial-border hover:border-industrial-muted'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-industrial-text truncate leading-tight">
            {cluster.cluster_name}
          </p>
          <p className="text-[10px] text-industrial-muted mt-0.5">
            {cluster.city}, {cluster.state}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className={clsx('text-sm font-bold', scoreColor(cluster.logistics_priority_score))}>
            {cluster.logistics_priority_score.toFixed(1)}
          </span>
          {cluster.verified_status && (
            <CheckCircle size={11} className="text-industrial-accent2" />
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2 flex-wrap">
        <span
          className={clsx(
            'text-[9px] px-1.5 py-0.5 rounded border font-medium',
            getBadgeClass(cluster.industry_type)
          )}
        >
          {cluster.industry_type}
        </span>
      </div>

      <div className="flex items-center justify-between mt-2 text-[10px] text-industrial-muted">
        <span className="flex items-center gap-1">
          <Package size={9} />
          {demandMT} MT/mo
        </span>
        <span className="flex items-center gap-1">
          <TrendingUp size={9} />
          {cluster.sector_type}
        </span>
      </div>
    </motion.button>
  );
}
