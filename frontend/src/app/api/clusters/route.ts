import { NextResponse } from 'next/server';
import { MOCK_CLUSTERS } from '@/lib/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get('state');
  const industryType = searchParams.get('industry_type');
  const minScore = searchParams.get('min_score');
  const search = searchParams.get('search');

  let clusters = [...MOCK_CLUSTERS];

  if (state) {
    clusters = clusters.filter((c) =>
      c.state.toLowerCase().includes(state.toLowerCase())
    );
  }
  if (industryType) {
    clusters = clusters.filter((c) =>
      c.industry_type.toLowerCase().includes(industryType.toLowerCase())
    );
  }
  if (minScore) {
    clusters = clusters.filter(
      (c) => c.logistics_priority_score >= parseFloat(minScore)
    );
  }
  if (search) {
    clusters = clusters.filter(
      (c) =>
        c.cluster_name.toLowerCase().includes(search.toLowerCase()) ||
        c.city.toLowerCase().includes(search.toLowerCase())
    );
  }

  return NextResponse.json(clusters);
}
