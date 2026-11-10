# maestro-web — Design

Date: 2026-11-10 · Status: draft for approval

## 1. Intent

`maestro-web` is an agent skill (open Agent Skills `SKILL.md` format, installable via `npx skills`) that **conducts a web project end to end**: it captures what the user wants to build, learns which AI models the user's agent offers, finds and chains the relevant existing skills per phase, and tells the user — clearly and at the right moments — when to switch models or reset context so token spend stays minimal.

Why: building a web app with an AI agent today means manually knowing which skills exist, in which order to use them, and which model fits each step. Users either burn premium-model tokens on trivial work or use weak models on decisions that matter. No existing skill combines intake + model-tier mapping + skill discovery/chaining + per-agent switch advice (survey: `find-skills` only discovers; superpowers chains coding but has no model/design layer; model routers like vex / claude-router are Claude-Code-only and not project guides).

Distribution: public GitHub repo, English. First member of a family: `maestro-desktop`, `maestro-design`, `maestro-video` later — structure must be copyable.

## 2. Goals / Non-goals / Anti-goals

**Goals**
- One trigger (`maestro`, "build a web app/site…") runs the whole guided flow.
- Works across Claude Code, Antigravity, Cursor, Codex CLI, Gemini CLI.
- Every phase boundary yields a concrete, agent-specific model recommendation (or a subagent delegation).
- Survives context resets: any model in a fresh chat can resume from a ~30-line state file.
- Token-lean by construction: small router file, progressive disclosure, terse output style.

**Non-goals**
- Programmatically detecting or switching models (skills cannot; the skill recommends, the user switches).
- Automatic cost/token telemetry.
- Non-web projects (desktop, video, design-only) — future siblings.
- Replacing the skills it chains; it conducts, it does not rewrite them.

**Anti-goals (failure even if it "works")**
- Installing third-party skills without explicit user approval.
- Switch-advice spam (recommending a switch for a 3-step phase).
- Double gates / conflicting workflows when superpowers is installed.
- A bloated `SKILL.md` that costs more tokens than it saves.
- Hard-coded model names that silently rot.

## 3. Constraints

- Skill = instructions only. No access to the agent's model list; no ability to change models.
- Must follow the Agent Skills spec: `SKILL.md` with YAML frontmatter `name`, `description`; optional `references/`, `templates/`, `scripts/`.
- `SKILL.md` body target ≤ ~150 lines; each reference file ≤ ~120 lines (except `models-catalog.md`, ≤ ~200 lines, loaded only at intake).
- Model landscape changes monthly → model table must carry a "last verified" date and degrade gracefully to tiers.
- English throughout.

## 4. Approaches considered

| Approach | Trade-off | Verdict |
|---|---|---|
| **A. One router `SKILL.md` + per-phase `references/`** | One trigger, progressive loading, easy to clone for siblings; slightly more files | **Picked by user** |
| B. Many small skills (`maestro-web-intake`, `-design`, …) | Independently invokable, but all descriptions sit in context from the start and triggers collide | Rejected |
| C. One monolithic file | Simplest, but loads everything every time — defeats the token goal | Rejected |

Sub-decisions made with the user:
- **Missing skills:** recommend + show install command + wait for approval; built-in short fallback if declined (not auto-install, not fully self-contained).
- **Agents:** multi-agent. Tier 1 (switch instructions + subagent info): Claude Code, Antigravity, Cursor, Codex CLI, Gemini CLI, GitHub Copilot, Windsurf. Tier 2 (switch instructions): OpenCode, Cline / Roo Code / Kilo Code, Trae, Qwen Code, Kimi CLI. Any other agent: generic instruction ("use your agent's model picker").
- **Model coverage:** all major vendors, explicitly including Chinese labs (see §6.3).
- **Name:** `maestro` family; this skill is `maestro-web`. README must say "agent skill" to disambiguate from the Maestro mobile-testing tool.
- **Repo:** separate repo at `c:\Users\Fore\git\github\maestro`, GitHub `Fauzi41/maestro`; install `npx skills add Fauzi41/maestro --skill maestro-web`. This spec moves into that repo at `docs/superpowers/specs/`.

## 5. Repository layout

```
maestro/                         # GitHub repo
  README.md                      # what, why, install, agents supported, flow diagram
  LICENSE                        # MIT (builder's call)
  skills/
    maestro-web/
      SKILL.md                   # router: triggers, commands, phase map, switch rules, output style
      references/
        models.md                # tier definitions, name-cue rules, switch rules per agent, subagent support
        models-catalog.md        # vendor x tier table of model names, last-verified date (loaded at intake / `maestro models` only)
        skills-catalog.md        # skills per phase: name, source, install cmd, fallback summary
        token-rules.md           # terse style, context hygiene, delegation rules
        phases/
          intake.md
          discover.md
          design.md
          architect.md
          plan.md
          build.md
          qa.md
          ship.md
      templates/
        state.md                 # .maestro/state.md template
```

Sibling skills later reuse `models.md` + `token-rules.md` verbatim (copy, not cross-skill links, so each installs standalone).

## 6. Behavior

### 6.1 Commands (recognized in natural language too)
- `maestro` / "start a web project" → Intake.
- `maestro resume` → read `.maestro/state.md`, announce phase + next step, continue.
- `maestro status` → print phase, done artifacts, next step, recommended tier (≤ 8 lines).
- `maestro skip <phase>` → mark skipped with reason in state.
- `maestro models` → re-run the model inventory question, update state.
- `maestro budget <thrift|balanced|quality>` → change budget mode.

### 6.2 Phases

Each phase file defines: purpose, entry condition, steps, skills to use (from catalog), fallback if none installed, **exit criterion (artifact)**, recommended tier.

| # | Phase | Exit artifact | Preferred skills | Tier |
|---|---|---|---|---|
| 0 | Intake | `.maestro/state.md` created (project one-liner, agent, model inventory, budget mode, size, phase plan) | — | current model |
| 1 | Discover | spec doc (goals, users, pages/features, non-goals) | brainstorming, grill-me | Deep |
| 2 | Design | design direction + tokens (palette, type, spacing) + key screen sketches | design-taste-frontend, ui-ux-pro-max, frontend-design | Deep (direction) → Balanced (applying) |
| 3 | Architect | stack decision record: framework, DB, auth, hosting, key libs, with one-line reasons | (catalog: stack-specific via `npx skills find`) | Deep |
| 4 | Plan | implementation plan of small tasks | writing-plans | Deep |
| 5 | Build | tasks done, tests green | subagent-driven-development / executing-plans, tdd, ponytail, stack skills | Balanced; Fast via subagents for boilerplate |
| 6 | QA | verification evidence (tests, build, visual check), review notes resolved | verification-before-completion, requesting-code-review, systematic-debugging | Balanced; Deep for hard bugs |
| 7 | Ship | merged + deployed URL (or release notes) | finishing-a-development-branch, seo-audit, host-specific deploy skills | Fast |

**Sizing at intake** (stated to the user, overridable):
- *Tweak* (change to existing site): Build → QA → Ship (step 1 only: merge/PR).
- *Small* (landing page, portfolio, docs site, blog on a hosted CMS): Discover (light) → Design → Architect (light: framework + host, 2–3 lines in state) → Plan (light) → Build → QA → Ship.

*(Maestro's call)* Build always runs from a task list. *Plan (light)* = a short checklist (≤ ~10 tasks); without superpowers it lives in the `.maestro/state.md` "next" area or a `docs/plan.md`; with superpowers it is whatever short plan writing-plans produces (accepted, not fought). *Tweak* builds from an inline 1–5 item checklist stated in chat and recorded in state; with superpowers, its small-change path applies. Build's entry condition: a task list exists. *Architect (light)* records framework + host so Build and Ship know which stack skills and deploy target to use.
- *Project* (multi-page app, auth/data, self-hosted CMS/admin): all phases.

### 6.3 Model tiers

Three tiers, defined by capability not brand:
- **Deep** — strongest reasoning/judgment: discovery, design direction, architecture, planning, hard bugs.
- **Balanced** — strong coder at mid cost: build, review, applying a design.
- **Fast** — cheapest/fastest: boilerplate, renames, file scans, ship chores, summaries.

`models.md` contains (small, loaded at intake and at each switch):
- tier definitions,
- **how to switch** per agent (e.g., Claude Code `/model <name>`; Antigravity model picker; Cursor/Copilot/Windsurf/Trae model dropdown; Codex `/model` or `--model`; Gemini CLI `/model` or `-m`; OpenCode `/models`; Cline/Roo/Kilo provider settings; Qwen Code / Kimi CLI `/model`),
- which agents support **model-pinned subagents** and how (e.g., Antigravity subagent `Model: flash|pro`; Claude Code agent frontmatter `model:`; OpenCode agent `model:`),
- a note that Claude Code and other Anthropic/OpenAI-compatible agents can run Chinese models via their compatible endpoints (GLM, Kimi, DeepSeek, MiniMax, Qwen) or a gateway like OpenRouter — treat them as normal entries in the catalog,
- **name-cue fallback** for unknown models: `opus/pro/max/ultra/thinking/reasoner/fable` → Deep; `sonnet/plus/standard/coder` (non-mini) → Balanced; `haiku/flash/mini/nano/lite/air/turbo/small` → Fast; still ask the user to confirm and record it in state.

`models-catalog.md` contains **every major vendor**, each with Deep / Balanced / Fast example names and which agents expose them, and `Last verified: YYYY-MM-DD`. Required vendor rows (builder researches exact current names at build time; candidates from a 2026-11 search shown for orientation only, unverified):

| Vendor | Region | Candidate names to verify |
|---|---|---|
| Anthropic | US | Fable/Mythos, Opus 5.5, Sonnet 5.5, Haiku 5.5 |
| OpenAI | US | GPT-6.x family, Codex models, mini/nano variants |
| Google | US | Gemini 4 Pro, Gemini 3.x Pro, Gemini 3.x Flash / Flash-Lite |
| xAI | US | Grok 4.x, Grok code/fast variants |
| Mistral | EU | Mistral Large / Medium, Codestral, Devstral |
| Meta | US | Llama (open weights) |
| DeepSeek | CN | DeepSeek V4 Pro, V4.x Flash, reasoner |
| Alibaba Qwen | CN | Qwen 3.x Max, Qwen3-Coder(-Next/Plus/Flash) |
| Moonshot Kimi | CN | Kimi K3, K2.x |
| Zhipu / Z.ai GLM | CN | GLM-5.x, GLM-5.x Air/Flash |
| MiniMax | CN | MiniMax M3 |
| ByteDance Seed | CN | Doubao-Seed Pro / Code / Lite |
| Local (Ollama, LM Studio) | — | open-weight Qwen / DeepSeek / GLM / Llama — usually Fast/Balanced |

Rows the builder cannot verify are kept with a `(unverified)` mark rather than dropped. Design-phase note: for Design direction, prefer models with strong vision/visual taste in Deep tier; the catalog marks vision-capable models with 👁.

**Intake inventory:** ask once — "Which models can you pick in this agent?" — offering the catalog entries exposed by the detected agent as a checklist (Chinese models included where the agent exposes them). Store the user's tier mapping in state; never ask again unless `maestro models`.

**Budget mode** shifts the mapping:
- `thrift`: Deep only for Discover + Architect; everything else Balanced/Fast.
- `balanced` (default): table as above.
- `quality`: Design and QA also Deep.

If the user has only one or two tiers available, collapse gracefully (e.g., no Fast → Balanced) and stop recommending switches that can't be made.

### 6.4 Switch rules
1. Recommend only at **phase boundaries**, or escalate one tier after **2 failed attempts** at the same problem. Never mid-task.
2. **Skip if short:** if the next phase is estimated at ≤ ~5 agent turns, stay on the current model and say so in one line.
3. **Prefer delegation:** if the agent supports model-pinned subagents and the work is Fast-tier and self-contained, delegate instead of asking the user to switch.
4. **Context hygiene first:** at every boundary, save state, then recommend the agent's reset (`/clear`, `/compact`, new chat) + `maestro resume`. Required when the session is long; optional when short.
5. Format (fixed, ≤ 5 lines):
```
⇄ SWITCH → <Tier> (<budget mode>)
Phase: <from> → <to> · why: <≤ 8 words>
<Agent>: <exact switch action with user's model name>
Context: state saved → <reset action>, then "maestro resume"
```
Only the user's current agent line is shown, using the model name they listed.

### 6.5 Skill discovery & install
Order per phase:
1. Already-installed skills (from the agent's available-skill list).
2. `skills-catalog.md` entries for the phase.
3. Stack-specific search: `npx skills find <stack terms>` (e.g., after Architect picks Next.js + Supabase).

Recommendation format: name, one-line purpose, source, install command (`npx skills add <owner/repo> --skill <name>`), and quality cue (official source / popular). **Never run an install without explicit approval.** If declined or unavailable, apply the catalog's 3–6 line fallback guidance for that step.

Catalog seed (builder verifies exact sources/commands): superpowers (brainstorming, writing-plans, subagent-driven-development, executing-plans, test-driven-development, verification-before-completion, requesting-code-review, systematic-debugging, finishing-a-development-branch), grill-me/grilling, design-taste-frontend (taste skill), ui-ux-pro-max, frontend-design, ponytail, caveman, find-skills, seo-audit, plus vercel-labs/agent-skills for React/Next.js.

### 6.6 Coexistence with superpowers
If superpowers is installed, maestro **does not add its own gates** inside Discover → Plan → Build; it lets superpowers' chain run and only contributes: phase tracking in state, model/context advice at boundaries, and skill discovery. Spec/plan paths follow superpowers conventions (`docs/superpowers/specs/`, plans dir) when present; state links to them.

*(Maestro's call)* **Design and Architect fold into the spec** when superpowers is installed: at intake, maestro tells the agent that the brainstorming spec must contain a **Design direction** section (produced with the design skills — taste / ui-ux-pro-max / frontend-design — during brainstorming, using its visual companion when helpful) and a **Stack** section (framework, DB, auth, hosting, key libs + one-line reasons). Design and Architect are then marked ✓ in state when the spec is approved, pointing to those sections; no separate stack record, no extra stop. The model advice still applies: Discover runs on Deep (covers both). Without superpowers, Design and Architect run as their own phases with their own artifacts.

### 6.7 State file `.maestro/state.md`
Template (~30 lines max, overwritten not appended):
```
# maestro state
project: <one line>
size: tweak|small|project · budget: thrift|balanced|quality
agent: <name> · subagents: yes|no
models: deep=<…> balanced=<…> fast=<…>
phase: <current> · next: <next step, one line>
phases: discover ✓ | design ✓ | architect → | plan · | build · | qa · | ship ·
decisions:
- <≤ 10 one-line decisions with why>
artifacts:
- spec: <path> · design: <path> · stack: <path> · plan: <path>
skills: installed <…> · declined <…>
open: <blocking questions, if any>
```
Written at intake and every phase exit. Resume reads only this file plus the linked artifact for the current phase.

### 6.8 Token rules (`token-rules.md`, summarized in `SKILL.md`)
- Output style: terse, no preamble/recap, bullets over prose, no restating file contents, show diffs not whole files (caveman-like for chat, ponytail-like smallest change for code).
- Load a phase reference only when entering that phase; never load all.
- Search/grep before reading whole files; read ranges.
- Recommend ponytail and caveman as optional installs; maestro works without them.

## 7. Decided vs. left to the builder

**Decided:** everything in §2–§6, name, layout, phases incl. Architect, tiers, budget modes, switch rules, delegation preference, context hygiene, approval-gated installs, superpowers coexistence, commands, state format, English.

**Left to builder (mark as builder calls in README/changelog):**
- Exact current model names per agent and their tier placement (research at build time; set `Last verified`).
- Exact install sources/commands for catalog skills (verify each exists).
- Wording of the frontmatter `description` (must trigger on web-project intents and "maestro", ≤ ~300 chars).
- License choice (default MIT), README visuals (a mermaid flow diagram is fine).
- Per-phase fallback text content.

## 8. Acceptance checks
- `SKILL.md` ≤ ~150 lines; references ≤ ~120 lines each; valid frontmatter.
- Dry-run walkthroughs (by reading as an agent) for: a landing page (small), a SaaS with auth (project), a tweak on an existing repo, a session with only one model available, an agent without subagents. Each produces correct phase list, switch messages in the fixed format, and a valid state file.
- `npx skills add <repo> --skill maestro-web` installs it (once published).
