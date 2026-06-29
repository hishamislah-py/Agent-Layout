// Placeholder data for the Internal section (internal agents/sub-agents and
// internal skills). Counts and real content are TBD — replace these stub
// entries when the actual list is shared. Each internal agent may have
// sub-agents.
//
// Per item you can add an optional `href` once its individual page exists:
//   - external URL (e.g. 'https://docs.openclaw.ai/...') → opens in a new tab
//   - bundled page  (e.g. '/internal/discovery-agent.html' in public/) → full page
// If `href` is omitted, the card/chip opens the in-app /internal/<slug>
// overview page instead. So this is drop-in: just set `href` later.

// Display name + route for this section (the "Toolkit" page).
export const HUB_NAME = 'Engineering Agents'
export const HUB_PATH = '/toolkit'

// In-app Internal Skills hub (filterable card grid).
export const SKILLS_PATH = '/internal-skills'

// Open an internal item: external href → new tab, bundled href → full page,
// otherwise the in-app /internal/<slug> overview page.
export function openInternal(item, navigate) {
  const href = item.href
  if (href) {
    if (/^https?:/i.test(href)) window.open(href, '_blank', 'noopener,noreferrer')
    else window.location.assign(href)
  } else {
    navigate(`/internal/${item.slug}`)
  }
}
// One flat list of engineering agents — no agent/sub-agent nesting.
// Engineering agents, grouped into two collections (filter categories). Each
// card opens its collection's catalog page at that agent's anchor.
export const INTERNAL_AGENTS = [
  // ---- Migration Pipeline (26 agents) ----
  { name: 'Code Analysis', slug: 'mig-code-analysis', category: 'Migration Pipeline', icon: '🔎', accent: '#F5C010', short: 'Walks the legacy tree and produces a raw structural report.', href: '/migration-agents.html#a01' },
  { name: 'Discovery', slug: 'mig-discovery', category: 'Migration Pipeline', icon: '🔍', accent: '#FBD75B', short: 'Catalogs business rules, dependencies and open questions.', href: '/migration-agents.html#a02' },
  { name: 'Comprehension', slug: 'mig-comprehension', category: 'Migration Pipeline', icon: '📖', accent: '#E0A40C', short: 'Turns findings into a structured business-rule catalog.', href: '/migration-agents.html#a03' },
  { name: 'Rules', slug: 'mig-rules', category: 'Migration Pipeline', icon: '📐', accent: '#C8920A', short: 'Converts findings into atomic, verifiable rules.', href: '/migration-agents.html#a04' },
  { name: 'Architecture', slug: 'mig-architecture', category: 'Migration Pipeline', icon: '🏛️', accent: '#EAB308', short: 'Designs the target component model and maps rules onto it.', href: '/migration-agents.html#a05' },
  { name: 'Integration Migration', slug: 'mig-integration', category: 'Migration Pipeline', icon: '🔌', accent: '#D9A41A', short: 'Designs contract-first APIs and coexistence adapters.', href: '/migration-agents.html#a06' },
  { name: 'Decomposition', slug: 'mig-decomposition', category: 'Migration Pipeline', icon: '🧩', accent: '#F5C010', short: 'Slices the work into independently testable units.', href: '/migration-agents.html#a07' },
  { name: 'MWU Planning', slug: 'mig-mwu-planning', category: 'Migration Pipeline', icon: '🗂️', accent: '#FBD75B', short: 'Converts rules into small, traceable work units.', href: '/migration-agents.html#a08' },
  { name: 'Code Generation', slug: 'mig-code-generation', category: 'Migration Pipeline', icon: '⚙️', accent: '#E0A40C', short: 'Writes target-state Kotlin and unit tests per unit.', href: '/migration-agents.html#a09' },
  { name: 'Code Review', slug: 'mig-code-review', category: 'Migration Pipeline', icon: '🔬', accent: '#C8920A', short: 'Checks generated code against architecture and scope.', href: '/migration-agents.html#a10' },
  { name: 'Data Migration', slug: 'mig-data-migration', category: 'Migration Pipeline', icon: '🗄️', accent: '#EAB308', short: 'Maps schemas and proves data keeps its meaning.', href: '/migration-agents.html#a11' },
  { name: 'Test Generation', slug: 'mig-test-generation', category: 'Migration Pipeline', icon: '🧪', accent: '#D9A41A', short: 'Builds tests that prove equivalence and guard regressions.', href: '/migration-agents.html#a12' },
  { name: 'UI Migration', slug: 'mig-ui-migration', category: 'Migration Pipeline', icon: '🖼️', accent: '#F5C010', short: 'Plans screen migration and the visual-regression strategy.', href: '/migration-agents.html#a13' },
  { name: 'UI Spec', slug: 'mig-ui-spec', category: 'Migration Pipeline', icon: '📑', accent: '#FBD75B', short: 'Extracts a structured spec from the legacy layout.', href: '/migration-agents.html#a14' },
  { name: 'Equivalence Audit', slug: 'mig-equivalence-audit', category: 'Migration Pipeline', icon: '⚖️', accent: '#E0A40C', short: 'Finds every functional mismatch between old and new.', href: '/migration-agents.html#a15' },
  { name: 'Equivalence Fix', slug: 'mig-equivalence-fix', category: 'Migration Pipeline', icon: '🩹', accent: '#C8920A', short: 'Fixes only what the audit flagged, nothing else.', href: '/migration-agents.html#a16' },
  { name: 'UI Layout Match', slug: 'mig-ui-layout-match', category: 'Migration Pipeline', icon: '📏', accent: '#EAB308', short: 'Rewrites Compose screens to match the legacy XML.', href: '/migration-agents.html#a17' },
  { name: 'Dual-Run Planning', slug: 'mig-dual-run-planning', category: 'Migration Pipeline', icon: '🔁', accent: '#D9A41A', short: 'Designs the legacy-vs-modern comparison experiment.', href: '/migration-agents.html#a18' },
  { name: 'Validation', slug: 'mig-validation', category: 'Migration Pipeline', icon: '✅', accent: '#F5C010', short: 'Cross-checks equivalence and issues a go/no-go call.', href: '/migration-agents.html#a19' },
  { name: '5-Layer Validation', slug: 'mig-5layer-validation', category: 'Migration Pipeline', icon: '🧮', accent: '#FBD75B', short: 'Assembles layered evidence from unit to user acceptance.', href: '/migration-agents.html#a20' },
  { name: 'Documentation', slug: 'mig-documentation', category: 'Migration Pipeline', icon: '📚', accent: '#E0A40C', short: 'Produces the migration runbook and traceability matrix.', href: '/migration-agents.html#a21' },
  { name: 'Orchestrator', slug: 'mig-orchestrator', category: 'Migration Pipeline', icon: '🧭', accent: '#C8920A', short: 'Coordinates agents and reports workflow state.', href: '/migration-agents.html#a22' },
  { name: 'Feedback Loop', slug: 'mig-feedback-loop', category: 'Migration Pipeline', icon: '🔄', accent: '#EAB308', short: 'Routes downstream questions to the right owner.', href: '/migration-agents.html#a23' },
  { name: 'Delivery Pack', slug: 'mig-delivery-pack', category: 'Migration Pipeline', icon: '📦', accent: '#D9A41A', short: 'Bundles everything into an execution-ready pack.', href: '/migration-agents.html#a24' },
  { name: 'Implementation Tasks', slug: 'mig-implementation-tasks', category: 'Migration Pipeline', icon: '📋', accent: '#F5C010', short: 'Turns rules into concrete, file-level tasks.', href: '/migration-agents.html#a25' },
  { name: 'Traceability', slug: 'mig-traceability', category: 'Migration Pipeline', icon: '🔗', accent: '#FBD75B', short: 'Maps every rule to its implementation and tests.', href: '/migration-agents.html#a26' },

  // ---- Onboarding Portal (11 agents) ----
  { name: 'Architecture Agent', slug: 'onb-architecture', category: 'Onboarding Portal', icon: '🏛️', accent: '#E0A40C', short: 'Reviews designs against the principles and drafts ADRs.', href: '/onboarding-agents.html#architecture-agent' },
  { name: 'Backend Agent', slug: 'onb-backend', category: 'Onboarding Portal', icon: '⚙️', accent: '#C8920A', short: 'Builds one bounded context with authz, audit and tests.', href: '/onboarding-agents.html#backend-agent' },
  { name: 'Frontend Agent', slug: 'onb-frontend', category: 'Onboarding Portal', icon: '🎨', accent: '#EAB308', short: 'Builds UI slices with design tokens and a11y tests.', href: '/onboarding-agents.html#frontend-agent' },
  { name: 'Workflow Engine Agent', slug: 'onb-workflow', category: 'Onboarding Portal', icon: '🔀', accent: '#D9A41A', short: 'Evolves the case state machine safely, as data.', href: '/onboarding-agents.html#workflow-engine-agent' },
  { name: 'RBAC Agent', slug: 'onb-rbac', category: 'Onboarding Portal', icon: '🔐', accent: '#F5C010', short: 'Enforces central authorization across every endpoint.', href: '/onboarding-agents.html#rbac-agent' },
  { name: 'XLSX Integration Agent', slug: 'onb-xlsx', category: 'Onboarding Portal', icon: '📊', accent: '#FBD75B', short: 'Moves data to and from Smart Client safely.', href: '/onboarding-agents.html#xlsx-integration-agent' },
  { name: 'Testing Agent', slug: 'onb-testing', category: 'Onboarding Portal', icon: '🧪', accent: '#E0A40C', short: 'Owns the test suite and blocks coverage drops.', href: '/onboarding-agents.html#testing-agent' },
  { name: 'Reviewer Agent', slug: 'onb-reviewer', category: 'Onboarding Portal', icon: '🔍', accent: '#C8920A', short: 'Reviews pull requests against a strict checklist.', href: '/onboarding-agents.html#reviewer-agent' },
  { name: 'Security Agent', slug: 'onb-security', category: 'Onboarding Portal', icon: '🛡️', accent: '#EAB308', short: 'Reviews sensitive changes and maps them to OWASP.', href: '/onboarding-agents.html#security-agent' },
  { name: 'Audit / Versioning Agent', slug: 'onb-audit', category: 'Onboarding Portal', icon: '📒', accent: '#D9A41A', short: 'Ensures every state change is audited and immutable.', href: '/onboarding-agents.html#audit-versioning-agent' },
  { name: 'Documentation Agent', slug: 'onb-documentation', category: 'Onboarding Portal', icon: '📝', accent: '#F5C010', short: 'Keeps docs and the glossary in sync with the code.', href: '/onboarding-agents.html#documentation-agent' },

  // ---- Playwright QA (2 agents) ----
  { name: 'QA Automation Agent', slug: 'pw-qa-automation', category: 'Playwright QA', icon: '🎭', accent: '#F5C010', short: 'Turns a test case into a verified, runnable Playwright spec.', href: '/playwright-agents.html#a01' },
  { name: 'POM Refactor Agent', slug: 'pw-pom-refactor', category: 'Playwright QA', icon: '🏗️', accent: '#FBD75B', short: 'Restructures specs into a maintainable Page Object Model.', href: '/playwright-agents.html#a02' },

  // ---- CQA Pipeline (8 agents) ----
  { name: 'Security Agent', slug: 'cqa-security', category: 'CQA Pipeline', icon: '🔐', accent: '#F5C010', short: 'Maps findings to OWASP and CWE and confirms exploitability.', href: '/cqa-agents.html#a01' },
  { name: 'Maintainability Agent', slug: 'cqa-maintainability', category: 'CQA Pipeline', icon: '🔧', accent: '#FBD75B', short: 'Scores complexity, duplication and debt; estimates onboarding time.', href: '/cqa-agents.html#a02' },
  { name: 'Architecture Agent', slug: 'cqa-architecture', category: 'CQA Pipeline', icon: '🏛️', accent: '#E0A40C', short: 'Checks layering fitness, circular deps and structural coupling.', href: '/cqa-agents.html#a03' },
  { name: 'Operational Readiness Agent', slug: 'cqa-operational-readiness', category: 'CQA Pipeline', icon: '⚙️', accent: '#C8920A', short: 'Assesses logging, secrets, resilience and deployment safety.', href: '/cqa-agents.html#a04' },
  { name: 'Performance Agent', slug: 'cqa-performance', category: 'CQA Pipeline', icon: '⚡', accent: '#EAB308', short: 'Finds N+1 queries, caching gaps and slow query patterns.', href: '/cqa-agents.html#a05' },
  { name: 'Test Coverage Agent', slug: 'cqa-test-coverage', category: 'CQA Pipeline', icon: '🧪', accent: '#D9A41A', short: 'Scores coverage, mutation index and assertion quality.', href: '/cqa-agents.html#a06' },
  { name: 'Dependency Security Agent', slug: 'cqa-dependency-security', category: 'CQA Pipeline', icon: '📦', accent: '#F5C010', short: 'Dedupes CVEs across tools and buckets them by exploitability.', href: '/cqa-agents.html#a07' },
  { name: 'Critical File Audit Agent', slug: 'cqa-critical-file-audit', category: 'CQA Pipeline', icon: '🔎', accent: '#FBD75B', short: 'Deep, method-by-method audit of god-class candidate files.', href: '/cqa-agents.html#a08' },
]

// The Greenfield Skills collection — one card per capability skill. Each opens
// the standalone catalog page at its anchor.
export const INTERNAL_SKILLS = [
  {
    name: 'Backend Generation',
    slug: 'backend-generation',
    category: 'Greenfield Skills',
    icon: '⚙️',
    accent: '#F5C010',
    short: 'Scaffolds a bounded context with authorization, audit and tests.',
    href: '/skills-greenfield.html#backend-generation',
  },
  {
    name: 'Frontend Generation',
    slug: 'frontend-generation',
    category: 'Greenfield Skills',
    icon: '🎨',
    accent: '#FBD75B',
    short: 'Builds feature slices with design tokens and accessibility tests.',
    href: '/skills-greenfield.html#frontend-generation',
  },
  {
    name: 'Workflow Engine',
    slug: 'workflow-engine',
    category: 'Greenfield Skills',
    icon: '🔀',
    accent: '#E0A40C',
    short: 'Generates state-machine config, handlers and transition tests.',
    href: '/skills-greenfield.html#workflow-engine',
  },
  {
    name: 'Dynamic Form Engine',
    slug: 'dynamic-form-engine',
    category: 'Greenfield Skills',
    icon: '📋',
    accent: '#C8920A',
    short: 'Builds the metadata that drives forms, validators and mappings.',
    href: '/skills-greenfield.html#dynamic-form-engine',
  },
  {
    name: 'XLSX Processing',
    slug: 'xlsx-processing',
    category: 'Greenfield Skills',
    icon: '📊',
    accent: '#EAB308',
    short: 'Generates parsers, exporters and additive sync logic.',
    href: '/skills-greenfield.html#xlsx-processing',
  },
  {
    name: 'RBAC Implementation',
    slug: 'rbac-implementation',
    category: 'Greenfield Skills',
    icon: '🔐',
    accent: '#D9A41A',
    short: 'Generates authorization checks and full role coverage tests.',
    href: '/skills-greenfield.html#rbac-implementation',
  },
  {
    name: 'Architecture Review',
    slug: 'architecture-review',
    category: 'Greenfield Skills',
    icon: '🏛️',
    accent: '#F5C010',
    short: 'Evaluates designs against principles and drafts required ADRs.',
    href: '/skills-greenfield.html#architecture-review',
  },
  {
    name: 'Reviewer',
    slug: 'reviewer',
    category: 'Greenfield Skills',
    icon: '🔍',
    accent: '#FBD75B',
    short: 'Reviews pull requests against a strict engineering checklist.',
    href: '/skills-greenfield.html#reviewer',
  },
  {
    name: 'Security Review',
    slug: 'security-review',
    category: 'Greenfield Skills',
    icon: '🛡️',
    accent: '#E0A40C',
    short: 'Reviews sensitive changes and maps findings to OWASP.',
    href: '/skills-greenfield.html#security-review',
  },
  {
    name: 'Audit Engine',
    slug: 'audit-engine',
    category: 'Greenfield Skills',
    icon: '📒',
    accent: '#C8920A',
    short: 'Verifies every state change emits an immutable audit event.',
    href: '/skills-greenfield.html#audit-engine',
  },
  {
    name: 'State Machine',
    slug: 'state-machine',
    category: 'Greenfield Skills',
    icon: '🔁',
    accent: '#EAB308',
    short: 'Pure reasoning over whether a transition is allowed.',
    href: '/skills-greenfield.html#state-machine',
  },
  {
    name: 'Documentation',
    slug: 'documentation',
    category: 'Greenfield Skills',
    icon: '📝',
    accent: '#D9A41A',
    short: 'Keeps docs, glossary and runbooks in sync with the code.',
    href: '/skills-greenfield.html#documentation',
  },

  // ---- Testing Skills (security & QA testing pipeline) ----
  {
    name: 'API Security Testing',
    slug: 'test-api-security',
    category: 'Testing Skills',
    icon: '🔐',
    accent: '#F2C94C',
    short: 'Black-box API testing for auth, CORS, injection and rate limits.',
    href: '/testing-skills.html#s01',
  },
  {
    name: 'tob-semgrep',
    slug: 'test-tob-semgrep',
    category: 'Testing Skills',
    icon: '🔬',
    accent: '#F7DC84',
    short: 'Static code analysis with Semgrep and Trail of Bits rulesets.',
    href: '/testing-skills.html#s02',
  },
  {
    name: 'OWASP Security',
    slug: 'test-owasp-security',
    category: 'Testing Skills',
    icon: '🛡️',
    accent: '#EAB308',
    short: 'Classifies findings by OWASP Top 10 and CWE.',
    href: '/testing-skills.html#s03',
  },
  {
    name: 'Web Application Security',
    slug: 'test-web-app-security',
    category: 'Testing Skills',
    icon: '🌐',
    accent: '#D9A41A',
    short: 'Tests the frontend for XSS, insecure storage and exposed secrets.',
    href: '/testing-skills.html#s04',
  },
  {
    name: 'tob-insecure-defaults',
    slug: 'test-insecure-defaults',
    category: 'Testing Skills',
    icon: '🔑',
    accent: '#C8920A',
    short: 'Scans for hardcoded secrets and insecure defaults.',
    href: '/testing-skills.html#s05',
  },
  {
    name: 'Threat Modeling',
    slug: 'test-threat-modeling',
    category: 'Testing Skills',
    icon: '🎯',
    accent: '#F2C94C',
    short: 'Maps threats and attack surface with STRIDE and PASTA.',
    href: '/testing-skills.html#s06',
  },
  {
    name: 'Password Attacks & Sec-Fuzzing',
    slug: 'test-password-fuzzing',
    category: 'Testing Skills',
    icon: '🔓',
    accent: '#F7DC84',
    short: 'Password lists and injection payloads for auth and input tests.',
    href: '/testing-skills.html#s07',
  },
  {
    name: 'BRD / FRD Analyzer',
    slug: 'test-brd-frd',
    category: 'Testing Skills',
    icon: '📋',
    accent: '#EAB308',
    short: 'Extracts and quality-checks requirements before testing.',
    href: '/testing-skills.html#s08',
  },
  {
    name: 'Playwright API Test Generator',
    slug: 'test-playwright-api',
    category: 'Testing Skills',
    icon: '🎭',
    accent: '#D9A41A',
    short: 'Generates Playwright API test suites from specs.',
    href: '/testing-skills.html#s09',
  },
  {
    name: 'RTM Generator',
    slug: 'test-rtm',
    category: 'Testing Skills',
    icon: '🧮',
    accent: '#C8920A',
    short: 'Builds a requirements traceability matrix for coverage proof.',
    href: '/testing-skills.html#s10',
  },

  // ---- CQA Skills (cqa-final-* packages) ----
  {
    name: 'CQA Orchestrator',
    slug: 'cqa-orchestrator',
    category: 'CQA Skills',
    icon: '🎛️',
    accent: '#F5C010',
    short: 'Runs the full pipeline and merges all agent output into one report.',
    href: '/cqa-skills.html#s01',
  },
  {
    name: 'Build Samples',
    slug: 'cqa-build-samples',
    category: 'CQA Skills',
    icon: '🗂️',
    accent: '#FBD75B',
    short: 'Partitions findings into per-agent slices and sample manifests.',
    href: '/cqa-skills.html#s02',
  },
  {
    name: 'Preflight Gate',
    slug: 'cqa-preflight',
    category: 'CQA Skills',
    icon: '🚦',
    accent: '#E0A40C',
    short: 'Classifies tool failures: proceed, downgrade or abort per dimension.',
    href: '/cqa-skills.html#s03',
  },
  {
    name: 'Report Builder',
    slug: 'cqa-build-docx',
    category: 'CQA Skills',
    icon: '📄',
    accent: '#C8920A',
    short: 'Renders assessment.json into a branded Word report.',
    href: '/cqa-skills.html#s04',
  },
  {
    name: 'Scan Runner',
    slug: 'cqa-scan-runner',
    category: 'CQA Skills',
    icon: '🛠️',
    accent: '#EAB308',
    short: 'Dispatches 20+ static analysis and security tools in parallel.',
    href: '/cqa-skills.html#s05',
  },
  {
    name: 'Tech Stack Detector',
    slug: 'cqa-tech-stack-detector',
    category: 'CQA Skills',
    icon: '🧬',
    accent: '#D9A41A',
    short: 'Auto-detects language, framework and build tools from manifests.',
    href: '/cqa-skills.html#s06',
  },
  {
    name: 'Tool Adapters',
    slug: 'cqa-adapters',
    category: 'CQA Skills',
    icon: '🔌',
    accent: '#F5C010',
    short: 'Normalises heterogeneous scanner output into the canonical schema.',
    href: '/cqa-skills.html#s07',
  },
  {
    name: 'Heavy Tool Runners',
    slug: 'cqa-runners',
    category: 'CQA Skills',
    icon: '🏃',
    accent: '#FBD75B',
    short: 'Runs tests, mutation, type checks and code-quality scans.',
    href: '/cqa-skills.html#s08',
  },
  {
    name: 'Debt Detector',
    slug: 'cqa-debt-detector',
    category: 'CQA Skills',
    icon: '🧹',
    accent: '#E0A40C',
    short: 'Scans TODO/FIXME density, dead code and deprecated APIs.',
    href: '/cqa-skills.html#s09',
  },
  {
    name: 'DB Analyser',
    slug: 'cqa-db-analyser',
    category: 'CQA Skills',
    icon: '🗄️',
    accent: '#C8920A',
    short: 'Introspects the DB schema for god tables and migration drift.',
    href: '/cqa-skills.html#s10',
  },
  {
    name: 'Journey Mapper',
    slug: 'cqa-journey-mapper',
    category: 'CQA Skills',
    icon: '🗺️',
    accent: '#EAB308',
    short: 'Maps endpoints to middleware, validators and file anchors.',
    href: '/cqa-skills.html#s11',
  },
  {
    name: 'Design Recoverer',
    slug: 'cqa-design-recoverer',
    category: 'CQA Skills',
    icon: '📐',
    accent: '#D9A41A',
    short: 'Recovers a C4 diagram and layer map from the import graph.',
    href: '/cqa-skills.html#s12',
  },
  {
    name: 'Coverage Deepener',
    slug: 'cqa-coverage-deepener',
    category: 'CQA Skills',
    icon: '🔬',
    accent: '#F5C010',
    short: 'Enriches coverage data with test-quality heuristics.',
    href: '/cqa-skills.html#s13',
  },
]
