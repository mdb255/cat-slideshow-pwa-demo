"""Todo API endpoints."""

from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session
from ..db import get_session
from ..models.todo import Todo, TodoCreate, TodoUpdate, TodoRead
from ..crud.todo import todo

router = APIRouter(prefix="/todos", tags=["todos"])


@router.post("/", response_model=TodoRead, status_code=201)
def create_todo(todo_data: TodoCreate, db: Session = Depends(get_session)):
    """Create a new todo."""
    return todo.create(db=db, obj_in=todo_data)


@router.get("/", response_model=List[TodoRead])
def list_todos(skip: int = 0, limit: int = 100, db: Session = Depends(get_session)):
    """List all todos."""
    return todo.get_multi(db=db, skip=skip, limit=limit)


@router.get("/{todo_id}", response_model=TodoRead)
def get_todo(todo_id: int, db: Session = Depends(get_session)):
    """Get a specific todo."""
    todo_obj = todo.get(db=db, id=todo_id)
    if not todo_obj:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo_obj


@router.patch("/{todo_id}", response_model=TodoRead)
def update_todo(todo_id: int, todo_data: TodoUpdate, db: Session = Depends(get_session)):
    """Update a todo."""
    todo_obj = todo.get(db=db, id=todo_id)
    if not todo_obj:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo.update(db=db, db_obj=todo_obj, obj_in=todo_data)


@router.delete("/{todo_id}", status_code=204)
def delete_todo(todo_id: int, db: Session = Depends(get_session)):
    """Delete a todo."""
    todo_obj = todo.get(db=db, id=todo_id)
    if not todo_obj:
        raise HTTPException(status_code=404, detail="Todo not found")
    todo.remove(db=db, id=todo_id)


@router.get("/completed/", response_model=List[TodoRead])
def get_completed_todos(skip: int = 0, limit: int = 100, db: Session = Depends(get_session)):
    """Get completed todos."""
    return todo.get_completed(db=db, skip=skip, limit=limit)


@router.get("/pending/", response_model=List[TodoRead])
def get_pending_todos(skip: int = 0, limit: int = 100, db: Session = Depends(get_session)):
    """Get pending todos."""
    return todo.get_pending(db=db, skip=skip, limit=limit)

