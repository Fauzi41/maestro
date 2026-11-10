# Phase: build

## Purpose
Implement the task list with the smallest correct changes.

## Entry
A task list exists. No task list → go back to plan (or write the tweak checklist). Never build from the spec alone.

## Steps
1. With superpowers: run subagent-driven-development or executing-plans on the plan. Do not add gates.
2. Otherwise: take tasks in order. Logic → test first. Styling → visual check. Commit after each task.
3. Delegate `[fast]` tasks to a Fast-model subagent only if `subagents: yes`, the Fast model differs from the main one, and the budget allows it (not in `quality`). Brief: goal, files, done-condition; ≤ 10-line report.
4. Use stack skills installed in architect; follow the design tokens exactly (`docs/design.md` or spec §Design direction; tweak: the checklist).
5. Two failed attempts on the same problem → stop, escalate one tier (switch message), or switch to systematic-debugging.
6. Keep state current: next = next task. Update at least every few tasks so a reset loses nothing.

## Skills
subagent-driven-development, executing-plans, test-driven-development, ponytail, react-best-practices, stack skills (see `skills-catalog.md` → build).

## Fallback
Tasks in order, test-first for logic, commit per task, run the test suite after each.

## Exit
All tasks done, tests and build green.

## Tier
From `models.md` → Budget modes (balanced: Balanced + Fast subagents; thrift: Fast; quality: Balanced only). At exit, next tier from the same table; switch or `⟲` per `SKILL.md` → Switch rules.
