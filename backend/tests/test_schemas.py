# backend/tests/test_schemas.py

import pytest
from pydantic import ValidationError

from app.schemas.github import GithubUser, GithubUserDetails, LanguagesStat

def test_github_user_minimal():
    user = GithubUser(id=1, login="test", avatar_url="https://example.com")
    
    assert user.id == 1
    assert user.login == "test"


def test_github_user_details_with_optionals():
    user = GithubUserDetails(
        id=1, login="Rackkoun", avatar_url="https://avatars.com",
        html_url="https://github.com/Rackkoun",
        created_at="2026-06-09T00:00:00Z",
        followers=1, following=2, public_repos=30
    )

    assert user.bio is None
    assert user.location is None

def test_gihub_user_details_with_bio():
    user = GithubUserDetails(
        id=1, login="Rackkoun", avatar_url="https://avatars.com",
        html_url="https://github.com/Rackkoun",
        created_at="2026-06-09T00:00:00Z",
        followers=1, following=2, public_repos=30,
        bio="MLOps enthusiast",
        location="Douala"
    )

    assert user.bio == "MLOps enthusiast"
    assert user.location == "Douala"

def test_languages_stat():
    stat = LanguagesStat(name="Python", bytes=1500, percentage=70)

    assert stat.name == "Python"
    assert stat.percentage == 70

def test_languages_stat_invalid():
    with pytest.raises(ValidationError):
        LanguagesStat(name="Python", bytes="not_a_number", percentage=75)