from typing import Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import and_

from database import get_db
from models import IndustrialCluster
from spatial_queries import find_clusters_within_radius

router = APIRouter()


class ClusterOut(BaseModel):
    id: int
    cluster_name: str
    state: str
    city: str
    latitude: float
    longitude: float
    industry_type: str
    sector_type: str
    nic_code: str
    avg_monthly_raw_material_demand_kg: float
    verified_status: bool
    logistics_priority_score: float
    created_at: datetime

    model_config = {"from_attributes": True}


class ClusterCreate(BaseModel):
    cluster_name: str
    state: str
    city: str
    latitude: float
    longitude: float
    industry_type: str
    sector_type: str
    nic_code: str
    avg_monthly_raw_material_demand_kg: float
    verified_status: bool = False
    logistics_priority_score: float = 0.0


@router.get("/clusters", response_model=list[ClusterOut])
def list_clusters(
    state: Optional[str] = Query(None),
    industry_type: Optional[str] = Query(None),
    min_score: Optional[float] = Query(None, ge=0, le=10),
    search: Optional[str] = Query(None),
    limit: int = Query(200, ge=1, le=500),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
):
    query = db.query(IndustrialCluster)
    filters = []
    if state:
        filters.append(IndustrialCluster.state.ilike(f"%{state}%"))
    if industry_type:
        filters.append(IndustrialCluster.industry_type.ilike(f"%{industry_type}%"))
    if min_score is not None:
        filters.append(IndustrialCluster.logistics_priority_score >= min_score)
    if search:
        filters.append(
            IndustrialCluster.cluster_name.ilike(f"%{search}%")
            | IndustrialCluster.city.ilike(f"%{search}%")
        )
    if filters:
        query = query.filter(and_(*filters))
    return query.order_by(IndustrialCluster.logistics_priority_score.desc()).offset(offset).limit(limit).all()


@router.get("/clusters/nearby", response_model=list[dict])
def get_nearby_clusters(
    lat: float = Query(..., ge=-90, le=90),
    lon: float = Query(..., ge=-180, le=180),
    radius_km: float = Query(100.0, ge=1, le=1000),
    db: Session = Depends(get_db),
):
    return find_clusters_within_radius(db, lat, lon, radius_km)


@router.get("/clusters/state/{state}", response_model=list[ClusterOut])
def get_clusters_by_state(state: str, db: Session = Depends(get_db)):
    clusters = (
        db.query(IndustrialCluster)
        .filter(IndustrialCluster.state.ilike(f"%{state}%"))
        .order_by(IndustrialCluster.logistics_priority_score.desc())
        .all()
    )
    if not clusters:
        raise HTTPException(status_code=404, detail=f"No clusters found for state: {state}")
    return clusters


@router.get("/clusters/{cluster_id}", response_model=ClusterOut)
def get_cluster(cluster_id: int, db: Session = Depends(get_db)):
    cluster = db.query(IndustrialCluster).filter(IndustrialCluster.id == cluster_id).first()
    if not cluster:
        raise HTTPException(status_code=404, detail="Cluster not found")
    return cluster


@router.post("/clusters", response_model=ClusterOut, status_code=201)
def create_cluster(payload: ClusterCreate, db: Session = Depends(get_db)):
    cluster = IndustrialCluster(**payload.model_dump(), created_at=datetime.utcnow())
    db.add(cluster)
    db.commit()
    db.refresh(cluster)
    return cluster
