"""Slideshow API endpoints."""

from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session
from ..db import get_session
from ..models.slideshow import Slideshow, SlideshowCreate, SlideshowUpdate, SlideshowRead
from ..crud.slideshow import slideshow

router = APIRouter(prefix="/slideshows", tags=["slideshows"])


@router.post("/", response_model=SlideshowRead, status_code=201)
def create_slideshow(slideshow_data: SlideshowCreate, db: Session = Depends(get_session)):
    """Create a new slideshow."""
    return slideshow.create(db=db, obj_in=slideshow_data)


@router.get("/", response_model=List[SlideshowRead])
def list_slideshows(skip: int = 0, limit: int = 100, db: Session = Depends(get_session)):
    """List all slideshows."""
    return slideshow.get_multi(db=db, skip=skip, limit=limit)


@router.get("/{slideshow_id}", response_model=SlideshowRead)
def get_slideshow(slideshow_id: int, db: Session = Depends(get_session)):
    """Get a specific slideshow."""
    slideshow_obj = slideshow.get(db=db, id=slideshow_id)
    if not slideshow_obj:
        raise HTTPException(status_code=404, detail="Slideshow not found")
    return slideshow_obj


@router.patch("/{slideshow_id}", response_model=SlideshowRead)
def update_slideshow(slideshow_id: int, slideshow_data: SlideshowUpdate, db: Session = Depends(get_session)):
    """Update a slideshow."""
    slideshow_obj = slideshow.get(db=db, id=slideshow_id)
    if not slideshow_obj:
        raise HTTPException(status_code=404, detail="Slideshow not found")
    return slideshow.update(db=db, db_obj=slideshow_obj, obj_in=slideshow_data)


@router.delete("/{slideshow_id}", status_code=204)
def delete_slideshow(slideshow_id: int, db: Session = Depends(get_session)):
    """Delete a slideshow."""
    slideshow_obj = slideshow.get(db=db, id=slideshow_id)
    if not slideshow_obj:
        raise HTTPException(status_code=404, detail="Slideshow not found")
    slideshow.remove(db=db, id=slideshow_id)


@router.get("/cat/{cat_id}", response_model=List[SlideshowRead])
def get_slideshows_by_cat(cat_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_session)):
    """Get slideshows by cat ID."""
    return slideshow.get_by_cat(db=db, cat_id=cat_id, skip=skip, limit=limit)




@router.get("/search/{search_term}", response_model=List[SlideshowRead])
def search_slideshows(search_term: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_session)):
    """Search slideshows by title."""
    return slideshow.search_by_title(db=db, search_term=search_term, skip=skip, limit=limit)
