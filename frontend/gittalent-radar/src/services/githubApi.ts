const API_BASE_URL = "/api/v1";

export async function getGithubUser(username: string) {
  const response = await fetch(
    `${API_BASE_URL}/github/users/${username}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
}

export async function getGithubLanguages(
  username: string
) {
  const response = await fetch(
    `${API_BASE_URL}/github/users/${username}/languages`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch languages");
  }

  return response.json();
}

export async function getFeaturedUsers(){
  const response = await fetch(`${API_BASE_URL}/github/featured`);

  if(!response.ok){
    throw new Error("Failed to fetch featured users");
  }

  return response.json();
}