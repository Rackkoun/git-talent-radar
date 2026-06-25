# backend/tests/test_github_service.py

# from fastapi.testclient import TestClient
from unittest.mock import AsyncMock

from app.api.v1.github import service


def test_get_user(client):

    service.get_user = AsyncMock(return_value={"id": 1, "login": "Rackkoun"})

    response = client.get("/api/v1/github/users/Rackkoun")

    assert response.status_code == 200
    assert response.json()["login"] == "Rackkoun"


def test_get_user_repositories(client):

    service.get_repositories = AsyncMock(
        return_value=[
            {"name": "repo1"},
            {"name": "repo2"},
        ]
    )
    response = client.get("/api/v1/github/users/Rackkoun/repos")

    assert response.status_code == 200
    assert len(response.json()) == 2


def test_get_featured_users(client):
    service.get_user = AsyncMock(
        side_effect=[
            {"login": "torvalds"},
            {"login": "tj"},
            {"login": "Rackkoun"},
        ]
    )
    response = client.get("/api/v1/github/featured")

    assert response.status_code == 200
    data = response.json()

    assert len(data) == 3
    assert data[0]["login"] == "torvalds"
    assert data[1]["login"] == "tj"
    assert data[2]["login"] == "Rackkoun"

    assert service.get_user.await_count == 3


def test_get_languages(client):
    service.get_languages = AsyncMock(
        return_value=[
            {"name": "Python", "bytes": 700, "percentage": 70},
            {"name": "SQL", "bytes": 300, "percentage": 30},
        ]
    )

    response = client.get("/api/v1/github/users/Rackkoun/languages")
    data = response.json()

    assert response.status_code == 200
    assert len(data) == 2

    assert data[0]["name"] == "Python"
    assert data[0]["percentage"] == 70

    service.get_languages.assert_awaited_once_with("Rackkoun")
