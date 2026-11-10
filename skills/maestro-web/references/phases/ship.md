# Phase: ship

## Purpose
Get it live and finish the branch cleanly.

## Entry
QA exit reached. `tweak`: do step 1 only, then step 5.

## Steps
1. Finish the branch: offer merge or PR (finishing-a-development-branch if installed). Never push or deploy without asking.
2. SEO basics for public sites: titles, meta descriptions, one h1, alt text, sitemap, robots, OG image, structured data where it fits (seo-audit, schema if installed).
3. Deploy with the host recorded in state (architect or architect-light), using the host's skill or CLI if available. Confirm env vars and secrets are set by the user, never printed.
4. Smoke-test the live URL (home, primary action, 404).
5. Update state: `ship ✓`, `url:`. Tell the user it's done and that the next change starts with `maestro` (it will propose `tweak`).

## Skills
finishing-a-development-branch, seo-audit, schema, host deploy skills (see `skills-catalog.md` → ship, stack).

## Fallback
Merge or PR on approval; SEO checklist from step 2; deploy via the host's CLI; smoke-test the URL.

## Exit
Merged and deployed URL, or release notes, recorded in state.

## Tier
From `models.md` → Budget modes (Fast; Balanced in `quality`). Deploy failures that need reasoning → escalate one tier.
