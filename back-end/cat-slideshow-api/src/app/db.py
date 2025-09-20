from sqlmodel import create_engine
from .settings import settings

# Shared SQLAlchemy Engine
engine = create_engine(settings.database_url, pool_pre_ping=True)

# With Alembic in place, we do not create tables on startup.
def init_db() -> None:
    # Placeholder for future startup logic (e.g., seed data).
    return None
