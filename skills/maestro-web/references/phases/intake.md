# Phase: intake

## Purpose
Learn what is being built, on which agent, with which models and budget, and how big it is. Write the first state.

## Entry
`maestro` invoked, or a web-project request with no `.maestro/state.md`. If state exists, offer `maestro resume` instead.

## Steps
1. Capture the idea in one line from the user's words. If unclear, ask one open question: what should a visitor be able to do?
2. Detect the agent from environment cues (tool names, slash commands, config dirs such as `.claude/`, `.cursor/`, `.opencode/`). If unsure, ask once.
3. Load `references/models.md` and `references/models-catalog.md`. Show the catalog entries this agent exposes as a short checklist and ask: "Which of these can you pick? Add any I missed." Map each to a tier (catalog or name cues), confirm, record `models:` in state. Ask whether subagents can use a different model if `models.md` → Subagents is unclear for this agent.
4. Ask budget once: `thrift` / `balanced` (default) / `quality`, one line each on what it changes.
5. Propose size (`tweak` / `small` / `project`) with one line of reason and the resulting phase list. User may override.
6. Check whether superpowers is installed. If yes, tell the agent's brainstorming run to include `Design direction` and `Stack` sections in the spec (see `SKILL.md` → Coexistence).
7. Offer `ponytail` and `caveman` once as optional token savers (catalog → build).
8. Write `.maestro/state.md` from `templates/state.md`. Add `.maestro/` to `.gitignore` only if the user wants state kept out of git.

## Skills
None required.

## Fallback
Not applicable.

## Exit
`.maestro/state.md` exists with project, size, budget, agent, subagents, models, phase list, next step.

## Tier
Current model. Do not recommend a switch before the first phase unless the current model is Fast and the next phase is discover (then recommend Deep).
