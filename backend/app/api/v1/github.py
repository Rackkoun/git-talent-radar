# backend/app/api/v1/github.py
from fastapi import APIRouter

from app.services.github_service import GitHubService

router = APIRouter()

service = GitHubService()

@router.get("/github/users/{username}")
async def get_user(username: str):
    return await service.get_user(username)

@router.get("/github/users/{username}/repos")
async def get_repositories(username: str):
    return await service.get_repositories(username)

@router.get("/github/users/{username}/languages")
async def get_repo_languages(username: str):
    return await service.get_languages(username)

@router.get("/github/featured")
async def get_featured_users():
    users = []
    for username in ["torvalds", "tj", "Rackkoun"]:
        users.append(await service.get_user(username))
    return users