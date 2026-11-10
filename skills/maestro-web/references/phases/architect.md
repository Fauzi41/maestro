# Phase: architect

## Purpose
Choose the stack and its shape once, with reasons, because these choices are the most expensive to undo.

## Entry
Approved spec (and design if not skipped). If superpowers folded architect into the spec (`Stack` section exists), mark ✓, run step 4 only, and go to plan. `small` size: architect (light) — framework + host (+ CMS if any) as 2–3 lines in state, then step 4. Existing repo: build on its stack; only record what is new.

## Steps
1. Decide, one line of reason each: framework, rendering (static / SSR / SPA), styling, data store, auth, hosting, key libraries. Default to the boring, well-documented option the user already knows.
2. Note constraints: budget, free tiers, region, SEO needs, offline, i18n.
3. Sketch modules and data flow in ≤ 10 lines (codebase-design if installed).
4. Stack skills: run `npx skills find <framework> <db> <host>`; show ≤ 3 picks with the quality cue; install only on approval (`skills-catalog.md` → stack).
5. Save to `docs/stack.md`. Get approval. Update state: `artifacts: stack`, `architect ✓`, installed/declined skills.

## Skills
codebase-design, find-skills, plus stack-specific skills found in step 4.

## Fallback
Fill the step 1 list yourself, state each as your call with its reason, and ask the user to correct anything.

## Exit
`docs/stack.md` (or spec section) approved; stack skills installed or declined.

## Tier
Deep (all budgets). At exit, next tier from `SKILL.md` → Phase map; switch or `⟲` per `SKILL.md` → Switch rules.
