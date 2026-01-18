"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={{ y: shouldReduceMotion ? 0 : -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-3xl border border-border bg-card/90 p-6 shadow-sm backdrop-blur"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>
        </div>
        {project.highlight ? (
          <span className="flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
            <Lock size={12} />
            Private
          </span>
        ) : null}
      </div>
      <div className="mt-4 space-y-3 text-sm text-muted-foreground">
        <p>
          <span className="font-semibold text-foreground">Probleem:</span> {project.problem}
        </p>
        <p>
          <span className="font-semibold text-foreground">Wat ik bouwde:</span> {project.built}
        </p>
      </div>
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
    </motion.article>
  );
}
