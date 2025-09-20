# FastAPI + SQLModel + Postgres + Pytest + Alembic Starter

Minimal, production-leaning baseline with migrations.

## Stack
- FastAPI
- SQLModel
- Postgres (docker-compose)
- Alembic (migrations)
- Pytest

## Quickstart

1) Start Postgres:
```bash
docker compose up -d
```

2) Install deps with `uv`:
```bash
uv sync --all-extras --dev
```

3) Run database migrations (uses `.env` for `DATABASE_URL`):
```bash
# upgrade to head (includes initial todos table)
uv run alembic upgrade head
```

4) Run the API:
```bash
uv run uvicorn app.main:app --reload --app-dir src
# http://127.0.0.1:8000/docs
```

5) Run tests (SQLite in-memory for speed):
```bash
uv run pytest -q
```

## Making schema changes

1) Edit your models in `src/app/models.py` (or new modules that import SQLModel).
2) Autogenerate a migration:
```bash
uv run alembic revision --autogenerate -m "your message"
uv run alembic upgrade head
```

Alembic is wired to `SQLModel.metadata` via `alembic/env.py` and reads the database URL from `.env` through `pydantic-settings`.

## Notes
- We avoid `create_all()` at runtime; schema is owned by Alembic.
- Tests still create tables directly against an in-memory SQLite engine.
- Adminer is available at http://localhost:8080 for quick DB inspection.
