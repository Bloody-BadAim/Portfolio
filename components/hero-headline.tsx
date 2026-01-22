// components/hero-headline.tsx
"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type HeroProfile = {
  name: string;
  roles: string[];
  valueProposition: string;
  email: string;
  links: {
    linkedin: string;
    github: string;
  };
  preferences: string[];
};

export function HeroHeadline({ profile }: { profile: HeroProfile }) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const portraitY = useTransform(
    scrollY,
    [0, 600],
    shouldReduceMotion ? [0, 0] : [0, -60],
  );

  const rolesLabel = profile.roles.join(" | ");
  // const subtitle =
  //   profile.roles.length >= 2 ? `${profile.roles[0]} / ${profile.roles[1]}` : profile.roles[0];

  return (
    <section className="relative overflow-hidden rounded-[44px] border border-border bg-card/40 shadow-[0_40px_120px_rgba(15,23,42,0.35)] backdrop-blur">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/45 to-background/95" />

      <div className="relative z-10 p-8 pb-28 sm:p-10 sm:pb-32 lg:p-12 lg:pb-36">
        <div className="flex items-center justify-between gap-6">
          <p className="text-[17px] font-medium uppercase tracking-[0.35em] text-primary/70">
            {rolesLabel}
          </p>
        </div>

        <motion.div
          style={{ y: portraitY }}
          className="relative mx-auto mt-4 flex h-[300px] w-[300px] items-center justify-center sm:h-[400px] sm:w-[400px] lg:h-[440px] lg:w-[440px]"
        >
          <div className="absolute inset-0 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative h-full w-full overflow-hidden rounded-full border border-border bg-card/60 p-1">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src="/images/linkedin.png"
                alt="Portrait"
                fill
                priority
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 440px"
                className="object-cover grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.4)_100%)]" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-6 bottom-6 z-20 sm:inset-x-10 lg:inset-x-12">
        <div className="flex items-center justify-between gap-4">
          {/* <p className="text-sm text-muted-foreground">{subtitle}</p> */}
          <Button asChild size="sm" variant="outline" className="rounded-full">
            {/* <a href={`mailto:${profile.email}`}>
              Get in touch
              <ArrowRight size={14} />
            </a> */}
          </Button>
        </div>

        <h1 className="pointer-events-none mt-4 text-center font-display text-[clamp(3.5rem,10vw,7.5rem)] font-semibold leading-[0.95] pb-4 text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground to-primary/60 lg:text-[clamp(4rem,12vw,9rem)]">
          {profile.name.toUpperCase()}
        </h1>
      </div>
    </section>
  );
}
