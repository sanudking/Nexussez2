import type {
  IndustrialCluster,
  ClusterFilter,
  NationalSummary,
  HeatmapEntry,
  Corridor,
  PoolingOpportunity,
  LogisticsRoute,
} from '@/types';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${path}`);
  }
  return res.json() as Promise<T>;
}

function buildQuery(params: Record<string, string | number | undefined>): string {
  const parts: string[] = [];
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '' && v !== null) {
      parts.push(`${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
    }
  }
  return parts.length ? `?${parts.join('&')}` : '';
}

export async function fetchClusters(filters?: ClusterFilter): Promise<IndustrialCluster[]> {
  const query = buildQuery({
    state: filters?.state,
    industry_type: filters?.industry_type,
    min_score: filters?.min_score,
    search: filters?.search,
  });
  return apiFetch<IndustrialCluster[]>(`/api/clusters${query}`);
}

export async function fetchCluster(id: number): Promise<IndustrialCluster> {
  return apiFetch<IndustrialCluster>(`/api/clusters/${id}`);
}

export async function fetchNearbyClusters(
  lat: number,
  lon: number,
  radius: number
): Promise<(IndustrialCluster & { distance_km: number })[]> {
  return apiFetch<(IndustrialCluster & { distance_km: number })[]>(
    `/api/clusters/nearby${buildQuery({ lat, lon, radius_km: radius })}`
  );
}

export async function fetchNationalSummary(): Promise<NationalSummary> {
  return apiFetch<NationalSummary>('/api/analytics/summary');
}

export async function fetchHeatmapData(): Promise<HeatmapEntry[]> {
  return apiFetch<HeatmapEntry[]>('/api/analytics/heatmap');
}

export async function fetchPoolingOpportunities(clusterId: number): Promise<{
  source_cluster: string;
  opportunities: PoolingOpportunity[];
}> {
  return apiFetch(`/api/analytics/pooling/${clusterId}`);
}

export async function fetchCorridors(): Promise<Corridor[]> {
  return apiFetch<Corridor[]>('/api/analytics/corridors');
}

export async function fetchLogisticsRoutes(): Promise<LogisticsRoute[]> {
  return apiFetch<LogisticsRoute[]>('/api/logistics/routes');
}
