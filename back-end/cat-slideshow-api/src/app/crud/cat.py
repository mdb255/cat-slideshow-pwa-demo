"""Cat CRUD operations."""

from typing import List, Optional
from sqlmodel import Session, select
from ..models.cat import Cat, CatCreate, CatUpdate
from .base import CRUDBase


class CatCRUD(CRUDBase[Cat, CatCreate, CatUpdate]):
    """Cat CRUD operations."""
    def get_for_user(self, db: Session, *, id: int, user_id: int) -> Optional[Cat]:
        statement = select(Cat).where(Cat.id == id, Cat.user_id == user_id)
        return db.exec(statement).first()

    def get_multi_for_user(self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100) -> List[Cat]:
        statement = select(Cat).where(Cat.user_id == user_id).offset(skip).limit(limit)
        return db.exec(statement).all()

    def create_for_user(self, db: Session, *, obj_in: CatCreate, user_id: int) -> Cat:
        obj_in_data = obj_in.model_dump()
        obj_in_data["user_id"] = user_id
        db_obj = Cat(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_by_name(self, db: Session, *, name: str, user_id: int) -> Optional[Cat]:
        statement = select(Cat).where(Cat.name == name, Cat.user_id == user_id)
        return db.exec(statement).first()
    
    def get_by_breed(self, db: Session, *, breed: str, user_id: int, skip: int = 0, limit: int = 100) -> List[Cat]:
        statement = select(Cat).where(Cat.breed == breed, Cat.user_id == user_id).offset(skip).limit(limit)
        return db.exec(statement).all()
    
    def get_by_age_range(self, db: Session, *, min_age: int, max_age: int, user_id: int, skip: int = 0, limit: int = 100) -> List[Cat]:
        statement = select(Cat).where(Cat.age >= min_age, Cat.age <= max_age, Cat.user_id == user_id).offset(skip).limit(limit)
        return db.exec(statement).all()
    
    def search_by_description(self, db: Session, *, search_term: str, user_id: int, skip: int = 0, limit: int = 100) -> List[Cat]:
        statement = select(Cat).where(Cat.description.contains(search_term), Cat.user_id == user_id).offset(skip).limit(limit)
        return db.exec(statement).all()


# Create instance
cat = CatCRUD(Cat)

