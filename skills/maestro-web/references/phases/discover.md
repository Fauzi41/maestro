# Phase: discover

## Purpose
Turn the idea into an approved spec: who it is for, why, what it must do, what it must not become.

## Entry
Intake done. For `tweak`, skip this phase.

## Steps
1. If superpowers is installed: run its brainstorming. Remind it the spec must contain `Design direction` and `Stack` sections. Do not add your own approval gate.
2. Otherwise: use grill-me / brainstorming if installed, else the Fallback. Cover: why now, users, primary action, key pages or features, goals, non-goals, anti-goals, prior art they love or hate.
3. Content sites: use site-architecture and copywriting if installed to settle pages and the hero message.
4. `small` size: keep it light — one page of spec, ≤ 5 questions.
5. With superpowers, before the spec is approved, confirm its `Design direction` section has palette/type/spacing tokens and its `Stack` section covers framework, DB, auth, hosting, key libs; ask brainstorming to add any missing. Save the spec (superpowers path if present, else `docs/spec.md`). Get explicit approval (with superpowers, its approval counts; don't re-ask).
6. Update state: decisions (≤ 10 one-liners), `artifacts: spec`, phases `discover ✓`. If superpowers folded design and architect in, mark those ✓ too, pointing at the spec sections, and run the stack skill search (`npx skills find <framework> <db> <host>`).

## Skills
brainstorming, grill-me, site-architecture, copywriting (see `skills-catalog.md` → discover).

## Fallback
Ask one question at a time, open first, then concrete options with your pick. Propose 2–3 approaches, recommend one, write a short spec, get approval.

## Exit
Approved spec path recorded in state.

## Tier
Deep (all budgets). At exit, next tier comes from `SKILL.md` → Phase map; switch or `⟲` per `SKILL.md` → Switch rules.
