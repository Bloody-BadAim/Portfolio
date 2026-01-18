export type ProjectLink = {
  label: string;
  href?: string;
  note?: string;
};

export type Project = {
  title: string;
  summary: string;
  problem: string;
  built: string;
  stack: string[];
  links: ProjectLink[];
  highlight?: string;
};

export const projects: Project[] = [
  {
    title: "PDM Audit Trail / Change History (Fluor)",
    summary: "Audit trail pipeline voor PDM-objecten met per-object en aggregated web UI views.",
    problem: "Enterprise PDM had onduidelijke logging en beperkte traceability.",
    built: "Event-driven audit logging, snapshot diff logic en UI-configuratie gebouwd.",
    stack: ["STIBO STEP", "JavaScript business rules", "Event processing", "STEP Web UI"],
    links: [
      { label: "Case study", note: "Intern, geen publieke code" },
      { label: "Screenshots", note: "Intern beschikbaar" },
    ],
    highlight: "Private project — details op aanvraag.",
  },
  {
    title: "EKB-AI — PDF-to-Vector Semantic Search",
    summary: "PDF ingest pipeline met FAISS vector store en traceable bronnen.",
    problem: "Versnipperde PDF-kennis zonder betrouwbare semantic search.",
    built: "Extractie, chunking, metadata, meertalige verwerking en vector updates.",
    stack: [
      "Python",
      "LangChain",
      "FAISS",
      "HuggingFace embeddings",
      "pdfplumber",
      "Argos Translate",
    ],
    links: [
      { label: "Repo", href: "https://github.com/Bloody-BadAim" },
      { label: "Demo", note: "Repo scripts" },
      { label: "Screenshots", href: "/images/projects/placeholder-1.svg" },
    ],
  },
  {
    title: "VoteVision — Dutch Election Results Viewer",
    summary: "Full-stack app voor verkiezingsresultaten en gemodereerde discussies.",
    problem: "Inzicht in resultaten en discussieflow ontbrak in één platform.",
    built: "Results UI, forum features, deployment en E2E testing setup.",
    stack: ["Vue", "Spring Boot", "MySQL", "Render", "Cypress"],
    links: [
      { label: "Repo", href: "https://github.com/Bloody-BadAim" },
      { label: "Demo", note: "Render deployment" },
      { label: "Screenshots", href: "/images/projects/placeholder-2.svg" },
    ],
  },
  {
    title: "Gshop — Webshop Course Project",
    summary: "Webshop voor games/merch met full-stack setup en auth flows.",
    problem: "E-commerce functionaliteit en structuur in een course context.",
    built: "Full-stack modules, JWT auth middleware en deployment discipline.",
    stack: ["TypeScript", "Lit", "Node.js", "Express", "MySQL"],
    links: [
      { label: "Repo", href: "https://github.com/Bloody-BadAim" },
      { label: "Screenshots", href: "/images/projects/placeholder-3.svg" },
    ],
  },
  {
    title: "Dokkie — Shared Expenses",
    summary: "Web app voor gedeelde kosten per event met relationele data.",
    problem: "Events missen overzicht in gezamenlijke uitgaven.",
    built: "Data model, Vite frontend en deployment concepten opgezet.",
    stack: ["TypeScript", "Vite", "MySQL"],
    links: [
      { label: "Repo", href: "https://github.com/Bloody-BadAim" },
      { label: "Screenshots", href: "/images/projects/placeholder-2.svg" },
    ],
  },
  {
    title: "Code Exchange — Q&A Platform",
    summary: "Stack Overflow-style concept voor kennisdeling met tags en moderatie flows.",
    problem: "Kennisdeling vraagt om structuur en moderatie.",
    built: "Concept flow, platformstructuur en features uitgewerkt.",
    stack: ["Details in repo"],
    links: [
      { label: "Repo", href: "https://github.com/Bloody-BadAim" },
      { label: "Screenshots", href: "/images/projects/placeholder-1.svg" },
    ],
  },
];
