// // components/featured-projects-scroll.tsx
// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
// import { ArrowUpRight } from "lucide-react";
// import type { Project } from "@/content/projects";
// import { getProjectSlug } from "@/content/projects";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// type FeaturedProjectsScrollProps = {
//   projects: Project[];
// };

// const FEATURED_SUBTITLE =
//   "Compact case study snapshots with clear outcomes and implementation notes.";

// function getCoverImage(project: Project): string | null {
//   const p = project as unknown as {
//     cover?: string;
//     coverImage?: string;
//     image?: string;
//     images?: string[];
//     gallery?: string[];
//     media?: { src?: string }[];
//   };

//   if (p.coverImage) return p.coverImage;
//   if (p.cover) return p.cover;
//   if (p.image) return p.image;
//   if (Array.isArray(p.images) && p.images.length) return p.images[0] ?? null;
//   if (Array.isArray(p.gallery) && p.gallery.length) return p.gallery[0] ?? null;
//   if (Array.isArray(p.media) && p.media.length) return p.media[0]?.src ?? null;

//   return null;
// }

// export function FeaturedProjectsScroll({ projects }: FeaturedProjectsScrollProps) {
//   const shouldReduceMotion = useReducedMotion();
//   const [isDesktop, setIsDesktop] = useState(false);

//   useEffect(() => {
//     const media = window.matchMedia("(min-width: 1024px)");
//     const update = () => setIsDesktop(media.matches);
//     update();
//     media.addEventListener("change", update);
//     return () => media.removeEventListener("change", update);
//   }, []);

//   if (shouldReduceMotion || !isDesktop) {
//     return <FeaturedProjectsStatic projects={projects} />;
//   }

//   return <FeaturedProjectsStacked projects={projects} />;
// }

// function FeaturedProjectsHeader() {
//   return (
//     <div className="space-y-3">
//       <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-semibold uppercase leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground to-primary/60">
//         Latest work
//       </h2>
//       <p className="max-w-2xl text-sm text-muted-foreground">{FEATURED_SUBTITLE}</p>
//     </div>
//   );
// }

// function FeaturedProjectsStatic({ projects }: FeaturedProjectsScrollProps) {
//   return (
//     <div className="mt-10 space-y-8">
//       <FeaturedProjectsHeader />
//       <div className="grid gap-6">
//         {projects.map((project) => (
//           <ProjectStackCard key={project.title} project={project} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function FeaturedProjectsStacked({ projects }: FeaturedProjectsScrollProps) {
//   const baseTop = 120;
//   const stackGap = 72;

//   return (
//     <div className="mt-10">
//       <FeaturedProjectsHeader />

//       <div className="mt-10">
//         {projects.map((project, index) => (
//           <div key={project.title} className="relative h-[88vh]">
//             <StickyProjectCard
//               project={project}
//               index={index}
//               topPx={baseTop + index * stackGap}
//               zIndex={index + 1}
//             />
//           </div>
//         ))}

//         <div className="h-[60vh]" aria-hidden />
//       </div>
//     </div>
//   );
// }

// function StickyProjectCard({
//   project,
//   index,
//   topPx,
//   zIndex,
// }: {
//   project: Project;
//   index: number;
//   topPx: number;
//   zIndex: number;
// }) {
//   const ref = useRef<HTMLDivElement | null>(null);

//   const { scrollYProgress } = useScroll({
//     target: ref,
//     // Track as the wrapper enters the viewport and approaches the sticky line.
//     // This offset pattern is recommended for element progress tracking. :contentReference[oaicite:2]{index=2}
//     offset: ["start end", "start start"],
//   });

//   const opacity = useTransform(scrollYProgress, [0, 1], [0.45, 1]);
//   const scale = useTransform(scrollYProgress, [0, 1], [0.985, 1]);
//   const blur = useTransform(scrollYProgress, [0, 1], [6, 0]);
//   const filter = useMotionTemplate`blur(${blur}px)`;

//   return (
//     <motion.div
//       ref={ref}
//       className="sticky"
//       style={{ top: topPx, zIndex, opacity, scale, filter }}
//     >
//       <ProjectStackCard project={project} className={index === 0 ? "" : ""} />
//     </motion.div>
//   );
// }

// function ProjectStackCard({ project, className }: { project: Project; className?: string }) {
//   const slug = getProjectSlug(project);
//   const cover = useMemo(() => getCoverImage(project), [project]);

//   return (
//     <article
//       className={cn(
//         "mx-auto w-full max-w-5xl overflow-hidden rounded-[28px] border border-border bg-card/90 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur",
//         className,
//       )}
//       aria-label={`Project: ${project.title}`}
//     >
//       <div className="flex items-center justify-between gap-4 border-b border-border/60 bg-background/35 px-6 py-4">
//         <div className="min-w-0">
//           <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-primary/70">
//             {project.role}
//           </p>
//           <h3 className="mt-1 truncate text-2xl font-semibold text-foreground">{project.title}</h3>
//         </div>

//         <Button asChild size="default" variant="outline" className="h-10 w-10 rounded-xl">
//           <Link href={`/projects/${slug}`} aria-label={`View case study: ${project.title}`}>
//             <ArrowUpRight size={16} />
//           </Link>
//         </Button>
//       </div>

//       <Link href={`/projects/${slug}`} className="block">
//         <div className="relative aspect-[16/9] bg-background/20">
//           {cover ? (
//             <Image
//               src={cover}
//               alt={`${project.title} preview`}
//               fill
//               sizes="(max-width: 1024px) 100vw, 960px"
//               className="object-cover"
//               unoptimized={cover.startsWith("http")}
//             />
//           ) : (
//             <div className="flex h-full w-full items-end justify-between p-6">
//               <p className="text-sm text-muted-foreground">{project.oneLiner}</p>
//               <span className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-semibold text-muted-foreground">
//                 Case study
//               </span>
//             </div>
//           )}
//           <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
//         </div>
//       </Link>

//       <div className="p-6">
//         <p className="text-sm text-muted-foreground">{project.oneLiner}</p>

//         <div className="mt-4 flex flex-wrap gap-2">
//           {project.stack.slice(0, 10).map((item) => (
//             <span
//               key={item}
//               className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground"
//             >
//               {item}
//             </span>
//           ))}
//         </div>
//       </div>
//     </article>
//   );
// }
