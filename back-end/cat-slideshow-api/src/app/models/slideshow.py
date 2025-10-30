"""Slideshow model definitions."""

from datetime import datetime
from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, ARRAY, String
from .base import BaseModel

if TYPE_CHECKING:
    from .cat import Cat


class SlideshowBase(SQLModel):
    """Base slideshow model with common fields."""
    title: str
    description: Optional[str] = None
    image_urls: List[str] = Field(default_factory=list)


class Slideshow(SlideshowBase, BaseModel, table=True):
    """Slideshow database model."""
    image_urls: List[str] = Field(sa_column=Column(ARRAY(String)), default_factory=list)
    cat_id: int = Field(foreign_key="cat.id")
    user_id: int = Field(foreign_key="user.id", index=True)
    
    # Relationships
    cat: "Cat" = Relationship(back_populates="slideshows")


class SlideshowCreate(SlideshowBase):
    """Slideshow creation model (user_id is server-assigned)."""
    cat_id: int


class SlideshowUpdate(SQLModel):
    """Slideshow update model."""
    title: Optional[str] = None
    description: Optional[str] = None
    image_urls: Optional[List[str]] = None
    cat_id: Optional[int] = None


class SlideshowRead(SlideshowBase):
    """Slideshow read model."""
    id: int
    cat_id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
