# backend/app/services/github_service.py
from collections import defaultdict

from app.clients.github_client import GitHubClient


class GitHubService:
    def __init__(self):
        self.client = GitHubClient()

    async def get_user(self, username: str):
        return await self.client.get_user(username)

    async def get_repositories(self, username: str):
        return await self.client.get_repositories(username)

    async def get_languages(self, username: str):
        repos = await self.client.get_repositories(username)
        totals = defaultdict(int)

        for repo in repos:
            languages = await self.client.get_repo_languages(username, repo["name"])

            for lang, value in languages.items():
                totals[lang] += value

        total_bytes = sum(totals.values())
        if total_bytes == 0:
            return []

        results = []

        for lang, value in totals.items():
            results.append(
                {"name": lang, "bytes": value, "percentage": round(value / total_bytes * 100, 2)}
            )

        results.sort(key=lambda x: x["bytes"], reverse=True)
        return results
