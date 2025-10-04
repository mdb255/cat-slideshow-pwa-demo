import pytest
from httpx import AsyncClient, ASGITransport
from asgi_lifespan import LifespanManager
from fastapi import FastAPI
from sqlmodel import SQLModel, create_engine, Session
from sqlmodel.pool import StaticPool

from app.main import create_app
from app.models import Todo, Cat, Slideshow

@pytest.fixture
def test_app() -> FastAPI:
    app = create_app()
    return app

@pytest.fixture
def sqlite_engine():
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    SQLModel.metadata.create_all(engine)
    return engine

@pytest.fixture
def session(sqlite_engine):
    with Session(sqlite_engine) as s:
        yield s

@pytest.fixture(autouse=True)
def patch_db(monkeypatch, sqlite_engine):
    from app import db
    monkeypatch.setattr(db, "engine", sqlite_engine)

@pytest.mark.asyncio
async def test_todo_crud(test_app: FastAPI):
    async with LifespanManager(test_app):
        transport = ASGITransport(app=test_app)
        async with AsyncClient(transport=transport, base_url="http://testserver") as client:
            r = await client.post("/todos/", json={"title":"Write tests"})
            assert r.status_code == 201
            todo = r.json()
            assert todo["title"] == "Write tests"
            assert todo["completed"] is False

            r = await client.get("/todos/")
            assert r.status_code == 200
            items = r.json()
            assert len(items) == 1

            r = await client.get(f"/todos/{todo['id']}")
            assert r.status_code == 200

            r = await client.patch(f"/todos/{todo['id']}", json={"completed": True})
            assert r.status_code == 200
            assert r.json()["completed"] is True

            r = await client.delete(f"/todos/{todo['id']}")
            assert r.status_code == 204

            r = await client.get(f"/todos/{todo['id']}")
            assert r.status_code == 404
