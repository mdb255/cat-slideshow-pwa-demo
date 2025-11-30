from sqlmodel import create_engine, Session
from functools import lru_cache
from .settings import settings

@lru_cache()
def get_engine():
    """Get database engine."""
    return create_engine(settings.runtime_db_url, pool_pre_ping=True)

# With Alembic in place, we do not create tables on startup.
def init_db() -> None:
    """Initialize database."""
    # Placeholder for future startup logic (e.g., seed data).
    return None

def get_session() -> Session:
    """Get database session."""
    engine = get_engine()
    return Session(engine)
