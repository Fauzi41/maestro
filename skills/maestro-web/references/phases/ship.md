# Phase: ship

## Purpose
Get it live and finish the branch cleanly.

## Entry
QA exit reached.

## Steps
1. Finish the branch: offer merge or PR (finishing-a-development-branch if installed). Never push or deploy without asking.
2. SEO basics for public sites: titles, meta descriptions, one h1, alt text, sitemap, robots, OG image, structured data where it fits (seo-audit, schema if installed).
3. Deploy with the host chosen in architect, using the host's skill or CLI if available. Confirm env vars and secrets are set by the user, never printed.
4. Smoke-test the live URL (home, primary action, 404).
5. Update state: `ship ✓`, `artifacts:` add URL or release notes. Tell the user the project is done and how to start the next change (`maestro` with size `tweak`).

## Skills
finishing-a-development-branch, seo-audit, schema, host deploy skills (see `skills-catalog.md` → ship, stack).

## Fallback
Merge or PR on approval; SEO checklist from step 2; deploy via the host's CLI; smoke-test the URL.

## Exit
Merged and deployed URL, or release notes, recorded in state.

## Tier
Fast (Balanced in `quality` budget). Deploy failures that need reasoning → Balanced.
