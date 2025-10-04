"""API package."""

from .todos import router as todos_router
from .cats import router as cats_router
from .slideshows import router as slideshows_router

__all__ = [
    "todos_router",
    "cats_router", 
    "slideshows_router",
]

