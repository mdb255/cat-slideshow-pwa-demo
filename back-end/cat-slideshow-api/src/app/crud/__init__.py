"""CRUD operations package."""

from .base import CRUDBase
from .cat import CatCRUD
from .slideshow import SlideshowCRUD
from .user import UserCRUD

__all__ = [
    "CRUDBase",
    "CatCRUD",
    "SlideshowCRUD",
    "UserCRUD",
]

