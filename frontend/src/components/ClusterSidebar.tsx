'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, MapPin, Zap, Package, CheckCircle, Search } from 'lucide-react';
import type { IndustrialCluster } from '@/types';
import ClusterCard from './ClusterCard';
import IndustrialRadar from './IndustrialRadar';

interface Props {
  clusters: IndustrialCluster[];
  selectedCluster: IndustrialCluster | null;
  onClusterSelect: (c: IndustrialCluster) => void;
}

function scoreColor(s: number) {
  if (s >= 8) return 'bg-green-500';
  if (s >= 6) return 'bg-yellow-500';
  return 'bg-red-500';
}

function DetailPanel({
  cluster,
  allClusters,
  onBack,
}: {
  cluster: IndustrialCluster;
  allClusters: IndustrialCluster[];
  onBack: () => void;
}) {
  const demandMT = (cluster.avg_monthly_raw_material_demand_kg / 1_000_000).toFixed(2);
  const scoreWidth = `${(cluster.logistics_priority_score / 10) * 100}%`;

  const nearbyClusters = allClusters
    .filter((c) => c.id !== cluster.id)
    .map((c) => {
      const dlat = c.latitude - cluster.latitude;
      const dlon = c.longitude - cluster.longitude;
      return { ...c, dist: Math.sqrt(dlat * dlat + dlon * dlon) };
    })
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 5) as IndustrialCluster[];

  return (
    <motion.div
      key="detail"
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 40, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col h-full overflow-y-auto"
    >
      {/* Back button */}
      <div className="p-3 border-b border-industrial-border flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs text-industrial-muted hover:text-industrial-accent transition-colors"
        >
          <ChevronLeft size={14} /> Back to list
        </button>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Name & badges */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-sm font-bold text-industrial-text leading-tight">
              {cluster.cluster_name}
            </h2>
            {cluster.verified_status && (
              <CheckCircle size={14} className="text-industrial-accent2 flex-shrink-0 mt-0.5" />
            )}
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-industrial-muted">
            <MapPin size={11} />
            {cluster.city}, {cluster.state}
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-industrial-border text-industrial-accent border border-industrial-accent/30">
              {cluster.industry_type}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-industrial-border text-industrial-muted">
              {cluster.sector_type}
            </span>
          </div>
        </div>

        {/* Logistics score bar */}
        <div className="bg-industrial-card border border-industrial-border rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-industrial-muted flex items-center gap-1">
              <Zap size={11} /> Logistics Score
            </span>
            <span className="text-sm font-bold text-industrial-accent">
              {cluster.logistics_priority_score.toFixed(1)}/10
            </span>
          </div>
          <div className="h-2 bg-industrial-dark rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: scoreWidth }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className={`h-full rounded-full ${scoreColor(cluster.logistics_priority_score)}`}
            />
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Monthly Demand', value: `${demandMT} MT`, icon: <Package size={12} /> },
            { label: 'NIC Code', value: cluster.nic_code, icon: null },
            { label: 'Latitude', value: cluster.latitude.toFixed(4), icon: null },
            { label: 'Longitude', value: cluster.longitude.toFixed(4), icon: null },
          ].map(({ label, value, icon }) => (
            <div
              key={label}
              className="bg-industrial-card border border-industrial-border rounded-lg p-2.5"
            >
              <p className="text-[9px] text-industrial-muted uppercase tracking-wide flex items-center gap-1">
                {icon}{label}
              </p>
              <p className="text-xs font-semibold text-industrial-text mt-1">{value}</p>
            </div>
          ))}
        </div>

        {/* Radar */}
        <IndustrialRadar
          selectedCluster={cluster}
          nearbyClusters={nearbyClusters}
        />
      </div>
    </motion.div>
  );
}

export default function ClusterSidebar({ clusters, selectedCluster, onClusterSelect }: Props) {
  const [localSearch, setLocalSearch] = useState('');

  const displayList: IndustrialCluster[] = localSearch
    ? clusters.filter(
        (c) =>
          c.cluster_name.toLowerCase().includes(localSearch.toLowerCase()) ||
          c.city.toLowerCase().includes(localSearch.toLowerCase())
      )
    : clusters;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-industrial-border flex-shrink-0">
        <h2 className="text-xs font-semibold text-industrial-muted uppercase tracking-widest">
          Industrial Clusters
        </h2>
        <p className="text-[10px] text-industrial-muted mt-0.5">
          {clusters.length} results
        </p>
      </div>

      <AnimatePresence mode="wait">
        {selectedCluster ? (
          <DetailPanel
            key="detail"
            cluster={selectedCluster}
            allClusters={clusters}
            onBack={() => onClusterSelect(selectedCluster!)}  // triggers toggle → deselects
          />
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col flex-1 overflow-hidden"
          >
            {/* Search within sidebar */}
            <div className="px-3 py-2 border-b border-industrial-border flex-shrink-0">
              <div className="relative">
                <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-industrial-muted" />
                <input
                  type="text"
                  placeholder="Quick search…"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full bg-industrial-dark border border-industrial-border rounded pl-7 pr-3 py-1.5 text-xs text-industrial-text placeholder-industrial-muted focus:outline-none focus:border-industrial-accent"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
              {displayList.length === 0 ? (
                <p className="text-xs text-industrial-muted text-center mt-8">
                  No clusters match your filters.
                </p>
              ) : (
                displayList.map((c) => (
                  <ClusterCard
                    key={c.id}
                    cluster={c}
                    isSelected={false}
                    onClick={() => onClusterSelect(c)}
                  />
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
