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
  links: ProjectLink[];
  image?: string;
  repo?: string;
  featured?: boolean;
  order: number;
};

export const projects: Project[] = [
  {
    title: "EKB AI — PDF to Vector Semantic Search",
    oneLiner: "PDF to FAISS semantic search with traceable sources and multilingual processing.",
    role: "Builder — pipeline, retrieval logic, and operational guardrails.",
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
      "Extracted text and tables from PDFs and created FAISS vector stores for semantic search with page level traceability.",
      "Implemented chunking with overlap, configurable retrieval parameters, NL↔EN processing, and incremental updates.",
    ],
    links: [{ label: "Repo", href: "https://github.com/Bloody-BadAim/EKB-AI" }],
    repo: "https://github.com/Bloody-BadAim/EKB-AI",
    featured: true,
    order: 1,
  },
  {
    title: "VoteVision — Dutch Election Results Viewer",
    oneLiner: "Full stack viewer for Dutch election results with discussion flows.",
    role: "Full stack developer — results UI, moderation flows, and testing.",
    stack: ["Vue", "Spring Boot", "MySQL", "Render", "Cypress"],
    bullets: [
      "Built election results exploration (region, party, candidate) plus discussion flows.",
      "Implemented moderation-ready mechanics (reporting, banning) and Cypress E2E tests for critical flows.",
    ],
    links: [
      { label: "Repo", note: "Private (available on request)" },
      { label: "Demo (frontend)", href: "https://frontend-vue-172v.onrender.com" },
      { label: "Demo (backend)", href: "https://backend-java-1qgh.onrender.com" },
    ],
    featured: true,
    order: 2,
  },
  {
    title: "Fluor — PDM Audit Trail / Change History (STIBO STEP)",
    oneLiner: "Audit trail and change history pipeline for PDM objects.",
    role: "Automation Specialist / Software Engineer Intern.",
    stack: ["STIBO STEP", "JavaScript business rules", "Event processing", "STEP Web UI"],
    bullets: [
      "Implemented event-driven change logging and snapshot diff to generate structured audit entries.",
      "Built per object and aggregated Web UI views for searchable audit inspection and debugging.",
    ],
    links: [{ label: "Repo", note: "Private (available on request)" }],
    featured: true,
    order: 3,
  },
  {
    title: "Gshop (LucaStars Webshop)",
    oneLiner: "Course webshop with full-stack modules and auth flows.",
    role: "Full stack developer — APIs, auth, and testing setup.",
    stack: ["TypeScript", "Lit", "Express", "MySQL", "JWT", "Vitest"],
    bullets: [
      "Implemented full-stack modules with shared types and structured API layers.",
      "Set up JWT auth flows and documentation ready project structure.",
    ],
    links: [{ label: "Repo", href: "https://github.com/Bloody-BadAim/Gshop" }],
    repo: "https://github.com/Bloody-BadAim/Gshop",
    featured: false,
    order: 4,
  },
  {
    title: "Dokkie — Shared Expenses",
    oneLiner: "Event expense tracker with relational data modeling.",
    role: "Full stack developer — data model and UI flow.",
    stack: ["TypeScript", "Vite", "MySQL"],
    bullets: [
      "Designed relational data model for events, participants, and payments.",
      "Delivered a clean UI flow for creating events and tracking balances.",
    ],
    links: [{ label: "Repo", href: "https://github.com/Bloody-BadAim/Dokkie" }],
    repo: "https://github.com/Bloody-BadAim/Dokkie",
    featured: false,
    order: 5,
  },
  {
    title: "Code Exchange — Q&A Platform",
    oneLiner: "Stack Overflow style platform concept for structured knowledge sharing.",
    role: "Full stack developer — feature planning and implementation.",
    stack: ["TypeScript", "Vite"],
    bullets: [
      "Shaped Q&A flows with tags, moderation-ready UX, and profile features.",
      "Implemented core UI screens and data flow scaffolding.",
    ],
    links: [{ label: "Repo", href: "https://github.com/Bloody-BadAim/Code-exchange" }],
    repo: "https://github.com/Bloody-BadAim/Code-exchange",
    featured: false,
    order: 6,
  },
];
