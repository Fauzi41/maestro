# maestro-web Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the `maestro-web` agent skill (router `SKILL.md` + progressive references) in the public repo `Fauzi41/maestro`.

**Architecture:** One router `SKILL.md` that loads `references/*` only when needed; a Node structural checker (`tools/check.mjs`) acts as the test suite for the markdown files; behavior is validated by scripted dry-run walkthroughs.

**Tech Stack:** Markdown (Agent Skills spec), Node ≥ 18 (checker only, no dependencies), git.

**Spec:** `docs/superpowers/specs/2026-11-10-maestro-web-design.md`

## Global Constraints

- English everywhere in the repo.
- `skills/maestro-web/SKILL.md` body ≤ 150 lines; frontmatter has only `name: maestro-web` and `description` (≤ 300 chars, mentions "maestro" and web project intents).
- Every `references/**/*.md` ≤ 120 lines, except `references/models-catalog.md` ≤ 200 lines.
- `templates/state.md` ≤ 30 lines.
- Never instruct the agent to install a skill without explicit user approval.
- Model names never appear in `SKILL.md`, phase files, or `models.md` — only in `models-catalog.md` (so rot is confined to one file).
- Commands exactly: `maestro`, `maestro resume`, `maestro status`, `maestro skip <phase>`, `maestro models`, `maestro budget <thrift|balanced|quality>`.
- Phase ids exactly: `intake, discover, design, architect, plan, build, qa, ship`.
- Tier names exactly: `Deep`, `Balanced`, `Fast`. Budget modes exactly: `thrift`, `balanced`, `quality`. Sizes exactly: `tweak`, `small`, `project`.
- State file path exactly: `.maestro/state.md`.
- Install command form: `npx skills add <owner/repo> --skill <name>`; this repo: `npx skills add Fauzi41/maestro --skill maestro-web`.
- Switch message format is fixed (spec §6.4 rule 5), ≤ 5 lines.

## Review Focus

1. User has only one model / one tier → no switch recommendations at all, only context-hygiene advice. (Task 6 dry-run D)
2. Agent without subagent support → never says "delegating to subagent". (Task 6 dry-run E)
3. User lists a model not in the catalog (e.g., a new Chinese model) → name-cue mapping + confirmation, recorded in state. (Task 3 check + dry-run D)
4. `maestro resume` in a fresh chat with a stale/missing state file → says so and offers intake, doesn't hallucinate a phase. (Task 2 SKILL.md section + dry-run C)
5. superpowers installed → no duplicate gates; Design/Architect folded into spec sections. (Task 4 discover/design/architect + dry-run B)

---

## File Structure

```
maestro/
  README.md                     # Task 7
  LICENSE                       # Task 7 (MIT, "Fauzi41", 2026)
  tools/check.mjs               # Task 1 — structural test suite
  docs/dry-runs.md              # Task 6 — walkthrough transcripts + findings
  skills/maestro-web/
    SKILL.md                    # Task 2
    references/
      models.md                 # Task 3
      models-catalog.md         # Task 3
      skills-catalog.md         # Task 4
      token-rules.md            # Task 2
      phases/{intake,discover,design,architect,plan,build,qa,ship}.md   # Task 5
    templates/state.md          # Task 2
```

---

### Task 1: Structural checker

**Files:**
- Create: `tools/check.mjs`

**Interfaces:**
- Produces: `node tools/check.mjs` → prints `PASS <check>` / `FAIL <check>: <reason>` lines, exit code 1 if any FAIL. Each later task "turns green" its checks. Checks are grouped by name prefix so tasks can see theirs: `skill:*`, `models:*`, `catalog:*`, `phases:*`, `repo:*`.

- [ ] **Step 1: Write `tools/check.mjs`** with these checks (plain `fs`, no deps; a missing file = FAIL, not crash):
  - `skill:frontmatter` — `SKILL.md` starts with `---`, has `name: maestro-web`, `description:` ≤ 300 chars containing `maestro`.
  - `skill:length` — body ≤ 150 lines.
  - `skill:links` — every relative path referenced in backticks or links under `references/` or `templates/` in `SKILL.md` exists.
  - `skill:commands` — `SKILL.md` contains all six command strings from Global Constraints.
  - `skill:no-model-names` — `SKILL.md`, `references/models.md`, `references/phases/*.md` contain none of: `opus, sonnet, haiku, gpt-, gemini, grok, deepseek, qwen, kimi, glm, minimax, doubao, llama, mistral` (case-insensitive) **except** inside the name-cue line of `models.md`, which starts with `Name cues:`. Strip the agent names `Gemini CLI`, `Qwen Code`, `Kimi CLI` before matching (they are agents, not models).
  - `skill:refs-length` — each `references/**/*.md` ≤ 120 lines; `models-catalog.md` ≤ 200; `templates/state.md` ≤ 30.
  - `models:vendors` — `models-catalog.md` has a table row starting with `| ` for each vendor: `Anthropic, OpenAI, Google, xAI, Mistral, Meta, DeepSeek, Alibaba Qwen, Moonshot Kimi, Zhipu, MiniMax, ByteDance, Local`.
  - `models:verified` — `models-catalog.md` contains a line matching `/^Last verified: \d{4}-\d{2}-\d{2}$/m`.
  - `models:switch` — `models.md` has a `## How to switch` section mentioning each agent: `Claude Code, Antigravity, Cursor, Codex, Gemini CLI, Copilot, Windsurf, OpenCode, Cline, Trae, Qwen Code, Kimi CLI`.
  - `catalog:phases` — `skills-catalog.md` has a `## <phase>` heading for `discover, design, architect, plan, build, qa, ship`, and every table row in it has a cell matching `npx skills add` and a non-empty `Fallback` cell.
  - `phases:sections` — each of the 8 phase files has headings exactly `## Purpose`, `## Entry`, `## Steps`, `## Skills`, `## Fallback`, `## Exit`, `## Tier`.
  - `repo:files` — `README.md`, `LICENSE` exist; README contains `npx skills add Fauzi41/maestro --skill maestro-web`.

- [ ] **Step 2: Run it** — `node tools/check.mjs` → Expected: exits 1, all checks FAIL (no skill files yet), no stack trace.

- [ ] **Step 3: Commit** — `git add tools && git commit -m "test: structural checker for maestro-web"`

---

### Task 2: Router, token rules, state template

**Files:**
- Create: `skills/maestro-web/SKILL.md`, `skills/maestro-web/references/token-rules.md`, `skills/maestro-web/templates/state.md`

**Interfaces:**
- Consumes: checker `skill:*`.
- Produces: section names in `SKILL.md` that later files reference: `## Commands`, `## Phase map`, `## Switch rules`, `## Skill discovery`, `## Output style`, `## Coexistence with superpowers`. Phase files are referenced as `references/phases/<id>.md`.

- [ ] **Step 1: Write `SKILL.md`.** Content, in this order, terse imperative voice:
  - Frontmatter (Global Constraints).
  - One-paragraph role: conduct a web project phase by phase; recommend models; never switch or install without the user.
  - `## Commands` — the six commands with one-line behavior each (spec §6.1). `maestro resume` with missing/unparseable state: say so in one line, offer `maestro` (intake). Never guess a phase.
  - `## Phase map` — table: phase id → reference file → exit artifact → default tier (spec §6.2 table); sizing rules for `tweak`/`small`/`project` incl. Plan (light) and task-list entry condition for Build (spec §6.2 sizing).
  - `## Switch rules` — spec §6.4 rules 1–4 verbatim in meaning, and the fixed 4-line message format; "Load `references/models.md` only when composing a switch or at intake."
  - `## Skill discovery` — order installed → `references/skills-catalog.md` → `npx skills find <stack>`; approval-gated install; fallback when declined (spec §6.5).
  - `## Coexistence with superpowers` — spec §6.6 incl. folding Design/Architect into spec sections `Design direction` and `Stack`.
  - `## Output style` — 4–6 bullets summarizing `references/token-rules.md`; state is written at intake and every phase exit using `templates/state.md`.
- [ ] **Step 2: Write `token-rules.md`** — sections `## Output`, `## Reading`, `## Context hygiene`, `## Delegation`, `## Optional skills` (ponytail, caveman as optional; maestro works without them). Content from spec §6.4 rules 2–4 and §6.8.
- [ ] **Step 3: Write `templates/state.md`** — exactly the fields from spec §6.7, same order and keys.
- [ ] **Step 4: Run** `node tools/check.mjs` → Expected: `skill:frontmatter`, `skill:length`, `skill:commands`, `skill:no-model-names` PASS; `skill:links` may FAIL only for not-yet-created references.
- [ ] **Step 5: Commit** — `git commit -am "feat: maestro-web router, token rules, state template"` (add new files first).

---

### Task 3: Models

**Files:**
- Create: `skills/maestro-web/references/models.md`, `skills/maestro-web/references/models-catalog.md`

**Interfaces:**
- Consumes: tier/budget names from Global Constraints.
- Produces: `models.md` sections `## Tiers`, `## Budget modes`, `## How to switch`, `## Subagents`, `## Compatible endpoints`, `## Unknown models` (the last contains the single line starting `Name cues:`). `models-catalog.md`: one table, columns `| Vendor | Region | Deep | Balanced | Fast | Vision | Exposed in |`, then `Last verified: YYYY-MM-DD`.

- [ ] **Step 1: Research** current model names (as of execution date) from vendor docs/pricing pages for all 13 vendor rows in spec §6.3, plus the per-agent switch mechanism and subagent model-pinning support for each agent in Global Constraints. Use web search; prefer official docs. Record source URLs in a commit message body or HTML comment at the bottom of `models-catalog.md` (comments don't count toward meaning; keep within line limit).
- [ ] **Step 2: Write `models.md`** — content from spec §6.3 (tiers, budget mapping incl. collapse when tiers missing, how to switch per agent, subagent support, compatible endpoints / OpenRouter note, name cues exactly: `Name cues: opus/pro/max/ultra/thinking/reasoner/fable → Deep; sonnet/plus/standard/coder (non-mini) → Balanced; haiku/flash/mini/nano/lite/air/turbo/small → Fast. Always confirm with the user and record in state.`).
- [ ] **Step 3: Write `models-catalog.md`** — 13 rows; unverifiable names kept with `(unverified)`; vision-capable marked `👁` in `Vision` column; `Exposed in` lists agents.
- [ ] **Step 4: Run** `node tools/check.mjs` → Expected: all `models:*` PASS, `skill:no-model-names` still PASS.
- [ ] **Step 5: Commit** — `feat: model tiers and vendor catalog (last verified <date>)`.

---

### Task 4: Skills catalog

**Files:**
- Create: `skills/maestro-web/references/skills-catalog.md`

**Interfaces:**
- Produces: `## <phase>` sections; table columns `| Skill | Purpose | Source | Install | Fallback |`. Phase files reference skills by the `Skill` cell value.

- [ ] **Step 1: Verify** each seed skill from spec §6.5 exists and get its exact `npx skills add` source (check skills.sh / GitHub; `npx skills find <name>` if available). Drop any that cannot be found; note them in the commit body.
- [ ] **Step 2: Write** the catalog. Every row has a 1-line Purpose and a ≤ 25-word Fallback (what the agent does itself if declined). Header note: "Install only after explicit user approval." Add a `## stack` section with guidance: after Architect, run `npx skills find <framework> <db> <host>` and prefer official owners (e.g., vercel-labs).
- [ ] **Step 3: Run** `node tools/check.mjs` → Expected: `catalog:phases` PASS.
- [ ] **Step 4: Commit** — `feat: per-phase skills catalog`.

---

### Task 5: Phase references

**Files:**
- Create: `skills/maestro-web/references/phases/{intake,discover,design,architect,plan,build,qa,ship}.md`

**Interfaces:**
- Consumes: `SKILL.md` section names (Task 2), catalog skill names (Task 4), state keys (Task 2 template).
- Produces: nothing new; each file uses the 7 fixed headings.

- [ ] **Step 1: Write the 8 files** from spec §6.2 table + sizing, §6.6, §6.7:
  - `intake.md`: read state if present; detect agent (from environment cues, else ask); model inventory question offering catalog entries for that agent; budget question (default `balanced`); size proposal; write state. Load `models.md` + `models-catalog.md` here only.
  - `discover.md`: superpowers present → run brainstorming and require spec sections `Design direction` and `Stack`; else grill-me/brainstorming or fallback interview; exit = approved spec path in state.
  - `design.md` / `architect.md`: with superpowers → mark ✓ pointing to spec sections, no extra stop; without → own steps and artifacts (`docs/design.md`, `docs/stack.md`).
  - `plan.md`: full vs light (≤ ~10 tasks); exit = task list exists.
  - `build.md`: entry = task list; prefer subagent delegation of Fast-tier work when supported; escalate one tier after 2 failed attempts.
  - `qa.md`: tests + build + visual check (screenshot if browser tool available); hard bugs → Deep.
  - `ship.md`: finishing branch, basic SEO, deploy via host skill; exit = URL or release notes.
- [ ] **Step 2: Run** `node tools/check.mjs` → Expected: `phases:sections`, `skill:links`, `skill:refs-length`, `skill:no-model-names` PASS.
- [ ] **Step 3: Commit** — `feat: phase references`.

---

### Task 6: Dry-run walkthroughs

**Files:**
- Create: `docs/dry-runs.md`
- Modify: any skill file the findings require.

- [ ] **Step 1: Dispatch a fresh subagent per scenario** that reads only `skills/maestro-web/` and role-plays the agent, producing: phase list, every switch message, final `.maestro/state.md`. Scenarios:
  - A. Landing page for a café, Claude Code, models opus/sonnet/haiku, budget `balanced`, no superpowers.
  - B. SaaS with auth, Antigravity, superpowers installed, budget `quality`.
  - C. Tweak to an existing Next.js repo; then a fresh chat sends `maestro resume` with state deleted.
  - D. Cursor with only one model available, which is a Chinese model not in the catalog (e.g., "Kimi K9").
  - E. Trae (no subagents), budget `thrift`.
- [ ] **Step 2: Check each transcript** against Review Focus 1–5 and the fixed switch format. Record pass/fail per item in `docs/dry-runs.md`.
- [ ] **Step 3: Fix** failing skill text; rerun only failed scenarios; `node tools/check.mjs` all PASS except `repo:files`.
- [ ] **Step 4: Commit** — `test: dry-run walkthroughs`.

---

### Task 7: README, LICENSE, publish prep

**Files:**
- Create: `README.md`, `LICENSE`

- [ ] **Step 1: Write README** — title "maestro — agent skills that conduct your projects"; one line "agent skill (not the Maestro mobile-testing tool)"; what/why (3 bullets); install `npx skills add Fauzi41/maestro --skill maestro-web` + manual copy paths for Claude Code (`~/.claude/skills/`) and Antigravity (`~/.gemini/config/skills/` — verify); supported agents; mermaid flowchart of phases with tier per phase; commands table; example switch message; "Roadmap: maestro-desktop, maestro-design, maestro-video"; contributing note: update `models-catalog.md` + `Last verified`.
- [ ] **Step 2: Write LICENSE** — MIT, `Copyright (c) 2026 Fauzi41`.
- [ ] **Step 3: Run** `node tools/check.mjs` → Expected: all PASS, exit 0.
- [ ] **Step 4: Commit** — `docs: README and license`. Do not push; the user publishes.
