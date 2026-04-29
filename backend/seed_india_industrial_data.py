"""
Seed script for India industrial hub data.
Run: python seed_india_industrial_data.py
"""
import os
import sys
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# Allow running standalone or from within backend/
sys.path.insert(0, os.path.dirname(__file__))

from database import SessionLocal, engine
from models import Base, IndustrialCluster, ClusterDemandAggregate

CLUSTERS = [
    # PUNJAB
    {"cluster_name": "Jalandhar Sports Goods Complex", "state": "Punjab", "city": "Jalandhar", "latitude": 31.3260, "longitude": 75.5762, "industry_type": "Sports Goods", "sector_type": "Manufacturing", "nic_code": "3230", "avg_monthly_raw_material_demand_kg": 850000, "verified_status": True, "logistics_priority_score": 7.2},
    {"cluster_name": "Jalandhar Focal Point Hand Tools", "state": "Punjab", "city": "Jalandhar", "latitude": 31.3540, "longitude": 75.5950, "industry_type": "Hand Tools", "sector_type": "Manufacturing", "nic_code": "2593", "avg_monthly_raw_material_demand_kg": 620000, "verified_status": True, "logistics_priority_score": 6.8},
    {"cluster_name": "Ludhiana Textile Cluster", "state": "Punjab", "city": "Ludhiana", "latitude": 30.9010, "longitude": 75.8573, "industry_type": "Textile", "sector_type": "Manufacturing", "nic_code": "1310", "avg_monthly_raw_material_demand_kg": 2100000, "verified_status": True, "logistics_priority_score": 8.5},
    {"cluster_name": "Mohali Electronics", "state": "Punjab", "city": "Mohali", "latitude": 30.7046, "longitude": 76.7179, "industry_type": "Electronics", "sector_type": "Technology", "nic_code": "2610", "avg_monthly_raw_material_demand_kg": 340000, "verified_status": True, "logistics_priority_score": 7.8},
    # DELHI NCR
    {"cluster_name": "Noida Electronics Manufacturing", "state": "Uttar Pradesh", "city": "Noida", "latitude": 28.5355, "longitude": 77.3910, "industry_type": "Electronics", "sector_type": "Manufacturing", "nic_code": "2610", "avg_monthly_raw_material_demand_kg": 1800000, "verified_status": True, "logistics_priority_score": 9.1},
    {"cluster_name": "Greater Noida Auto Components", "state": "Uttar Pradesh", "city": "Greater Noida", "latitude": 28.4744, "longitude": 77.5040, "industry_type": "Auto Components", "sector_type": "Manufacturing", "nic_code": "2930", "avg_monthly_raw_material_demand_kg": 2400000, "verified_status": True, "logistics_priority_score": 8.9},
    {"cluster_name": "Gurugram Auto IT Hardware", "state": "Haryana", "city": "Gurugram", "latitude": 28.4595, "longitude": 77.0266, "industry_type": "Auto & IT Hardware", "sector_type": "Manufacturing", "nic_code": "2610", "avg_monthly_raw_material_demand_kg": 1600000, "verified_status": True, "logistics_priority_score": 8.7},
    {"cluster_name": "Faridabad Industrial Area", "state": "Haryana", "city": "Faridabad", "latitude": 28.4089, "longitude": 77.3178, "industry_type": "Engineering", "sector_type": "Manufacturing", "nic_code": "2591", "avg_monthly_raw_material_demand_kg": 1200000, "verified_status": True, "logistics_priority_score": 8.2},
    # GUJARAT
    {"cluster_name": "Ahmedabad Textile Cluster", "state": "Gujarat", "city": "Ahmedabad", "latitude": 23.0225, "longitude": 72.5714, "industry_type": "Textile", "sector_type": "Manufacturing", "nic_code": "1310", "avg_monthly_raw_material_demand_kg": 3200000, "verified_status": True, "logistics_priority_score": 9.0},
    {"cluster_name": "Surat Diamond and Textile", "state": "Gujarat", "city": "Surat", "latitude": 21.1702, "longitude": 72.8311, "industry_type": "Diamond & Textile", "sector_type": "Manufacturing", "nic_code": "3212", "avg_monthly_raw_material_demand_kg": 2800000, "verified_status": True, "logistics_priority_score": 9.2},
    {"cluster_name": "Rajkot Engineering Cluster", "state": "Gujarat", "city": "Rajkot", "latitude": 22.3039, "longitude": 70.8022, "industry_type": "Engineering", "sector_type": "Manufacturing", "nic_code": "2591", "avg_monthly_raw_material_demand_kg": 980000, "verified_status": True, "logistics_priority_score": 7.6},
    {"cluster_name": "Sanand Auto Hub", "state": "Gujarat", "city": "Sanand", "latitude": 22.9924, "longitude": 72.3832, "industry_type": "Automobile", "sector_type": "Manufacturing", "nic_code": "2910", "avg_monthly_raw_material_demand_kg": 3500000, "verified_status": True, "logistics_priority_score": 9.5},
    {"cluster_name": "Vadodara Chemicals", "state": "Gujarat", "city": "Vadodara", "latitude": 22.3072, "longitude": 73.1812, "industry_type": "Chemicals", "sector_type": "Manufacturing", "nic_code": "2011", "avg_monthly_raw_material_demand_kg": 1900000, "verified_status": True, "logistics_priority_score": 8.4},
    # MAHARASHTRA
    {"cluster_name": "Pune Auto Manufacturing", "state": "Maharashtra", "city": "Pune", "latitude": 18.5204, "longitude": 73.8567, "industry_type": "Automobile", "sector_type": "Manufacturing", "nic_code": "2910", "avg_monthly_raw_material_demand_kg": 4200000, "verified_status": True, "logistics_priority_score": 9.6},
    {"cluster_name": "Mumbai Industrial Logistics", "state": "Maharashtra", "city": "Mumbai", "latitude": 19.0760, "longitude": 72.8777, "industry_type": "Logistics & Trade", "sector_type": "Logistics", "nic_code": "5210", "avg_monthly_raw_material_demand_kg": 5000000, "verified_status": True, "logistics_priority_score": 9.8},
    {"cluster_name": "Nashik Engineering Cluster", "state": "Maharashtra", "city": "Nashik", "latitude": 19.9975, "longitude": 73.7898, "industry_type": "Engineering", "sector_type": "Manufacturing", "nic_code": "2591", "avg_monthly_raw_material_demand_kg": 1100000, "verified_status": True, "logistics_priority_score": 7.9},
    {"cluster_name": "Aurangabad Pharma Cluster", "state": "Maharashtra", "city": "Aurangabad", "latitude": 19.8762, "longitude": 75.3433, "industry_type": "Pharmaceuticals", "sector_type": "Manufacturing", "nic_code": "2100", "avg_monthly_raw_material_demand_kg": 870000, "verified_status": True, "logistics_priority_score": 8.1},
    {"cluster_name": "Nagpur Logistics Hub", "state": "Maharashtra", "city": "Nagpur", "latitude": 21.1458, "longitude": 79.0882, "industry_type": "Logistics", "sector_type": "Logistics", "nic_code": "5210", "avg_monthly_raw_material_demand_kg": 760000, "verified_status": True, "logistics_priority_score": 8.3},
    # KARNATAKA
    {"cluster_name": "Bengaluru Electronics Aerospace", "state": "Karnataka", "city": "Bengaluru", "latitude": 12.9716, "longitude": 77.5946, "industry_type": "Electronics & Aerospace", "sector_type": "Technology", "nic_code": "2610", "avg_monthly_raw_material_demand_kg": 2900000, "verified_status": True, "logistics_priority_score": 9.4},
    {"cluster_name": "Mysuru Manufacturing", "state": "Karnataka", "city": "Mysuru", "latitude": 12.2958, "longitude": 76.6394, "industry_type": "Engineering", "sector_type": "Manufacturing", "nic_code": "2591", "avg_monthly_raw_material_demand_kg": 640000, "verified_status": True, "logistics_priority_score": 7.0},
    {"cluster_name": "Hubli Engineering Cluster", "state": "Karnataka", "city": "Hubli", "latitude": 15.3647, "longitude": 75.1240, "industry_type": "Engineering", "sector_type": "Manufacturing", "nic_code": "2591", "avg_monthly_raw_material_demand_kg": 520000, "verified_status": True, "logistics_priority_score": 6.5},
    # TAMIL NADU
    {"cluster_name": "Chennai Automobile Corridor", "state": "Tamil Nadu", "city": "Chennai", "latitude": 13.0827, "longitude": 80.2707, "industry_type": "Automobile", "sector_type": "Manufacturing", "nic_code": "2910", "avg_monthly_raw_material_demand_kg": 4500000, "verified_status": True, "logistics_priority_score": 9.7},
    {"cluster_name": "Coimbatore Pumps Engineering", "state": "Tamil Nadu", "city": "Coimbatore", "latitude": 11.0168, "longitude": 76.9558, "industry_type": "Pumps & Engineering", "sector_type": "Manufacturing", "nic_code": "2813", "avg_monthly_raw_material_demand_kg": 1300000, "verified_status": True, "logistics_priority_score": 8.6},
    {"cluster_name": "Tiruppur Textile Cluster", "state": "Tamil Nadu", "city": "Tiruppur", "latitude": 11.1085, "longitude": 77.3411, "industry_type": "Textile", "sector_type": "Manufacturing", "nic_code": "1410", "avg_monthly_raw_material_demand_kg": 1800000, "verified_status": True, "logistics_priority_score": 8.8},
    {"cluster_name": "Hosur Manufacturing Cluster", "state": "Tamil Nadu", "city": "Hosur", "latitude": 12.7409, "longitude": 77.8253, "industry_type": "Engineering", "sector_type": "Manufacturing", "nic_code": "2910", "avg_monthly_raw_material_demand_kg": 1100000, "verified_status": True, "logistics_priority_score": 8.0},
    # TELANGANA
    {"cluster_name": "Hyderabad Pharma City", "state": "Telangana", "city": "Hyderabad", "latitude": 17.3850, "longitude": 78.4867, "industry_type": "Pharmaceuticals", "sector_type": "Manufacturing", "nic_code": "2100", "avg_monthly_raw_material_demand_kg": 2200000, "verified_status": True, "logistics_priority_score": 9.3},
    {"cluster_name": "Hyderabad Electronics City", "state": "Telangana", "city": "Hyderabad", "latitude": 17.4065, "longitude": 78.4772, "industry_type": "Electronics", "sector_type": "Technology", "nic_code": "2610", "avg_monthly_raw_material_demand_kg": 1400000, "verified_status": True, "logistics_priority_score": 8.9},
    # ANDHRA PRADESH
    {"cluster_name": "Visakhapatnam Steel Port Industry", "state": "Andhra Pradesh", "city": "Visakhapatnam", "latitude": 17.6868, "longitude": 83.2185, "industry_type": "Steel & Port", "sector_type": "Heavy Industry", "nic_code": "2410", "avg_monthly_raw_material_demand_kg": 6000000, "verified_status": True, "logistics_priority_score": 9.5},
    {"cluster_name": "Sri City Manufacturing Hub", "state": "Andhra Pradesh", "city": "Sri City", "latitude": 13.2543, "longitude": 80.0100, "industry_type": "Multi-sector", "sector_type": "Manufacturing", "nic_code": "2910", "avg_monthly_raw_material_demand_kg": 1500000, "verified_status": True, "logistics_priority_score": 8.7},
    # UTTAR PRADESH
    {"cluster_name": "Kanpur Leather Cluster", "state": "Uttar Pradesh", "city": "Kanpur", "latitude": 26.4499, "longitude": 80.3319, "industry_type": "Leather", "sector_type": "Manufacturing", "nic_code": "1511", "avg_monthly_raw_material_demand_kg": 780000, "verified_status": True, "logistics_priority_score": 7.4},
    {"cluster_name": "Moradabad Brass Cluster", "state": "Uttar Pradesh", "city": "Moradabad", "latitude": 28.8386, "longitude": 78.7733, "industry_type": "Brass & Metal", "sector_type": "Manufacturing", "nic_code": "2592", "avg_monthly_raw_material_demand_kg": 490000, "verified_status": True, "logistics_priority_score": 7.1},
    {"cluster_name": "Agra Footwear Cluster", "state": "Uttar Pradesh", "city": "Agra", "latitude": 27.1767, "longitude": 78.0081, "industry_type": "Footwear", "sector_type": "Manufacturing", "nic_code": "1520", "avg_monthly_raw_material_demand_kg": 560000, "verified_status": True, "logistics_priority_score": 6.9},
    # WEST BENGAL
    {"cluster_name": "Kolkata Engineering Cluster", "state": "West Bengal", "city": "Kolkata", "latitude": 22.5726, "longitude": 88.3639, "industry_type": "Engineering", "sector_type": "Manufacturing", "nic_code": "2591", "avg_monthly_raw_material_demand_kg": 1100000, "verified_status": True, "logistics_priority_score": 7.8},
    {"cluster_name": "Durgapur Steel Cluster", "state": "West Bengal", "city": "Durgapur", "latitude": 23.5204, "longitude": 87.3119, "industry_type": "Steel", "sector_type": "Heavy Industry", "nic_code": "2410", "avg_monthly_raw_material_demand_kg": 3800000, "verified_status": True, "logistics_priority_score": 8.6},
    # RAJASTHAN
    {"cluster_name": "Jaipur Gems Jewellery", "state": "Rajasthan", "city": "Jaipur", "latitude": 26.9124, "longitude": 75.7873, "industry_type": "Gems & Jewellery", "sector_type": "Manufacturing", "nic_code": "3212", "avg_monthly_raw_material_demand_kg": 120000, "verified_status": True, "logistics_priority_score": 7.5},
    {"cluster_name": "Bhiwadi Manufacturing Cluster", "state": "Rajasthan", "city": "Bhiwadi", "latitude": 28.2010, "longitude": 76.8600, "industry_type": "Multi-sector", "sector_type": "Manufacturing", "nic_code": "2591", "avg_monthly_raw_material_demand_kg": 870000, "verified_status": True, "logistics_priority_score": 7.9},
    # MADHYA PRADESH
    {"cluster_name": "Indore Pithampur Auto Cluster", "state": "Madhya Pradesh", "city": "Indore", "latitude": 22.7196, "longitude": 75.8577, "industry_type": "Automobile", "sector_type": "Manufacturing", "nic_code": "2910", "avg_monthly_raw_material_demand_kg": 1600000, "verified_status": True, "logistics_priority_score": 8.3},
    # ODISHA
    {"cluster_name": "Bhubaneswar Metal Industrial", "state": "Odisha", "city": "Bhubaneswar", "latitude": 20.2961, "longitude": 85.8245, "industry_type": "Metal & Engineering", "sector_type": "Manufacturing", "nic_code": "2410", "avg_monthly_raw_material_demand_kg": 920000, "verified_status": True, "logistics_priority_score": 7.6},
    {"cluster_name": "Angul Steel Cluster", "state": "Odisha", "city": "Angul", "latitude": 20.8400, "longitude": 85.1010, "industry_type": "Steel", "sector_type": "Heavy Industry", "nic_code": "2410", "avg_monthly_raw_material_demand_kg": 4200000, "verified_status": True, "logistics_priority_score": 8.8},
    # CHHATTISGARH
    {"cluster_name": "Raipur Steel Cluster", "state": "Chhattisgarh", "city": "Raipur", "latitude": 21.2514, "longitude": 81.6296, "industry_type": "Steel", "sector_type": "Heavy Industry", "nic_code": "2410", "avg_monthly_raw_material_demand_kg": 3600000, "verified_status": True, "logistics_priority_score": 8.5},
    # KERALA
    {"cluster_name": "Kochi Shipbuilding Spice", "state": "Kerala", "city": "Kochi", "latitude": 9.9312, "longitude": 76.2673, "industry_type": "Shipbuilding & Spice", "sector_type": "Manufacturing", "nic_code": "3011", "avg_monthly_raw_material_demand_kg": 680000, "verified_status": True, "logistics_priority_score": 7.7},
    # ASSAM
    {"cluster_name": "Guwahati Tea Logistics", "state": "Assam", "city": "Guwahati", "latitude": 26.1445, "longitude": 91.7362, "industry_type": "Tea & Logistics", "sector_type": "Agro-industry", "nic_code": "1079", "avg_monthly_raw_material_demand_kg": 420000, "verified_status": True, "logistics_priority_score": 7.0},
]


def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        existing = db.query(IndustrialCluster).count()
        if existing >= len(CLUSTERS):
            print(f"Database already has {existing} clusters. Skipping seed.")
            return

        print(f"Seeding {len(CLUSTERS)} industrial clusters...")
        for data in CLUSTERS:
            cluster = IndustrialCluster(**data, created_at=datetime.utcnow())
            db.add(cluster)

        db.flush()

        all_clusters = db.query(IndustrialCluster).all()
        for cluster in all_clusters:
            agg = ClusterDemandAggregate(
                cluster_id=cluster.id,
                aggregated_demand_kg=cluster.avg_monthly_raw_material_demand_kg,
                pooling_potential_score=min(cluster.logistics_priority_score / 10.0, 1.0),
                cost_reduction_pct=round(cluster.logistics_priority_score * 2.5, 1),
            )
            db.add(agg)

        db.commit()
        print(f"Successfully seeded {len(CLUSTERS)} clusters with demand aggregates.")
    except Exception as exc:
        db.rollback()
        print(f"Seed failed: {exc}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed()
