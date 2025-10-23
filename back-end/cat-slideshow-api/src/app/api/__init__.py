"""API package."""

from .cats import router as cats_router
from .slideshows import router as slideshows_router
from .cat_images import router as cat_images_router

__all__ = [
    "cats_router", 
    "slideshows_router",
    "cat_images_router",
]

