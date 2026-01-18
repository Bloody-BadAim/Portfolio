export type ProjectLink = {
  label: string;
  href?: string;
  note?: string;
};

export type Project = {
  title: string;
  oneLiner: string;
  role: string;
  stack: string[];
  bullets: string[];
  highlights: string[];
  results?: string[];
  gallery?: string[];
  links: ProjectLink[];
  image?: string;
  repo?: string;
  featured?: boolean;
  order: number;
};

export const getProjectSlug = (project: Project | string) => {
  const title = typeof project === "string" ? project : project.title;
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const projects: Project[] = [
  {
    title: "EKB AI | PDF to Vector Semantic Search",
    oneLiner: "Semantic PDF search with traceable sources and bilingual NL↔EN retrieval.",
    role: "Owner, end to end implementation (ingestion, chunking, retrieval, operations).",
    stack: [
      "Python",
      "FAISS",
      "HuggingFace embeddings",
      "LangChain",
      "pdfplumber",
      "pandas",
      "Argos Translate",
      "PyTorch",
    ],
    bullets: [
      "Built PDF ingestion for text and tables, indexing chunks into FAISS with source and page metadata.",
      "Implemented chunking with overlap, configurable retrieval, and bilingual NL↔EN processing for consistent results.",
      "Added incremental indexing and traceable citations so answers can be audited back to the source page.",
    ],
    highlights: [
      "Traceable sources",
      "Incremental indexing",
      "Bilingual NL↔EN search",
      "FAISS vector store",
    ],
    results: ["Searchable PDF knowledge base", "Source linked answers for auditability"],
    gallery: ["/images/EKB.png","/images/EKB2.png"],
    links: [{ label: "Repo", href: "https://github.com/Bloody-BadAim/EKB-AI" }],
    repo: "https://github.com/Bloody-BadAim/EKB-AI",
    featured: true,
    order: 1,
  },
  {
    title: "VoteVision | Dutch Election Results Viewer",
    oneLiner: "Election results explorer with moderated discussions and deployment ready flows.",
    role: "Team project (4). Full stack developer (results UI, moderation flows, E2E testing).",
    stack: ["Vue", "Spring Boot", "MySQL", "Render", "Cypress"],
    bullets: [
      "Delivered results exploration across regions, parties, and candidates with a clear data breakdown flow.",
      "Built moderation ready discussion tooling (reporting, banning) with role aware UI states.",
      "Added Cypress E2E coverage for critical journeys and aligned deployment setup for stability.",
    ],
    highlights: ["E2E tested flows", "Moderation tooling", "Region/party filters", "Deployment-ready setup"],
    results: ["Reliable election results browsing", "Moderation ready discussion space"],
    gallery: ["/images/VoteVision.png","/images/VoteVision2.png"],
    links: [{ label: "Repo", href: "https://github.com/Bloody-BadAim/Election" }],
    repo: "https://github.com/Bloody-BadAim/Election",
    featured: true,
    order: 2,
  },
  {
    title: "Fluor | PDM Audit Trail / Change History (STIBO STEP)",
    oneLiner: "Event driven audit trail and change history for enterprise PDM objects in STIBO STEP.",
    role: "Internship project owner (business rules, event processing, Web UI views, data model).",
    stack: ["STIBO STEP", "JavaScript business rules", "Event processing", "STEP Web UI"],
    bullets: [
      "Implemented event driven change logging with snapshot diff to create structured audit entries per update.",
      "Delivered per object and aggregated Web UI views so audits are searchable and debuggable.",
      "Aligned data model and logging conventions to keep traceability consistent across pipelines.",
    ],
    highlights: ["Searchable audit UI", "Snapshot diffing", "Event driven audit trail", "Traceable change history"],
    results: ["Searchable audit inspection", "Traceable change history across PDM objects"],
    gallery: [],
    links: [{ label: "Repo", note: "Private" }],
    featured: false,
    order: 3,
  },
  {
    title: "Gshop (LucaStars Webshop)",
    oneLiner: "Course webshop with layered APIs, auth flows, and test ready structure.",
    role: "Full stack developer (API structure, auth patterns, testing).",
    stack: ["TypeScript", "Lit", "Express", "MySQL", "JWT", "Vitest"],
    bullets: [
      "Implemented a layered API structure with shared types to keep backend and frontend aligned.",
      "Built JWT auth flows with clear validation boundaries for predictable session handling.",
      "Prepared test tooling and project structure to keep regressions easy to spot.",
    ],
    highlights: ["Shared type contracts", "JWT auth flows", "Test ready structure"],
    results: ["Consistent frontend backend contracts"],
    gallery: ["/images/Gshop.png","/images/Gshop2.png"],
    links: [{ label: "Repo", href: "https://github.com/Bloody-BadAim/Gshop" }],
    repo: "https://github.com/Bloody-BadAim/Gshop",
    featured: true,
    order: 4,
  },
  {
    title: "Dokkie | Shared Expenses",
    oneLiner: "Shared expenses tracker with relational modeling and clear balance views.",
    role: "Full stack developer (data model and UI flow).",
    stack: ["TypeScript", "Vite", "MySQL"],
    bullets: [
      "Designed a relational data model for events, participants, and payments to keep totals consistent.",
      "Shipped a clean UI flow for creating events and tracking balances with predictable data handling.",
    ],
    highlights: ["Relational expense model", "Balance tracking UI", "Predictable data flow"],
    results: ["Clear shared expense visibility"],
    gallery: ["/images/Dokkie.png","/images/Dokkie2.png"],
    links: [{ label: "Repo", href: "https://github.com/Bloody-BadAim/Dokkie" }],
    repo: "https://github.com/Bloody-BadAim/Dokkie",
    featured: false,
    order: 5,
  },
  {
    title: "Code Exchange | Q&A Platform",
    oneLiner: "Q&A platform concept with tagging and moderation ready UX patterns.",
    role: "Full stack developer (feature planning and implementation).",
    stack: ["TypeScript", "Vite"],
    bullets: [
      "Designed Q&A flows with tagging and moderation ready UX patterns to keep content discoverable.",
      "Implemented core UI screens and data flow scaffolding for future backend integration.",
    ],
    highlights: ["Tag driven discovery", "Moderation ready UX", "Scaffolded data flows"],
    results: ["Structured knowledge sharing experience"],
    gallery: ["/images/Codex.png","/images/Codex2.png"],
    links: [{ label: "Repo", href: "https://github.com/Bloody-BadAim/Code-exchange" }],
    repo: "https://github.com/Bloody-BadAim/Code-exchange",
    featured: false,
    order: 6,
  },
{
  title: "AdvGame | Text based adventure game",
  oneLiner:
    "Course team project: browser based text adventure with choice driven progression and a polished animated UI.",
  role:
    "Team project (SE Block 3). Developer: game flow/state, UI interactions, and animation integration.",
  stack: ["JavaScript", "TypeScript", "HTML/CSS", "GSAP", "ESLint", "MkDocs", "CI (GitLab config)"],
  bullets: [
    "Built a choice driven flow for a text adventure, structuring scenes and transitions in a maintainable way.",
    "Integrated UI motion and interaction feedback (animations/transitions) to make the game feel responsive and readable.",
    "Kept the project developer friendly with TypeScript configuration, linting, and documentation/CI scaffolding.",
  ],
  highlights: [
    "Choice driven flow",
    "Animated UI",
    "TypeScript config",
    "Docs + CI scaffolding",
  ],
  results: [
    "Playable text based adventure prototype",
    "Reusable structure for scenes/choices and UI transitions",
  ],
  gallery: ["/images/Adv.png","/images/Adv2.png"],
  links: [{ label: "Repo", href: "https://github.com/Bloody-BadAim/AdvGame" }],
  repo: "https://github.com/Bloody-BadAim/AdvGame",
  featured: false,
  order: 7,
},
];
