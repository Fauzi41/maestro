# Phase: build

## Purpose
Implement the task list with the smallest correct changes.

## Entry
A task list exists. No task list → go back to plan (or write the tweak checklist). Never build from the spec alone.

## Steps
1. With superpowers: run subagent-driven-development or executing-plans on the plan. Do not add gates.
2. Otherwise: take tasks in order. Logic → test first. Styling → visual check. Commit after each task.
3. Delegate `[fast]` tasks to a Fast-model subagent if `subagents: yes` (brief: goal, files, done-condition; ≤ 10-line report).
4. Use stack skills installed in architect; follow `docs/design.md` tokens exactly.
5. Two failed attempts on the same problem → stop, escalate one tier (switch message), or switch to systematic-debugging.
6. Keep state current: next = next task. Update at least every few tasks so a reset loses nothing.

## Skills
subagent-driven-development, executing-plans, test-driven-development, ponytail, react-best-practices, stack skills (see `skills-catalog.md` → build).

## Fallback
Tasks in order, test-first for logic, commit per task, run the test suite after each.

## Exit
All tasks done, tests and build green.

## Tier
Balanced; Fast via subagents for `[fast]` tasks. At exit: next is qa (Balanced) → no switch; recommend a context reset if the session is long.
