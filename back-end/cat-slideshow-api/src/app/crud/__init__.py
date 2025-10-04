"""CRUD operations package."""

from .base import CRUDBase
from .todo import TodoCRUD
from .cat import CatCRUD
from .slideshow import SlideshowCRUD

__all__ = [
    "CRUDBase",
    "TodoCRUD", 
    "CatCRUD",
    "SlideshowCRUD",
]

