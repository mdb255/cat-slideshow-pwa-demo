"""Cat model definitions."""

from datetime import datetime
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, ARRAY, String
from .base import BaseModel


class CatBase(SQLModel):
    """Base cat model with common fields."""
    name: str
    breed: Optional[str] = None
    age: Optional[int] = None
    color: Optional[str] = None
    description: Optional[str] = None
    image_urls: List[str] = Field(default_factory=list)


class Cat(CatBase, BaseModel, table=True):
    """Cat database model."""
    image_urls: List[str] = Field(sa_column=Column(ARRAY(String)), default_factory=list)
    
    # Relationships
    slideshows: List["Slideshow"] = Relationship(back_populates="cat")


class CatCreate(CatBase):
    """Cat creation model."""
    pass


class CatUpdate(SQLModel):
    """Cat update model."""
    name: Optional[str] = None
    breed: Optional[str] = None
    age: Optional[int] = None
    color: Optional[str] = None
    description: Optional[str] = None
    image_urls: Optional[List[str]] = None


class CatRead(CatBase):
    """Cat read model."""
    id: int
    created_at: datetime
    updated_at: datetime


# Import Slideshow here to avoid circular imports
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from .slideshow import Slideshow

