"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "proof", label: "Proof" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "leadership", label: "Leadership" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [active, setActive] = useState("proof");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-6 z-20 hidden w-full justify-center lg:flex">
      <div className="flex items-center gap-6 rounded-full border border-border bg-card/80 px-6 py-3 text-sm shadow-sm backdrop-blur">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={cn(
              "transition-colors",
              active === section.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {section.label}
          </a>
        ))}
        <span
          className="ml-2 h-2 w-2 rounded-full bg-primary"
          aria-hidden
        />
      </div>
    </nav>
  );
}
