"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project, getProjectSlug } from "@/content/projects";
import { cn } from "@/lib/utils";

interface AdditionalProjectsProps {
    projects: Project[];
}

export function AdditionalProjects({ projects }: AdditionalProjectsProps) {
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse position tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the cursor follower
    const springConfig = { damping: 20, stiffness: 150, mass: 0.8 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        // Position relative to the viewport/container ensures it follows cursor correctly
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    if (projects.length === 0) return null;

    return (
        <div
            className="mt-24 relative"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setActiveProject(null)}
        >
            <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                    <h3 className="text-xl font-bold tracking-tight">Additional Projects</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Other experiments, course work, and tools I&apos;ve built.
                    </p>
                </div>
            </div>

            <div className="grid gap-2">
                {projects.map((project, index) => {
                    const slug = getProjectSlug(project);

                    return (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onMouseEnter={() => setActiveProject(project)}
                        >
                            <Link
                                href={`/projects/${slug}`}
                                className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-transparent hover:bg-white/[0.03] transition-colors duration-300 z-10"
                            >
                                <div className="flex flex-col gap-1.5 min-w-0">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-mono text-muted-foreground/50 group-hover:text-primary/70 transition-colors">
                                            0{index + 1}
                                        </span>
                                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors text-lg">
                                            {project.title}
                                        </h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-1 group-hover:text-white/60 transition-colors pl-7">
                                        {project.oneLiner}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 shrink-0 sm:pl-4 sm:ml-auto w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5 pl-7 sm:pl-0">
                                    <div className="flex -space-x-2 overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity">
                                        {project.stack.slice(0, 3).map((tech) => (
                                            <div
                                                key={tech}
                                                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 border border-white/10 text-[10px] font-bold text-white/70 shadow-sm"
                                                title={tech}
                                            >
                                                {tech.slice(0, 1).toUpperCase()}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="w-8 h-8 flex items-center justify-center rounded-full border border-white/5 text-muted-foreground/30 group-hover:border-primary/20 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                                        <ArrowUpRight size={14} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>

            {/* Floating Image Reveal */}
            <AnimatePresence>
                {activeProject && activeProject.gallery && activeProject.gallery.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            x: springX,
                            y: springY,
                            translateX: "-50%",
                            translateY: "-50%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 0, // Behind the text but floating
                            pointerEvents: "none",
                        }}
                        className="hidden lg:block w-[400px] h-[250px] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 bg-gray-900"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />

                        {/* Image */}
                        <motion.img
                            src={activeProject.gallery[0]}
                            alt={activeProject.title}
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.4 }}
                        />

                        {/* Floating Label */}
                        <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
                            <span className="text-xs font-bold uppercase tracking-widest text-white/50 bg-black/50 backdrop-blur-md px-2 py-1 rounded">
                                View Case Study
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
