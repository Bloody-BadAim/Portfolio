"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectCard } from "./project-card";
import { Project } from "@/content/projects";

interface ProjectRailProps {
    projects: Project[];
}

export function ProjectRail({ projects }: ProjectRailProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const { scrollYProgress: scrollXProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Simplified logic: Sticky container that slides content horizontally
    const x = useTransform(scrollXProgress, [0, 1], ["0%", "-75%"]);

    if (projects.length === 0) return null;

    return (
        <section ref={containerRef} className="relative h-[300vh] hidden lg:block">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="container mx-auto px-6 h-full flex flex-col justify-center">
                    {/* Horizontal Track */}
                    <motion.div style={{ x }} className="flex gap-12 w-max pl-4">
                        {projects.map((project) => (
                            <div key={project.title} className="w-[80vw] md:w-[600px] flex-shrink-0">
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
