// components/home-page.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, Download } from "lucide-react";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { useAnalytics } from "@/lib/use-analytics";
import { Button } from "@/components/ui/button";
import { HeroHeadline } from "@/components/hero-headline";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { ThemeToggle } from "@/components/theme-toggle";
import { Navbar } from "@/components/navbar";
import { MatrixRain } from "@/components/matrix-rain";
import { ProjectRail } from "@/components/project-rail";
import dynamic from "next/dynamic";

const ColorBends = dynamic(() => import("@/components/color-bends"), { ssr: false });
import { StackCards } from "@/components/stack-cards";
import { SkillsSection } from "@/components/skills-section";
import { ReferencesSection } from "@/components/references-section";
import { StatsSection } from "@/components/stats-section";
import { AdditionalProjects } from "@/components/additional-projects";

export function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  useAnalytics();

  const orderedProjects = [...projects].sort((a, b) => a.order - b.order);
  const featuredProjects = orderedProjects.filter((project) => project.featured);
  const otherProjects = orderedProjects.filter((project) => !project.featured);
  const showMatrixRain = !shouldReduceMotion;

  return (
    <div>
      <div className="fixed inset-0 z-[-10]">
        <ColorBends
          colors={["#14b8a6", "#2dd4bf", "#0d9488"]} // Harmonized with site's Teal/Cyan theme
          rotation={0}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          parallax={0.5}
          noise={0.1}
          transparent={true} // Fixed prop name from 'transparent' shorthand to 'transparent={true}' or 'transparent' if TS supports
          autoRotate={0}
          className="h-full w-full opacity-90"
        />
        {/* Overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[0px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-10 sm:px-10">
        <div className="flex items-center justify-between">
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
            </div>
          </div>
        </header>

        <StatsSection />

        <Section id="projects" className="mt-16">
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-2xl font-semibold">Recent Projects</h2>
            <p className="text-sm text-muted-foreground">
              Scroll down to unstack and explore my featured work.
            </p>
          </div>


          {/* Stack Cards Animation */}
          <StackCards projects={featuredProjects} />

          {/* Additional Projects */}
          <AdditionalProjects projects={otherProjects} />
        </Section>

        <SkillsSection />



        <ReferencesSection />



        <footer className="mt-16 border-t border-border pt-8 pb-12 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Matin Khajehfard. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
