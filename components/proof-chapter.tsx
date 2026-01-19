"use client";

import { useMemo, useRef } from "react";
import {
  motion,
  type MotionValue,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type ProofChapterProps = {
  items: string[];
  className?: string;
};

/**
 * Fixes: Hooks cannot be called inside callbacks (map/forEach).
 * We render a child component per item; hooks live at the top-level of that child.
 */
export function ProofChapter({ items, className }: ProofChapterProps) {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Stable indices for rendering.
  const indexed = useMemo(
    () => items.map((text, index) => ({ text, index })),
    [items],
  );

  return (
    <div ref={sectionRef} className={cn("relative", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        {indexed.map(({ text, index }) => (
          <ProofChapterItem
            key={`${index}-${text}`}
            text={text}
            index={index}
            total={indexed.length}
            scrollYProgress={scrollYProgress}
            reduceMotion={shouldReduceMotion}
          />
        ))}
      </div>
    </div>
  );
}

function ProofChapterItem({
  text,
  index,
  total,
  scrollYProgress,
  reduceMotion,
}: {
  text: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean|null;
}) {
  // Create a “window” of progress for this item.
  // Example: total=4 => each gets a 0.25 segment.
  const step = total ? 1 / total : 1;
  const start = index * step;
  const mid = start + step * 0.55;
  const end = start + step;

  // Give a little pre-roll so it starts animating slightly before its segment.
  const range = [Math.max(0, start - step * 0.35), start, mid, end];

  const opacity = useTransform(scrollYProgress, range, reduceMotion ? [1, 1, 1, 1] : [0.35, 1, 1, 0.6]);
  const y = useTransform(scrollYProgress, range, reduceMotion ? [0, 0, 0, 0] : [10, 0, 0, -6]);
  const scale = useTransform(scrollYProgress, range, reduceMotion ? [1, 1, 1, 1] : [0.98, 1, 1, 0.99]);
  const blur = useTransform(scrollYProgress, range, reduceMotion ? [0, 0, 0, 0] : [6, 0, 0, 2]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      style={{ opacity, y, scale, filter }}
      className="rounded-2xl border border-border bg-background/60 p-4 will-change-transform"
    >
      {text}
    </motion.div>
  );
}
