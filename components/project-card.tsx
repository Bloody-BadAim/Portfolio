"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/content/projects";

const OG_SEED = "portfolio";

const getGitHubOgImage = (repoUrl?: string) => {
  if (!repoUrl) return undefined;
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/i);
  if (!match) return undefined;
  const [, owner, repo] = match;
  return `https://opengraph.githubassets.com/${OG_SEED}/${owner}/${repo}`;
};

export function ProjectCard({ project }: { project: Project }) {
  const shouldReduceMotion = useReducedMotion();
  const coverImage = project.image ?? getGitHubOgImage(project.repo);

  return (
    <motion.article
      whileHover={{ y: shouldReduceMotion ? 0 : -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group overflow-hidden rounded-3xl border border-border bg-card/90 shadow-sm backdrop-blur"
    >
      {coverImage ? (
        <div className="relative h-44 w-full overflow-hidden border-b border-border">
          <Image
            src={coverImage}
            alt={`${project.title} cover`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized={coverImage.startsWith("http")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
        </div>
      ) : null}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{project.oneLiner}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {project.role}
            </p>
          </div>
          {!project.repo ? (
            <span className="flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
              <Lock size={12} />
              Private
            </span>
          ) : null}
        </div>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {project.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          {project.links.map((link) => (
            <span
              key={link.label}
              className={cn(
                "inline-flex items-center gap-1 font-semibold",
                link.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              {link.href ? (
                <a
                  href={link.href}
                  target={link.href.startsWith("/") ? undefined : "_blank"}
                  rel={link.href.startsWith("/") ? undefined : "noreferrer"}
                >
                  {link.label}
                </a>
              ) : (
                link.label
              )}
              {link.href ? <ExternalLink size={14} /> : null}
              {link.note ? <span className="text-xs text-muted-foreground">({link.note})</span> : null}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
