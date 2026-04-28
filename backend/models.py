import enum
from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Float, Boolean, DateTime,
    ForeignKey, Enum as SAEnum, Text
)
from sqlalchemy.orm import relationship
from database import Base


class RouteType(str, enum.Enum):
    DFC = "DFC"
    Highway = "Highway"
    Port = "Port"


class IndustrialCluster(Base):
    __tablename__ = "industrial_clusters"

    id = Column(Integer, primary_key=True, index=True)
    cluster_name = Column(String(255), nullable=False, index=True)
    state = Column(String(100), nullable=False, index=True)
    city = Column(String(100), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    industry_type = Column(String(150), nullable=False, index=True)
    sector_type = Column(String(100), nullable=False)
    nic_code = Column(String(10), nullable=False)
    avg_monthly_raw_material_demand_kg = Column(Float, nullable=False, default=0)
    verified_status = Column(Boolean, default=False, nullable=False)
    logistics_priority_score = Column(Float, default=0.0, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    demand_aggregates = relationship("ClusterDemandAggregate", back_populates="cluster")


class LogisticsRoute(Base):
    __tablename__ = "logistics_routes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    route_type = Column(SAEnum(RouteType), nullable=False)
    geojson_path = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class ClusterDemandAggregate(Base):
    __tablename__ = "cluster_demand_aggregates"

    id = Column(Integer, primary_key=True, index=True)
    cluster_id = Column(Integer, ForeignKey("industrial_clusters.id"), nullable=False, index=True)
    aggregated_demand_kg = Column(Float, default=0.0)
    pooling_potential_score = Column(Float, default=0.0)
    cost_reduction_pct = Column(Float, default=0.0)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    cluster = relationship("IndustrialCluster", back_populates="demand_aggregates")
