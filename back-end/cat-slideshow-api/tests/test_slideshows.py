"""Test slideshow endpoints."""

import pytest
from fastapi.testclient import TestClient


@pytest.fixture
def client():
    """Create test client."""
    from app.main import app
    return TestClient(app)


def test_create_slideshow(client: TestClient):
    """Test creating a slideshow."""
    slideshow_data = {
        "title": "My Cat Slideshow",
        "description": "A collection of my cat photos",
        "image_urls": ["https://example.com/cat1.jpg", "https://example.com/cat2.jpg"]
    }
    response = client.post("/slideshows/", json=slideshow_data)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "My Cat Slideshow"
    assert data["description"] == "A collection of my cat photos"
    assert len(data["image_urls"]) == 2
    assert "id" in data
    assert "created_at" in data
    assert "updated_at" in data


def test_list_slideshows(client: TestClient):
    """Test listing slideshows."""
    response = client.get("/slideshows/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_slideshow_not_found(client: TestClient):
    """Test getting a non-existent slideshow."""
    response = client.get("/slideshows/999")
    assert response.status_code == 404


def test_update_slideshow_not_found(client: TestClient):
    """Test updating a non-existent slideshow."""
    slideshow_data = {"title": "Updated Title"}
    response = client.patch("/slideshows/999", json=slideshow_data)
    assert response.status_code == 404


def test_delete_slideshow_not_found(client: TestClient):
    """Test deleting a non-existent slideshow."""
    response = client.delete("/slideshows/999")
    assert response.status_code == 404




def test_search_slideshows(client: TestClient):
    """Test searching slideshows by title."""
    response = client.get("/slideshows/search/cat")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_slideshows_by_cat(client: TestClient):
    """Test getting slideshows by cat ID."""
    response = client.get("/slideshows/cat/1")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
