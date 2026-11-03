import githubProjects from "@/content/github-projects.json";
import { caseStudies, standaloneProjects, type CaseStudy } from "@/content/case-studies";
import { projectMedia } from "@/content/project-media";

type GithubProject = {
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepageUrl: string | null;
  language: string | null;
  topics: string[];
  readmeExcerpt?: string;
};

const synchronizedProjects = githubProjects as GithubProject[];

export type PortfolioProject = {
  slug: string;
  title: string;
  summary: string;
  repositoryUrl?: string;
  demoUrl?: string;
  language?: string;
  topics: string[];
  imageSrc: string;
  imageAlt: string;
  readmeExcerpt?: string;
  caseStudy?: CaseStudy;
};

const profileRepository = "Fabbio-Boli/Fabbio-Boli";
// Set PORTFOLIO_REPOSITORY to the dedicated portfolio's owner/name (for example,
// "Fabbio-Boli/portfolio") in the build environment.
const portfolioRepository = process.env.PORTFOLIO_REPOSITORY?.trim().toLowerCase();

const editorialTitles: Record<string, string> = {
  "Fabbio-Boli/codex-automation-recommender": "Codex Automation Recommender",
  "Fabbio-Boli/challenge-toledo": "Challenge Toledo",
  "Fabbio-Boli/sdc-eletrolls": "SDC-Eletrolls",
  "Fabbio-Boli/agv-bosch": "Jabuti-AGV",
};

function toSlug(fullName: string) {
  return fullName.split("/").at(-1)?.toLowerCase() ?? fullName.toLowerCase();
}

function titleFromName(name: string) {
  return name
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function isVisible(project: GithubProject) {
  const fullName = project.fullName.toLowerCase();
  return (
    fullName !== profileRepository.toLowerCase() &&
    fullName !== portfolioRepository &&
    !project.topics.includes("portfolio-ignore")
  );
}

function fromGithub(project: GithubProject): PortfolioProject {
  const media = projectMedia[project.fullName];
  const caseStudy = caseStudies[project.fullName];

  return {
    slug: toSlug(project.fullName),
    title: editorialTitles[project.fullName] ?? titleFromName(project.name),
    summary:
      caseStudy?.overview ??
      project.description ??
      "Repositório público sincronizado do GitHub; um estudo de caso editorial ainda não foi publicado.",
    repositoryUrl: project.htmlUrl,
    demoUrl: project.homepageUrl ?? media?.demoUrl,
    language: project.language ?? undefined,
    topics: project.topics,
    imageSrc: media?.imageSrc ?? "/projects/default-project.svg",
    imageAlt: media?.imageAlt ?? "",
    readmeExcerpt: project.readmeExcerpt ?? undefined,
    caseStudy,
  };
}

const projectsBySlug = new Map(
  synchronizedProjects.filter(isVisible).map((project) => {
    const portfolioProject = fromGithub(project);
    return [portfolioProject.slug, portfolioProject];
  }),
);

for (const project of standaloneProjects) {
  const matchingRepository = synchronizedProjects.find(
    (repository) => toSlug(repository.fullName) === project.slug,
  );
  if (matchingRepository && !isVisible(matchingRepository)) continue;

  const standaloneProject: PortfolioProject = {
    ...project,
    imageSrc: projectMedia[project.slug].imageSrc,
    imageAlt: projectMedia[project.slug].imageAlt,
  };
  const synchronizedProject = projectsBySlug.get(project.slug);

  projectsBySlug.set(
    project.slug,
    synchronizedProject
      ? {
          ...synchronizedProject,
          ...standaloneProject,
          repositoryUrl: synchronizedProject.repositoryUrl,
          demoUrl: synchronizedProject.demoUrl,
          readmeExcerpt: synchronizedProject.readmeExcerpt,
          caseStudy: standaloneProject.caseStudy ?? synchronizedProject.caseStudy,
          topics: [...new Set([...synchronizedProject.topics, ...standaloneProject.topics])],
        }
      : standaloneProject,
  );
}

const projects = [...projectsBySlug.values()];

export function getProjects() {
  return projects;
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  const primary = projects.find((project) => project.slug === "codex-automation-recommender");
  const additional = projects.filter((project) => project.slug !== "codex-automation-recommender" && project.topics.includes("portfolio-featured"));
  return primary ? [primary, ...additional] : additional;
}
