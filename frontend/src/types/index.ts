export interface IndustrialCluster {
  id: number;
  cluster_name: string;
  state: string;
  city: string;
  latitude: number;
  longitude: number;
  industry_type: string;
  sector_type: string;
  nic_code: string;
  avg_monthly_raw_material_demand_kg: number;
  verified_status: boolean;
  logistics_priority_score: number;
  created_at: string;
}

export interface ClusterFilter {
  state?: string;
  industry_type?: string;
  min_score?: number;
  search?: string;
}

export interface NationalSummary {
  total_clusters: number;
  total_states: number;
  total_demand_kg: number;
  avg_logistics_score: number;
  top_states: { state: string; cluster_count: number; total_demand: number }[];
}

export interface PoolingOpportunity {
  cluster: IndustrialCluster;
  distance_km: number;
  combined_demand_kg: number;
  cost_reduction_pct: number;
}

export interface HeatmapEntry {
  state: string;
  cluster_count: number;
  total_demand_kg: number;
  avg_logistics_score: number;
  centroid_lon: number;
  centroid_lat: number;
}

export interface Corridor {
  id: string;
  name: string;
  length_km: number;
  status: string;
  states: string[];
  cluster_count: number;
  clusters: IndustrialCluster[];
}

export interface LogisticsRoute {
  id: number;
  name: string;
  route_type: 'DFC' | 'Highway' | 'Port';
  from: string;
  to: string;
  length_km: number;
  status: string;
  capacity_mtpa?: number | null;
}

export type MapMode = 'clusters' | 'heatmap' | 'corridors';
