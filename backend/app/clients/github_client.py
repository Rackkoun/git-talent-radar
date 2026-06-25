# backend/app/clients/github_client.py
import httpx

from app.core.config import settings


class GitHubClient:
    BASE_URL = "https://api.github.com"

    async def get_user(self, username: str):
        headers = {}

        if settings.github_token:
            headers["Authorization"] = f"Bearer {settings.github_token}"

        async with httpx.AsyncClient() as client:
            response = await client.get(f"{self.BASE_URL}/users/{username}", headers=headers)

            response.raise_for_status()
            return response.json()

    async def get_repositories(self, username: str):
        headers = {}

        if settings.github_token:
            headers["Authorization"] = f"Bearer {settings.github_token}"

        async with httpx.AsyncClient() as client:
            response = await client.get(f"{self.BASE_URL}/users/{username}/repos", headers=headers)
            response.raise_for_status()

            return response.json()

    async def get_repo_languages(self, owner: str, repo: str):
        headers = {}

        if settings.github_token:
            headers["Authorization"] = f"Bearer {settings.github_token}"

        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.BASE_URL}/repos/{owner}/{repo}/languages", headers=headers
            )

            response.raise_for_status()
            return response.json()
