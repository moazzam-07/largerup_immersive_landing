# SKILLS HUB — Master Agent Operating Manual (`AGENTS.md`)

This file is the portable catalog and operating manual for **MOAZZAM's `SKILLS HUB`** located at:

```text
C:\Users\MOAZZAM\coding\SKILLS HUB
```

When dropped into any workspace (or read at the hub root), any coding agent (Antigravity, Claude Code, Codex, Cursor, Gemini CLI, OpenCode, Copilot, Windsurf) must use this file to **select, import, install, or invoke** the right skills, design themes, CLIs, or standalone tools for the user's task — without bloating project context or pulling broken partial copies.

---

## 1. Agent Operating Protocol

1. **Never import everything.** Select only the skill pack(s) or individual skills needed for the current task. Installing 300+ skills or overlapping routers degrades trigger accuracy and wastes context.
2. **Respect sibling dependencies.** Many skills fail if you copy `SKILL.md` alone. Always copy or link the **entire skill directory** so sibling `scripts/`, `references/`, `reference/`, `assets/`, `data/`, `rules/`, `library/`, `agents/`, and `templates/` stay beside `SKILL.md`.
3. **Never copy `.git/` into a project's skill folder.** When importing root-level skills (such as `humanizer`) via file copy, exclude `.git/`.
4. **Pick one primary engineering router — follow the encouraged priority order.** For software engineering, building automations, SaaS apps, and general coding projects, follow this exact preference chronology: **(1) Addy Osmani (`addyosmani_senior_software_engineer_skills`) -> (2) Matt Pocock (`mattpocock`) -> (3) Everything Claude Code (`everything-claude-code`)**. Never stack all three as competing workflow routers; lead with **Addy Osmani**, bring in targeted **Matt Pocock** skills (`grill-me`, `tdd`, etc.) second, and layer specialized language/stack rules, hooks, or domain packs from **ECC** third.
5. **Know where the target harness discovers skills:**
   - **Antigravity 2.0 (workspace):** `.agents/skills/<skill-name>/SKILL.md`, `.agents/rules/`, `.agents/workflows/`, `.agents/agents/`
   - **Antigravity legacy (still read by workspace):** `.agent/skills/<skill-name>/SKILL.md`, `.agent/agents/`
   - **Claude Code:** `.claude/skills/<skill-name>/SKILL.md` (or `/plugin marketplace add ...` -> `/plugin install ...`)
   - **Codex / Universal Agent Standard:** `.agents/skills/<skill-name>/SKILL.md`
   - **Cursor:** `.cursor/skills/<skill-name>/SKILL.md`
   - **Nesting rule:** Skill discovery expects `<skills-dir>/<skill-name>/SKILL.md` **one level deep**. Never nest bucket parent folders (e.g., do **not** copy `mattpocock/skills/engineering/` as `.agents/skills/engineering/` — copy `mattpocock/skills/engineering/<skill-name>/` flat into `.agents/skills/<skill-name>/`).
6. **Windows installation note:** `npx skills add ...` or `robocopy` / `Copy-Item` copies files; Windows directory junctions (`cmd /c mklink /J "<dest>\<skill>" "<src>\<skill>"`) let skills update automatically whenever the hub pulls upstream changes, without needing admin rights or Developer Mode. Only create junctions to individual leaf skill folders (not repo roots containing `.git/`).
7. **Untrusted / newly added folders:** If browsing `C:\Users\MOAZZAM\coding\SKILLS HUB` and finding a newly added repo not yet listed below, read its `README.md`, `AGENTS.md`, `CLAUDE.md`, and `SKILL.md` first — and optionally scan unknown external skills with **SkillSpector** (`#19`) before importing.

---

## 2. Hard Rules: Exclusions & Legacy Opt-In

### Strictly Excluded Directories (NEVER Import or Recommend)

When operating inside or pulling from `C:\Users\MOAZZAM\coding\SKILLS HUB`, **ignore and never auto-import, copy, link, or suggest** these 9 excluded directories:

- `C:\Users\MOAZZAM\coding\SKILLS HUB\My Skills`
- `C:\Users\MOAZZAM\coding\SKILLS HUB\n8n-skills`
- `C:\Users\MOAZZAM\coding\SKILLS HUB\stitch-skills`
- `C:\Users\MOAZZAM\coding\SKILLS HUB\video-editing`
- `C:\Users\MOAZZAM\coding\SKILLS HUB\antigravity-awesome-skills`
- `C:\Users\MOAZZAM\coding\SKILLS HUB\awesome-claude-skills`
- `C:\Users\MOAZZAM\coding\SKILLS HUB\managing-project-documentation`
- `C:\Users\MOAZZAM\coding\SKILLS HUB\skill-creator` *(top-level directory only; Anthropic's official example under `skills by anthropics 97k stars\skills\skill-creator` is separate)*
- `C:\Users\MOAZZAM\coding\SKILLS HUB\writing-skills`

### Legacy / Discouraged (Opt-In Only)

- **`superpowers` (`C:\Users\MOAZZAM\coding\SKILLS HUB\superpowers`) — DO NOT suggest or auto-import.** Kept in this catalog as an older workflow framework, but **discouraged** in favor of Addy Osmani (`#1`), Matt Pocock (`#2`), and Everything Claude Code (`#3`). **Only import or use `superpowers` if the user explicitly asks for `superpowers` by name.**
- **`ui-ux-pro-max-skill` (`C:\Users\MOAZZAM\coding\SKILLS HUB\ui-ux-pro-max-skill`) — DO NOT suggest or auto-import.** Kept in this catalog as an older UI toolkit, but **discouraged** in favor of **Impeccable**, **Taste Skill**, **Hallmark**, **shadcn**, **`design_library`**, and **Emil Kowalski / Jakub Krehel**. **Only import or use `UI/UX Pro Max` / `ui-ux-pro-max` if the user explicitly asks for it by name.**

---

## 3. Fast Intent-to-Pack Routing Matrix

> **Encouraged Chronology (Software Engineering / Building Automation / SaaS / Projects — order matters):**
> **1st:** **Addy Osmani** (`addyosmani_senior_software_engineer_skills`) &rarr; **2nd:** **Matt Pocock** (`mattpocock`) &rarr; **3rd:** **Everything Claude Code (`ECC`)** (`everything-claude-code`).
> Always start with **Addy Osmani** first, bring in **Matt Pocock** second where requirements grilling, vertical-slice specs/tickets, or seam TDD help, and reach for **ECC** third when you need specialized multi-language reviewers, stack rules, hooks, or orchestration pipelines.

| User Intent / Project Need | Primary Pack(s) to Import or Run | Secondary / Companion Packs |
|---|---|---|
| **[#1 Choice]** SWE, SaaS, automation, & project SDLC (spec -> plan -> TDD -> review -> ship) | **Addy Osmani** (`addyosmani_senior_software_engineer_skills`) | **Matt Pocock** (`grill-me`), **SkillSpector** |
| **[#2 Choice]** Crisp daily coding, grilling requirements, PRDs/issues, seam TDD, TS modules | **Matt Pocock** (`mattpocock`) | **Addy Osmani** (`security-and-hardening`) |
| **[#3 Choice]** Full Agent OS, stack rules, hooks, memory vault, `orch-*`, specialist reviewers | **Everything Claude Code (ECC)** (`everything-claude-code`) | Layer after **Addy Osmani** / **Matt Pocock** |
| **New** marketing, SaaS, AI, gaming, cafe, studio site (`figma.com` / `x.ai` bar) | **Taste Skill** (`design-taste-frontend`) OR **Hallmark** (50 themes + Wikimedia) | **design_library** (`DESIGN.md`), **GSAP**, **Emil Kowalski** |
| **Improve / critique / audit / polish** an **existing** app or UI | **Impeccable** (24 steer/audit commands + live overlay) | **Jakub Krehel** (`better-*`), **Vercel** `web-design-guidelines` |
| Design system tokens, color/type systems, component specs | **Impeccable** (`init`/`document`/`typeset`/`colorize`) OR **shadcn** (`design-system.md`) | **design_library** (`DESIGN.md`), **Hallmark** |
| Match a real company's visual identity (Stripe, Linear, Claude, Vercel, Nike...) | **design_library** (`design-md/<brand>/DESIGN.md`) | **shadcn** (`design-system.md`), **Hallmark**, **Impeccable** |
| shadcn/ui components, registries, presets, or Radix UI -> Base UI migration | **shadcn** (`shadcn` + `migrate-radix-to-base`) | **design_library**, **Vercel** `react-best-practices` |
| Web/mobile animations, springs, gestures, drawers, choreography, Swift | **Emil Kowalski** (`skills_emilkowalski`) + **GSAP** (`gsap-skills`) | **Vercel** `react-view-transitions` |
| UI typography, color math, WCAG 2.2 a11y, RTL layout, interface stress-testing | **Jakub Krehel** (`skills_jakubkrehel`) | **Impeccable**, **shadcn** |
| React / Next.js / React Native performance & Vercel deployment | **Vercel Agent Skills** (`vercel-agent-skills`) | **shadcn**, **Emil Kowalski** |
| Remove AI slop from **written prose / docs / PRs / essays** *(NOT UI!)* | **Humanizer** (`humanizer`) or **No AI Slop** (`no-ai-slop`) | **Vercel** `writing-guidelines`, **Anthropic** `doc-coauthoring` |
| Office deliverables (`.docx`, `.pdf`, `.pptx`, `.xlsx`), Claude API, MCP servers | **Anthropic Official Skills** (`skills by anthropics 97k stars`) | — |
| Growth, CRO, copywriting, pricing, SEO/AEO, ads, cold email, launch | **Marketing Skills** (`marketingskills`) — start with `product-marketing` | **Humanizer** / **No AI Slop** |
| Watch/analyze a local video or URL (YouTube, screen recording, demo) | **Claude Video** (`/watch`) | **Nick Saraev** `video-to-action` (if `gemini-design` MCP active) |
| Founder business decision board debate (Bezos, Hormozi, PG, Buffett...) | **Roast Room** (`roast-room` + `newroaster` + Node UI) | — |
| Audit untrusted skills/plugins for prompt injection, exfil, or CVEs | **SkillSpector** (`skillspector` CLI/MCP + `skill-inspector`) | **ECC** `skill-stocktake` |
| Multi-agent prompting patterns, verification loops, or parallel Chrome workers | **Nick Saraev** (`nick-saraev-agentic skills`) | — |
| Legacy brainstorming/subagent-worktree pipeline *(ONLY if user asks)* | **Superpowers** (`superpowers` — DISCOURAGED / OPT-IN ONLY) | — |
| Legacy BM25 UI style/stack lookup *(ONLY if user asks)* | **UI/UX Pro Max** (`ui-ux-pro-max-skill` — DISCOURAGED / OPT-IN ONLY) | — |

> **Disambiguating "AI slop":**
> - **Web UI / frontend page slop:** use **Hallmark**, **Taste Skill**, **Impeccable**, or **Anthropic `frontend-design`**.
> - **Text / prose / copy slop:** use **Humanizer** (`blader/humanizer`), **No AI Slop** (`petergyang/no-ai-slop`), or **Vercel `writing-guidelines`**.

---

## 4. Detailed Pack Reference

---

### A. Software Engineering Lifecycles & Harnesses

> **Priority chronology for SWE, automation, SaaS & project builds:** **1. Addy Osmani** -> **2. Matt Pocock** -> **3. Everything Claude Code (`ECC`)**. (**4. Superpowers** is Legacy / Opt-In Only.)

#### 1. Addy Osmani — Agent Skills (`addyosmani/agent-skills`)
- **Local Path:** `C:\Users\MOAZZAM\coding\SKILLS HUB\addyosmani_senior_software_engineer_skills`
- **Upstream Git:** `https://github.com/addyosmani/agent-skills.git` *(git-tracked)*
- **What it is:** Full senior-engineering SDLC organized across **Define -> Plan -> Build -> Verify -> Review -> Ship**, backed by 25 skills, 4 specialist personas, 7 shared checklists, and an in-repo eval suite. Every skill includes **Common Rationalizations** tables and **Red Flags**.
- **Catalog (`skills/`, 25 total):**
  - *Router:* `using-agent-skills`
  - *Define:* `idea-refine`, `interview-me`, `spec-driven-development`, `api-and-interface-design`, `frontend-ui-engineering`
  - *Plan:* `planning-and-task-breakdown`, `context-engineering`, `constraint-driven-development`
  - *Build:* `incremental-implementation`, `test-driven-development`, `source-driven-development`, `git-workflow-and-versioning`
  - *Verify:* `debugging-and-error-recovery`, `browser-testing-with-devtools`, `performance-optimization`, `security-and-hardening`
  - *Review:* `code-review-and-quality`, `code-simplification`, `doubt-driven-development`
  - *Ship & Maintain:* `shipping-and-launch`, `ci-cd-and-automation`, `observability-and-instrumentation`, `documentation-and-adrs`, `deprecation-and-migration`
- **Supporting assets:**
  - `agents/` (4 personas): `code-reviewer.md`, `security-auditor.md`, `test-engineer.md`, `web-performance-auditor.md`
  - `references/` (7 checklists): `accessibility-checklist.md`, `definition-of-done.md`, `observability-checklist.md`, `orchestration-patterns.md`, `performance-checklist.md`, `security-checklist.md`, `testing-patterns.md`
- **How to install / import:**
  - **Antigravity CLI:** `agy plugin install https://github.com/addyosmani/agent-skills.git` (or local `agy plugin install "C:\Users\MOAZZAM\coding\SKILLS HUB\addyosmani_senior_software_engineer_skills"`). *Antigravity note (`docs/antigravity-setup.md`):* legacy `commands/*.toml` wrappers (`/spec`, `/build`, etc.) are not exposed in `agy` 1.1.x; invoke namespaced skills directly: `/agent-skills:spec-driven-development`, `/agent-skills:planning-and-task-breakdown`, `/agent-skills:incremental-implementation`, `/agent-skills:test-driven-development`, `/agent-skills:code-review-and-quality`, `/agent-skills:code-simplification`, `/agent-skills:constraint-driven-development`, `/agent-skills:shipping-and-launch`, and persona `web-performance-auditor`.
  - **Claude Code:** `/plugin marketplace add addyosmani/agent-skills` -> `/plugin install agent-skills@addy-agent-skills`
  - **Codex:** `codex plugin marketplace add addyosmani/agent-skills`
  - **Universal / `skills.sh`:** `npx skills add addyosmani/agent-skills` *(all skills)*.
  - **Critical caveat:** Per-skill `npx skills add addyosmani/agent-skills --skill <name>` omits the repo-root `references/` checklists (upstream issue #361). Prefer whole-repo/plugin install, or when copying into `.agents/`/`.agent/`, copy `skills/*`, `agents/*`, and `references/*`. Never copy the repo's root `AGENTS.md` (contributor guide) into a target project.

---

#### 2. Matt Pocock — Skills (`mattpocock/skills`)
- **Local Path:** `C:\Users\MOAZZAM\coding\SKILLS HUB\mattpocock`
- **Upstream Git:** `https://github.com/mattpocock/skills.git` *(git-tracked)*
- **What it is:** Pragmatic, low-ceremony daily-driver toolkit from Matt Pocock. Centered around **grilling** (one question at a time, dependency-ordered design-tree interrogation, prefers reading the codebase before asking), vertical-slice tracer-bullet specs/tickets, seam-based TDD, and strict context hygiene (separating user-invoked slash commands from model-invoked behaviors).
- **Catalog (`skills/`, 39 skills across 4 populated buckets):**
  - *Promoted `engineering/` (20):* `ask-matt`, `code-review`, `codebase-design`, `diagnosing-bugs`, `domain-modeling`, `grill-with-docs`, `implement`, `implement-spec`, `improve-codebase-architecture`, `pr`, `prototype`, `research`, `retro`, `setup-matt-pocock-skills`, `tdd`, `to-spec`, `to-tickets`, `triage`, `wayfinder`, `wizard`
  - *Promoted `productivity/` (7):* `grill-me`, `grilling`, `handoff`, `teach`, `to-questionnaire`, `wait-what`, `writing-for-agents`
  - *Beta `in-progress/` (8):* `chief-of-staff`, `claude-handoff`, `loop-me`, `setup-ts-deep-modules`, `software-factory`, `writing-beats`, `writing-fragments`, `writing-shape` *(opt-in / experimental)*
  - *Frozen `misc/` (4):* `git-guardrails-claude-code`, `migrate-to-shoehorn`, `scaffold-exercises`, `setup-pre-commit` *(unmaintained; avoid auto-importing)*
  - *`deprecated/` (0 skills)*
- **How to install / import:**
  - **Claude Code:** `claude plugin install mattpocock-skills@claude-plugins-official`
  - **Codex:** `codex plugin marketplace add mattpocock/skills` -> `codex plugin add mattpocock-skills@mattpocock`
  - **Copilot CLI:** `copilot plugin marketplace add mattpocock/skills` -> `copilot plugin install mattpocock-skills@mattpocock`
  - **Gemini CLI:**
    ```bash
    gemini skills install https://github.com/mattpocock/skills.git --path skills/engineering
    gemini skills install https://github.com/mattpocock/skills.git --path skills/productivity
    ```
  - **Universal / `skills.sh`:** `npx skills@latest add mattpocock/skills -a <agent>` *(include `setup-matt-pocock-skills`; prefer `skills@latest` over `amp`/`pi` native installers which also pull `misc/` and `in-progress/`)*.
  - **Local copy / Windows junction rule:** Copy leaf folders inside `skills\engineering\*` and `skills\productivity\*` **directly** into `<project>\.agents\skills\<skill-name>\` (never copy the `engineering` or `productivity` parent directories!).
  - **First-time per-repo setup:** Run `/setup-matt-pocock-skills` once per project to configure `GLOSSARY.md` / issue-tracker conventions (`to-spec`, `to-tickets`, `triage`).

---

#### 3. Everything Claude Code (`ECC` v2.2.3 — `affaan-m/everything-claude-code`)
- **Local Path:** `C:\Users\MOAZZAM\coding\SKILLS HUB\everything-claude-code`
- **Upstream Git:** `https://github.com/affaan-m/everything-claude-code.git` *(git-tracked)*
- **What it is:** Full multi-harness "Agent Harness Operating System" (71 specialist agents, 314 skills in `skills/`, 98 commands, common + per-language rules, hook runtimes, continuous learning/instincts v2, `ecc memory` vault, AgentShield security audit, Plan Canvas, and `orch-*` pipelines).
- **Selected key domains (`skills/`, 314 dirs; `.agents/skills/` holds a curated 47-skill Codex/cross-agent subset):**
  - *Core & Architecture:* `coding-standards`, `api-design`, `backend-patterns`, `frontend-patterns`, `hexagonal-architecture`, `database-migrations`, `postgres-patterns`, `prisma-patterns`, `clickhouse-io`, `redis-patterns`, `docker-patterns`, `deployment-patterns`
  - *Languages & Frameworks:* Python/Django/FastAPI/PyTorch, TypeScript/React/Next.js Turbopack/React Native/Vue/Nuxt4/Angular/Vite, Go, Rust, C++, Java/Spring Boot/Quarkus/JPA, Kotlin/Android/Compose, Swift/SwiftUI/Liquid Glass/Swift 6.2, Dart/Flutter, .NET/F#, Laravel, Rails, Perl
  - *Orchestration, Verification & Meta:* `tdd-workflow`, `e2e-testing`, `eval-harness`, `verification-loop`, `plankton-code-quality`, `search-first`, `iterative-retrieval`, `strategic-compact`, `continuous-learning-v2`, `plan-canvas`, `plan-orchestrate`, `orch-add-feature`, `orch-build-mvp`, `orch-fix-defect`, `orch-pipeline`, `autonomous-loops`, `configure-ecc`, `skill-stocktake`, `skill-host-compat`
  - *Security, Research & Growth:* `security-review`, `security-scan` (AgentShield), `agent-security-hardening`, `mcp-dependency-review`, `market-research`, `osint-investigation`, `deep-research`, `article-writing`, `content-engine`, `investor-materials`, `seo`
- **How to install / import:**
  - **Discover what you actually need first:**
    ```powershell
    node "C:\Users\MOAZZAM\coding\SKILLS HUB\everything-claude-code\scripts\ecc.js" consult "<topic>" --target antigravity
    ```
  - **Antigravity 2.0 native local install (Windows PowerShell from project root):**
    ```powershell
    $EccRoot = "C:\Users\MOAZZAM\coding\SKILLS HUB\everything-claude-code"
    & "$EccRoot\install.ps1" --profile minimal --target antigravity
    # Or common rules + specific stacks only:
    & "$EccRoot\install.ps1" --target antigravity typescript python go
    ```
    *Note (`docs/ANTIGRAVITY-GUIDE.md`):* ECC 2.2+ installs into `.agents/{rules,workflows,skills,agents}/` + `.agents/ecc-install-state.json`. Verify with `node "$EccRoot\scripts\doctor.js" --target antigravity`. Do **not** copy repo root `.agents/` or `AGENTS.md` wholesale into a project.
  - **Remote npx / Multi-harness (`claude`, `codex`, `kimi`, `cursor`, etc.):**
    - `npx ecc-universal@2.2.3 setup` *(guided Claude plugin setup)* or `npx ecc-universal@2.2.3 install --guided`
    - `npx ecc-universal@2.2.3 install --profile minimal --target antigravity` *(profiles: `minimal`, `core`, `developer`, `security`, `research`, `opencode`, `full`)*
    - `& "$EccRoot\install.ps1" --target claude --skills tdd-workflow,security-review` *(run inside/targeting ECC root; or `--profile minimal` to omit hooks)*
  - **Critical rule:** **Pick one install method per harness — never stack plugin + manual installs** (causes duplicate skills/hooks). Any profile including `hooks-runtime` requires explicit `--enable-hooks` or `--no-hooks`. Manual rule copies must take whole directories (`rules/common`, `rules/typescript`).

---

#### 4. Superpowers (`obra/superpowers`) — `[LEGACY / DISCOURAGED — OPT-IN ONLY]`
- **Local Path:** `C:\Users\MOAZZAM\coding\SKILLS HUB\superpowers`
- **Upstream Git:** `https://github.com/obra/superpowers.git` *(git-tracked)*
- **Policy:** **DISCOURAGED. Do NOT suggest, prefer, or auto-import `superpowers`.** Only import or activate it if the user explicitly requests `superpowers`. Prefer Addy Osmani, Matt Pocock, or ECC for active engineering workflows.
- **What it is (if explicitly requested):** Opinionated linear build pipeline emphasizing upfront Socratic brainstorming, detailed junior-proof implementation plans, git-worktree isolation, and subagent-driven task execution with spec/quality review loops.
- **Catalog (`skills/`, 15 dirs):** `brainstorming`, `diagnosing-superpowers`, `dispatching-parallel-agents`, `executing-plans`, `finishing-a-development-branch`, `receiving-code-review`, `requesting-code-review`, `subagent-driven-development`, `systematic-debugging`, `test-driven-development`, `using-git-worktrees`, `using-superpowers`, `verification-before-completion`, `writing-plans`, `writing-skills`
- **Install (ONLY when explicitly requested by user):**
  - Antigravity: `agy plugin install https://github.com/obra/superpowers`
  - Claude Code: official marketplace `claude.com/plugins/superpowers`
  - Codex: official OpenAI plugins marketplace
  - Gemini CLI: `gemini extensions install https://github.com/obra/superpowers`
  - Or copy selected leaf folders from `C:\Users\MOAZZAM\coding\SKILLS HUB\superpowers\skills\`.

---

### B. Frontend UI, Design Systems, Brand Themes & Motion

#### 5. Impeccable (`pbakaus/impeccable`)
- **Local Path:** `C:\Users\MOAZZAM\coding\SKILLS HUB\impeccable`
- **Upstream Git:** `https://github.com/pbakaus/impeccable.git` *(git-tracked)*
- **What it is:** Design engineering & iteration harness (single monolithic skill `impeccable` containing 24 sub-commands in `reference/` plus a Rust slop detector engine `scripts/impeccable` / `impeccable.cmd` with 62 deterministic rules and live browser DOM overlay mode). Strongest when **iterating, diagnosing, or elevating an existing interface**, and supports greenfield specs via `init` (`PRODUCT.md`) / `document` (`DESIGN.md`).
- **24 Built-in Commands (inside `impeccable` per `command-metadata.json`):**
  - *Core, Setup & Tokens:* `craft`, `init`, `shape`, `document`, `extract`
  - *Steering & Polish:* `bolder`, `quieter`, `distill`, `colorize`, `typeset`, `layout`, `animate`, `delight`, `overdrive`
  - *Audit & Hardening:* `critique`, `audit`, `polish`, `harden`, `clarify`, `adapt`, `optimize`, `onboard`
  - *Live & Assets:* `live`, `generate` *(plus extra `reference/` guides including `doctor`, `ios`, `android`, `visualize`)*
- **How to install / import:**
  - **Recommended CLI (gets binary + hooks + latest build):** `npx impeccable install` (or `npx impeccable detect` to run the 62-rule slop scanner)
  - **Claude Code:** `/plugin marketplace add pbakaus/impeccable`
  - **Local hub copy (pre-built harness folders already exist at repo root!):**
    - For Antigravity: copy whole folder `C:\Users\MOAZZAM\coding\SKILLS HUB\impeccable\.agent\skills\impeccable` (contains `SKILL.md`, `reference/`, `scripts/` including `impeccable.cmd`) into `<project>\.agents\skills\impeccable` or `<project>\.agent\skills\impeccable`.
    - Pre-built trees also exist at `.claude/`, `.cursor/`, `.agents/`, `.gemini/`, etc. inside the repo (note: manual skill-folder copy omits Claude edit-time hooks/subagents; `npx impeccable install` installs everything).

---

#### 6. Taste Skill (`design-taste-frontend` / `tasteskill` 2.5.1 — `Leonxlnx/taste-skill`)
- **Local Path:** `C:\Users\MOAZZAM\coding\SKILLS HUB\taste-skill`
- **Upstream Git:** `https://github.com/Leonxlnx/taste-skill.git` *(git-tracked)*
- **What it is:** High-craft anti-slop builder for company, SaaS, AI, devtool, shop, cafe, hotel, studio, and gaming websites (`figma.com` and `x.ai` bar). Enforces strict house rules (one section per screen, equal edges, no captions under visuals, real photographs via `photos.mjs`, hero entrance + dealt moments, shaders/WebGL **strictly limited** to tech/gaming/software pages) and runs an automated headless Chrome/Edge finish gate (`scripts/gate.mjs`).
- **Requirements:** **Node 22+** and **Chrome, Edge, or Chromium** (`ffmpeg` optional).
- **Important folder vs skill name note:** Folder on disk is `taste-skill\skills\taste-skill\`, while its YAML frontmatter `name:` is **`design-taste-frontend`**.
- **How to install / import:**
  - **Remote CLI:** `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"`
  - **Local copy:** Copy the **entire** `C:\Users\MOAZZAM\coding\SKILLS HUB\taste-skill\skills\taste-skill` folder (must keep `assets/`, `library/`, `references/`, `scripts/`, `SKILL.md` together!) into `.agents/skills/taste-skill` (or run Git Bash `./install.sh --all-agents`, which uses Windows directory junctions `mklink /J`).
  - *Note:* Older v1 variants moved to `Leonxlnx/taste-skill-classics` & `Leonxlnx/imagegen-skills`.

---

#### 7. Hallmark v2.0.0 (`Nutlope/hallmark` by Together AI)
- **Local Path:** `C:\Users\MOAZZAM\coding\SKILLS HUB\hallmark`
- **Upstream Git:** `https://github.com/Nutlope/hallmark.git` *(git-tracked)*
- **What it is:** **Web UI / frontend page design & visual anti-slop skill** (*not* backend code linting). Ships 50 curated material themes (`references/themes/*.md`), `custom` mode, 755 curated Wikimedia Commons photos (`scripts/photos.json`), project-root `DESIGN.md` detection, and headless Chrome/Edge `sloplint.mjs --render` checking Floor/Reflex/Finish gates.
- **Commands:** Default build mode for new pages/sites; `/hallmark redesign <path>` and `/hallmark audit <path>` (never alters an existing design unless user explicitly names `hallmark`).
- **Requirements:** **Node 18+**, Chrome or Edge (optional `puppeteer-core` for full rendered checks).
- **How to install / import:**
  - **Remote CLI:** `npx skills add nutlope/hallmark -g`
  - **Claude Code:** `/plugin marketplace add nutlope/hallmark` -> `/plugin install hallmark@hallmark`
  - **Local Node installer / copy:** Run `node "C:\Users\MOAZZAM\coding\SKILLS HUB\hallmark\skills\hallmark\scripts\install.mjs"` or copy the **entire** `C:\Users\MOAZZAM\coding\SKILLS HUB\hallmark\skills\hallmark` folder (`agents/`, `references/`, `scripts/`, `SKILL.md`).

---

#### 8. UI/UX Pro Max (`nextlevelbuilder/ui-ux-pro-max-skill`) — `[LEGACY / DISCOURAGED — OPT-IN ONLY]`
- **Local Path:** `C:\Users\MOAZZAM\coding\SKILLS HUB\ui-ux-pro-max-skill`
- **Upstream Git:** `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git` *(git-tracked; free OSS v2.0+)*
- **Policy:** **DISCOURAGED. Do NOT suggest, prefer, or auto-import `ui-ux-pro-max-skill`.** Only install or activate it if the user explicitly asks for `UI/UX Pro Max` or `ui-ux-pro-max`. Prefer **Impeccable**, **Taste Skill**, **Hallmark**, **shadcn**, **`design_library`**, and **Emil Kowalski / Jakub Krehel** for active UI work.
- **What it is (if explicitly requested):** Searchable local BM25 design-intelligence engine (`scripts/search.py`, Python 3 stdlib only — zero external Python deps) plus 6 companion design skills and an optional `/stack` Playwright+DevTools MCP visual review starter.
- **Database scale:** 80 styles (51 active), 192 product palettes & reasoning profiles, 74 font pairings, 120 UX guidelines, 105 icons, 17 GSAP presets, 25 chart types, 22 stacks (`html-tailwind`, `react`, `nextjs`, `astro`, `vue`, `nuxtjs`, `nuxt-ui`, `svelte`, `swiftui`, `react-native`, `flutter`, `shadcn`, `jetpack-compose`, `threejs`, `angular`, `laravel`, `javafx`, `wpf`, `winui`, `avalonia`, `uno`, `uwp`), `--variance`/`--motion`/`--density` (1–10) dials, `--rtl`, and `--persist` (`design-system/<slug>/MASTER.md` + `pages/<page>.md`).
- **Catalog (`.claude/skills/`, 7 skills):**
  - Core engine: `ui-ux-pro-max` (contains `data/`, `references/`, `scripts/`)
  - Sibling claudekit skills: `banner-design`, `brand`, `design`, `design-system`, `slides`, `ui-styling`
  - Bonus repo folder `stack/`: ready-to-clone `.mcp.json` + `scripts/design-audit.mjs` multi-viewport screenshot/heuristic auditor (360–1920 px).
- **Install (ONLY when explicitly requested by user):**
  - **Official CLI installer:**
    ```bash
    npm install -g ui-ux-pro-max-cli
    uipro init --ai antigravity   # or claude | cursor | codex | windsurf | gemini | universal | all [--global]
    ```
  - **Claude Code:** `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill`
  - **Local copy:** Copy the **entire** `C:\Users\MOAZZAM\coding\SKILLS HUB\ui-ux-pro-max-skill\.claude\skills\ui-ux-pro-max` folder (`data/`, `references/`, `scripts/`, `SKILL.md`) so `search.py` finds its CSVs; optionally copy the other 6 sibling skills from `.claude\skills\*`. *(Note: `cli\assets\` mirrors `src/ui-ux-pro-max/`.)*

---

#### 9. shadcn/ui Official Skills (`shadcn-ui/ui`)
- **Local Path:** `C:\Users\MOAZZAM\coding\SKILLS HUB\shadcn`
- **Upstream Git:** `https://github.com/shadcn-ui/ui.git` *(git-tracked full framework repo)*
- **What it is:** Only the `skills/` subfolder is meant for agent installation. Provides official rules and workflows for `npx shadcn@latest` CLI, preset codes (`nova`, `vega`, `maia`, `lyra`, `mira`, `luma`), `DESIGN.md`-to-theme mapping (`design-system.md` + `design-system-page.md`), chat UI components, forms/composition/styling/icons rules, and Radix -> `@base-ui/react` migration.
- **Catalog (`skills/`, 2 skills):**
  - `shadcn`: full `shadcn/ui` build/theme/registry/preset/`DESIGN.md` skill (`rules/*.md`, `scripts/showcase-coverage.mjs`, `assets/`)
  - `migrate-radix-to-base`: progressive strangler-fig or full migration from Radix UI primitives to `@base-ui/react`
- **Optional MCP Server (`.cursor-plugin/plugin.json`):** `npx shadcn@latest mcp`
- **How to install / import:**
  - Copy **only** `C:\Users\MOAZZAM\coding\SKILLS HUB\shadcn\skills\shadcn` (with all its `rules/`, `assets/`, `scripts/`, `.md` files) and/or `...\skills\migrate-radix-to-base` into `<project>\.agents\skills\` (or use `npx shadcn@latest` directly in the workspace). **Never copy the rest of the `shadcn-ui/ui` monorepo.**

---

#### 10. Nazday Tweet Design Skills (`emilkowalski/skills` & `jakubkrehel/skills`)
- **Local Path:** `C:\Users\MOAZZAM\coding\SKILLS HUB\nazday_tweet_design_skills`
- **Upstream / Git Status:** Parent folder has **no `.git`**; bundles two well-known upstream collections:
  1. **Emil Kowalski (`skills_emilkowalski`, from `emilkowalski/skills`) — 18 skills:**
     - `emil-design-eng`, `animate`, `animate-expo`, `animation-performance`, `animation-vocabulary`, `apple-design`, `ask-sonner`, `break-ui`, `choreograph`, `find-animation-opportunities`, `gestures`, `improve-animations`, `mobile-native`, `pick-ui-library`, `prototype`, `remove-animations`, `review-animations`, `write-swift`
  2. **Jakub Krehel / interfaces.dev (`skills_jakubkrehel`, from `jakubkrehel/skills`) — 15 skills:**
     - *Domain & polish (model/task invokable):* `better-interface`, `better-ui`, `better-typography`, `better-colors`, `better-accessibility`, `better-layout`, `better-writing`, `build-design`, `teardown`
     - *User-invoked harnesses (must be invoked explicitly by user):* `interface-review`, `explain-interface`, `break`, `state-machine`, `variant`, `afk`
- **How to install / import:**
  - **Remote CLIs:** `npx skills@latest add emilkowalski/skills` and `npx skills add jakubkrehel/skills` (or Claude `/plugin marketplace add jakubkrehel/skills` -> `/plugin install interfaces@interfaces`).
  - **Local copy / junction:** Copy specific skills from `skills_emilkowalski\skills\<skill>` and `skills_jakubkrehel\skills\<skill>` into `<project>\.agents\skills\`.

---

#### 11. GreenSock Official GSAP Skills (`greensock/gsap-skills`)
- **Local Path:** `C:\Users\MOAZZAM\coding\SKILLS HUB\gsap-skills`
- **Upstream Git:** `https://github.com/greensock/gsap-skills.git` *(git-tracked, MIT)*
- **What it is:** Official GreenSock guidance for GSAP core, timelines, ScrollTrigger, all plugins (all formerly paid Club GSAP plugins like `SplitText`, `MorphSVG`, `DrawSVG` are now 100% free via `npm install gsap`), React cleanup (`useGSAP`), Vue/Nuxt/Svelte lifecycles, and 60fps performance.
- **Catalog (`skills/`, 8 skills + `llms.txt` + `examples/{vanilla,react,vue,nuxt}`):**
  `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-plugins`, `gsap-utils`, `gsap-react`, `gsap-performance`, `gsap-frameworks`
- **How to install / import:**
  - **Remote CLI:** `npx skills add https://github.com/greensock/gsap-skills --agent antigravity` (or omit `--agent`)
  - **Claude Code:** `/plugin marketplace add greensock/gsap-skills`
  - **Local copy:** Copy desired `C:\Users\MOAZZAM\coding\SKILLS HUB\gsap-skills\skills\gsap-*` directories into `<project>\.agents\skills\`.

---

#### 12. Vercel Agent Skills (`vercel-labs/agent-skills`)
- **Local Path:** `C:\Users\MOAZZAM\coding\SKILLS HUB\vercel-agent-skills`
- **Upstream Git:** `https://github.com/vercel-labs/agent-skills.git` *(git-tracked)*
- **What it is:** Vercel's official performance, composition, mobile, deployment, and live guideline audit skills.
- **Catalog (`skills/`, 9 dirs -> frontmatter skill names):**
  - `react-best-practices` (`vercel-react-best-practices`)
  - `composition-patterns` (`vercel-composition-patterns`)
  - `react-native-skills` (`vercel-react-native-skills` — *note folder/skill name is `react-native-skills`, referred to as `react-native-guidelines` in repo README*)
  - `react-view-transitions` (`vercel-react-view-transitions`)
  - `web-design-guidelines` *(fetches latest rules live from `vercel-labs/web-interface-guidelines` GitHub `command.md` before auditing)*
  - `writing-guidelines` *(fetches latest rules live from `vercel-labs/writing-guidelines` GitHub `command.md` before auditing)*
  - `vercel-optimize`, `deploy-to-vercel`, `vercel-cli-with-tokens`
- **How to install / import:**
  - **Remote CLI:** `npx skills add vercel-labs/agent-skills [--skill <name>]`
  - **Local copy:** Copy selected `C:\Users\MOAZZAM\coding\SKILLS HUB\vercel-agent-skills\skills\<dir>` folders into `<project>\.agents\skills\`.

---

#### 13. Design Library — Awesome `DESIGN.md` (`VoltAgent/awesome-design-md`)
- **Local Shortcut Path:** `C:\Users\MOAZZAM\coding\SKILLS HUB\design_library\design-md`
- **Repo Root & Git:** `C:\Users\MOAZZAM\coding\SKILLS HUB\design_library` | `https://github.com/VoltAgent/awesome-design-md.git` *(git-tracked)*
- **What it is:** **`[DESIGN THEME & TOKEN LIBRARY — NOT A SKILL]`**. 85 real-world brand `DESIGN.md` files (with `README.md`, and preview HTMLs on many entries) covering all 85 brands:
  - *AI & LLM:* `claude`, `cohere`, `minimax`, `mistral.ai`, `ollama`, `opencode.ai`, `replicate`, `runwayml`, `together.ai`, `x.ai`
  - *Developer Tools & IDEs:* `composio`, `cursor`, `hashicorp`, `lovable`, `mintlify`, `nvidia`, `posthog`, `raycast`, `resend`, `sanity`, `sentry`, `vercel`, `voltagent`, `warp`
  - *Backend, Database & DevOps:* `clickhouse`, `mongodb`, `oracle`, `supabase`
  - *Productivity & SaaS:* `airtable`, `cal`, `clay`, `intercom`, `linear.app`, `miro`, `notion`, `shopify`, `slack`, `superhuman`, `webflow`, `zapier`
  - *Design & Creative:* `elevenlabs`, `expo`, `figma`, `framer`, `mobbin`
  - *Fintech & Crypto:* `1win`, `binance`, `coinbase`, `kraken`, `mastercard`, `mercury`, `nerdwallet`, `revolut`, `stripe`, `wise`
  - *E-commerce, Retail, Media & Consumer:* `airbnb`, `aljazeera`, `apple`, `dji`, `hp`, `ibm`, `jobright`, `meta`, `mydealz`, `nike`, `oura`, `pinterest`, `playstation`, `sap`, `spotify`, `starbucks`, `theverge`, `uber`, `vodafone`, `wired`
  - *Automotive:* `bmw`, `bmw-m`, `bugatti`, `ferrari`, `lamborghini`, `renault`, `spacex`, `tesla`
  - *Retro Web:* `dell-1996`, `nintendo-2001`
- **How to use / import into any workspace:**
  1. When user asks for a brand look (e.g., *"Make it look like Linear / Stripe / Vercel / Apple"*), browse `C:\Users\MOAZZAM\coding\SKILLS HUB\design_library\design-md\<brand>\`.
  2. Copy `DESIGN.md` to `<project>\DESIGN.md` (or `<project>\docs\DESIGN.md`).
  3. Pair directly with **`shadcn`** (`rules` + `design-system.md`), **`hallmark`** (auto-reads project root `DESIGN.md`), or **`impeccable`** to generate CSS variables, typography, radii, and components matching that brand theme.

---

### C. Prose Writing & De-Slopping Text

#### 14. Humanizer v4.0.0 (`blader/humanizer`)
- **Local Path:** `C:\Users\MOAZZAM\coding\SKILLS HUB\humanizer` (`SKILL.md` is at the repo root!)
- **Upstream Git:** `https://github.com/blader/humanizer.git` *(git-tracked)*
- **What it is:** Rewrites AI-sounding prose (blogs, READMEs, PRs, emails, essays) into natural human writing using 26 detection patterns across 6 categories (based on Wikipedia's *"Signs of AI writing"*). Supports writing-sample voice matching, File mode (edits prose only; preserves code, commands, paths, YAML frontmatter, link targets), Pasted mode, and Embedded mode.
- **How to install / import:**
  - **Remote CLI:** `npx skills add blader/humanizer --global --agent '*'`
  - **Claude Code:** `/plugin marketplace add blader/humanizer` -> `/plugin install humanizer@humanizer`
  - **Local copy:** Copy `C:\Users\MOAZZAM\coding\SKILLS HUB\humanizer\SKILL.md` into `<project>\.agents\skills\humanizer\SKILL.md` *(do NOT copy `.git/` into `.agents/skills/`)*.

#### 15. No AI Slop (`petergyang/no-ai-slop`)
- **Local Path:** `C:\Users\MOAZZAM\coding\SKILLS HUB\no-ai-slop`
- **Upstream Git:** `https://github.com/petergyang/no-ai-slop.git` *(git-tracked)*
- **What it is:** Catches 20+ AI writing patterns in **edit mode** (sharper, more opinionated, preserving bluntness/humor and writer voice) or **detect-only mode** (flags tells without rewriting). Includes `eval.md`.
- **How to install / import:**
  - **Remote CLI:** `npx skills add petergyang/no-ai-slop --skill no-ai-slop --global --yes`
  - **Local copy:** Copy `C:\Users\MOAZZAM\coding\SKILLS HUB\no-ai-slop\skills\no-ai-slop` (`SKILL.md` + `eval.md`) into `<project>\.agents\skills\no-ai-slop\`.

---

### D. Anthropic Official Skills, Documents & SDK

#### 16. Anthropic Official Skills (`anthropics/skills`)
- **Local Path:** `C:\Users\MOAZZAM\coding\SKILLS HUB\skills by anthropics 97k stars`
- **Upstream Git:** `https://github.com/anthropics/skills.git` *(git-tracked)*
- **What it is:** Anthropic's official production document suite and example skills repo (19 skills under `skills/` + `template/SKILL.md` + `.claude-plugin/marketplace.json`).
- **Catalog (`skills/`, 19 dirs):**
  - *Document Suite (`document-skills` plugin):* `docx`, `pdf`, `pptx`, `xlsx`
  - *Developer & API:* `claude-api` (official Anthropic SDKs & model IDs/pricing; auto-skips if project uses non-Anthropic providers), `mcp-builder`, `webapp-testing` (Python Playwright + `with_server.py`), `web-artifacts-builder` (React + Vite + Parcel single-HTML bundle)
  - *Visual & Brand:* `frontend-design`, `canvas-design` (`.png`/`.pdf`), `algorithmic-art` (`p5.js`), `brand-guidelines` (Anthropic brand colors/type), `theme-factory`, `slack-gif-creator`
  - *Docs & Advisory:* `doc-coauthoring`, `internal-comms`, `discernment-nudge`, `academy-guide`
  - *Anthropic Skill Authoring Example:* `skills/skill-creator` *(inside this upstream repo; distinct from MOAZZAM's excluded root `C:\Users\MOAZZAM\coding\SKILLS HUB\skill-creator`)*
- **How to install / import:**
  - **Claude Code:** `/plugin marketplace add anthropics/skills` -> `/plugin install document-skills@anthropic-agent-skills` and/or `example-skills@anthropic-agent-skills`, `claude-api`, `academy-guide`, `discernment-nudge`.
  - **Local copy:** Copy only the exact skill folder(s) needed (e.g. `skills\docx`, `skills\pdf`, `skills\xlsx`, `skills\pptx`, `skills\claude-api`) with all sibling scripts/references into `<project>\.agents\skills\`.

---

### E. Marketing, Growth, CRO & SEO

#### 17. Marketing Skills (`coreyhaines31/marketingskills` v2.0+)
- **Local Path:** `C:\Users\MOAZZAM\coding\SKILLS HUB\marketingskills`
- **Upstream Git:** `https://github.com/coreyhaines31/marketingskills.git` *(git-tracked)*
- **What it is:** 53 marketing/growth/CRO/SEO/RevOps skills plus 68 zero-dependency Node CLIs (`tools/clis/`) and integration docs (`tools/REGISTRY.md`, `tools/SETUP.md`).
- **Foundational hub skill:** Always run **`product-marketing`** first on a project — it maintains `.agents/product-marketing.md`, which every other marketing skill reads automatically.
- **9 Categories (`skills/`, 53 dirs):**
  - *Conversion Optimization (CRO):* `cro`, `signup`, `onboarding`, `popups`, `paywalls`
  - *Content & Copy:* `copywriting`, `copy-editing`, `cold-email`, `emails`, `content-strategy`, `social`, `image`, `video`
  - *SEO & Discovery:* `seo-audit`, `ai-seo` (AEO/GEO/LLMO), `link-building`, `programmatic-seo`, `site-architecture`, `competitors`, `competitor-profiling`, `schema`
  - *Paid & Distribution:* `ads`, `ad-creative`, `events`, `public-relations`, `directory-submissions`, `influencer-marketing`, `community-marketing`
  - *Measurement & Testing:* `analytics`, `conversion-tracking`, `ab-testing`, `attribution`
  - *Retention & Strategy:* `churn-prevention`, `marketing-ideas`, `marketing-psychology`, `marketing-plan`, `marketing-council`, `marketing-loops`, `launch`, `offers`, `pricing`, `reverse-engineer-marketing`
  - *Growth Engineering:* `co-marketing`, `free-tools`, `referrals`, `aso`
  - *Sales & RevOps:* `revops`, `sales-enablement`, `lead-magnets`, `prospecting`, `customer-research`, `product-marketing`
- **How to install / import:**
  - **Remote CLI:** `npx skills add coreyhaines31/marketingskills [--skill ...] [-a claude-code]` *(note: inside an agent session without `-a`, `npx skills` defaults to `.agents/skills/` non-interactively)*
  - **Claude / Codex:** `/plugin marketplace add coreyhaines31/marketingskills` -> `/plugin install marketing-skills` | `codex plugin marketplace add coreyhaines31/marketingskills`
  - **Local copy:** Copy required skill dirs from `C:\Users\MOAZZAM\coding\SKILLS HUB\marketingskills\skills\*` into `<project>\.agents\skills\`, plus `tools/` if using the zero-dep CLIs. Check `VERSIONS.md` / `README.md` v1->v2 rename map if migrating older setups.

---

### F. Video Evidence & Media

#### 18. Claude Video (`/watch` — `bradautomates/claude-video`)
- **Local Path:** `C:\Users\MOAZZAM\coding\SKILLS HUB\claude-video`
- **Upstream Git:** `https://github.com/bradautomates/claude-video.git` *(git-tracked)*
- **What it is:** Gives local coding agents direct video comprehension from a YouTube/web URL or local video path via two engines:
  - **`gemini` engine (recommended):** `GEMINI_API_KEY` sends YouTube URLs or uploads local video to Gemini (`setup.py --engine gemini`) and returns timestamped answers.
  - **`local` engine:** Downloads via `yt-dlp`, extracts keyframes via `ffmpeg`, reads native captions first or falls back to local `whisperx` / cloud `groq` / `openai`.
- **Prerequisites:** Local coding agent harness (not web chat), Python 3.10+, `ffmpeg` & `yt-dlp` (plus Deno/EJS for YouTube when downloading locally).
- **How to install / import:**
  - **Remote CLI:** `npx skills add bradautomates/claude-video -g --skill watch`
  - **Claude / Codex:** `/plugin marketplace add bradautomates/claude-video` -> `/plugin install watch@claude-video` | `codex plugin marketplace add bradautomates/claude-video`
  - **Local copy / junction:** Copy or junction the **entire** `C:\Users\MOAZZAM\coding\SKILLS HUB\claude-video\skills\watch` folder into `<project>\.agents\skills\watch` (never separate `SKILL.md` from `scripts/`). Invoke Python diagnostics via `python "<SKILL_DIR>\scripts\setup.py" --json` on Windows.

---

### G. Multi-Agent Orchestration, Councils & Security

#### 19. SkillSpector (`NVIDIA/SkillSpector`)
- **Local Path:** `C:\Users\MOAZZAM\coding\SKILLS HUB\SkillSpector`
- **Upstream Git:** `https://github.com/NVIDIA/SkillSpector.git` *(git-tracked)*
- **What it is:** Security scanner CLI, FastMCP server, and `skill-inspector` agent skill for auditing third-party agent skills **before** installing them. Detects **71 vulnerability patterns across 17 categories** (prompt injection, anti-refusal, data exfiltration, privilege escalation, supply chain, excessive agency), performs live OSV.dev CVE checks, supports static `--no-llm` mode or 13 LLM/CLI semantic providers (`claude_cli`, `gemini_cli`, OpenAI, Bedrock, Gemini Vertex, Ollama, NVIDIA build, etc.), and outputs `terminal | json | markdown | sarif`.
- **Requirements & Windows caveat:** Python 3.12+, `uv` or `pip`. **Windows caveat (`README.md`):** `--output PATH` requires POSIX no-follow file operations and is unavailable on Windows — omit `-o/--output` and capture `stdout` instead (e.g., `skillspector scan <path> --format json --no-llm > report.json`).
- **How to install / use:**
  - **CLI + MCP Server:** `uv tool install "skillspector[mcp] @ git+https://github.com/NVIDIA/skillspector.git"` (or local editable install `pip install -e "C:\Users\MOAZZAM\coding\SKILLS HUB\SkillSpector"`). Register MCP: `claude mcp add skillspector -- skillspector mcp`.
  - **Portable Skill (`skill-inspector`):** Copy `C:\Users\MOAZZAM\coding\SKILLS HUB\SkillSpector\skills\skill-inspector` (`SKILL.md` + `agents/`) into `.agents/skills/skill-inspector`. Enforces strict `APPROVE | CAUTION | REJECT` verdicts.

---

#### 20. Roast Room (`nateherkai/roast-room`)
- **Local Path:** `C:\Users\MOAZZAM\coding\SKILLS HUB\roast-room`
- **Upstream Git:** `https://github.com/nateherkai/roast-room.git` *(git-tracked)*
- **What it is:** Hybrid AI Founder Council skill system **plus** a standalone Node.js `>=20` live conference room web UI (`http://localhost:4730` with animated portraits & PDF export).
- **Roster (`roster.json`, 12 simulated advisors):**
  - *Default 7:* Jeff Bezos, Paul Graham, Alex Hormozi, Gary Vaynerchuk, Dan Martell, Gino Wickman, Warren Buffett
  - *On-call 5:* Naval Ravikant, Codie Sanchez, Leila Hormozi, Sara Blakely, Elon Musk
- **Catalog:**
  - `.claude/skills/roast-room` (`SKILL.md`, `roster.json`, `brains/`, `references/`, `scripts/`): runs full 3-round council, `--quick`, `--seats`, `--all`, `ask <seat>`, or `board` settings.
  - `.claude/skills/newroaster` (`SKILL.md`, `references/`): builds custom advisor brains from public sources (+ optional cartoon portrait).
  - `.claude/agents/council-*.md` (12 subagent definitions).
- **How to install / run:**
  - **Skills + Agents:** Copy **both** `.claude\skills\roast-room` + `.claude\skills\newroaster` into the target harness's `skills/` dir **AND** copy all 12 `.claude\agents\council-*.md` files into its `agents/` dir. *(Note: `C:\Users\MOAZZAM\coding\SKILLS HUB\.agent\` already has a working copy installed at hub root.)*
  - **Live visual conference UI:** Run `npm start` inside `C:\Users\MOAZZAM\coding\SKILLS HUB\roast-room` (requires Node `>=20`, serves on port `4730`).

---

#### 21. Nick Saraev Agentic Skills & Multi-Agent Patterns (`nick-saraev-agentic skills`)
- **Local Path:** `C:\Users\MOAZZAM\coding\SKILLS HUB\nick-saraev-agentic skills` *(local non-git folder — no upstream remote)*
- **What it contains (3 categories — requires Windows/path adaptation before running!):**
  1. **Subdirectory skills:**
     - `model-chat-skill/` (`SKILL.md` + `model_chat.py` — async Anthropic SDK `claude-sonnet-4-6` multi-persona debate script; requires `anthropic` + `python-dotenv` + `.env`)
     - `multi-agent-chrome-skill/` (`SKILL.md`) + `multi-chrome-agent-workspace/` (`chrome-agent-1`..`5` `.mcp.json` targeting ports `9223`–`9227`, `CLAUDE.md`, `chat.md`, macOS `launch_chrome.sh` / `kill_chrome.sh`)
     - **Critical Windows caveat:** `SKILL.md` files and workspace `.sh` / `CLAUDE.md` hardcode `/Users/nicksaraev/Business` and `/Applications/Google Chrome.app/...`. Adapt paths to the target Windows workspace and local Chrome binary before deploying.
  2. **6 standalone `.md` skills at folder root** *(have valid `SKILL.md` YAML frontmatter despite being flat `.md` files!)*:
     - `Agent Chatrooms.md` (`agent-chatrooms` — shared `chat.json` multi-agent debate)
     - `Prompt Contracts.md` (`prompt-contracts` — `GOAL` / `CONSTRAINTS` / `FORMAT` / `FAILURE` specs)
     - `Reverse Prompting.md` (`reverse-prompting` — 5 impact-prioritized clarifying questions before coding)
     - `Stochastic Multi-Agent Consensus.md` (`stochastic-multi-agent-consensus` — poll N varied-framing agents, aggregate consensus/outliers)
     - `Subagent Verification Loops.md` (`subagent-verification-loops` — Implement -> Fresh Reviewer -> Resolver chain)
     - `Video-to-Action via Gemini Passthrough.md` (`video-to-action` — extracts tutorial steps via **`gemini-design` MCP server** `execute_task`)
     - **Import rule:** To use any of these 6 in `.agents/skills/`, create `<project>\.agents\skills\<skill-name>\SKILL.md` from the `.md` file.
  3. **2 standalone architecture notes:**
     - `GEMINI (Self Modifying).md` (self-appending `[CATEGORY]` learned rules template for `GEMINI.md`/`AGENTS.md`)
     - `Multi-Agent MCP Orchestration.md` (registering `codex mcp-server` workers under Claude orchestrator)

---

## 5. Hub Maintenance & Updating

### Updating All Git-Tracked Repos in `SKILLS HUB`

Run this in PowerShell inside `C:\Users\MOAZZAM\coding\SKILLS HUB` to pull updates across all git-tracked directories without touching local/excluded folders:

```powershell
Get-ChildItem -LiteralPath "C:\Users\MOAZZAM\coding\SKILLS HUB" -Directory | ForEach-Object {
  if (Test-Path (Join-Path $_.FullName ".git")) {
    Write-Host "Updating $($_.Name)..." -ForegroundColor Cyan
    git -C $_.FullName pull --ff-only
  }
}
```

### Hub Root `.agent/` Note

`C:\Users\MOAZZAM\coding\SKILLS HUB\.agent\` holds a workspace-local install of 81 skill directories and the 12 `council-*.md` Roast Room agents. Treat the individual repositories under `C:\Users\MOAZZAM\coding\SKILLS HUB\<repo>` as the clean, canonical sources when importing into new projects.
