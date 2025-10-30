from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db import init_db
from .api import cats_router, slideshows_router, cat_images_router, auth_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

def create_app() -> FastAPI:
    app = FastAPI(
        title="Cat Slideshow API",
        description="A scalable API for managing cats and slideshows",
        version="1.0.0",
        lifespan=lifespan
    )
    
    # Configure CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            # "http://localhost:5173",  # Vite dev server
            "http://127.0.0.1:5173",  # alternate
        ],
        allow_credentials=True,
        allow_methods=["*"],  # Allow all HTTP methods
        allow_headers=["*"],  # Allow all headers
    )
    
    # Include all routers
    app.include_router(auth_router)
    app.include_router(cats_router)
    app.include_router(slideshows_router)
    app.include_router(cat_images_router)

    @app.get("/healthz")
    def healthz():
        return {"status": "ok"}

    @app.get("/")
    def root():
        return {
            "message": "Welcome to Cat Slideshow API",
            "version": "1.0.0",
            "docs": "/docs"
        }

    return app

app = create_app()
