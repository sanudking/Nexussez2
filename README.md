# Nexus-SEZ Pro India 🗺️
### National Industrial Geospatial Operating System

Real-time mapping, analytics, and logistics intelligence for India's 42+ Special Economic Zones and industrial clusters.

```
┌─────────────────────────────────────────────────────────────────┐
│                    NEXUS-SEZ PRO INDIA                          │
│            National Industrial Geospatial OS                    │
├────────────────┬────────────────────────┬───────────────────────┤
│  CommandPanel  │   MapboxContainer      │   ClusterSidebar      │
│  ─────────── │   (Mapbox GL JS)       │   ─────────────────  │
│  Filters      │   • Cluster circles    │   Scrollable list     │
│  Map modes    │   • Heatmap layer      │   + Detail panel      │
│  Stats        │   • Corridor lines     │   + IndustrialRadar   │
│  Search       │   • Popups/click       │                       │
└────────────────┴────────────────────────┴───────────────────────┘
           ▲                                       ▲
           │          FastAPI Backend              │
           │   ┌────────────────────────────┐      │
           └───┤  /api/clusters             ├──────┘
               │  /api/analytics/summary    │
               │  /api/analytics/heatmap    │
               │  /api/logistics/routes     │
               └────────────┬───────────────┘
                            │
                   PostGIS (PostgreSQL 15)
```

---

## 🚀 Tech Stack

| Layer     | Technology |
|-----------|------------|
| Frontend  | Next.js 14, React 18, TypeScript, Tailwind CSS, Mapbox GL JS, Framer Motion |
| Backend   | FastAPI, SQLAlchemy 2, Uvicorn, GeoPandas, Shapely |
| Database  | PostgreSQL 15 + PostGIS 3.4 |
| Container | Docker + Docker Compose |

---

## ⚡ Quick Start (Docker)

```bash
# 1. Clone and enter
git clone https://github.com/sanudking/Nexussez2.git
cd Nexussez2

# 2. Copy and configure environment
cp .env.example .env
# Edit .env — add your Mapbox token from https://mapbox.com

# 3. Launch all services
docker compose up --build

# 4. Seed the database (first run)
docker compose exec backend python seed_india_industrial_data.py

# 5. Open the app
#   Frontend: http://localhost:3000
#   API docs: http://localhost:8000/docs
```

---

## 🔧 Manual Setup

### Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp ../.env.example .env          # edit DATABASE_URL
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
cp .env.example .env.local       # add NEXT_PUBLIC_MAPBOX_TOKEN
npm install
npm run dev
```
Frontend will be live at **http://localhost:3000** and works with mock data even without the backend.

---

## ✨ Features

- **🗺️ Interactive Mapbox GL Map** — Dark-themed satellite base, zoom to India, cluster pins coloured by industry type
- **🔥 Heatmap Mode** — State-level demand density visualisation
- **🛣️ Corridors Mode** — Delhi-Mumbai, Chennai-Bengaluru, Amritsar-Kolkata, Eastern/Western DFC as glowing cyan polylines
- **42 Industrial Clusters** — Seeded across 16 states: Punjab, Gujarat, Maharashtra, Tamil Nadu, Karnataka, Telangana and more
- **PostGIS Spatial Queries** — `ST_DWithin` radius search, `ST_Distance`, corridor cluster lookups
- **Pooling Intelligence** — Find nearby clusters to consolidate raw-material shipments
- **Milk-Run Optimiser** — Suggests up to 5 stop sequences per cluster
- **Port Proximity** — Ranks clusters by proximity to all 10 major Indian ports
- **Offline/Standalone** — Full mock-data fallback; frontend works without the backend
- **Dark Industrial UI** — Custom Tailwind theme, Framer Motion animations, scrollbar overrides

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/api/clusters` | List clusters (filter: state, industry_type, min_score, search) |
| GET | `/api/clusters/{id}` | Single cluster |
| GET | `/api/clusters/nearby?lat=&lon=&radius_km=` | Radius search |
| GET | `/api/clusters/state/{state}` | Clusters by state |
| POST | `/api/clusters` | Create cluster |
| GET | `/api/analytics/summary` | National stats |
| GET | `/api/analytics/heatmap` | Demand by state |
| GET | `/api/analytics/pooling/{id}` | Pooling opportunities |
| GET | `/api/analytics/corridors` | Corridors with cluster counts |
| GET | `/api/logistics/routes` | Major freight routes |
| GET | `/api/logistics/milk-run/{id}` | Milk-run suggestions |
| GET | `/api/logistics/port-proximity` | Port-cluster proximity |

Full interactive docs: **http://localhost:8000/docs**

---

## 📸 Screenshots

> Add screenshots here after running the app.

- `docs/screenshot-map.png` — Full map view with cluster pins
- `docs/screenshot-heatmap.png` — Demand heatmap mode
- `docs/screenshot-detail.png` — Cluster detail panel + radar

---

## 🗂️ Project Structure

```
Nexussez2/
├── backend/
│   ├── main.py                      # FastAPI app entry point
│   ├── models.py                    # SQLAlchemy ORM models
│   ├── database.py                  # Engine + session setup
│   ├── schema.sql                   # PostGIS DDL + triggers
│   ├── spatial_queries.py           # Raw PostGIS SQL helpers
│   ├── seed_india_industrial_data.py # 42 cluster seed script
│   ├── requirements.txt
│   ├── Dockerfile
│   └── routers/
│       ├── clusters.py              # /api/clusters/*
│       ├── analytics.py             # /api/analytics/*
│       └── logistics.py             # /api/logistics/*
├── frontend/
│   ├── src/
│   │   ├── app/                     # Next.js App Router
│   │   ├── components/              # React components
│   │   ├── types/index.ts           # TypeScript interfaces
│   │   └── lib/
│   │       ├── api.ts               # Backend API client
│   │       └── mockData.ts          # Offline fallback data
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── .env.example
```

---

## 📄 License

MIT — built for India's industrial future.
