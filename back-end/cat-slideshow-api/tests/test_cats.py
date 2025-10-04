"""Test cat endpoints."""

import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, select
from app.models.cat import Cat, CatCreate
from app.db import get_engine


@pytest.fixture
def client():
    """Create test client."""
    from app.main import app
    return TestClient(app)


@pytest.fixture
def db_session():
    """Create test database session."""
    engine = get_engine()
    with Session(engine) as session:
        yield session


def test_create_cat(client: TestClient):
    """Test creating a cat."""
    cat_data = {
        "name": "Whiskers",
        "breed": "Persian",
        "age": 3,
        "color": "White",
        "description": "A fluffy white cat"
    }
    response = client.post("/cats/", json=cat_data)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Whiskers"
    assert data["breed"] == "Persian"
    assert data["age"] == 3
    assert data["color"] == "White"
    assert data["description"] == "A fluffy white cat"
    assert "id" in data
    assert "created_at" in data
    assert "updated_at" in data


def test_list_cats(client: TestClient):
    """Test listing cats."""
    response = client.get("/cats/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_cat_not_found(client: TestClient):
    """Test getting a non-existent cat."""
    response = client.get("/cats/999")
    assert response.status_code == 404


def test_update_cat_not_found(client: TestClient):
    """Test updating a non-existent cat."""
    cat_data = {"name": "Updated Name"}
    response = client.patch("/cats/999", json=cat_data)
    assert response.status_code == 404


def test_delete_cat_not_found(client: TestClient):
    """Test deleting a non-existent cat."""
    response = client.delete("/cats/999")
    assert response.status_code == 404


def test_get_cats_by_breed(client: TestClient):
    """Test getting cats by breed using query parameter."""
    response = client.get("/cats/?breed=Persian")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_cats_by_age_range(client: TestClient):
    """Test getting cats by age range using query parameters."""
    response = client.get("/cats/?min_age=1&max_age=5")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_search_cats(client: TestClient):
    """Test searching cats by description using query parameter."""
    response = client.get("/cats/?search=fluffy")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_list_cats_with_pagination(client: TestClient):
    """Test listing cats with pagination parameters."""
    response = client.get("/cats/?skip=0&limit=10")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_list_cats_with_multiple_filters(client: TestClient):
    """Test listing cats with multiple query parameters."""
    response = client.get("/cats/?breed=Persian&skip=0&limit=5")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
