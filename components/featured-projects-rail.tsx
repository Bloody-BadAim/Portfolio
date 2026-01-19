// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
// import { ExternalLink, Lock } from "lucide-react";
// import type { Project } from "@/content/projects";
// import { getProjectSlug } from "@/content/projects";
// import { getProjectCoverImage } from "@/lib/project-media";
// import { Button } from "@/components/ui/button";

// type FeaturedProjectsRailProps = {
//   projects: Project[];
// };

// export function FeaturedProjectsRail({ projects }: FeaturedProjectsRailProps) {
//   const shouldReduceMotion = useReducedMotion();
//   const [isDesktop, setIsDesktop] = useState(false);
//   const [maxTranslate, setMaxTranslate] = useState(0);
//   const [sectionHeight, setSectionHeight] = useState("auto");
//   const sectionRef = useRef<HTMLDivElement | null>(null);
//   const viewportRef = useRef<HTMLDivElement | null>(null);
//   const railRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const media = window.matchMedia("(min-width: 1024px)");
//     const update = () => setIsDesktop(media.matches);
//     update();
//     media.addEventListener("change", update);
//     return () => media.removeEventListener("change", update);
//   }, []);

//   useEffect(() => {
//     if (!isDesktop) {
//       setSectionHeight("auto");
//       setMaxTranslate(0);
//       return;
//     }

//     const viewport = viewportRef.current;
//     const rail = railRef.current;
//     if (!viewport || !rail) return;

//     const updateMeasurements = () => {
//       const nextMax = Math.max(0, rail.scrollWidth - viewport.clientWidth);
//       setMaxTranslate(nextMax);
//       setSectionHeight(`${window.innerHeight + nextMax}px`);
//     };

//     updateMeasurements();
//     const ro = new ResizeObserver(updateMeasurements);
//     ro.observe(viewport);
//     ro.observe(rail);
//     window.addEventListener("resize", updateMeasurements);

//     return () => {
//       ro.disconnect();
//       window.removeEventListener("resize", updateMeasurements);
//     };
//   }, [isDesktop, projects.length]);

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end end"],
//   });
//   const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);

//   if (shouldReduceMotion || !isDesktop) {
//     return (
//       <div className="mt-8 grid gap-6">
//         {projects.map((project) => (
//           <FeaturedProjectPanel key={project.title} project={project} />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div ref={sectionRef} className="relative mt-10" style={{ height: sectionHeight }}>
//       <div className="sticky top-24">
//         <div
//           ref={viewportRef}
//           className="overflow-hidden rounded-[32px] border border-border bg-card/40 px-1 py-6 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur"
//         >
//           <motion.div
//             ref={railRef}
//             style={{ x }}
//             className="flex gap-6 will-change-transform"
//           >
//             {projects.map((project) => (
//               <FeaturedProjectPanel key={project.title} project={project} wide />
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function FeaturedProjectPanel({ project, wide }: { project: Project; wide?: boolean }) {
//   const coverImage = getProjectCoverImage(project);
//   const slug = getProjectSlug(project);
//   const repoHref =
//     project.links.find((link) => link.label.toLowerCase() === "repo")?.href ?? project.repo;

//   return (
//     <div
//       className={`flex min-h-[420px] flex-col justify-between gap-6 rounded-3xl border border-border bg-card/90 p-8 shadow-sm backdrop-blur ${
//         wide ? "w-[84vw] max-w-[960px] lg:w-[70vw]" : "w-full"
//       }`}
//     >
//       <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
//         <div className="space-y-4">
//           <div>
//             <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
//               {project.role}
//             </p>
//             <h3 className="mt-3 font-display text-3xl font-semibold">{project.title}</h3>
//             <p className="mt-3 text-sm text-muted-foreground">{project.oneLiner}</p>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {project.stack.slice(0, 8).map((item) => (
//               <span
//                 key={item}
//                 className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground"
//               >
//                 {item}
//               </span>
//             ))}
//           </div>
//           <ul className="space-y-2 text-sm text-muted-foreground">
//             {project.bullets.slice(0, 3).map((bullet) => (
//               <li key={bullet} className="flex items-start gap-2">
//                 <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70" />
//                 <span>{bullet}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="relative min-h-[240px] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background via-background/70 to-primary/10">
//           {coverImage ? (
//             <>
//               <Image
//                 src={coverImage}
//                 alt={`${project.title} preview`}
//                 fill
//                 className="object-cover"
//                 sizes="(max-width: 1024px) 100vw, 40vw"
//                 unoptimized={coverImage.startsWith("http")}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
//             </>
//           ) : (
//             <div className="flex h-full items-end p-6">
//               {repoHref ? (
//                 <Button asChild size="sm" variant="outline">
//                   <a href={repoHref} target="_blank" rel="noreferrer">
//                     Repo
//                   </a>
//                 </Button>
//               ) : (
//                 <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground">
//                   <Lock size={14} />
//                   Private
//                 </span>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="flex flex-wrap items-center gap-3">
//         <Button asChild>
//           <Link href={`/projects/${slug}`}>View case study</Link>
//         </Button>
//         {project.links.map((link) =>
//           link.href ? (
//             <Button key={link.label} asChild variant="outline">
//               <a href={link.href} target="_blank" rel="noreferrer">
//                 {link.label}
//                 <ExternalLink size={14} />
//               </a>
//             </Button>
//           ) : (
//             <span
//               key={link.label}
//               className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground"
//             >
//               <Lock size={14} />
//               {link.label}
//               {link.note ? <span className="text-muted-foreground">({link.note})</span> : null}
//             </span>
//           ),
//         )}
//       </div>
//     </div>
//   );
// }
