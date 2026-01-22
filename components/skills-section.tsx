"use client";

import { profile } from "@/content/profile";
import { BadgeCheck } from "lucide-react";

export function SkillsSection() {
    const skillCategories = [
        { id: "frontend", label: "Frontend Development", items: profile.skills.frontend },
        { id: "backend", label: "Backend Development", items: profile.skills.backend },
        { id: "ai", label: "AI & Data Engineering", items: profile.skills.ai },
        { id: "automation", label: "Automation", items: profile.skills.automation },
        { id: "testing", label: "Testing / DevOps", items: profile.skills.testing },
        {
            id: "leadership",
            label: "Leadership & Community",
            items: [
                "Community Building",
                "Stakeholder Management",
                "Event Operating Models",
                "Public Speaking",
                "Team Coordination"
            ]
        },
    ];

    return (
        <section id="skills" className="py-24">
            <div className="container mx-auto px-6">
                <h2 className="text-2xl font-semibold mb-12 text-center text-primary">Skills & Experience</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {skillCategories.map((category) => (
                        <div
                            key={category.id}
                            className="group bg-card border border-border rounded-[2rem] p-8 md:p-10 hover:bg-transparent hover:border-primary transition-colors duration-300"
                        >
                            <h3 className="text-xl font-medium text-center mb-8 text-primary">
                                {category.label}
                            </h3>

                            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                {category.items.map((skill) => (
                                    <article key={skill} className="flex gap-3 items-start">
                                        <BadgeCheck className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-foreground text-[0.95rem] leading-tight">{skill}</h4>
                                            {/* You can add level here if available in future: <small className="text-muted-foreground text-xs">Experienced</small> */}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
