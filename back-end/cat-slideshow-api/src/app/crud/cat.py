"""Cat CRUD operations."""

from typing import List, Optional
from sqlmodel import Session, select
from ..models.cat import Cat, CatCreate, CatUpdate
from .base import CRUDBase


class CatCRUD(CRUDBase[Cat, CatCreate, CatUpdate]):
    """Cat CRUD operations."""
    
    def get_by_name(self, db: Session, *, name: str) -> Optional[Cat]:
        """Get cat by name."""
        statement = select(Cat).where(Cat.name == name)
        return db.exec(statement).first()
    
    def get_by_breed(self, db: Session, *, breed: str, skip: int = 0, limit: int = 100) -> List[Cat]:
        """Get cats by breed."""
        statement = select(Cat).where(Cat.breed == breed).offset(skip).limit(limit)
        return db.exec(statement).all()
    
    def get_by_age_range(self, db: Session, *, min_age: int, max_age: int, skip: int = 0, limit: int = 100) -> List[Cat]:
        """Get cats by age range."""
        statement = select(Cat).where(Cat.age >= min_age, Cat.age <= max_age).offset(skip).limit(limit)
        return db.exec(statement).all()
    
    def search_by_description(self, db: Session, *, search_term: str, skip: int = 0, limit: int = 100) -> List[Cat]:
        """Search cats by description."""
        statement = select(Cat).where(Cat.description.contains(search_term)).offset(skip).limit(limit)
        return db.exec(statement).all()


# Create instance
cat = CatCRUD(Cat)

