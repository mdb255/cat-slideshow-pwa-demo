"""Slideshow CRUD operations."""

from typing import List, Optional
from sqlmodel import Session, select
from ..models.slideshow import Slideshow, SlideshowCreate, SlideshowUpdate
from .base import CRUDBase


class SlideshowCRUD(CRUDBase[Slideshow, SlideshowCreate, SlideshowUpdate]):
    """Slideshow CRUD operations."""
    
    def get_by_cat(self, db: Session, *, cat_id: int, skip: int = 0, limit: int = 100) -> List[Slideshow]:
        """Get slideshows by cat ID."""
        statement = select(Slideshow).where(Slideshow.cat_id == cat_id).offset(skip).limit(limit)
        return db.exec(statement).all()
    
    
    def search_by_title(self, db: Session, *, search_term: str, skip: int = 0, limit: int = 100) -> List[Slideshow]:
        """Search slideshows by title."""
        statement = select(Slideshow).where(Slideshow.title.contains(search_term)).offset(skip).limit(limit)
        return db.exec(statement).all()


# Create instance
slideshow = SlideshowCRUD(Slideshow)
