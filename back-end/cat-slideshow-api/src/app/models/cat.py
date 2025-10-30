"""Cat model definitions."""

from datetime import datetime
from typing import List, Optional, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from .base import BaseModel


class CatBase(SQLModel):
    """Base cat model with common fields."""
    name: str
    breed: Optional[str] = None
    age: Optional[int] = None
    color: Optional[str] = None
    description: Optional[str] = None


class Cat(CatBase, BaseModel, table=True):
    """Cat database model."""
    user_id: int = Field(foreign_key="user.id", index=True)
    
    # Relationships
    slideshows: List["Slideshow"] = Relationship(back_populates="cat")


class CatCreate(CatBase):
    """Cat creation model (user_id is server-assigned)."""
    pass


class CatUpdate(SQLModel):
    """Cat update model."""
    name: Optional[str] = None
    breed: Optional[str] = None
    age: Optional[int] = None
    color: Optional[str] = None
    description: Optional[str] = None


class CatRead(CatBase):
    """Cat read model."""
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime


if TYPE_CHECKING:
    from .slideshow import Slideshow

