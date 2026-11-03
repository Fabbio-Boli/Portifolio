import { mkdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const GITHUB_USER = "Fabbio-Boli";
const API_BASE_URL = `https://api.github.com/users/${GITHUB_USER}/repos`;
const OUTPUT_PATH = path.resolve("content/github-projects.json");
const README_EXCERPT_LENGTH = 600;
const README_CONCURRENCY = 4;

type GitHubRepository = {
  name?: unknown;
  full_name?: unknown;
  description?: unknown;
  html_url?: unknown;
  homepage?: unknown;
  language?: unknown;
  topics?: unknown;
  updated_at?: unknown;
  archived?: unknown;
  fork?: unknown;
  stargazers_count?: unknown;
  owner?: { login?: unknown };
};

type ProjectRecord = {
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepageUrl: string | null;
  language: string | null;
  topics: string[];
  updatedAt: string;
  isArchived: boolean;
  isFork: boolean;
  stars: number;
  readmeUrl: string;
  readmeExcerpt?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function nullableText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function isGitHubRepository(value: unknown): value is GitHubRepository {
  if (!isRecord(value)) return false;

  return (
    typeof value.name === "string" &&
    typeof value.full_name === "string" &&
    typeof value.html_url === "string" &&
    typeof value.updated_at === "string" &&
    typeof value.archived === "boolean" &&
    typeof value.fork === "boolean" &&
    typeof value.stargazers_count === "number"
  );
}

function isValidGitHubUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "github.com";
  } catch {
    return false;
  }
}

function toPlainText(markdown: string): string | undefined {
  const text = markdown
    .replace(/^---[\s\S]*?---\s*/m, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/^[\s>*#-]+/gm, " ")
    .replace(/[`_*~]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return text ? text.slice(0, README_EXCERPT_LENGTH) : undefined;
}

async function getJson(url: string): Promise<unknown> {
  const token = process.env.GITHUB_TOKEN?.trim();
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "portfolio-github-catalog-sync",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed (${response.status}) for ${url}`);
  }

  return response.json();
}

async function fetchAllPublicRepositories(): Promise<GitHubRepository[]> {
  const repositories: GitHubRepository[] = [];
  const seenFullNames = new Set<string>();

  for (let page = 1; ; page += 1) {
    const query = new URLSearchParams({
      type: "public",
      sort: "updated",
      direction: "desc",
      per_page: "100",
      page: String(page),
    });
    const data = await getJson(`${API_BASE_URL}?${query}`);

    if (!Array.isArray(data) || !data.every(isGitHubRepository)) {
      throw new Error("GitHub repositories response was malformed");
    }

    for (const repository of data) {
      if (seenFullNames.has(repository.full_name as string)) {
        throw new Error(`GitHub repositories response contained duplicate ${repository.full_name}`);
      }
      seenFullNames.add(repository.full_name as string);
      repositories.push(repository);
    }

    if (data.length < 100) break;
  }

  return repositories;
}

async function fetchReadmeExcerpt(repository: GitHubRepository): Promise<string | undefined> {
  const owner = typeof repository.owner?.login === "string" ? repository.owner.login : GITHUB_USER;
  const readmeUrl = `https://api.github.com/repos/${owner}/${repository.name as string}/readme`;

  try {
    const data = await getJson(readmeUrl);
    if (!isRecord(data) || data.encoding !== "base64" || typeof data.content !== "string") {
      return undefined;
    }
    return toPlainText(Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf8"));
  } catch {
    return undefined;
  }
}

async function toProjectRecord(repository: GitHubRepository): Promise<ProjectRecord> {
  const htmlUrl = repository.html_url as string;
  if (!isValidGitHubUrl(htmlUrl)) {
    throw new Error(`Repository URL is not a valid GitHub URL: ${htmlUrl}`);
  }

  const fullName = repository.full_name as string;
  const readmeUrl = `${htmlUrl}/readme`;
  const readmeExcerpt = await fetchReadmeExcerpt(repository);

  return {
    name: repository.name as string,
    fullName,
    description: nullableText(repository.description),
    htmlUrl,
    homepageUrl: nullableText(repository.homepage),
    language: nullableText(repository.language),
    topics: Array.isArray(repository.topics)
      ? repository.topics.filter((topic): topic is string => typeof topic === "string").map((topic) => topic.toLowerCase())
      : [],
    updatedAt: repository.updated_at as string,
    isArchived: repository.archived as boolean,
    isFork: repository.fork as boolean,
    stars: repository.stargazers_count as number,
    readmeUrl,
    ...(readmeExcerpt ? { readmeExcerpt } : {}),
  };
}

async function mapWithConcurrency<T, U>(
  items: T[],
  concurrency: number,
  mapper: (item: T) => Promise<U>,
): Promise<U[]> {
  const results = new Array<U>(items.length);
  let nextIndex = 0;

  async function worker(): Promise<void> {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await mapper(items[index]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

async function writeCatalogAtomically(records: ProjectRecord[]): Promise<void> {
  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  const temporaryPath = `${OUTPUT_PATH}.${process.pid}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(records, null, 2)}\n`, "utf8");
  await rename(temporaryPath, OUTPUT_PATH);
}

async function main(): Promise<void> {
  const portfolioRepository = process.env.PORTFOLIO_REPOSITORY?.trim().toLowerCase();
  const repositories = (await fetchAllPublicRepositories()).filter(
    (repository) => (repository.full_name as string).toLowerCase() !== portfolioRepository,
  );
  const records = await mapWithConcurrency(repositories, README_CONCURRENCY, toProjectRecord);
  await writeCatalogAtomically(records);
  console.log(`Synchronized ${records.length} public GitHub repositories.`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
