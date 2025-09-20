from contextlib import asynccontextmanager
from fastapi import FastAPI
from .db import init_db
from .api import router as todo_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

def create_app() -> FastAPI:
    app = FastAPI(title="FastAPI + SQLModel + Alembic Starter", lifespan=lifespan)
    app.include_router(todo_router)

    @app.get("/healthz")
    def healthz():
        return {"status": "ok"}

    return app

app = create_app()
