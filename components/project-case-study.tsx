"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ExternalLink, Lock } from "lucide-react";
import type { Project } from "@/content/projects";
import { getGitHubOgImage } from "@/lib/project-media";
import { Button } from "@/components/ui/button";
import { MatrixRain } from "@/components/matrix-rain";
import { Section } from "@/components/section";
import { ThemeToggle } from "@/components/theme-toggle";

export function ProjectCaseStudy({ project }: { project: Project }) {
  const shouldReduceMotion = useReducedMotion();
  const highlights = project.highlights.slice(0, 5);
  const results = project.results?.length ? project.results : project.bullets.slice(0, 3);
  const gallery = project.gallery?.length ? project.gallery : null;
  const ogImage = getGitHubOgImage(project.repo);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div>
      {!shouldReduceMotion ? (
        <MatrixRain className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-25 blur-[1px] mix-blend-screen" />
      ) : null}
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-10 sm:px-10">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
          <ThemeToggle />
        </div>

        <header className="mt-12 space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Case study
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground">{project.oneLiner}</p>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {project.role}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) =>
              link.href ? (
                <Button key={link.label} asChild variant="outline">
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                    <ExternalLink size={14} />
                  </a>
                </Button>
              ) : (
                <span
                  key={link.label}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground"
                >
                  <Lock size={14} />
                  {link.label}
                  {link.note ? <span className="text-muted-foreground">({link.note})</span> : null}
                </span>
              ),
            )}
          </div>
        </header>

        <Section className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold">Highlights</h2>
            <p className="text-sm text-muted-foreground">Key implementation and delivery takeaways.</p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-6 grid gap-4 sm:grid-cols-2"
          >
            {highlights.map((highlight) => (
              <motion.div
                key={highlight}
                variants={itemVariants}
                className="rounded-2xl border border-border bg-card/90 p-5 text-sm text-muted-foreground shadow-sm"
              >
                {highlight}
              </motion.div>
            ))}
          </motion.div>
        </Section>

        <Section className="mt-16">
          <div className="rounded-3xl border border-border bg-card/90 p-8 shadow-sm">
            <h2 className="font-display text-2xl font-semibold">Results &amp; highlights</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {results.map((result) => (
                <li key={result} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70" />
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold">Gallery</h2>
            <p className="text-sm text-muted-foreground">Screens and references from the build.</p>
          </div>
          {gallery ? (
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-6 grid gap-4 sm:grid-cols-2"
            >
              {gallery.map((image) => (
                <div
                  key={image}
                  className="relative h-56 overflow-hidden rounded-2xl border border-border bg-card/80"
                >
                  <Image
                    src={image}
                    alt={`${project.title} gallery`}
                    fill
                    className="object-cover"
                    unoptimized={image.startsWith("http")}
                  />
                </div>
              ))}
            </motion.div>
          ) : ogImage ? (
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-6"
            >
              <div className="relative h-64 overflow-hidden rounded-3xl border border-border bg-card/80">
                <Image
                  src={ogImage}
                  alt={`${project.title} repository preview`}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </motion.div>
          ) : (
            <div className="mt-6 rounded-3xl border border-border bg-card/80 p-6 text-sm text-muted-foreground">
              Private work – gallery unavailable.
            </div>
          )}
        </Section>

        <footer className="mt-16 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Matin Khajehfard. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
