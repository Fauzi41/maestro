# Phase: intake

## Purpose
Learn what is being built, on which agent, with which models and budget, and how big it is. Write the first state.

## Entry
`maestro` invoked, or a web-project request with no `.maestro/state.md`. If state exists, offer `maestro resume` instead.

## Steps
1. Capture the idea in one line from the user's words. If unclear, ask one open question: what should a visitor be able to do?
2. Detect the agent from environment cues (tool names, slash commands, config dirs such as `.claude/`, `.cursor/`, `.opencode/`). If unsure, ask once.
3. Load `references/models.md`, `references/models-catalog.md`, and `references/token-rules.md`. Show the catalog entries this agent exposes as a short checklist and ask: "Which of these can you pick? Add any I missed." Map each to a tier (catalog or name cues), confirm, record `models:`, `switch-cmd:`, and `reset-cmd:` in state (apply `models.md` → Missing tiers; if one effective tier, mark `single`). Record `subagents: yes|no` (model-pinned) and `spawn: yes|no` (plain subagents).
4. In one batched message: ask budget (`thrift` / `balanced` default / `quality`), propose size (`tweak` / `small` / `project`) with its phase list, and offer `ponytail` + `caveman` as optional token savers. For `tweak`, default `balanced` and write the 1–5 item `checklist:` now.
5. Check whether superpowers is installed (brainstorming + writing-plans both available). If yes, tell the agent's brainstorming run to include `Design direction` (with tokens) and `Stack` sections in the spec (see `SKILL.md` → Coexistence).
6. Write `.maestro/state.md` from `templates/state.md`. Add `.maestro/` to `.gitignore` only if the user wants state kept out of git.

## Skills
None required.

## Fallback
Not applicable.

## Exit
`.maestro/state.md` exists with project, size, budget, agent, subagents, models, phase list, next step.

## Tier
Current model. At exit, if not `single` and the current model's tier is below the first phase's tier (`SKILL.md` → Phase map), emit a switch; otherwise a `⟲` line.
