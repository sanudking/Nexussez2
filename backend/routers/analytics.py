from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from database import get_db
from models import IndustrialCluster
from spatial_queries import get_cluster_heatmap_data, find_pooling_opportunities, get_corridor_clusters

router = APIRouter()

CORRIDORS = [
    {
        "id": "delhi-mumbai",
        "name": "Delhi-Mumbai Industrial Corridor",
        "length_km": 1483,
        "status": "Operational",
        "states": ["Delhi", "Haryana", "Rajasthan", "Gujarat", "Maharashtra"],
    },
    {
        "id": "chennai-bengaluru",
        "name": "Chennai-Bengaluru Industrial Corridor",
        "length_km": 560,
        "status": "Operational",
        "states": ["Tamil Nadu", "Karnataka", "Andhra Pradesh"],
    },
    {
        "id": "amritsar-kolkata",
        "name": "Amritsar-Kolkata Freight Corridor",
        "length_km": 1839,
        "status": "Operational",
        "states": ["Punjab", "Haryana", "Uttar Pradesh", "Bihar", "West Bengal"],
    },
    {
        "id": "eastern-dfc",
        "name": "Eastern Dedicated Freight Corridor",
        "length_km": 1856,
        "status": "Operational",
        "states": ["West Bengal", "Jharkhand", "Odisha", "Chhattisgarh"],
    },
    {
        "id": "western-dfc",
        "name": "Western Dedicated Freight Corridor",
        "length_km": 1504,
        "status": "Operational",
        "states": ["Gujarat", "Rajasthan", "Haryana", "Punjab"],
    },
]


@router.get("/analytics/heatmap")
def get_heatmap(db: Session = Depends(get_db)):
    try:
        return get_cluster_heatmap_data(db)
    except Exception:
        # Fallback: plain SQL aggregation without PostGIS
        rows = (
            db.query(
                IndustrialCluster.state,
                func.count(IndustrialCluster.id).label("cluster_count"),
                func.sum(IndustrialCluster.avg_monthly_raw_material_demand_kg).label("total_demand_kg"),
                func.avg(IndustrialCluster.logistics_priority_score).label("avg_logistics_score"),
                func.avg(IndustrialCluster.longitude).label("centroid_lon"),
                func.avg(IndustrialCluster.latitude).label("centroid_lat"),
            )
            .group_by(IndustrialCluster.state)
            .order_by(func.sum(IndustrialCluster.avg_monthly_raw_material_demand_kg).desc())
            .all()
        )
        return [
            {
                "state": r.state,
                "cluster_count": r.cluster_count,
                "total_demand_kg": r.total_demand_kg,
                "avg_logistics_score": round(r.avg_logistics_score or 0, 2),
                "centroid_lon": r.centroid_lon,
                "centroid_lat": r.centroid_lat,
            }
            for r in rows
        ]


@router.get("/analytics/pooling/{cluster_id}")
def get_cluster_pooling_opportunities(
    cluster_id: int, radius_km: float = 100.0, db: Session = Depends(get_db)
):
    cluster = db.query(IndustrialCluster).filter(IndustrialCluster.id == cluster_id).first()
    if not cluster:
        raise HTTPException(status_code=404, detail="Cluster not found")
    try:
        results = find_pooling_opportunities(db, cluster_id, radius_km)
    except Exception:
        results = []
    return {"source_cluster": cluster.cluster_name, "opportunities": results}


@router.get("/analytics/corridors")
def get_corridors(db: Session = Depends(get_db)):
    enriched = []
    for corridor in CORRIDORS:
        try:
            clusters = get_corridor_clusters(db, corridor["id"])
        except Exception:
            clusters = []
        enriched.append({**corridor, "cluster_count": len(clusters), "clusters": clusters})
    return enriched


@router.get("/analytics/summary")
def get_national_summary(db: Session = Depends(get_db)):
    total_clusters = db.query(func.count(IndustrialCluster.id)).scalar() or 0
    total_states = db.query(func.count(func.distinct(IndustrialCluster.state))).scalar() or 0
    total_demand = db.query(func.sum(IndustrialCluster.avg_monthly_raw_material_demand_kg)).scalar() or 0.0
    avg_score = db.query(func.avg(IndustrialCluster.logistics_priority_score)).scalar() or 0.0

    top_states_rows = (
        db.query(
            IndustrialCluster.state,
            func.count(IndustrialCluster.id).label("cluster_count"),
            func.sum(IndustrialCluster.avg_monthly_raw_material_demand_kg).label("total_demand"),
        )
        .group_by(IndustrialCluster.state)
        .order_by(func.sum(IndustrialCluster.avg_monthly_raw_material_demand_kg).desc())
        .limit(5)
        .all()
    )

    return {
        "total_clusters": total_clusters,
        "total_states": total_states,
        "total_demand_kg": total_demand,
        "avg_logistics_score": round(avg_score, 2),
        "top_states": [
            {"state": r.state, "cluster_count": r.cluster_count, "total_demand": r.total_demand}
            for r in top_states_rows
        ],
    }
