# Dry-run walkthroughs (2026-11-10)

One role-play subagent read only `skills/maestro-web/` and ran 5 scenarios against rules R1–R7:

- R1: one model means no switch.
- R2: no subagents means no delegation.
- R3: an unknown model is mapped, confirmed, and recorded.
- R4: resume with missing state never guesses a phase.
- R5: no duplicate gates with superpowers.
- R6: switch messages use the fixed format.
- R7: nothing is installed without approval.

| Scenario | R1 | R2 | R3 | R4 | R5 | R6 | R7 |
|---|---|---|---|---|---|---|---|
| A. Café landing, Claude Code, balanced | n.a. | n.a. | n.a. | n.a. | n.a. | pass | pass |
| B. SaaS + auth, Antigravity, superpowers, quality | n.a. | n.a. | n.a. | n.a. | pass* | pass* | pass |
| C. Tweak in Cursor, then resume with state deleted | n.a. | n.a. | n.a. | pass | n.a. | n.a. | pass |
| D. Cursor, single unlisted model "Kimi K9" | pass* | n.a. | pass | n.a. | n.a. | n.a. | pass |
| E. Trae, thrift, blog + CMS, Pro + Lite only | n.a. | pass | pass | n.a. | n.a. | pass* | pass |

\* passed only by the tester's judgement; the literal text pulled the other way. There were no hard fails.

## Fixes applied (all 17 findings)

- **Budget table is the single source for tiers.** Phase files no longer hard-code the next tier.
- **Missing-tier rules.** A missing Balanced tier collapses to Deep, or to Fast in thrift. Ties are broken by the user's pick, then by vision support. Switch messages use the effective tier.
- **One-model mode (`single`).** No switch advice, no effort-knob advice, and no delegation.
- **No-switch boundary.** Added a fixed `⟲` boundary format. The reset line is marked required or optional.
- **Sizing.** `small` now includes architect (light): framework and host. `tweak` = build → qa → ship (merge/PR only). Added blog/CMS and docs-site examples.
- **Folded design must include tokens.** When design is folded into the spec, build and qa read `docs/design.md` or spec §Design direction. The stack search still runs after a folded spec is approved.
- **Superpowers.** "Superpowers installed" is now defined. Its approvals count as phase approvals, and resume re-invokes the active superpowers skill.
- **Skill recommendations.** At most 3 per phase, batched and offered once; declined skills are never re-offered. Unknown install counts are labelled "installs unknown". The manual copy path is used when `npx skills` doesn't support the agent.
- **Delegation limits.** No delegation when the Fast model equals the main model, in quality budget, or for ship. Creating agent files needs approval.
- **State template.** Added `checklist`, `evidence`, `minors`, `url`, `switch-cmd`, and model marks.
- **Intake.** Escalates whenever the current model's tier is below the first phase's tier.
- **Design.** Direction approval counts as a phase boundary for Switch rule 1.
