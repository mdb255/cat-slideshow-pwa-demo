"""Cat API endpoints."""

from typing import List, Optional
from fastapi import APIRouter, HTTPException, Depends, Query
from sqlmodel import Session
from ..db import get_session
from ..models.cat import Cat, CatCreate, CatUpdate, CatRead
from ..crud.cat import cat
from ..crud.user import user as user_crud
from ..auth import get_current_user

router = APIRouter(prefix="/cats", tags=["cats"])


@router.post("/", response_model=CatRead, status_code=201)
def create_cat(cat_data: CatCreate, db: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    """Create a new cat."""
    db_user = user_crud.get_by_cognito_sub(db, cognito_sub=current_user.get("sub"))
    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")
    return cat.create_for_user(db=db, obj_in=cat_data, user_id=db_user.id)


@router.get("/", response_model=List[CatRead])
def list_cats(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=1000, description="Maximum number of records to return"),
    breed: Optional[str] = Query(None, description="Filter by cat breed"),
    min_age: Optional[int] = Query(None, ge=0, description="Minimum age filter"),
    max_age: Optional[int] = Query(None, ge=0, description="Maximum age filter"),
    search: Optional[str] = Query(None, description="Search term for cat description"),
    db: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user)
):
    """List cats with optional filtering."""
    db_user = user_crud.get_by_cognito_sub(db, cognito_sub=current_user.get("sub"))
    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")
    # If breed filter is provided
    if breed:
        return cat.get_by_breed(db=db, breed=breed, user_id=db_user.id, skip=skip, limit=limit)
    
    # If age range filter is provided
    if min_age is not None and max_age is not None:
        return cat.get_by_age_range(db=db, min_age=min_age, max_age=max_age, user_id=db_user.id, skip=skip, limit=limit)
    
    # If search term is provided
    if search:
        return cat.search_by_description(db=db, search_term=search, user_id=db_user.id, skip=skip, limit=limit)
    
    # Default: return all cats for user
    return cat.get_multi_for_user(db=db, user_id=db_user.id, skip=skip, limit=limit)


@router.get("/{cat_id}/", response_model=CatRead)
def get_cat(cat_id: int, db: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    """Get a specific cat."""
    db_user = user_crud.get_by_cognito_sub(db, cognito_sub=current_user.get("sub"))
    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")
    cat_obj = cat.get_for_user(db=db, id=cat_id, user_id=db_user.id)
    if not cat_obj:
        raise HTTPException(status_code=404, detail="Cat not found")
    return cat_obj


@router.patch("/{cat_id}/", response_model=CatRead)
def update_cat(cat_id: int, cat_data: CatUpdate, db: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    """Update a cat."""
    db_user = user_crud.get_by_cognito_sub(db, cognito_sub=current_user.get("sub"))
    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")
    cat_obj = cat.get_for_user(db=db, id=cat_id, user_id=db_user.id)
    if not cat_obj:
        raise HTTPException(status_code=404, detail="Cat not found")
    return cat.update(db=db, db_obj=cat_obj, obj_in=cat_data)


@router.delete("/{cat_id}/", status_code=204)
def delete_cat(cat_id: int, db: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    """Delete a cat."""
    db_user = user_crud.get_by_cognito_sub(db, cognito_sub=current_user.get("sub"))
    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")
    cat_obj = cat.get_for_user(db=db, id=cat_id, user_id=db_user.id)
    if not cat_obj:
        raise HTTPException(status_code=404, detail="Cat not found")
    cat.remove(db=db, id=cat_id)


