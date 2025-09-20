import os
import sys
from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool
from alembic import context

# Ensure 'src' is on sys.path so we can import app.*
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "src"))  # when running `alembic` from project root
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

# Import settings and models to load metadata
try:
    from app.settings import settings
    from sqlmodel import SQLModel
    from app import models  # noqa: F401  # importing to register models with SQLModel.metadata
except Exception as e:
    raise

# this is the Alembic Config object, which provides access to the values within the .ini file in use.
config = context.config

# If DATABASE_URL env var is set (or in .env via pydantic-settings), use it
if settings and getattr(settings, "database_url", None):
    config.set_main_option("sqlalchemy.url", settings.database_url)

# Interpret the config file for Python logging.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# for 'autogenerate' support: target_metadata references SQLModel.metadata
target_metadata = SQLModel.metadata

def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        compare_type=True,
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata, compare_type=True
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
