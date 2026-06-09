# backend/tests/test_github_client.py

import pytest
import respx
from httpx import Response

from app.clients.github_client import GitHubClient
from app.core.config import settings

@pytest.fixture
def client():
    return GitHubClient()

@respx.mock
async def test_get_user_success(client):
    route = respx.get("https://api.github.com/users/Rackkoun").mock(
        return_value=Response(200, json={"login": "Rackkoun", "id": 12345678})
    )
    result = await client.get_user("Rackkoun")
    assert result["login"] == "Rackkoun"
    assert route.called

@respx.mock
async def test_get_user_with_token(client, monkeypatch):
    monkeypatch.setattr(settings, "github_token", "fake_token")
    route = respx.get("https://api.github.com/users/test").mock(
        return_value=Response(200, json={"login": "test"})
    )
    await client.get_user("test")
    assert route.calls.last.request.headers["Authorization"] == "Bearer fake_token"

@respx.mock
async def test_get_repositories(client):
    route = respx.get("https://api.github.com/users/Rackkoun/repos").mock(
        return_value=Response(200, json=[{"name": "repo1"}, {"name": "repo2"}])
    )
    result = await client.get_repositories("Rackkoun")
    assert len(result) == 2
    assert route.called

@respx.mock
async def test_get_repo_languages(client):
    route = respx.get("https://api.github.com/repos/Rackkoun/repo1/languages").mock(
        return_value=Response(200, json={"Python": 7000, "SQL": 3000})
    )
    result = await client.get_repo_languages("Rackkoun", "repo1")
    assert result["Python"] == 7000
    assert result["SQL"] == 3000
    assert route.called

@respx.mock
async def test_get_user_not_found(client):
    respx.get("https://api.github.com/users/unknow").mock(
        return_value=Response(404, json={"message": "Not Found"})
    )

    with pytest.raises(Exception):
        await client.get_user("unknow")