'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, X, Layers, BarChart2, Route, SlidersHorizontal, Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { ClusterFilter, MapMode } from '@/types';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

const INDUSTRY_TYPES = [
  'Automobile', 'Auto Components', 'Chemicals', 'Diamond & Textile', 'Electronics',
  'Electronics & Aerospace', 'Engineering', 'Footwear', 'Gems & Jewellery',
  'Hand Tools', 'Heavy Industry', 'Leather', 'Logistics', 'Metal & Engineering',
  'Multi-sector', 'Pharmaceuticals', 'Pumps & Engineering', 'Shipbuilding & Spice',
  'Sports Goods', 'Steel', 'Tea & Logistics', 'Textile',
];

interface Props {
  filters: ClusterFilter;
  onFilterChange: (f: ClusterFilter) => void;
  mapMode: MapMode;
  onMapModeChange: (m: MapMode) => void;
  totalClusters: number;
  filteredCount: number;
  totalDemandKg: number;
}

const MODE_BUTTONS: { id: MapMode; label: string; icon: React.ReactNode }[] = [
  { id: 'clusters',  label: 'Clusters',  icon: <Layers size={14} /> },
  { id: 'heatmap',   label: 'Heatmap',   icon: <BarChart2 size={14} /> },
  { id: 'corridors', label: 'Corridors', icon: <Route size={14} /> },
];

export default function CommandPanel({
  filters, onFilterChange, mapMode, onMapModeChange,
  totalClusters, filteredCount, totalDemandKg,
}: Props) {
  const [scoreValue, setScoreValue] = useState(filters.min_score ?? 0);

  function update(patch: Partial<ClusterFilter>) {
    onFilterChange({ ...filters, ...patch });
  }

  function reset() {
    setScoreValue(0);
    onFilterChange({});
  }

  const demandMT = (totalDemandKg / 1_000_000).toFixed(1);

  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col h-full p-4 gap-4 overflow-y-auto"
    >
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-industrial-accent glow-text tracking-widest">
          NEXUS‑SEZ PRO
        </h1>
        <p className="text-xs text-industrial-muted mt-0.5">
          National Industrial OS · India
        </p>
      </div>

      {/* Live indicator */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-industrial-accent2 animate-pulse" />
        <span className="text-xs text-industrial-accent2 font-semibold tracking-wider">LIVE DATA</span>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-industrial-card border border-industrial-border rounded-lg p-3">
          <p className="text-2xl font-bold text-industrial-accent">{filteredCount}</p>
          <p className="text-[10px] text-industrial-muted uppercase tracking-wide mt-0.5">Active Clusters</p>
        </div>
        <div className="bg-industrial-card border border-industrial-border rounded-lg p-3">
          <p className="text-2xl font-bold text-industrial-accent2">{demandMT}</p>
          <p className="text-[10px] text-industrial-muted uppercase tracking-wide mt-0.5">MT/month</p>
        </div>
      </div>

      {/* Map mode toggles */}
      <div>
        <label className="text-[10px] text-industrial-muted uppercase tracking-widest mb-2 flex items-center gap-1">
          <SlidersHorizontal size={10} /> View Mode
        </label>
        <div className="flex gap-1">
          {MODE_BUTTONS.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => onMapModeChange(id)}
              className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded text-xs font-medium transition-all border ${
                mapMode === id
                  ? 'bg-industrial-accent text-industrial-black border-industrial-accent shadow-glow-accent'
                  : 'bg-industrial-card text-industrial-muted border-industrial-border hover:border-industrial-accent hover:text-industrial-accent'
              }`}
            >
              {icon}
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Quick Links */}
      <div className="mt-2">
        <label className="text-[10px] text-industrial-muted uppercase tracking-widest mb-2 flex items-center gap-1">
          <Layers size={10} /> Extensions
        </label>
        <Link href="/app/marketplace" className="w-full flex items-center justify-between p-2 rounded-lg bg-industrial-card border border-industrial-border hover:border-industrial-accent hover:text-industrial-accent text-industrial-text transition">
          <span className="text-xs font-semibold flex items-center gap-2"><Package size={14} /> B2B Marketplace</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3">
        <p className="text-[10px] text-industrial-muted uppercase tracking-widest">Filters</p>

        {/* Search */}
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-industrial-muted" />
          <input
            type="text"
            placeholder="Search cluster / city…"
            value={filters.search ?? ''}
            onChange={(e) => update({ search: e.target.value || undefined })}
            className="w-full bg-industrial-card border border-industrial-border rounded-lg pl-8 pr-3 py-2 text-xs text-industrial-text placeholder-industrial-muted focus:outline-none focus:border-industrial-accent transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => update({ search: undefined })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-industrial-muted hover:text-industrial-danger"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* State */}
        <select
          value={filters.state ?? ''}
          onChange={(e) => update({ state: e.target.value || undefined })}
          className="w-full bg-industrial-card border border-industrial-border rounded-lg px-3 py-2 text-xs text-industrial-text focus:outline-none focus:border-industrial-accent transition-colors"
        >
          <option value="">All States</option>
          {INDIAN_STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Industry type */}
        <select
          value={filters.industry_type ?? ''}
          onChange={(e) => update({ industry_type: e.target.value || undefined })}
          className="w-full bg-industrial-card border border-industrial-border rounded-lg px-3 py-2 text-xs text-industrial-text focus:outline-none focus:border-industrial-accent transition-colors"
        >
          <option value="">All Industry Types</option>
          {INDUSTRY_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {/* Min score slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[10px] text-industrial-muted uppercase tracking-wide">
              Min Logistics Score
            </label>
            <span className="text-xs text-industrial-accent font-semibold">
              {scoreValue.toFixed(1)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={10}
            step={0.5}
            value={scoreValue}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              setScoreValue(v);
              update({ min_score: v > 0 ? v : undefined });
            }}
            className="w-full accent-industrial-accent"
          />
          <div className="flex justify-between text-[9px] text-industrial-muted mt-0.5">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
      </div>

      {/* Reset */}
      {(filters.state || filters.industry_type || filters.search || (filters.min_score ?? 0) > 0) && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={reset}
          className="flex items-center justify-center gap-2 py-2 rounded-lg border border-industrial-danger text-industrial-danger text-xs font-medium hover:bg-industrial-danger hover:text-white transition-all"
        >
          <X size={12} /> Reset Filters
        </motion.button>
      )}

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-industrial-border text-[9px] text-industrial-muted text-center">
        Nexus-SEZ Pro India v1.0 · {totalClusters} clusters indexed
      </div>
    </motion.div>
  );
}
