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
| `maestro resume` | Read `.maestro/state.md` + the current phase's artifact only. Announce phase and next step in ≤ 3 lines, continue (with superpowers, re-invoke the skill that phase was running). If state is missing or unreadable, say so in one line; if `.maestro/` is tracked in git, offer to restore it; else offer `maestro`. Never guess a phase. |
| `maestro status` | Print phase, done artifacts, next step, recommended tier. ≤ 8 lines. |
| `maestro skip <phase>` | Mark the phase `⤼` with a one-line reason in state; move on. |
| `maestro models` | Re-run the model inventory (intake step 3), update state. |
| `maestro budget <thrift|balanced|quality>` | Change budget mode in state; re-map tiers. |

## Phase map

Load a phase file only when entering that phase: `references/phases/<id>.md`.

| # | Phase | Exit artifact | Tier (balanced budget) |
|---|---|---|---|
| 0 | intake | `.maestro/state.md` written | current model |
| 1 | discover | approved spec | Deep |
| 2 | design | direction + tokens + key screen sketches | Deep (direction) → Balanced (applying) |
| 3 | architect | stack record: framework, DB, auth, hosting, key libs + reasons | Deep |
| 4 | plan | task list | Deep |
| 5 | build | tasks done, tests green | Balanced; Fast via subagents |
| 6 | qa | verification evidence, review notes resolved | Balanced; Deep for hard bugs |
| 7 | ship | merged + deployed URL or release notes | Fast |

Other budgets: use the table in `references/models.md` → Budget modes. Phase files never override it.

Sizing, proposed at intake, user can override:

- `tweak` (change to an existing site): build → qa → ship (merge/PR only). Build runs from a 1–5 item `checklist:` in state; qa checks against it.
- `small` (landing page, portfolio, docs site, blog on a hosted CMS): discover (light) → design → architect (light: framework + host, 2–3 lines in state) → plan (light, ≤ ~10 tasks) → build → qa → ship.
- `project` (multi-page app, auth, data, self-hosted CMS/admin): all phases.

Build never starts without a task list. If the project grows mid-way, say so and step up a size.

## Switch rules

Load `references/models.md` only at intake and when composing a switch.

1. Recommend a switch only at a phase boundary, or escalate one tier after 2 failed attempts at the same problem. Never mid-task. The approval of the design direction counts as a boundary.
2. Skip if short: if the next phase is ≤ ~5 agent turns, stay on the current model and say so in one line.
3. Prefer delegation: if `subagents: yes`, the Fast model differs from the main one, and the work is self-contained (no user approvals needed), delegate it instead of asking for a switch.
4. Context hygiene: at every boundary, save state, then recommend the agent's reset (`/clear`, `/compact`, or a new chat) and `maestro resume`. Required when the session is long, optional when short.
5. Use the effective tier after collapse (`models.md` → Missing tiers). One model only → never recommend switches or effort changes, only context hygiene.

Switch message, fixed format, only the user's current agent, using the model name from state:

```
⇄ SWITCH → <effective tier> (<budget mode>)
Phase: <from> → <to> · why: <≤ 8 words>
<Agent>: <exact switch action with the user's model name>
Context: state saved → <reset action> (required|optional), then "maestro resume"
```

Boundary with no switch (same tier, short phase, or one model):

```
⟲ Phase: <from> → <to> · staying on <model> (<reason>)
Context: state saved → <reset action> (required|optional), then "maestro resume"
```

## Skill discovery

Per phase, in this order:

1. Skills already installed (from your available-skill list). Use them.
2. `references/skills-catalog.md` entries for the phase.
3. Stack-specific: after architect (or after a folded spec is approved), `npx skills find <framework> <db> <host>`.

Recommend at most 3 skills per phase, batched in one message, offered once; record declines in state and never re-offer. Format: name · one-line purpose · source · `npx skills add <owner/repo> --skill <name>` · quality cue. Quality: prefer ≥ 1K installs and official or well-known owners; flag anything under 100; if installs are unknown, say "installs unknown". Never install without explicit approval. If declined or unavailable, apply the catalog row's Fallback and continue. If `npx skills` does not support the user's agent, give the manual copy path instead.

## Coexistence with superpowers

"Superpowers installed" = brainstorming and writing-plans are both in your available skills.

If installed, do not add your own gates inside discover → plan → build; let its chain (brainstorming → writing-plans → subagent-driven-development or executing-plans) run, and treat its approvals as the phase approvals. You add only: phase tracking in state, model and context advice at boundaries, skill discovery.

Design and architect fold into the spec: at intake, require that the brainstorming spec contains a `Design direction` section (made with the design skills, including tokens: palette, type, spacing) and a `Stack` section (framework, DB, auth, hosting, key libs + one-line reasons). When the spec is approved, mark design and architect done in state, pointing at those sections, then run the stack skill search. Discover runs on Deep. Follow superpowers' spec and plan paths; link them in state.

Without superpowers, design and architect are their own phases with their own artifacts.

## Output style

Full rules: `references/token-rules.md`. In short:

- Terse. No preamble, no recap, no restating what the user said.
- Bullets over prose. Diffs or changed ranges, never whole files.
- Search before reading; read ranges, not whole files.
- Load only the current phase's reference file.
- Ask one question at a time, and only when the answer changes what gets built.
