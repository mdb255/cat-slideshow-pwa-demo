"""API package."""

from .cats import router as cats_router
from .slideshows import router as slideshows_router

__all__ = [
    "cats_router", 
    "slideshows_router",
]

