'use client';

import { motion } from 'framer-motion';
import type { IndustrialCluster } from '@/types';

interface Props {
  selectedCluster: IndustrialCluster | null;
  nearbyClusters: IndustrialCluster[];
}

export default function IndustrialRadar({ selectedCluster, nearbyClusters }: Props) {
  const totalDemandMT = nearbyClusters
    .reduce((s, c) => s + c.avg_monthly_raw_material_demand_kg, 0) / 1_000_000;

  return (
    <div className="bg-industrial-card border border-industrial-border rounded-lg p-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-industrial-accent tracking-wider">
          ◎ Industrial Radar
        </h3>
        {selectedCluster && (
          <span className="text-[9px] text-industrial-muted">150 km radius</span>
        )}
      </div>

      {/* Radar animation */}
      <div className="relative flex items-center justify-center mb-3">
        <div className="w-24 h-24 relative">
          {/* Concentric rings */}
          {[24, 40, 56].map((r, i) => (
            <div
              key={r}
              className="absolute border border-industrial-border/50 rounded-full"
              style={{
                width: r * 2,
                height: r * 2,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0.6 - i * 0.1,
              }}
            />
          ))}

          {/* Sweep */}
          {selectedCluster && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0"
            >
              <div
                className="absolute top-1/2 left-1/2 origin-left"
                style={{
                  width: '48px',
                  height: '2px',
                  marginTop: '-1px',
                  background:
                    'linear-gradient(to right, rgba(0,212,255,0.8), transparent)',
                }}
              />
            </motion.div>
          )}

          {/* Cluster dots on radar */}
          {nearbyClusters.slice(0, 8).map((c, i) => {
            const angle = (i / 8) * 2 * Math.PI;
            const r = 30 + (i % 3) * 10;
            const x = 48 + r * Math.cos(angle);
            const y = 48 + r * Math.sin(angle);
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="absolute w-1.5 h-1.5 rounded-full bg-industrial-accent2"
                style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
              />
            );
          })}

          {/* Centre dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-industrial-accent" />
        </div>
      </div>

      {/* Stats */}
      {selectedCluster ? (
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px]">
            <span className="text-industrial-muted">Nearby clusters</span>
            <span className="text-industrial-accent font-semibold">{nearbyClusters.length}</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-industrial-muted">Combined demand</span>
            <span className="text-industrial-accent2 font-semibold">{totalDemandMT.toFixed(1)} MT</span>
          </div>

          {nearbyClusters.slice(0, 3).map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-2 text-[9px] text-industrial-muted py-1 border-t border-industrial-border/40"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-industrial-accent2 flex-shrink-0" />
              <span className="truncate">{c.cluster_name}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[10px] text-industrial-muted text-center py-2">
          Select a cluster to activate radar
        </p>
      )}
    </div>
  );
}
