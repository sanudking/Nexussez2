'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useCallback } from 'react';
import type { IndustrialCluster, ClusterFilter, MapMode } from '@/types';
import { MOCK_CLUSTERS, MOCK_SUMMARY } from '@/lib/mockData';
import StatsBar from '@/components/StatsBar';
import CommandPanel from '@/components/CommandPanel';
import ClusterSidebar from '@/components/ClusterSidebar';

const MapboxContainer = dynamic(() => import('@/components/MapboxContainer'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-industrial-dark">
      <div className="text-center">
        <div className="w-16 h-16 border-2 border-industrial-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-industrial-muted text-sm">Initialising geospatial engine…</p>
      </div>
    </div>
  ),
});

export default function HomePage() {
  const [clusters, setClusters] = useState<IndustrialCluster[]>(MOCK_CLUSTERS);
  const [filteredClusters, setFilteredClusters] = useState<IndustrialCluster[]>(MOCK_CLUSTERS);
  const [selectedCluster, setSelectedCluster] = useState<IndustrialCluster | null>(null);
  const [filters, setFilters] = useState<ClusterFilter>({});
  const [mapMode, setMapMode] = useState<MapMode>('clusters');
  const [summary] = useState(MOCK_SUMMARY);

  // Try to load from backend; silently fall back to mock data
  useEffect(() => {
    fetch('/api/clusters')
      .then((r) => r.ok ? r.json() : null)
      .then((data: IndustrialCluster[] | null) => {
        if (data && data.length > 0) setClusters(data);
      })
      .catch(() => {});
  }, []);

  // Apply filters
  useEffect(() => {
    let result = clusters;
    if (filters.state) {
      result = result.filter((c) =>
        c.state.toLowerCase().includes(filters.state!.toLowerCase())
      );
    }
    if (filters.industry_type) {
      result = result.filter((c) =>
        c.industry_type.toLowerCase().includes(filters.industry_type!.toLowerCase())
      );
    }
    if (filters.min_score !== undefined) {
      result = result.filter((c) => c.logistics_priority_score >= filters.min_score!);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.cluster_name.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.state.toLowerCase().includes(q)
      );
    }
    setFilteredClusters(result);
  }, [filters, clusters]);

  const handleClusterSelect = useCallback((cluster: IndustrialCluster) => {
    setSelectedCluster((prev) => (prev?.id === cluster.id ? null : cluster));
  }, []);

  const handleFilterChange = useCallback((newFilters: ClusterFilter) => {
    setFilters(newFilters);
  }, []);

  const handleMapModeChange = useCallback((mode: MapMode) => {
    setMapMode(mode);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-industrial-black">
      {/* Top stats bar */}
      <StatsBar summary={summary} activeCount={filteredClusters.length} />

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left command panel */}
        <aside className="w-72 flex-shrink-0 bg-industrial-dark border-r border-industrial-border flex flex-col overflow-hidden">
          <CommandPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            mapMode={mapMode}
            onMapModeChange={handleMapModeChange}
            totalClusters={clusters.length}
            filteredCount={filteredClusters.length}
            totalDemandKg={filteredClusters.reduce(
              (s, c) => s + c.avg_monthly_raw_material_demand_kg,
              0
            )}
          />
        </aside>

        {/* Map */}
        <main className="flex-1 relative overflow-hidden">
          <MapboxContainer
            clusters={filteredClusters}
            onClusterSelect={handleClusterSelect}
            filters={filters}
            mapMode={mapMode}
          />
        </main>

        {/* Right sidebar */}
        <aside className="w-80 flex-shrink-0 bg-industrial-dark border-l border-industrial-border flex flex-col overflow-hidden">
          <ClusterSidebar
            clusters={filteredClusters}
            selectedCluster={selectedCluster}
            onClusterSelect={handleClusterSelect}
          />
        </aside>
      </div>
    </div>
  );
}
