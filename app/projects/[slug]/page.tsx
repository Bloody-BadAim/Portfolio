import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/project-case-study";
import { getProjectSlug, projects } from "@/content/projects";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: getProjectSlug(project),
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = projects.find((item) => getProjectSlug(item) === params.slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: `${project.title} | Matin Khajehfard`,
    description: project.oneLiner,
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = projects.find((item) => getProjectSlug(item) === params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudy project={project} />;
}
