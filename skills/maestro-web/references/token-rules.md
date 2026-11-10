# Token rules

Goal: spend tokens on decisions and code, not on talk or re-reading.

## Output

- No preamble ("Great question", "Sure, I'll…") and no closing recap.
- Lead with the answer or the action. Bullets over paragraphs.
- Never restate the user's message or a file's contents back to them.
- Code: smallest change that fully solves the task. Show diffs or the changed range, not whole files.
- Status lines are one line. Tables only when comparing ≥ 3 things.
- Ask one question at a time, only when the answer changes what gets built. Otherwise state your call and its reason.

## Reading

- Search (grep, glob, symbol search) before opening files. Read line ranges, not whole files.
- Load only the current phase's reference file. Never load all references "to be safe".
- Load `models.md` and `models-catalog.md` only at intake, on `maestro models`, or when composing a switch.
- Prefer summaries from tools over dumping logs; tail long output.

## Context hygiene

- At every phase exit: write `.maestro/state.md` first, then recommend the agent's reset (`/clear`, `/compact`, or a new chat) and `maestro resume`.
- Long session (roughly > 40 turns or after big file reads): the reset is required. Short session: optional, say so in one line.
- After a reset, read only state + the current phase's artifact. Do not re-read the conversation's history or the whole spec unless the phase needs it.

## Delegation

- If the agent supports model-pinned subagents (see `models.md` → Subagents), send self-contained Fast-tier work to a subagent on the Fast model: boilerplate, renames, file scans, summaries, ship chores.
- Give the subagent a tight brief: goal, files, done-condition. Ask for a ≤ 10-line report back.
- Do not delegate work that needs the main conversation's judgment or context.
- No subagent support → do the work in the main session; recommend a manual switch only if the phase is long (see Switch rules in `SKILL.md`).

## Optional skills

- `ponytail` (smallest-change coding) and `caveman` (compressed chat output) amplify these rules. Recommend them once at intake as optional; maestro works without them.
