-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Industrial clusters table
CREATE TABLE IF NOT EXISTS industrial_clusters (
    id SERIAL PRIMARY KEY,
    cluster_name VARCHAR(255) NOT NULL,
    state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    industry_type VARCHAR(150) NOT NULL,
    sector_type VARCHAR(100) NOT NULL,
    nic_code VARCHAR(10) NOT NULL,
    avg_monthly_raw_material_demand_kg DOUBLE PRECISION NOT NULL DEFAULT 0,
    verified_status BOOLEAN NOT NULL DEFAULT FALSE,
    logistics_priority_score DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    geom GEOMETRY(POINT, 4326)
);

-- Logistics routes table
CREATE TABLE IF NOT EXISTS logistics_routes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    route_type VARCHAR(20) NOT NULL CHECK (route_type IN ('DFC', 'Highway', 'Port')),
    geojson_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    geom GEOMETRY(LINESTRING, 4326)
);

-- Cluster demand aggregates table
CREATE TABLE IF NOT EXISTS cluster_demand_aggregates (
    id SERIAL PRIMARY KEY,
    cluster_id INTEGER NOT NULL REFERENCES industrial_clusters(id) ON DELETE CASCADE,
    aggregated_demand_kg DOUBLE PRECISION DEFAULT 0.0,
    pooling_potential_score DOUBLE PRECISION DEFAULT 0.0,
    cost_reduction_pct DOUBLE PRECISION DEFAULT 0.0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Spatial indexes
CREATE INDEX IF NOT EXISTS idx_industrial_clusters_geom
    ON industrial_clusters USING GIST (geom);

CREATE INDEX IF NOT EXISTS idx_logistics_routes_geom
    ON logistics_routes USING GIST (geom);

-- Regular indexes
CREATE INDEX IF NOT EXISTS idx_industrial_clusters_state
    ON industrial_clusters (state);

CREATE INDEX IF NOT EXISTS idx_industrial_clusters_industry_type
    ON industrial_clusters (industry_type);

CREATE INDEX IF NOT EXISTS idx_industrial_clusters_logistics_score
    ON industrial_clusters (logistics_priority_score);

CREATE INDEX IF NOT EXISTS idx_cluster_demand_cluster_id
    ON cluster_demand_aggregates (cluster_id);

-- Trigger function: auto-update geom from lat/lon
CREATE OR REPLACE FUNCTION update_cluster_geom()
RETURNS TRIGGER AS $$
BEGIN
    NEW.geom = ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_update_cluster_geom
    BEFORE INSERT OR UPDATE OF latitude, longitude
    ON industrial_clusters
    FOR EACH ROW
    EXECUTE FUNCTION update_cluster_geom();

-- Trigger function: auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_update_demand_aggregate_timestamp
    BEFORE UPDATE ON cluster_demand_aggregates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
