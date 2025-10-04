"""Todo CRUD operations."""

from typing import List, Optional
from sqlmodel import Session, select
from ..models.todo import Todo, TodoCreate, TodoUpdate
from .base import CRUDBase


class TodoCRUD(CRUDBase[Todo, TodoCreate, TodoUpdate]):
    """Todo CRUD operations."""
    
    def get_by_title(self, db: Session, *, title: str) -> Optional[Todo]:
        """Get todo by title."""
        statement = select(Todo).where(Todo.title == title)
        return db.exec(statement).first()
    
    def get_completed(self, db: Session, *, skip: int = 0, limit: int = 100) -> List[Todo]:
        """Get completed todos."""
        statement = select(Todo).where(Todo.completed == True).offset(skip).limit(limit)
        return db.exec(statement).all()
    
    def get_pending(self, db: Session, *, skip: int = 0, limit: int = 100) -> List[Todo]:
        """Get pending todos."""
        statement = select(Todo).where(Todo.completed == False).offset(skip).limit(limit)
        return db.exec(statement).all()


# Create instance
todo = TodoCRUD(Todo)

