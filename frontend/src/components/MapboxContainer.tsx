'use client';

import { useEffect, useRef, useCallback } from 'react';
import type * as maptilersdk from '@maptiler/sdk';
import type { IndustrialCluster, ClusterFilter, MapMode } from '@/types';

interface Props {
  clusters: IndustrialCluster[];
  onClusterSelect: (c: IndustrialCluster) => void;
  filters: ClusterFilter;
  mapMode: MapMode;
}

const INDUSTRY_COLORS: Record<string, string> = {
  'Automobile':              '#ff6b35',
  'Auto Components':         '#ff8c42',
  'Auto & IT Hardware':      '#ffa559',
  'Electronics':             '#00d4ff',
  'Electronics & Aerospace': '#00b8e6',
  'Textile':                 '#c77dff',
  'Pharmaceuticals':         '#00ff88',
  'Steel':                   '#e63946',
  'Steel & Port':            '#c1121f',
  'Engineering':             '#ffd700',
  'Chemicals':               '#ff4d6d',
  'Logistics':               '#48cae4',
  'Logistics & Trade':       '#48cae4',
  'Diamond & Textile':       '#e9c46a',
  'Gems & Jewellery':        '#f4d03f',
  'Leather':                 '#a0522d',
  'Footwear':                '#cd853f',
  'Brass & Metal':           '#daa520',
  'Metal & Engineering':     '#b8860b',
  'Pumps & Engineering':     '#20b2aa',
  'Sports Goods':            '#3cb371',
  'Hand Tools':              '#8fbc8f',
  'Shipbuilding & Spice':    '#40e0d0',
  'Tea & Logistics':         '#6b8e23',
  'Multi-sector':            '#9370db',
  'Heavy Industry':          '#dc143c',
  'Agro-industry':           '#7cfc00',
};

function getColor(industryType: string): string {
  return INDUSTRY_COLORS[industryType] ?? '#00d4ff';
}

const CORRIDORS = [
  {
    id: 'dmic',
    name: 'Delhi-Mumbai Industrial Corridor',
    color: '#00d4ff',
    coordinates: [
      [77.2090, 28.6139], [76.8182, 28.4595], [75.7873, 26.9124],
      [75.3412, 25.2138], [74.1240, 24.5854], [72.9781, 23.0225],
      [72.5714, 22.3039], [72.8311, 21.1702], [72.9440, 18.9490],
      [72.8777, 18.5204],
    ],
  },
  {
    id: 'cbic',
    name: 'Chennai-Bengaluru Corridor',
    color: '#00ff88',
    coordinates: [
      [80.2707, 13.0827], [79.9500, 12.9300], [79.1300, 12.6000],
      [78.5000, 12.3000], [77.8253, 12.7409], [77.5946, 12.9716],
    ],
  },
  {
    id: 'akfc',
    name: 'Amritsar-Kolkata Freight Corridor',
    color: '#ff6b35',
    coordinates: [
      [74.8723, 31.6340], [75.8573, 30.9010], [76.7179, 30.7046],
      [77.3910, 28.5355], [78.7733, 28.8386], [80.3319, 26.4499],
      [82.9739, 25.3176], [85.1376, 25.5941], [87.3119, 23.5204],
      [88.3639, 22.5726],
    ],
  },
];

// Fallback placeholder when no MapTiler key
function MapPlaceholder({ clusters }: { clusters: IndustrialCluster[] }) {
  return (
    <div className="w-full h-full bg-industrial-dark flex flex-col items-center justify-center relative overflow-hidden">
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a3a5c" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="relative z-10 text-center p-8 max-w-md">
        <div className="w-24 h-24 border-2 border-industrial-accent rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <div className="absolute inset-0 border-2 border-industrial-accent rounded-full animate-ping opacity-20" />
          <span className="text-3xl">🗺️</span>
        </div>
        <h2 className="text-2xl font-bold text-industrial-accent glow-text mb-3">
          Interactive Map
        </h2>
        <p className="text-industrial-muted text-sm mb-4">
          Add your MapTiler API key to{' '}
          <code className="text-industrial-accent bg-industrial-card px-1 rounded">
            NEXT_PUBLIC_MAPTILER_KEY
          </code>{' '}
          in <code className="text-industrial-accent bg-industrial-card px-1 rounded">.env.local</code> to
          enable the full interactive map.
        </p>
        <div className="bg-industrial-card border border-industrial-border rounded-lg p-4 text-left">
          <p className="text-xs text-industrial-muted mb-2">Loaded clusters:</p>
          <p className="text-4xl font-bold text-industrial-accent2">{clusters.length}</p>
          <p className="text-xs text-industrial-muted mt-1">across India</p>
        </div>
      </div>

      {/* Scattered cluster dots as decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {clusters.slice(0, 20).map((c, i) => (
          <div
            key={c.id}
            className="absolute w-2 h-2 rounded-full animate-pulse"
            style={{
              left: `${((c.longitude - 68) / (98 - 68)) * 100}%`,
              top: `${((35 - c.latitude) / (35 - 8)) * 100}%`,
              backgroundColor: getColor(c.industry_type),
              animationDelay: `${i * 0.15}s`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function MapboxContainer({ clusters, onClusterSelect, mapMode }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maptilersdk.Map | null>(null);
  const popupRef = useRef<maptilersdk.Popup | null>(null);
  const token = process.env.NEXT_PUBLIC_MAPTILER_KEY ?? '';

  const buildGeoJSON = useCallback(
    (data: IndustrialCluster[]): GeoJSON.FeatureCollection => ({
      type: 'FeatureCollection',
      features: data.map((c) => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [c.longitude, c.latitude] },
        properties: {
          id: c.id,
          cluster_name: c.cluster_name,
          state: c.state,
          city: c.city,
          industry_type: c.industry_type,
          sector_type: c.sector_type,
          logistics_priority_score: c.logistics_priority_score,
          avg_monthly_raw_material_demand_kg: c.avg_monthly_raw_material_demand_kg,
          verified_status: c.verified_status,
          color: getColor(c.industry_type),
        },
      })),
    }),
    []
  );

  // Initialise map
  useEffect(() => {
    if (!token || !mapContainerRef.current) return;

    let map: maptilersdk.Map;

    import('@maptiler/sdk').then((maptilersdk) => {
      maptilersdk.config.apiKey = token;

      map = new maptilersdk.Map({
        container: mapContainerRef.current!,
        style: maptilersdk.MapStyle.DATAVIZ.DARK,
        center: [82.8, 22.5],
        zoom: 4.5,
        pitch: 0,
        maxBounds: [
          [60.0, 4.0],
          [100.0, 40.0],
        ],
        forceNoAttributionControl: true,
      });

      mapRef.current = map;
      popupRef.current = new maptilersdk.Popup({
        closeButton: false,
        closeOnClick: false,
        maxWidth: '300px',
      });

      map.addControl(new maptilersdk.NavigationControl(), 'bottom-right');
      map.addControl(
        new maptilersdk.AttributionControl({ compact: true }),
        'bottom-left'
      );

      map.on('load', () => {
        // ── Corridor lines ────────────────────────────────────────────
        map.addSource('corridors', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: CORRIDORS.map((c) => ({
              type: 'Feature',
              geometry: { type: 'LineString', coordinates: c.coordinates } as GeoJSON.Geometry,
              properties: { name: c.name, color: c.color },
            })),
          },
        });

        map.addLayer({
          id: 'corridors-glow',
          type: 'line',
          source: 'corridors',
          paint: {
            'line-color': ['get', 'color'],
            'line-width': 8,
            'line-opacity': 0.15,
          },
        });

        map.addLayer({
          id: 'corridors-line',
          type: 'line',
          source: 'corridors',
          paint: {
            'line-color': ['get', 'color'],
            'line-width': 2,
            'line-opacity': 0.8,
            'line-dasharray': [4, 3],
          },
        });

        // ── Cluster source ────────────────────────────────────────────
        map.addSource('industrial-clusters', {
          type: 'geojson',
          data: buildGeoJSON(clusters),
        });

        // Heatmap (zoom < 5)
        map.addLayer({
          id: 'clusters-heatmap',
          type: 'heatmap',
          source: 'industrial-clusters',
          maxzoom: 7,
          paint: {
            'heatmap-weight': [
              'interpolate', ['linear'],
              ['get', 'avg_monthly_raw_material_demand_kg'],
              0, 0, 6000000, 1,
            ],
            'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 7, 3],
            'heatmap-color': [
              'interpolate', ['linear'], ['heatmap-density'],
              0, 'rgba(0,0,0,0)',
              0.2, 'rgba(0,212,255,0.3)',
              0.5, 'rgba(0,255,136,0.6)',
              0.8, 'rgba(255,107,53,0.8)',
              1, 'rgba(255,59,92,1)',
            ],
            'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 15, 7, 40],
            'heatmap-opacity': 0.8,
          },
        });

        // Circle clusters (always visible, fades below zoom 5)
        map.addLayer({
          id: 'clusters-layer',
          type: 'circle',
          source: 'industrial-clusters',
          paint: {
            'circle-color': ['get', 'color'],
            'circle-radius': [
              'interpolate', ['linear'],
              ['get', 'logistics_priority_score'],
              0, 4, 10, 16,
            ],
            'circle-opacity': 0.85,
            'circle-stroke-color': '#00d4ff',
            'circle-stroke-width': [
              'interpolate', ['linear'], ['zoom'], 4, 0.5, 8, 1.5,
            ],
          },
        });

        // Label layer (zoom > 7)
        map.addLayer({
          id: 'clusters-labels',
          type: 'symbol',
          source: 'industrial-clusters',
          minzoom: 7,
          layout: {
            'text-field': ['get', 'cluster_name'],
            'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
            'text-size': 11,
            'text-offset': [0, 1.5],
            'text-anchor': 'top',
            'text-max-width': 10,
          },
          paint: {
            'text-color': '#e0f0ff',
            'text-halo-color': '#050a0e',
            'text-halo-width': 1.5,
          },
        });

        // ── Interactions ──────────────────────────────────────────────
        map.on('mouseenter', 'clusters-layer', (e) => {
          map.getCanvas().style.cursor = 'pointer';
          const feat = e.features?.[0];
          if (!feat || !e.lngLat) return;
          const p = feat.properties as Record<string, unknown>;
          const demandMT = ((p.avg_monthly_raw_material_demand_kg as number) / 1000).toFixed(0);
          popupRef.current!
            .setLngLat(e.lngLat)
            .setHTML(
              `<div style="font-family:Inter,sans-serif;font-size:13px;">
                <div style="font-weight:700;color:#00d4ff;margin-bottom:6px;">${p.cluster_name}</div>
                <div style="color:#4a7fa5;margin-bottom:2px;">${p.city}, ${p.state}</div>
                <div style="margin:4px 0;padding:2px 6px;background:rgba(0,212,255,0.1);border-radius:4px;display:inline-block;font-size:11px;">${p.industry_type}</div>
                <div style="margin-top:6px;display:flex;justify-content:space-between;">
                  <span style="color:#a0aec0;font-size:11px;">Score</span>
                  <span style="color:#00ff88;font-weight:600;">${p.logistics_priority_score}/10</span>
                </div>
                <div style="display:flex;justify-content:space-between;">
                  <span style="color:#a0aec0;font-size:11px;">Demand</span>
                  <span style="color:#e0f0ff;font-weight:600;">${demandMT} MT/mo</span>
                </div>
              </div>`
            )
            .addTo(map);
        });

        map.on('mouseleave', 'clusters-layer', () => {
          map.getCanvas().style.cursor = '';
          popupRef.current!.remove();
        });

        map.on('click', 'clusters-layer', (e) => {
          const feat = e.features?.[0];
          if (!feat) return;
          const p = feat.properties as Record<string, unknown>;
          const found = clusters.find((c) => c.id === (p.id as number));
          if (found) onClusterSelect(found);
        });
      });
    });

    return () => {
      map?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Update source data when clusters change
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;
    const src = map.getSource('industrial-clusters') as maptilersdk.GeoJSONSource | undefined;
    if (src) src.setData(buildGeoJSON(clusters));
  }, [clusters, buildGeoJSON]);

  // Update layer visibility based on mapMode
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const show = (id: string, vis: boolean) => {
      if (map.getLayer(id)) {
        map.setLayoutProperty(id, 'visibility', vis ? 'visible' : 'none');
      }
    };

    show('clusters-layer', mapMode === 'clusters' || mapMode === 'corridors');
    show('clusters-heatmap', mapMode === 'heatmap');
    show('clusters-labels', mapMode === 'clusters');
    show('corridors-line', mapMode === 'corridors');
    show('corridors-glow', mapMode === 'corridors');
  }, [mapMode]);

  if (!token) {
    return <MapPlaceholder clusters={clusters} />;
  }

  return <div ref={mapContainerRef} className="w-full h-full" />;
}
