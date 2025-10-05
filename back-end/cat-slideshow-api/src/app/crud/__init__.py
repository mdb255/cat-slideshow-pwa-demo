"""CRUD operations package."""

from .base import CRUDBase
from .cat import CatCRUD
from .slideshow import SlideshowCRUD

__all__ = [
    "CRUDBase",
    "CatCRUD",
    "SlideshowCRUD",
]

