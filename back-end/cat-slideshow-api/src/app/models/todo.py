"""Todo model definitions."""

from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field
from .base import BaseModel


class TodoBase(SQLModel):
    """Base todo model with common fields."""
    title: str
    completed: bool = False


class Todo(TodoBase, BaseModel, table=True):
    """Todo database model."""
    pass


class TodoCreate(TodoBase):
    """Todo creation model."""
    pass


class TodoUpdate(SQLModel):
    """Todo update model."""
    title: Optional[str] = None
    completed: Optional[bool] = None


class TodoRead(TodoBase):
    """Todo read model."""
    id: int
    created_at: datetime
    updated_at: datetime

