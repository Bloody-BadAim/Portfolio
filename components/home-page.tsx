"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, Download } from "lucide-react";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { useAnalytics } from "@/lib/use-analytics";
import { Button } from "@/components/ui/button";
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

  return (
    <div className="gradient-bg cyber-grid relative min-h-screen bg-background text-foreground">
      <MatrixRain className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-40 blur-[1px] mix-blend-screen" />
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-10 sm:px-10">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-muted-foreground">{profile.location}</div>
          <ThemeToggle />
        </div>

        <Navbar />

        <header className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              {profile.roles.join(" · ")}
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{profile.valueProposition}</p>
            <div className="mt-6 flex flex-wrap gap-3">
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
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
              {profile.preferences.map((item) => (
                <span key={item} className="rounded-full border border-border px-3 py-1">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-sm"
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <div className="rounded-[28px] border border-border bg-card/80 p-3 shadow-glow">
              <Image
                src="/images/linkedin.jpeg"
                alt="Portret van Matin Khajehfard"
                width={520}
                height={520}
                className="rounded-[22px] object-cover"
                priority
              />
            </div>
          </motion.div>
        </header>

        <Section id="proof" className="mt-16">
          <div className="rounded-3xl border border-border bg-card/90 p-8 shadow-[0_0_0_1px_rgba(45,212,191,0.08)] backdrop-blur">
            <h2 className="text-2xl font-semibold">Proof</h2>
            <p className="mt-3 text-muted-foreground">
              Recruiter friendly proof with a focus on traceability, reliability, and clear delivery.
            </p>
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
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold">Projects</h2>
            <p className="text-sm text-muted-foreground">Featured work and additional builds.</p>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
          {otherProjects.length ? (
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {otherProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
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
            <h2 className="text-2xl font-semibold">Leadership</h2>
            <p className="mt-3 text-muted-foreground">{profile.leadership.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{profile.leadership.details}</p>
          </div>
        </Section>

        <Section id="contact" className="mt-16">
          <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card/90 p-8 shadow-[0_0_0_1px_rgba(45,212,191,0.08)] backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Contact</h2>
              <p className="mt-2 text-muted-foreground">
                Open for part time roles, hybrid teams, and freelance assignments.
              </p>
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
