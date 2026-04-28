"""
Spatial query helpers using raw PostGIS SQL.
"""
from typing import Any
from sqlalchemy.orm import Session
from sqlalchemy import text


def find_clusters_within_radius(
    db: Session, lat: float, lon: float, radius_km: float
) -> list[dict[str, Any]]:
    """Find all industrial clusters within radius_km of the given point."""
    sql = text("""
        SELECT
            id, cluster_name, state, city, latitude, longitude,
            industry_type, sector_type, nic_code,
            avg_monthly_raw_material_demand_kg,
            verified_status, logistics_priority_score, created_at,
            ST_Distance(
                geom::geography,
                ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)::geography
            ) / 1000.0 AS distance_km
        FROM industrial_clusters
        WHERE ST_DWithin(
            geom::geography,
            ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)::geography,
            :radius_m
        )
        ORDER BY distance_km ASC
    """)
    result = db.execute(sql, {"lat": lat, "lon": lon, "radius_m": radius_km * 1000})
    rows = result.mappings().all()
    return [dict(row) for row in rows]


def get_cluster_heatmap_data(db: Session) -> list[dict[str, Any]]:
    """Aggregate demand by state for heatmap visualization."""
    sql = text("""
        SELECT
            state,
            COUNT(*) AS cluster_count,
            SUM(avg_monthly_raw_material_demand_kg) AS total_demand_kg,
            AVG(logistics_priority_score) AS avg_logistics_score,
            AVG(ST_X(geom)) AS centroid_lon,
            AVG(ST_Y(geom)) AS centroid_lat
        FROM industrial_clusters
        WHERE geom IS NOT NULL
        GROUP BY state
        ORDER BY total_demand_kg DESC
    """)
    result = db.execute(sql)
    rows = result.mappings().all()
    return [dict(row) for row in rows]


def find_pooling_opportunities(
    db: Session, cluster_id: int, radius_km: float = 100.0
) -> list[dict[str, Any]]:
    """Find nearby clusters that can be pooled with the given cluster."""
    sql = text("""
        WITH source AS (
            SELECT geom, avg_monthly_raw_material_demand_kg, industry_type
            FROM industrial_clusters
            WHERE id = :cluster_id
        )
        SELECT
            ic.id, ic.cluster_name, ic.state, ic.city,
            ic.latitude, ic.longitude, ic.industry_type, ic.sector_type,
            ic.avg_monthly_raw_material_demand_kg, ic.logistics_priority_score,
            ic.verified_status, ic.nic_code, ic.created_at,
            ST_Distance(ic.geom::geography, s.geom::geography) / 1000.0 AS distance_km,
            ic.avg_monthly_raw_material_demand_kg + s.avg_monthly_raw_material_demand_kg
                AS combined_demand_kg,
            LEAST(
                30.0,
                (ic.logistics_priority_score * 2.5) +
                (CASE WHEN ic.industry_type = s.industry_type THEN 5.0 ELSE 0.0 END)
            ) AS cost_reduction_pct
        FROM industrial_clusters ic, source s
        WHERE ic.id != :cluster_id
          AND ST_DWithin(ic.geom::geography, s.geom::geography, :radius_m)
        ORDER BY distance_km ASC
        LIMIT 20
    """)
    result = db.execute(sql, {"cluster_id": cluster_id, "radius_m": radius_km * 1000})
    rows = result.mappings().all()
    return [dict(row) for row in rows]


def get_corridor_clusters(db: Session, corridor_name: str) -> list[dict[str, Any]]:
    """Get clusters near major industrial corridors (approximate bounding boxes)."""
    corridors: dict[str, dict[str, Any]] = {
        "delhi-mumbai": {
            "states": ["Delhi", "Haryana", "Rajasthan", "Gujarat", "Maharashtra"],
            "description": "Delhi-Mumbai Industrial Corridor",
        },
        "chennai-bengaluru": {
            "states": ["Tamil Nadu", "Karnataka", "Andhra Pradesh"],
            "description": "Chennai-Bengaluru Industrial Corridor",
        },
        "amritsar-kolkata": {
            "states": ["Punjab", "Haryana", "Uttar Pradesh", "Bihar", "West Bengal"],
            "description": "Amritsar-Kolkata Freight Corridor",
        },
        "eastern-dfc": {
            "states": ["West Bengal", "Jharkhand", "Odisha", "Chhattisgarh"],
            "description": "Eastern Dedicated Freight Corridor",
        },
        "western-dfc": {
            "states": ["Gujarat", "Rajasthan", "Haryana", "Punjab"],
            "description": "Western Dedicated Freight Corridor",
        },
    }

    key = corridor_name.lower().replace(" ", "-")
    corridor = corridors.get(key)
    if not corridor:
        return []

    states = corridor["states"]
    placeholders = ", ".join(f":state_{i}" for i in range(len(states)))
    params: dict[str, Any] = {f"state_{i}": s for i, s in enumerate(states)}

    sql = text(f"""
        SELECT id, cluster_name, state, city, latitude, longitude,
               industry_type, sector_type, nic_code,
               avg_monthly_raw_material_demand_kg,
               verified_status, logistics_priority_score, created_at
        FROM industrial_clusters
        WHERE state IN ({placeholders})
        ORDER BY logistics_priority_score DESC
    """)
    result = db.execute(sql, params)
    rows = result.mappings().all()
    return [dict(row) for row in rows]


def calculate_logistics_score(db: Session, cluster_id: int) -> dict[str, Any]:
    """Calculate a composite logistics score based on proximity to infrastructure."""
    sql = text("""
        WITH cluster AS (
            SELECT id, cluster_name, state, geom, logistics_priority_score,
                   avg_monthly_raw_material_demand_kg
            FROM industrial_clusters
            WHERE id = :cluster_id
        ),
        nearby_count AS (
            SELECT COUNT(*) AS neighbors
            FROM industrial_clusters ic, cluster c
            WHERE ic.id != c.id
              AND ST_DWithin(ic.geom::geography, c.geom::geography, 150000)
        )
        SELECT
            c.id, c.cluster_name, c.state,
            c.logistics_priority_score AS base_score,
            nc.neighbors AS nearby_cluster_count,
            LEAST(10.0,
                c.logistics_priority_score * 0.6 +
                LEAST(nc.neighbors, 10) * 0.4
            ) AS composite_score
        FROM cluster c, nearby_count nc
    """)
    result = db.execute(sql, {"cluster_id": cluster_id})
    row = result.mappings().first()
    return dict(row) if row else {}
