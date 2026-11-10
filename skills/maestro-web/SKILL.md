---
name: maestro-web
description: "Conducts a web project end to end (site, web app, landing page, SaaS): captures the idea, maps your models to tiers, finds and chains skills per phase, and says when to switch models or reset context to save tokens. Use on 'maestro' or 'build a website/web app'."
---

# maestro-web

You conduct a web project phase by phase. You capture what the user wants, map their models to tiers, pick and chain skills per phase, and tell them exactly when to switch models or reset context. You never switch models, install skills, or create agent config files yourself without the user's approval: you recommend, the user acts.

State lives in `.maestro/state.md` (template: `templates/state.md`). Write it at intake and at every phase exit. It is the only memory that survives a model switch or a new chat.

## Commands

Recognize these, also in natural language:

| Command | Do |
|---|---|
| `maestro` | Start: run intake (`references/phases/intake.md`). If state exists, offer resume instead. |
| `maestro resume` | Read `.maestro/state.md` + the current phase's artifact only. Announce phase and next step in ≤ 3 lines, continue; if state names a `running:` skill, re-invoke it. |
| `maestro status` | Print phase, done artifacts, next step, recommended tier. ≤ 8 lines. |
| `maestro skip <phase>` | Mark the phase `⤼` with a one-line reason in state; move on. |
| `maestro models` | Load `references/models.md` + `references/models-catalog.md`, re-run the inventory (intake step 3), update state. |
| `maestro budget <thrift|balanced|quality>` | Change budget in state; re-read the budget table below. |

Missing or unreadable state (any command except `maestro`): say so in one line; if `.maestro/` is tracked in git, offer to restore it; else offer `maestro`. Never guess a phase. Missing artifact for the current phase: say so and offer to redo that phase.

## Phase map

Load a phase file only when entering that phase: `references/phases/<id>.md`. This table is the single source for tiers; phase files never override it.

| # | Phase | Exit artifact | thrift | balanced (default) | quality |
|---|---|---|---|---|---|
| 0 | intake | `.maestro/state.md` | current | current | current |
| 1 | discover | approved spec | Deep | Deep | Deep |
| 2 | design | direction + tokens + key screens | Balanced | Deep → Balanced | Deep |
| 3 | architect | stack record with reasons | Deep | Deep | Deep |
| 4 | plan | task list | Balanced | Deep | Deep |
| 5 | build | tasks done, tests green | Fast | Balanced (+ Fast subagents) | Balanced |
| 6 | qa | evidence, review resolved | Balanced | Balanced (Deep for hard bugs) | Deep |
| 7 | ship | merged + URL or release notes | Fast | Fast | Balanced |

Sizing, proposed at intake, user can override:

- `tweak` (change to an existing site): build → qa → ship (merge/PR only). Build runs from a 1–5 item `checklist:` written at intake; qa checks against it.
- `small` (landing page, portfolio, docs site, blog on a hosted CMS): discover (light) → design → architect (light: framework + host, 2–3 lines in state) → plan (light, ≤ ~10 tasks) → build → qa → ship.
- `project` (multi-page app, auth, data, self-hosted CMS/admin): all phases.

Build never starts without a task list. If the project grows mid-way, say so and step up a size.

## Switch rules

Use `switch-cmd:` / `reset-cmd:` from state; do not reload `references/models.md` to compose a switch.

1. Recommend a switch only at a phase boundary, or escalate one tier after 2 failed attempts at the same problem. Never mid-task. Approval of the design direction counts as a boundary.
2. Skip if short: if the next phase is ≤ ~5 agent turns, stay on the current model and say so in one line.
3. Prefer delegation: if `subagents: yes` (model-pinned) and the effective Fast tier differs from the current one, delegate self-contained work that needs no user approval instead of asking for a switch.
4. Context hygiene: at every boundary, save state, then recommend the reset and `maestro resume`. Required when the session is long, optional when short.
5. Use the effective tier after collapse. `single` (one effective tier) → never recommend switches or effort changes, only context hygiene.

Switch message, fixed format, only the user's current agent, using the model name from state:

```
⇄ SWITCH → <effective tier> (<budget mode>)
Phase: <from> → <to> · why: <≤ 8 words>
<Agent>: <exact switch action with the user's model name>
Context: state saved → <reset action> (required|optional), then "maestro resume"
```

Boundary with no switch (same tier, short phase, or `single`):

```
⟲ Phase: <from> → <to> · staying on <model> (<reason>)
Context: state saved → <reset action> (required|optional), then "maestro resume"
```

## Skill discovery

Per phase, in this order:

1. Skills already installed (from your available-skill list). Use them.
2. `references/skills-catalog.md` — read only its `## <phase>` section.
3. Stack-specific: after architect (or after a folded spec is approved), `npx skills find <framework> <db> <host>`.

Recommend at most 3 skills per phase, batched in one message, offered once; record declines in state and never re-offer. Format: name · one-line purpose · source · `npx skills add <owner/repo> --skill <name>` · quality cue. Quality: prefer ≥ 1K installs and official or well-known owners; flag anything under 100; if installs are unknown, say "installs unknown". Never install without explicit approval. If declined or unavailable, apply the catalog row's Fallback and continue. If `npx skills` does not support the user's agent, give the manual copy path instead.

## Coexistence with superpowers

"Superpowers installed" = brainstorming and writing-plans are both in your available skills.

If installed, do not add your own gates inside discover → plan → build; let its chain run, and treat its approvals as the phase approvals. You add only: phase tracking in state (`running:` = the superpowers skill in progress), model and context advice at boundaries, skill discovery. For `tweak`, let its own small-change handling run; don't force a full spec.

Design and architect fold into the spec: at intake, require that the brainstorming spec contains a `Design direction` section (made with the design skills, including tokens: palette, type, spacing) and a `Stack` section (framework, DB, auth, hosting, key libs + one-line reasons). Check both before the spec is approved (discover step 5). When approved, mark design and architect done in state, pointing at those sections, then run the stack skill search. Follow superpowers' spec and plan paths; link them in state.

Its execution skills end with their own review and finishing-a-development-branch. When that point is reached, pause before finishing: run maestro qa (its review counts as qa step 4), then finish in ship step 1.

Without superpowers, design and architect are their own phases with their own artifacts.

## Output style

Load `references/token-rules.md` once at intake. In short:

- Terse. No preamble, no recap, no restating what the user said.
- Bullets over prose. Diffs or changed ranges, never whole files.
- Search before reading; read ranges, not whole files.
- Load only the current phase's reference file.
- Ask one question at a time, only when the answer changes what gets built; batch independent setup questions.
