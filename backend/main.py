import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine
from models import Base
from routers import clusters, analytics, logistics

logging.basicConfig(level=logging.INFO, format="%(asctime)s  %(levelname)s  %(message)s")
logger = logging.getLogger("nexus-sez")


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 Nexus-SEZ Pro India backend starting up")
    Base.metadata.create_all(bind=engine)
    logger.info("✅ Database tables ensured")
    yield
    logger.info("🛑 Nexus-SEZ Pro India backend shutting down")


app = FastAPI(
    title="Nexus-SEZ Pro India",
    description="National Industrial Geospatial Operating System – REST API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(clusters.router, prefix="/api", tags=["Clusters"])
app.include_router(analytics.router, prefix="/api", tags=["Analytics"])
app.include_router(logistics.router, prefix="/api", tags=["Logistics"])


@app.get("/", tags=["Health"])
def health_check():
    return {
        "status": "ok",
        "service": "Nexus-SEZ Pro India",
        "version": "1.0.0",
        "description": "National Industrial Geospatial Operating System",
    }
