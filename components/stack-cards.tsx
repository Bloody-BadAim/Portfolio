"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { Project, getProjectSlug } from "@/content/projects";
import { cn } from "@/lib/utils";

interface StackCardsProps {
    projects: Project[];
}

export function StackCards({ projects }: StackCardsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Calculate total height based on project count but closer together
    // 50vh per card allows for faster scrolling than full page
    const totalHeight = `${projects.length * 60 + 50}vh`;

    return (
        <div ref={containerRef} className="relative" style={{ height: totalHeight }}>
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                {/* Background hint or noise could go here */}

                <div className="relative w-full h-full flex items-center justify-center">
                    {projects.map((project, index) => {
                        // Calculate the range for this card's active state
                        // We divide the total scroll progress into chunks
                        const step = 1 / projects.length;
                        const rangeStart = index * step;
                        const rangeEnd = rangeStart + step;

                        // Map scroll to card entry/exit
                        // This creates an "Incoming Stack" effect
                        return (
                            <Card
                                key={project.title}
                                project={project}
                                index={index}
                                total={projects.length}
                                progress={scrollYProgress}
                                range={[rangeStart, 1]} // Card stays visible until end once entered? 
                                // Actually, let's make them stack.
                                // Card 0 is always there. Card 1 slides over.
                                targetScale={1 - (projects.length - index) * 0.05}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

interface CardProps {
    project: Project;
    index: number;
    total: number;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
}

function Card({ project, index, total, progress, range, targetScale }: CardProps) {
    const slug = getProjectSlug(project);

    // Logic:
    // Card 0: Static or subtle fade.
    // Card > 0: Enters from bottom based on progress.

    // We want the previous card to scale down as the next one comes in.
    // So distinct range logic:
    // Entry: (index - 1) / total -> index / total

    const step = 1 / total;
    const startObj = Math.max(0, (index - 1) * step); // When previous card finishes, I start? No, overlap.
    const myStart = Math.max(0, (index * step) - 0.1); // Start slightly earlier for smoother overlap

    // For the very first card, it's already there.
    // For others: TranslateY from 100vh to 0.

    // Refined logic for "Apple-style" stacking:
    // All cards are physically in the DOM.
    // Card i 's Y position is driven by scroll.

    // Transform range: [start of window, end of window] for this specific index
    // Let's use a simpler logic:
    // progress 0 -> 1
    // card i comes in at progress = i * (1/total)

    // range for "movement"
    const entryStart = (index - 1) * step;
    const entryEnd = index * step;

    // Y Position
    const y = useTransform(
        progress,
        [entryStart, entryEnd],
        ['110vh', '0vh']
    );

    // Scale: When the *next* card comes in, I scale down.
    // Next card comes in at: index * step -> (index+1) * step
    const exitStart = index * step;
    const exitEnd = (index + 1) * step;
    const scale = useTransform(
        progress,
        [exitStart, exitEnd],
        [1, 0.90] // Scale down slightly
    );

    // Opacity: Fade out slightly when covered
    const opacity = useTransform(
        progress,
        [exitStart, exitEnd],
        [1, 0] // Actually fade to 0 so we don't render hidden layers? No, stack effect needs layers. 
        // Let's fade to 0.4 purely for depth.
    );

    // Use proper springing for Y to feel elastic?
    // Native useTransform is tighter to scroll. Spring feels laggy sometimes.

    // Unconditional hooks
    const firstY = useTransform(progress, [0, step], ['0vh', '0vh']);
    const firstScale = useTransform(progress, [0, step], [1, 0.90]);

    // Opacity hook must be unconditional
    const fadingOpacity = useTransform(progress, [exitStart, exitEnd], [1, 0.2]);

    // Select values based on index
    const isFirst = index === 0;
    const finalY = isFirst ? firstY : y;
    const finalScale = isFirst ? firstScale : scale;
    const finalOpacity = index < total - 1 ? fadingOpacity : 1;

    return (
        <motion.div
            style={{
                y: finalY,
                scale: finalScale,
                zIndex: index,
                top: 0,
                position: 'absolute',
                opacity: finalOpacity,
            }}
            className="w-[90vw] sm:w-[85vw] md:w-[700px] lg:w-[800px] h-[400px] md:h-[500px]"
        >
            <Link href={`/projects/${slug}`} className="block h-full relative group">
                <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-black/90 backdrop-blur-2xl shadow-2xl transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_0_80px_rgba(45,212,191,0.2)]">

                    {/* Header Image / Gradient - Full Background for "Max Impression" */}
                    <div className="absolute inset-0 w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
                        {/* Abstract or Image Background */}
                        <div className={cn(
                            "absolute inset-0 bg-gradient-to-br transition-transform duration-1000 group-hover:scale-110",
                            index % 2 === 0 ? "from-gray-900 to-gray-800" : "from-gray-900 to-slate-900"
                        )} />

                        {/* Mesh Gradient 2.0 */}
                        <div className={cn(
                            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-30 blur-[100px] animate-pulse",
                            index % 3 === 0 ? "bg-primary/30" : index % 3 === 1 ? "bg-blue-500/30" : "bg-purple-500/30"
                        )} />
                    </div>

                    {/* Content */}
                    <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-12">

                        <div className="mb-auto pt-4 flex justify-between items-start">
                            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white/10 border border-white/5 text-white/90 backdrop-blur-md">
                                {project.role}
                            </span>
                            <div className="text-white/20 text-5xl font-black tracking-tighter">
                                0{index + 1}
                            </div>
                        </div>

                        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">
                            {project.title}
                        </h3>

                        <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-2xl">
                            {project.oneLiner}
                        </p>

                        <div className="flex items-center justify-between border-t border-white/10 pt-6">
                            <div className="flex gap-3">
                                {project.stack.slice(0, 4).map((tech) => (
                                    <span key={tech} className="text-xs font-medium text-white/50 bg-white/5 px-2 py-1 rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-primary transition-colors">
                                Open Case Study <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
