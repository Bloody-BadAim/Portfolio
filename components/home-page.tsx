// components/home-page.tsx
"use client";
import { getProjectSlug } from "@/content/projects";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, Download } from "lucide-react";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { useAnalytics } from "@/lib/use-analytics";
import { Button } from "@/components/ui/button";
// import { FeaturedProjectsScroll } from "@/components/featured-projects-scroll";
import { HeroHeadline } from "@/components/hero-headline";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { ThemeToggle } from "@/components/theme-toggle";
import { Navbar } from "@/components/navbar";
import { MatrixRain } from "@/components/matrix-rain";

export function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  useAnalytics();

  const orderedProjects = [...projects].sort((a, b) => a.order - b.order);
  const featuredProjects = orderedProjects.filter((project) => project.featured);
  const otherProjects = orderedProjects.filter((project) => !project.featured);
  const showMatrixRain = !shouldReduceMotion;

  return (
    <div className="gradient-bg cyber-grid relative min-h-screen bg-background text-foreground">
      {showMatrixRain ? (
        <MatrixRain className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-30 blur-[1px] mix-blend-screen" />
      ) : null}

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-10 sm:px-10">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-muted-foreground">{profile.location}</div>
          <ThemeToggle />
        </div>

        <Navbar />

        <header className="mt-12 space-y-10">
          <HeroHeadline profile={profile} />

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <p className="text-lg text-muted-foreground">{profile.valueProposition}</p>

            <div className="flex flex-col gap-5 lg:items-end">
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Button asChild>
                  <a href={`mailto:${profile.email}`}>
                    Email
                    <ArrowDownRight size={16} />
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                    <ArrowDownRight size={16} />
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={profile.links.github} target="_blank" rel="noreferrer">
                    GitHub
                    <ArrowDownRight size={16} />
                  </a>
                </Button>
                <Button asChild variant="ghost">
                  <a href="/cv.pdf" download>
                    Download CV
                    <Download size={16} />
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground lg:justify-end">
                {/* {profile.preferences.map((item) => (
                  <span key={item} className="rounded-full border border-border px-3 py-1">
                    {item}
                  </span>
                ))} */}
              </div>
            </div>
          </div>
        </header>

        <Section id="proof" className="mt-16">
          <div className="rounded-3xl border border-border bg-card/90 p-8 shadow-[0_0_0_1px_rgba(45,212,191,0.08)] backdrop-blur">
            <h2 className="text-2xl font-semibold">Proof</h2>
            {/* <p className="mt-3 text-muted-foreground">
              Recruiter friendly proof with a focus on traceability, reliability, and clear delivery.
            </p> */}
            <div className="mt-4 grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
              {profile.differentiators.map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-background/60 p-4">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="projects" className="mt-16">
          {/* <FeaturedProjectsScroll projects={featuredProjects} /> */}
  <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Latest work</h2>
            <p className="text-sm text-muted-foreground">
              Compact case study snapshots with clear outcomes and implementation notes.
            </p>
          </div>
          <div className="mt-6 space-y-4">
            {featuredProjects.map((project) => (
              <motion.div
                key={project.title}
                whileHover={{ y: shouldReduceMotion ? 0 : -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="rounded-3xl border border-border bg-card/90 p-6 shadow-sm backdrop-blur"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.oneLiner}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      {project.role}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button asChild variant="outline">
                      <Link href={`/projects/${getProjectSlug(project)}`}>View case study</Link>
                    </Button>
                    {project.links.map((link) => (
                      <span key={link.label} className="text-sm font-semibold text-muted-foreground">
                        {link.href ? (
                          <a href={link.href} target="_blank" rel="noreferrer">
                            {link.label}
                          </a>
                        ) : (
                          link.label
                        )}
                        {link.note ? <span className="ml-1 text-xs">({link.note})</span> : null}
                      </span>
                    ))}
                  </div>
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
              </motion.div>
            ))}
          </div>
          {otherProjects.length ? (
            <div className="mt-14">
              <div className="flex items-end justify-between gap-4">
                <h3 className="text-xl font-semibold">Other builds</h3>
                <p className="text-sm text-muted-foreground">Additional projects and experiments.</p>
              </div>
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                {otherProjects.map((project) => (
                  <ProjectCard key={project.title} project={project} />
                ))}
              </div>
            </div>
          ) : null}
        </Section>

        <Section id="experience" className="mt-16">
          <div className="rounded-3xl border border-border bg-card/90 p-8 shadow-[0_0_0_1px_rgba(45,212,191,0.08)] backdrop-blur">
            <h2 className="text-2xl font-semibold">Experience snapshot</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {profile.experience.map((item) => (
                <li key={item} className="rounded-2xl border border-border bg-background/60 p-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="skills" className="mt-16">
          <h2 className="text-2xl font-semibold">Skills</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {Object.entries(profile.skills).map(([group, items]) => (
              <div key={group} className="rounded-3xl border border-border bg-card/90 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  {group}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="leadership" className="mt-16">
          <div className="rounded-3xl border border-border bg-card/90 p-8 shadow-[0_0_0_1px_rgba(45,212,191,0.08)] backdrop-blur">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold">Leadership</h2>
                <p className="mt-3 text-muted-foreground">{profile.leadership.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{profile.leadership.details}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.leadership.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-semibold text-primary"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {profile.leadership.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="contact" className="mt-16">
          <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card/90 p-8 shadow-[0_0_0_1px_rgba(45,212,191,0.08)] backdrop-blur md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div>
                <h2 className="text-2xl font-semibold">Get in touch</h2>
                <p className="mt-2 text-muted-foreground">
                  Open for part time roles, hybrid teams, freelance work or a 2027 internship.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                {profile.preferences.map((item) => (
                  <span key={item} className="rounded-full border border-border px-3 py-1">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <a href={`mailto:${profile.email}`}>Email</a>
              </Button>
              <Button asChild variant="outline">
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={profile.links.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </Section>

        <footer className="mt-16 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Matin Khajehfard. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
