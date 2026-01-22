"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Rocket, Zap, Bot, Code2, Database, Sparkles } from "lucide-react";

interface StatProps {
    end: number;
    suffix?: string;
    prefix?: string;
    label: string;
    duration?: number;
}

function AnimatedStat({ end, suffix = "", prefix = "", label, duration = 2 }: StatProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (!isInView) return;

        if (shouldReduceMotion) {
            setCount(end);
            return;
        }

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, end, duration, shouldReduceMotion]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-sm hover:bg-card/60 hover:border-primary/30 transition-all duration-300"
        >
            <div className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-br from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                {prefix}{count}{suffix}
            </div>
            <div className="mt-2 text-sm md:text-base text-muted-foreground font-medium">
                {label}
            </div>
        </motion.div>
    );
}

interface HighlightCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    index: number;
}

function HighlightCard({ icon, title, description, index }: HighlightCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
                delay: shouldReduceMotion ? 0 : index * 0.1
            }}
            whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
            className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/50 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(45,212,191,0.15)]"
        >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}

export function StatsSection() {
    const stats = [
        { end: 10, suffix: "+", label: "Projects Delivered", duration: 2 },
        { end: 50, suffix: "+", label: "Technologies", duration: 2.5 },
        { end: 7, suffix: " Years", label: "Experience", duration: 1 },
    ];

    const highlights = [
        {
            icon: <Rocket className="w-6 h-6" />,
            title: "Build Full Stack",
            description: "I ship production ready web applications with Vue/React frontends and Node/Java backends. Clean code, traceable architecture.",
        },
        {
            icon: <Bot className="w-6 h-6" />,
            title: "Create AI Solutions",
            description: "I build intelligent tools with FAISS, LangChain, and custom embeddings. From semantic search to automated workflows.",
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Deliver Fast APIs",
            description: "I design RESTful services with Express/NestJS. JWT auth, PostgreSQL, structured logging, and deployment ready code.",
        },
    ];

    return (
        <section id="proof" className="py-16 md:py-24">
            <div className="container mx-auto px-6">
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <AnimatedStat key={index} {...stat} />
                    ))}
                </div>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {highlights.map((highlight, index) => (
                        <HighlightCard key={index} index={index} {...highlight} />
                    ))}
                </div>
            </div>
        </section>
    );
}
