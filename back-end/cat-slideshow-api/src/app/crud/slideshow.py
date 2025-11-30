"""Slideshow CRUD operations."""

from typing import List, Optional
from sqlmodel import Session, select
from ..models.slideshow import Slideshow, SlideshowCreate, SlideshowUpdate
from .base import CRUDBase


class SlideshowCRUD(CRUDBase[Slideshow, SlideshowCreate, SlideshowUpdate]):
    """Slideshow CRUD operations."""
    def get_for_user(self, db: Session, *, id: int, user_id: int) -> Optional[Slideshow]:
        statement = select(Slideshow).where(Slideshow.id == id, Slideshow.user_id == user_id)
        return db.exec(statement).first()

    def get_multi_for_user(self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100) -> List[Slideshow]:
        statement = select(Slideshow).where(Slideshow.user_id == user_id).offset(skip).limit(limit)
        return db.exec(statement).all()

    def create_for_user(self, db: Session, *, obj_in: SlideshowCreate, user_id: int) -> Slideshow:
        obj_in.user_id = user_id
        return self.create(db, obj_in=obj_in)

    def get_by_cat(self, db: Session, *, cat_id: int, user_id: int, skip: int = 0, limit: int = 100) -> List[Slideshow]:
        statement = select(Slideshow).where(Slideshow.cat_id == cat_id, Slideshow.user_id == user_id).offset(skip).limit(limit)
        return db.exec(statement).all()
    
    def search_by_title(self, db: Session, *, search_term: str, user_id: int, skip: int = 0, limit: int = 100) -> List[Slideshow]:
        statement = select(Slideshow).where(Slideshow.title.contains(search_term), Slideshow.user_id == user_id).offset(skip).limit(limit)
        return db.exec(statement).all()


# Create instance
slideshow = SlideshowCRUD(Slideshow)
