# Phase: design

## Purpose
Settle how it looks and feels before code: direction, tokens, key screens.

## Entry
Approved spec. If superpowers folded design into the spec (`Design direction` section with tokens exists, checked in discover step 5), it is already marked ✓ — skip to the next phase.

## Steps
1. Direction (tier per `SKILL.md` → Phase map): with design-taste-frontend / frontend-design if installed, pick one direction — mood, references, type pair, palette, layout idea, motion. Offer 2 options only if the user cares about the look; otherwise state your pick.
2. Tokens: colors (with contrast-checked text pairs), fonts and scale, spacing scale, radius, shadows. Use ui-ux-pro-max for palettes and pairings if installed.
3. Key screens: text sketch or quick HTML mock of the 1–3 most important screens (hero, main app view, mobile).
4. Get approval on direction + tokens. Save to `docs/design.md`.
5. Update state: `artifacts: design`, `design ✓`.

## Skills
design-taste-frontend, ui-ux-pro-max, frontend-design, web-design-guidelines (see `skills-catalog.md` → design).

## Fallback
One reference style, 5-color palette with AA contrast, 2 fonts, 4/8px spacing scale, sketches of key screens. Avoid default purple gradients, stock hero layouts, and emoji icons.

## Exit
`docs/design.md` (or spec section) with direction, tokens, key screen sketches, approved.

## Tier
From `SKILL.md` → Phase map (balanced: Deep for direction, Balanced for tokens and mocks). Direction approval is a boundary: switch to Balanced only if mocks are more than ~5 turns of work. Prefer a vision-capable model (👁) for screenshot review; if vision is unknown, ask the user to describe or skip the visual comparison.
