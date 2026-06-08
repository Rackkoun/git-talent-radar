# backend/app/schemas/github.py
from pydantic import BaseModel

class GithubUser(BaseModel):
    id: int
    login: str
    avatar_url: str


class GithubUserDetails(BaseModel):
    id: int
    login: str
    avatar_url: str
    html_url: str
    bio: str | None = None
    location: str | None = None
    created_at: str
    followers: int
    following: int
    public_repos: int

class LanguagesStat(BaseModel):
    name: str
    bytes: int
    percentage: float
