"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "proof", label: "Proof" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "references", label: "References" },
];

export function Navbar() {
  const [active, setActive] = useState("proof");

  useEffect(() => {
    const elements = sections
      .map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }))
      .filter(
        (item): item is { id: string; element: HTMLElement } => Boolean(item.element),
      );

    const isNearBottom = () =>
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 8;

    const getActiveByViewport = () => {
      if (elements.length === 0) return "proof";
      if (isNearBottom()) return elements[elements.length - 1].id;

      const midline = window.innerHeight * 0.45;
      let nextActive = elements[0].id;
      let closest = Number.POSITIVE_INFINITY;

      elements.forEach(({ id, element }) => {
        const { top, bottom } = element.getBoundingClientRect();
        if (top <= midline && bottom >= midline) {
          nextActive = id;
          closest = 0;
          return;
        }
        const distance = Math.min(Math.abs(top - midline), Math.abs(bottom - midline));
        if (distance < closest) {
          closest = distance;
          nextActive = id;
        }
      });

      return nextActive;
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const nextActive = getActiveByViewport();
        setActive((current) => (current === nextActive ? current : nextActive));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav className="sticky top-6 z-20 hidden w-full justify-center lg:flex">
      <div className="flex items-center gap-6 rounded-full border border-border bg-card/80 px-6 py-3 text-sm shadow-sm backdrop-blur">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`/#${section.id}`}
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

        {/* Language Toggle */}
        <div className="mx-2 h-4 w-px bg-border/50" />
        <div className="flex items-center gap-1 font-medium">
          <span className="text-muted-foreground/40 text-xs cursor-pointer hover:text-foreground transition-colors">NL</span>
          <span className="text-muted-foreground/20 text-xs">/</span>
          <span className="text-primary text-xs cursor-default">EN</span>
        </div>

      </div>
    </nav>
  );
}
