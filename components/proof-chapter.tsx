"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const PROOF_LABELS = ["Traceability", "RAG", "Program Ops", "Reliability"];

type ProofChapterProps = {
  items: string[];
};

export function ProofChapter({ items }: ProofChapterProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cards = items.slice(0, 3);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const step = cards.length ? 1 / cards.length : 1;
  const cardMotion = cards.map((item, index) => {
    const start = index * step;
    const mid = start + step * 0.45;
    const end = start + step;
    const range = [start - step * 0.35, start, mid, end];
    const scale = useTransform(scrollYProgress, range, [0.92, 0.96, 1, 0.92]);
    const opacity = useTransform(scrollYProgress, range, [0, 0.6, 1, 0.2]);
    const x = useTransform(scrollYProgress, range, [70, 36, 0, -24]);
    const blur = useTransform(scrollYProgress, range, [6, 3, 0, 3]);
    const filter = useMotionTemplate`blur(${blur}px)`;

    return { item, index, scale, opacity, x, filter };
  });

  const showStatic = shouldReduceMotion || !isDesktop;

  return (
    <section id="proof" className={showStatic ? "mt-24" : "mt-28"}>
      {showStatic ? (
        <div className="flex flex-col gap-8">
          <h2 className="font-display text-3xl font-semibold">Proof</h2>
          <p className="text-sm text-muted-foreground">
            Recruiter friendly proof with a focus on traceability, reliability, and clear delivery.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {cards.map((item, index) => (
              <div
                key={item}
                className="rounded-3xl border border-border bg-card/90 p-6 shadow-sm backdrop-blur"
              >
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold uppercase tracking-[0.2em] text-primary/80">
                    {PROOF_LABELS[index] ?? "Proof"}
                  </span>
                  <span className="font-semibold tracking-[0.2em] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}/{String(cards.length).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div ref={containerRef} className="relative min-h-[190vh]">
          <div className="sticky top-24 grid gap-10 lg:grid-cols-[0.45fr_0.55fr]">
            <div className="space-y-6">
              <h2 className="scanline-text font-display text-5xl font-semibold tracking-[0.08em] sm:text-6xl">
                PROOF
              </h2>
              <p className="text-sm text-muted-foreground">
                Recruiter friendly proof with a focus on traceability, reliability, and clear delivery.
              </p>
            </div>
            <div className="relative min-h-[360px]">
              {cardMotion.map(({ item, index, scale, opacity, x, filter }) => (
                <motion.div
                  key={item}
                  style={{ scale, opacity, x, filter, zIndex: cards.length - index }}
                  className="absolute inset-0 rounded-3xl border border-border bg-card/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.2)] backdrop-blur"
                >
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-semibold uppercase tracking-[0.2em] text-primary/80">
                      {PROOF_LABELS[index] ?? "Proof"}
                    </span>
                    <span className="font-semibold tracking-[0.2em] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}/
                      {String(cards.length).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-5 text-sm text-muted-foreground">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
