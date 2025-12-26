"""Slideshow API endpoints."""

from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session
from ..db import get_session
from ..models.slideshow import Slideshow, SlideshowCreate, SlideshowUpdate, SlideshowRead
from ..crud.slideshow import slideshow
from ..crud.user import user as user_crud
from ..auth import get_current_user

router = APIRouter(prefix="/slideshows", tags=["slideshows"])


@router.post("/", response_model=SlideshowRead, status_code=201)
def create_slideshow(slideshow_data: SlideshowCreate, db: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    """Create a new slideshow."""
    db_user = user_crud.get_by_cognito_sub(db, cognito_sub=current_user.get("sub"))
    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")
    return slideshow.create_for_user(db=db, obj_in=slideshow_data, user_id=db_user.id)


@router.get("/", response_model=List[SlideshowRead])
def list_slideshows(skip: int = 0, limit: int = 100, db: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    """List all slideshows for current user."""
    db_user = user_crud.get_by_cognito_sub(db, cognito_sub=current_user.get("sub"))
    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")
    return slideshow.get_multi_for_user(db=db, user_id=db_user.id, skip=skip, limit=limit)


@router.get("/{slideshow_id}/", response_model=SlideshowRead)
def get_slideshow(slideshow_id: int, db: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    """Get a specific slideshow."""
    db_user = user_crud.get_by_cognito_sub(db, cognito_sub=current_user.get("sub"))
    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")
    slideshow_obj = slideshow.get_for_user(db=db, id=slideshow_id, user_id=db_user.id)
    if not slideshow_obj:
        raise HTTPException(status_code=404, detail="Slideshow not found")
    return slideshow_obj


@router.patch("/{slideshow_id}/", response_model=SlideshowRead)
def update_slideshow(slideshow_id: int, slideshow_data: SlideshowUpdate, db: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    """Update a slideshow."""
    db_user = user_crud.get_by_cognito_sub(db, cognito_sub=current_user.get("sub"))
    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")
    slideshow_obj = slideshow.get_for_user(db=db, id=slideshow_id, user_id=db_user.id)
    if not slideshow_obj:
        raise HTTPException(status_code=404, detail="Slideshow not found")
    return slideshow.update(db=db, db_obj=slideshow_obj, obj_in=slideshow_data)


@router.delete("/{slideshow_id}/", status_code=204)
def delete_slideshow(slideshow_id: int, db: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    """Delete a slideshow."""
    db_user = user_crud.get_by_cognito_sub(db, cognito_sub=current_user.get("sub"))
    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")
    slideshow_obj = slideshow.get_for_user(db=db, id=slideshow_id, user_id=db_user.id)
    if not slideshow_obj:
        raise HTTPException(status_code=404, detail="Slideshow not found")
    slideshow.remove(db=db, id=slideshow_id)


@router.get("/cat/{cat_id}/", response_model=List[SlideshowRead])
def get_slideshows_by_cat(cat_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    """Get slideshows by cat ID."""
    db_user = user_crud.get_by_cognito_sub(db, cognito_sub=current_user.get("sub"))
    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")
    return slideshow.get_by_cat(db=db, cat_id=cat_id, user_id=db_user.id, skip=skip, limit=limit)




@router.get("/search/{search_term}/", response_model=List[SlideshowRead])
def search_slideshows(search_term: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_session), current_user: dict = Depends(get_current_user)):
    """Search slideshows by title."""
    db_user = user_crud.get_by_cognito_sub(db, cognito_sub=current_user.get("sub"))
    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")
    return slideshow.search_by_title(db=db, search_term=search_term, user_id=db_user.id, skip=skip, limit=limit)
