from typing import List
from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select
from .db import engine
from .models import Todo

router = APIRouter(prefix="/todos", tags=["todos"])

def get_session() -> Session:
    return Session(engine)

@router.post("/", response_model=Todo, status_code=201)
def create_todo(todo: Todo):
    with get_session() as session:
        session.add(todo)
        session.commit()
        session.refresh(todo)
        return todo

@router.get("/", response_model=List[Todo])
def list_todos():
    with get_session() as session:
        return session.exec(select(Todo)).all()

@router.get("/{todo_id}", response_model=Todo)
def get_todo(todo_id: int):
    with get_session() as session:
        todo = session.get(Todo, todo_id)
        if not todo:
            raise HTTPException(404, "Todo not found")
        return todo

@router.patch("/{todo_id}", response_model=Todo)
def update_todo(todo_id: int, data: Todo):
    with get_session() as session:
        todo = session.get(Todo, todo_id)
        if not todo:
            raise HTTPException(404, "Todo not found")
        if data.title is not None:
            todo.title = data.title
        if data.completed is not None:
            todo.completed = data.completed
        session.add(todo)
        session.commit()
        session.refresh(todo)
        return todo

@router.delete("/{todo_id}", status_code=204)
def delete_todo(todo_id: int):
    with get_session() as session:
        todo = session.get(Todo, todo_id)
        if not todo:
            raise HTTPException(404, "Todo not found")
        session.delete(todo)
        session.commit()
        return
