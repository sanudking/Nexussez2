from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from database import get_db
from models import IndustrialCluster
from spatial_queries import find_clusters_within_radius

router = APIRouter()

MAJOR_PORTS = [
    {"name": "Mumbai Port", "latitude": 18.9543, "longitude": 72.8398, "state": "Maharashtra"},
    {"name": "JNPT Nhava Sheva", "latitude": 18.9490, "longitude": 72.9440, "state": "Maharashtra"},
    {"name": "Chennai Port", "latitude": 13.0900, "longitude": 80.2900, "state": "Tamil Nadu"},
    {"name": "Visakhapatnam Port", "latitude": 17.6890, "longitude": 83.2900, "state": "Andhra Pradesh"},
    {"name": "Kolkata Port", "latitude": 22.5480, "longitude": 88.3240, "state": "West Bengal"},
    {"name": "Kandla Port", "latitude": 23.0050, "longitude": 70.2168, "state": "Gujarat"},
    {"name": "Mundra Port", "latitude": 22.8380, "longitude": 69.7065, "state": "Gujarat"},
    {"name": "Kochi Port", "latitude": 9.9630, "longitude": 76.2680, "state": "Kerala"},
    {"name": "Mangaluru Port", "latitude": 12.9200, "longitude": 74.8460, "state": "Karnataka"},
    {"name": "Paradip Port", "latitude": 20.3160, "longitude": 86.6110, "state": "Odisha"},
]

FREIGHT_ROUTES = [
    {
        "id": 1,
        "name": "Western Dedicated Freight Corridor",
        "route_type": "DFC",
        "from": "Dadri (UP)",
        "to": "Jawaharlal Nehru Port (Mumbai)",
        "length_km": 1504,
        "status": "Operational",
        "capacity_mtpa": 250,
    },
    {
        "id": 2,
        "name": "Eastern Dedicated Freight Corridor",
        "route_type": "DFC",
        "from": "Ludhiana (Punjab)",
        "to": "Dankuni (West Bengal)",
        "length_km": 1856,
        "status": "Operational",
        "capacity_mtpa": 200,
    },
    {
        "id": 3,
        "name": "NH-48 Delhi-Mumbai Expressway",
        "route_type": "Highway",
        "from": "Delhi",
        "to": "Mumbai",
        "length_km": 1350,
        "status": "Operational",
        "capacity_mtpa": None,
    },
    {
        "id": 4,
        "name": "NH-44 North-South Corridor",
        "route_type": "Highway",
        "from": "Srinagar",
        "to": "Kanyakumari",
        "length_km": 3745,
        "status": "Operational",
        "capacity_mtpa": None,
    },
    {
        "id": 5,
        "name": "Sagarmala Port Connectivity",
        "route_type": "Port",
        "from": "Mundra Port",
        "to": "Chennai Port",
        "length_km": 1800,
        "status": "Active",
        "capacity_mtpa": 150,
    },
]


@router.get("/logistics/routes")
def get_freight_routes():
    return FREIGHT_ROUTES


@router.get("/logistics/milk-run/{cluster_id}")
def get_milk_run_suggestions(
    cluster_id: int, radius_km: float = 150.0, db: Session = Depends(get_db)
):
    cluster = db.query(IndustrialCluster).filter(IndustrialCluster.id == cluster_id).first()
    if not cluster:
        raise HTTPException(status_code=404, detail="Cluster not found")

    try:
        nearby = find_clusters_within_radius(db, cluster.latitude, cluster.longitude, radius_km)
    except Exception:
        nearby = []

    # Filter out the source cluster and sort by distance
    nearby = [c for c in nearby if c["id"] != cluster_id]
    total_demand = sum(c["avg_monthly_raw_material_demand_kg"] for c in nearby[:5])
    total_demand += cluster.avg_monthly_raw_material_demand_kg

    return {
        "source_cluster": {
            "id": cluster.id,
            "cluster_name": cluster.cluster_name,
            "city": cluster.city,
            "state": cluster.state,
            "latitude": cluster.latitude,
            "longitude": cluster.longitude,
        },
        "milk_run_stops": nearby[:5],
        "total_combined_demand_kg": total_demand,
        "estimated_cost_reduction_pct": min(25.0, len(nearby[:5]) * 4.5),
        "recommended_vehicle": "40T Trailer" if total_demand > 2000000 else "20T Truck",
        "radius_km": radius_km,
    }


@router.get("/logistics/port-proximity")
def get_port_proximity(radius_km: float = 200.0, db: Session = Depends(get_db)):
    result = []
    for port in MAJOR_PORTS:
        try:
            clusters_nearby = find_clusters_within_radius(
                db, port["latitude"], port["longitude"], radius_km
            )
        except Exception:
            clusters_nearby = (
                db.query(IndustrialCluster)
                .filter(IndustrialCluster.state == port["state"])
                .limit(10)
                .all()
            )
            clusters_nearby = [
                {
                    "id": c.id,
                    "cluster_name": c.cluster_name,
                    "city": c.city,
                    "state": c.state,
                    "latitude": c.latitude,
                    "longitude": c.longitude,
                    "industry_type": c.industry_type,
                    "logistics_priority_score": c.logistics_priority_score,
                    "avg_monthly_raw_material_demand_kg": c.avg_monthly_raw_material_demand_kg,
                    "distance_km": None,
                }
                for c in clusters_nearby
            ]

        total_demand = sum(c.get("avg_monthly_raw_material_demand_kg", 0) for c in clusters_nearby)
        result.append(
            {
                "port": port,
                "cluster_count": len(clusters_nearby),
                "total_demand_kg": total_demand,
                "top_clusters": clusters_nearby[:5],
            }
        )

    return sorted(result, key=lambda x: x["cluster_count"], reverse=True)
