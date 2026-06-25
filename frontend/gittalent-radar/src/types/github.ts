export type GithubUser = {
  id: number;
  login: string;

  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;

  created_at: string;

  followers: number;
  following: number;

  public_repos: number;
};

export type LanguageStat = {
  name: string;
  bytes: number;
  percentage: number;
};

export interface FeaturedUser {
  id: number;
  login: string;
  avatar_url: string;
}