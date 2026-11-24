// Reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
}), { threshold: 0.08 });
document.querySelectorAll("section,.project,.role").forEach(e => {
  e.style.opacity = 0;
  e.style.transform = "translateY(16px)";
  e.style.transition = "opacity .6s ease,transform .6s ease";
  io.observe(e);
});
const s = document.createElement("style");
s.textContent = ".show{opacity:1!important;transform:none!important}";
document.head.appendChild(s);

// 1. Interactive Terminal Tabs
const termData = {
  viwo: `<span>project</span> = <b>VirtualWorld</b>\n<span>model</span> = <b>world state ≠ LLM</b>\n<span>events</span> = <b>SQLite + timeline branching</b>\n<span>tooling</span> = <b>60+ MCP tools · 4,800+ tests</b>\n<span>goal</span> = <b>systems that keep living</b>\n\n<b>▋</b>`,
  codesearch: `<span>project</span> = <b>CodeSearch</b>\n<span>ranking</span> = <b>SQLite FTS5 BM25 + embeddings</b>\n<span>parsers</span> = <b>AST · PDF · CSV · JSON · images</b>\n<span>routing</span> = <b>multi-index + reranker + MCP</b>\n<span>goal</span> = <b>instant local codebase clarity</b>\n\n<b>▋</b>`,
  aura: `<span>project</span> = <b>Aura</b>\n<span>bus</span> = <b>async EventBus (multi-agent)</b>\n<span>memory</span> = <b>Neo4j graph + self-reflection</b>\n<span>senses</span> = <b>OCR screen watch · Kokoro TTS</b>\n<span>goal</span> = <b>local autonomous assistant</b>\n\n<b>▋</b>`
};
const termBody = document.getElementById("termBody");
document.querySelectorAll(".term-tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".term-tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    termBody.innerHTML = termData[btn.dataset.term];
  });
});

// 2. Interactive "Run 1 Tick" Architecture Simulator
const scenarios = [
  {
    name: "Tavern Storm",
    steps: [
      "[01 WORLD] Tick 412: Storm lowers tavern temp to 9°C. Fireplace = unlit, firewood = 3.",
      "[02 PERCEPTION] Character 'Maren' perceives cold draft + unlit hearth (room visibility: dim).",
      "[03 REASONING] Memory recalls firewood behind bar; warmth need rises above social need.",
      "[04 ACTION] Structured proposal: { action: 'light_fire', item: 'firewood', target: 'hearth' }.",
      "[05 VALIDATION] Engine checks inventory & rules -> APPROVED. firewood: 3 -> 2, temp rising."
    ]
  },
  {
    name: "Contradiction Check",
    steps: [
      "[01 WORLD] Tick 805: Gatekeeper is in Market Square, not at North Gate.",
      "[02 PERCEPTION] Agent enters Market Square and sees Gatekeeper arguing with a merchant.",
      "[03 REASONING] Associative recall flags old belief ('Gatekeeper never leaves post').",
      "[04 ACTION] Proposal: { action: 'ask_question', target: 'gatekeeper', topic: 'post' }.",
      "[05 VALIDATION] Engine logs dialogue event, marks old belief invalidated at tick 805."
    ]
  },
  {
    name: "Backsim Handoff",
    steps: [
      "[01 WORLD] Tick 1024: Player fast-forwards 4 hours across village graph.",
      "[02 PERCEPTION] Off-screen characters run on low-cost deterministic Backsim (0 LLM calls).",
      "[03 REASONING] Needs + schedules move blacksmith from forge -> tavern at 18:00.",
      "[04 ACTION] Player enters tavern; blacksmith seamlessly promotes to full LLM cognition.",
      "[05 VALIDATION] Same opaque ID, continuous state, SQLite event stream updated."
    ]
  }
];
let scenarioIdx = 0;
let tickRunning = false;
const runTickBtn = document.getElementById("runTickBtn");
const simStatus = document.getElementById("simStatus");
const simLog = document.getElementById("simLog");
const flowSteps = document.querySelectorAll("#archFlow > div");

if (runTickBtn) {
  runTickBtn.addEventListener("click", async () => {
    if (tickRunning) return;
    tickRunning = true;
    const sc = scenarios[scenarioIdx % scenarios.length];
    scenarioIdx++;
    simStatus.textContent = `Running scenario: ${sc.name}...`;
    for (let i = 0; i < sc.steps.length; i++) {
      flowSteps.forEach(el => el.classList.remove("active-step"));
      flowSteps[i].classList.add("active-step");
      simLog.innerHTML = `<code>${sc.steps[i]}</code>`;
      await new Promise(r => setTimeout(r, 850));
    }
    simStatus.textContent = `Completed "${sc.name}". Click again for next scenario.`;
    tickRunning = false;
  });
}

// 3. Project Details Modal
const projectDetails = {
  viwo: {
    tag: "01 · SIMULATION · AI AGENTS · ARCHITECTURE",
    title: "VirtualWorld",
    summary: "A local, cloud-free world simulation engine where the graph database and deterministic rules own reality, and LLMs act strictly as bounded participants.",
    bullets: [
      "Append-only SQLite event stream with timeline branching and rewind.",
      "Backsim layer simulates off-screen characters deterministically with zero LLM cost.",
      "Python agent backend with Emotion Matrix, attention reranker, and E2E Benchmark Room.",
      "60+ documented MCP tools and 4,800+ automated unit and simulation tests."
    ],
    stack: "Python · Flask · SQLite · Vanilla JS · MCP · Local LLMs"
  },
  worldgraph: {
    tag: "02 · 3D · WORLDBUILDING",
    title: "WorldGraph",
    summary: "An interactive 3D node-graph editor built for authoring and navigating complex worldbuilding structures.",
    bullets: [
      "Node-based document model with spatial grouping and typed edges.",
      "Full undo/redo history stack and multi-format export.",
      "Zero-bloat Three.js rendering in vanilla JavaScript."
    ],
    stack: "JavaScript · Three.js · Graph Data Structures"
  },
  aura: {
    tag: "03 · MULTI-AGENT · LOCAL AI · EVENT BUS",
    title: "Aura",
    summary: "An event-driven personal assistant built around specialized asynchronous agents communicating over a central EventBus.",
    bullets: [
      "Dedicated agents for Neo4j graph memory, emotional state, and self-reflection.",
      "Modern SPA frontend with offline simulation mode and multi-provider LLM routing.",
      "Screen/OCR perception, microphone input, and local Kokoro TTS voice output."
    ],
    stack: "Python · Async EventBus · Neo4j · SPA · OCR · Kokoro TTS"
  },
  codesearch: {
    tag: "04 · SEARCH ENGINE · MCP · MULTIMODAL",
    title: "CodeSearch",
    summary: "A local multi-index search engine and MCP server built to give both humans and coding agents instant structural and semantic navigation.",
    bullets: [
      "Hybrid search combining SQLite FTS5 BM25 ranking, semantic embeddings, and a reranker.",
      "AST call-graph extraction plus dedicated parsers for PDF, CSV, JSON, and images.",
      "Multi-index routing and a public read-only API server with optional authentication."
    ],
    stack: "Python · SQLite FTS5 · AST · Qwen Embeddings · Reranker · MCP"
  },
  taskweave: {
    tag: "05 · WORKFLOWS · MCP · PLANNING",
    title: "TaskWeave",
    summary: "A structured task-graph and roadmap engine exposed as both a CLI and MCP server for disciplined agentic engineering.",
    bullets: [
      "Models tasks as a validated dependency graph rather than flat checklists.",
      "Detects circular dependencies, stale tasks, and next-actionable work automatically.",
      "Built for repeatable multi-agent and solo engineering workflows."
    ],
    stack: "Python · MCP · Dependency Graphs · CLI"
  },
  storymemory: {
    tag: "06 · COGNITIVE MEMORY · MCP · PYTHON",
    title: "StoryMemory",
    summary: "A standalone cognitive memory engine extracted into a pure Python package, CLI, and MCP server.",
    bullets: [
      "Separates raw observations from synthesized reflections with full provenance links.",
      "Multi-facet associative retrieval across associative, open-question, and belief lanes.",
      "Activation decay, recall reinforcement, contradiction tracking, and deterministic relationship profiles."
    ],
    stack: "Python · Vector Search · Associative Retrieval · MCP · CLI"
  }
};
const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
function openProject(key) {
  const p = projectDetails[key];
  if (!p) return;
  document.getElementById("modalTag").textContent = p.tag;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalSummary").textContent = p.summary;
  document.getElementById("modalBullets").innerHTML = p.bullets.map(b => `<li>${b}</li>`).join("");
  document.getElementById("modalStack").textContent = p.stack;
  modal.hidden = false;
}
document.querySelectorAll(".project[data-project]").forEach(card => {
  card.addEventListener("click", () => openProject(card.dataset.project));
  card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openProject(card.dataset.project); } });
});
modalClose.addEventListener("click", () => { modal.hidden = true; });
modal.addEventListener("click", e => { if (e.target === modal) modal.hidden = true; });
document.addEventListener("keydown", e => { if (e.key === "Escape") modal.hidden = true; });

// 4. Copy Email + Toast
const toast = document.getElementById("toast");
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2400);
}
function copyEmail() {
  const email = "tommy.slaatbraaten@hotmail.com";
  navigator.clipboard.writeText(email).then(() => showToast(`Copied ${email}`)).catch(() => {
    window.location.href = `mailto:${email}`;
  });
}
document.getElementById("heroCopyEmail").addEventListener("click", copyEmail);
document.getElementById("contactCopyEmail").addEventListener("click", copyEmail);

// 5. EN / NO Language Toggle
const i18n = {
  en: {
    nav_work: "Work", nav_projects: "Projects", nav_arch: "Architecture", nav_approach: "Approach", nav_contact: "Contact",
    eyebrow: "IT Consultant · Developer · Systems Builder",
    hero_title: "I like figuring out<br><em>how things work.</em>",
    hero_lead: "I build software by understanding the system underneath it: its state, data, rules, interfaces and failure modes. I work across technology, operations and people, and build my own AI agent tooling and MCP servers.",
    btn_explore: "Explore my work ↓", btn_copy_email: "Copy email", btn_print: "Save PDF",
    stat_years: "years in IT / software", stat_systems: "personal systems", stat_tests: "automated tests", stat_left: "things left to understand",
    sec_work: "01 / Experience", sec_projects: "02 / Selected projects", project_hint: "Click any card for architecture details",
    read_arch: "Read the architecture story →", sec_arch: "03 / Systems thinking",
    arch_h2: "The interesting part isn't the LLM.", arch_h3: "It is everything around it.", btn_tick: "▶ Run 1 Tick",
    sec_approach: "04 / Approach", quote: "“I don't just want to make it work. I want to understand why it works.”",
    sec_bg: "05 / Background", contact_eyebrow: "Let's build something",
    contact_h2: "Have a problem worth understanding?",
    contact_p: "I'm interested in software, systems, AI, architecture and difficult problems that don't have an obvious answer."
  },
  no: {
    nav_work: "Erfaring", nav_projects: "Prosjekter", nav_arch: "Arkitektur", nav_approach: "Tilnærming", nav_contact: "Kontakt",
    eyebrow: "IT-konsulent · Utvikler · Systembygger",
    hero_title: "Jeg liker å finne ut<br><em>hvordan ting virker.</em>",
    hero_lead: "Jeg bygger programvare ved å forstå systemet under panseret: tilstand, data, regler, grensesnitt og feilmoduser. Jeg jobber i skjæringspunktet mellom teknologi, drift og mennesker, og bygger egne KI-verktøy og MCP-servere.",
    btn_explore: "Se arbeidet mitt ↓", btn_copy_email: "Kopier e-post", btn_print: "Lagre PDF",
    stat_years: "år i IT / programvare", stat_systems: "egne systemer", stat_tests: "automatiserte tester", stat_left: "ting igjen å forstå",
    sec_work: "01 / Erfaring", sec_projects: "02 / Utvalgte prosjekter", project_hint: "Klikk på et kort for arkitekturdetaljer",
    read_arch: "Les arkitekturhistorien →", sec_arch: "03 / Systemtenkning",
    arch_h2: "Det interessante er ikke LLM-en.", arch_h3: "Det er alt rundt den.", btn_tick: "▶ Kjør 1 tick",
    sec_approach: "04 / Tilnærming", quote: "«Jeg vil ikke bare få det til å virke. Jeg vil forstå hvorfor det virker.»",
    sec_bg: "05 / Bakgrunn", contact_eyebrow: "La oss bygge noe",
    contact_h2: "Har du et problem som er verdt å forstå?",
    contact_p: "Jeg er interessert i programvare, systemer, KI, arkitektur og vanskelige problemer som ikke har et åpenbart svar."
  }
};
const langToggle = document.getElementById("langToggle");
let currentLang = localStorage.getItem("cv_lang") || "en";
function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem("cv_lang", lang);
  document.documentElement.lang = lang;
  langToggle.textContent = lang === "en" ? "NO" : "EN";
  const dict = i18n[lang];
  document.querySelectorAll("[data-i18n]").forEach(el => { if (dict[el.dataset.i18n]) el.textContent = dict[el.dataset.i18n]; });
  document.querySelectorAll("[data-i18n-html]").forEach(el => { if (dict[el.dataset.i18nHtml]) el.innerHTML = dict[el.dataset.i18nHtml]; });
}
langToggle.addEventListener("click", () => applyLang(currentLang === "en" ? "no" : "en"));
if (currentLang !== "en") applyLang(currentLang);
