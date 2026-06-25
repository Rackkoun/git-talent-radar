# backend/tests/test_github_languages_service.py

from unittest.mock import AsyncMock

import pytest

from app.services.github_service import GitHubService


@pytest.mark.asyncio
async def test_language_percentages():

    service = GitHubService()

    service.client.get_repositories = AsyncMock(return_value=[{"name": "repo1"}, {"name": "repo2"}])

    async def fake_languages(username, repo):

        if repo == "repo1":
            return {"Python": 1000, "SQL": 500}

        return {"Python": 500}

    service.client.get_repo_languages = fake_languages

    result = await service.get_languages("Rackkoun")

    assert result[0]["name"] == "Python"
    assert result[0]["bytes"] == 1500
    assert result[0]["percentage"] == 75.0

    assert result[1]["name"] == "SQL"
    assert result[1]["bytes"] == 500
    assert result[1]["percentage"] == 25.0


@pytest.mark.asyncio
async def test_language_repos():

    service = GitHubService()
    service.client.get_repositories = AsyncMock(return_value=[{"name": "empty_repo"}])

    service.client.get_repo_languages = AsyncMock(return_value={})

    result = await service.get_languages("Rackkoun")

    assert result == []


@pytest.mark.asyncio
async def test_language_single_repo():
    service = GitHubService()
    service.client.get_repositories = AsyncMock(return_value=[{"name": "repo1"}])
    service.client.get_repo_languages = AsyncMock(return_value={"Python": 7000})

    result = await service.get_languages("Rackkoun")

    assert len(result) == 1
    assert result[0]["name"] == "Python"
    assert result[0]["bytes"] == 7000
    assert result[0]["percentage"] == 100.0
