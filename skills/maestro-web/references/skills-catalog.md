# Skills catalog

Skills maestro may use per phase. Use installed ones first. **Install only after explicit user approval.** Quality cue: prefer ≥ 1K installs and well-known owners; flag anything under 100 installs. If declined or unavailable, do the Fallback yourself and continue.

Install form: `npx skills add <owner/repo> --skill <name>` (add `-g` for global). Sources verified against a real `npx skills` lock file on 2026-11-10 unless marked (verify).

## discover

| Skill | Purpose | Source | Install | Fallback |
|---|---|---|---|---|
| brainstorming | Turn an idea into an approved spec, one question at a time | obra/superpowers | `npx skills add obra/superpowers --skill brainstorming` | Ask why, goals, non-goals, users, key pages; propose 2–3 approaches; write a short spec; get approval. |
| grill-me | Stress-test the plan with hard questions | mattpocock/skills | `npx skills add mattpocock/skills --skill grill-me` | Ask the 5 riskiest "what if" questions about the spec before approving it. |
| site-architecture | Pages, hierarchy, navigation, URLs for content sites | coreyhaines31/marketingskills | `npx skills add coreyhaines31/marketingskills --skill site-architecture` | List pages, their purpose, and nav order as a tree in the spec. |
| copywriting | Headlines, value prop, page copy | coreyhaines31/marketingskills | `npx skills add coreyhaines31/marketingskills --skill copywriting` | Draft hero line + 3 benefit lines from the user's own words; no hype. |

## design

| Skill | Purpose | Source | Install | Fallback |
|---|---|---|---|---|
| design-taste-frontend | Art direction, anti-generic look, screenshot fix loop | Leonxlnx/taste-skill | `npx skills add Leonxlnx/taste-skill --skill design-taste-frontend` | Pick one reference style, a 5-color palette, 2 fonts, spacing scale; avoid default gradients and stock layouts. |
| ui-ux-pro-max | Styles, palettes, font pairings, UX rules, stack tips | nextlevelbuilder/ui-ux-pro-max-skill | `npx skills add nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max` | Check contrast (WCAG AA), tap targets ≥ 44px, clear hierarchy, consistent spacing. |
| frontend-design | Distinct visual direction for new UI | anthropics/skills | `npx skills add anthropics/skills --skill frontend-design` | Write a 5-line design direction: mood, type, color, layout, motion. |
| web-design-guidelines | Review UI against web interface guidelines | vercel-labs/agent-skills (verify) | `npx skills add vercel-labs/agent-skills --skill web-design-guidelines` | Review forms, focus states, loading/empty/error states, responsive breakpoints. |

## architect

| Skill | Purpose | Source | Install | Fallback |
|---|---|---|---|---|
| codebase-design | Module boundaries and interfaces | mattpocock/skills | `npx skills add mattpocock/skills --skill codebase-design` | Name the main modules, what each owns, and the data flow in ≤ 10 lines. |
| find-skills | Find stack-specific skills | vercel-labs/skills | `npx skills add vercel-labs/skills --skill find-skills` | Run `npx skills find <framework> <db> <host>` yourself; apply the quality cue. |

## plan

| Skill | Purpose | Source | Install | Fallback |
|---|---|---|---|---|
| writing-plans | Bite-sized implementation plan with tests per task | obra/superpowers | `npx skills add obra/superpowers --skill writing-plans` | List tasks (files, done-condition, test) in order; ≤ ~10 for small projects. |

## build

| Skill | Purpose | Source | Install | Fallback |
|---|---|---|---|---|
| subagent-driven-development | Fresh subagent per task with review | obra/superpowers | `npx skills add obra/superpowers --skill subagent-driven-development` | Do tasks in order; commit after each; delegate Fast-tier tasks if subagents exist. |
| executing-plans | Execute a plan inline with a ledger | obra/superpowers | `npx skills add obra/superpowers --skill executing-plans` | Track done tasks in state; run tests after each task. |
| test-driven-development | Red-green-refactor discipline | obra/superpowers | `npx skills add obra/superpowers --skill test-driven-development` | Write the failing test first for logic; skip tests for pure styling. |
| ponytail | Smallest change that solves the task | dietrichgebert/ponytail | `npx skills add dietrichgebert/ponytail --skill ponytail` | Change only what the task needs; no new deps without reason. |
| caveman | Compressed chat output to save tokens | JuliusBrussee/caveman (verify) | `npx skills add JuliusBrussee/caveman --skill caveman` | Follow `token-rules.md` → Output. |
| react-best-practices | React / Next.js performance patterns | vercel-labs/agent-skills (verify) | `npx skills add vercel-labs/agent-skills --skill react-best-practices` | Server components by default, avoid waterfalls, memo only when measured. |

## qa

| Skill | Purpose | Source | Install | Fallback |
|---|---|---|---|---|
| verification-before-completion | Evidence before "done" | obra/superpowers | `npx skills add obra/superpowers --skill verification-before-completion` | Run tests + build; paste the result line before claiming done. |
| requesting-code-review | Fresh-eyes review of the branch | obra/superpowers | `npx skills add obra/superpowers --skill requesting-code-review` | Re-read the diff against the spec; list issues by severity. |
| systematic-debugging | Root-cause bugs before fixing | obra/superpowers | `npx skills add obra/superpowers --skill systematic-debugging` | Reproduce, isolate, form one hypothesis, test it; no shotgun fixes. |

## ship

| Skill | Purpose | Source | Install | Fallback |
|---|---|---|---|---|
| finishing-a-development-branch | Merge / PR / cleanup decision | obra/superpowers | `npx skills add obra/superpowers --skill finishing-a-development-branch` | Tests green → offer merge or PR; never push without asking. |
| seo-audit | Basic technical and on-page SEO | coreyhaines31/marketingskills | `npx skills add coreyhaines31/marketingskills --skill seo-audit` | Titles, meta descriptions, one h1, alt text, sitemap, robots, fast LCP. |
| schema | Structured data (JSON-LD) | coreyhaines31/marketingskills | `npx skills add coreyhaines31/marketingskills --skill schema` | Add Organization / Product / Article JSON-LD where it fits. |

## stack

After architect, search for the chosen stack and host: `npx skills find <framework> <db> <host>` (e.g., `nextjs supabase vercel`). Prefer official owners (vercel-labs, anthropics, the framework's or host's own org, e.g., supabase, netlify). Show at most 3 picks with the quality cue, then wait for approval.
