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
    oneLiner: "PDF ingestion and FAISS vector search with page level traceability and NL↔EN processing.",
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
      "Extracted text and tables from PDFs and indexed them into FAISS vector stores with source and page traceability.",
      "Implemented chunking with overlap, configurable retrieval parameters, multilingual NL↔EN processing, and incremental updates.",
    ],
    links: [{ label: "Repo", href: "https://github.com/Bloody-BadAim/EKB-AI" }],
    repo: "https://github.com/Bloody-BadAim/EKB-AI",
    featured: true,
    order: 1,
  },
  {
    title: "VoteVision — Dutch Election Results Viewer",
    oneLiner: "Full stack election results explorer with discussion flows and moderation mechanics.",
    role: "Team project (4). Full stack developer (results UI, moderation flows, E2E testing).",
    stack: ["Vue", "Spring Boot", "MySQL", "Render", "Cypress"],
    bullets: [
      "Built election results exploration (region, party, candidate) and discussion flows with a production style deployment setup.",
      "Implemented moderation ready mechanics (reporting, banning) and Cypress E2E tests for critical user journeys.",
    ],
  links: [{ label: "Repo", href: "https://github.com/Bloody-BadAim/Election" }],
    repo: "https://github.com/Bloody-BadAim/Election",
    featured: false,
    order: 2,
  },
  {
    title: "Fluor — PDM Audit Trail / Change History (STIBO STEP)",
    oneLiner: "Event driven audit trail and change history for enterprise PDM objects in STIBO STEP.",
    role: "Internship project owner (business rules, event processing, Web UI views, data model).",
    stack: ["STIBO STEP", "JavaScript business rules", "Event processing", "STEP Web UI"],
    bullets: [
      "Implemented event driven change logging with snapshot diff to generate structured audit entries per change event.",
      "Delivered per object and aggregated Web UI views to make audits searchable for debugging and traceability.",
    ],
    links: [{ label: "Repo", note: "Private" }],
    featured: true,
    order: 3,
  },
  {
    title: "Gshop (LucaStars Webshop)",
    oneLiner: "Course webshop with layered API structure, auth flows, and testability setup.",
    role: "Full stack developer (API structure, auth patterns, testing).",
    stack: ["TypeScript", "Lit", "Express", "MySQL", "JWT", "Vitest"],
    bullets: [
      "Implemented a maintainable API structure and shared types across modules to keep backend and frontend aligned.",
      "Implemented JWT auth patterns and reinforced testability via a clean project structure and test tooling.",
    ],
    links: [{ label: "Repo", href: "https://github.com/Bloody-BadAim/Gshop" }],
    repo: "https://github.com/Bloody-BadAim/Gshop",
    featured: false,
    order: 4,
  },
  {
    title: "Dokkie — Shared Expenses",
    oneLiner: "Shared expenses tracker with relational modeling for events, participants, and payments.",
    role: "Full stack developer (data model and UI flow).",
    stack: ["TypeScript", "Vite", "MySQL"],
    bullets: [
      "Designed a relational data model for events, participants, and payments to keep expense tracking consistent.",
      "Delivered a clean UI flow for creating events and tracking balances with predictable data handling.",
    ],
    links: [{ label: "Repo", href: "https://github.com/Bloody-BadAim/Dokkie" }],
    repo: "https://github.com/Bloody-BadAim/Dokkie",
    featured: false,
    order: 5,
  },
  {
    title: "Code Exchange — Q&A Platform",
    oneLiner: "Q&A platform concept focused on structured knowledge sharing and moderation ready UX patterns.",
    role: "Full stack developer (feature planning and implementation).",
    stack: ["TypeScript", "Vite"],
    bullets: [
      "Designed Q&A flows with tags and moderation ready UX patterns to keep information discoverable.",
      "Implemented core UI screens and data flow scaffolding to support further backend integration.",
    ],
    links: [{ label: "Repo", href: "https://github.com/Bloody-BadAim/Code-exchange" }],
    repo: "https://github.com/Bloody-BadAim/Code-exchange",
    featured: false,
    order: 6,
  },
];
