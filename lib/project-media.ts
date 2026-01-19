import type { Project } from "@/content/projects";

const OG_SEED = "portfolio";

export const getGitHubOgImage = (repoUrl?: string) => {
  if (!repoUrl) return undefined;
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/i);
  if (!match) return undefined;
  const [, owner, repo] = match;
  return `https://opengraph.githubassets.com/${OG_SEED}/${owner}/${repo}`;
};

export const getProjectCoverImage = (project: Project) => {
  if (project.gallery?.length) return project.gallery[0];
  if (project.image) return project.image;
  return getGitHubOgImage(project.repo);
};
