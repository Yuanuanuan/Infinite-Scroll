import type { Repository, GitHubApiResponse, GitHubUser } from "@/types/github";

const USERNAME = "yyx990803";
const BASE_URL = `https://api.github.com/users/${USERNAME}`;
const PER_PAGE = 10;

async function fetchRepositories(page: number): Promise<Repository[]> {
  const url = `${BASE_URL}/repos?per_page=${PER_PAGE}&page=${page}&sort=updated`;

  return await fetch(url)
    .then((res) => res.json())
    .catch((error) => {
      console.error("Failed to fetch repositories: ", error);
      throw error;
    });
}

export async function getRepositories(
  page: number = 1
): Promise<GitHubApiResponse> {
  const repositories = await fetchRepositories(page);

  return {
    repositories,
    hasNext: repositories.length === PER_PAGE,
  };
}

export async function getUser(): Promise<GitHubUser> {
  return await fetch(BASE_URL)
    .then((res) => res.json())
    .catch((error) => {
      console.error("Failed to fetch user information: ", error);
      throw error;
    });
}
