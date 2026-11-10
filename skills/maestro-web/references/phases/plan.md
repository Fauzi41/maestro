# Phase: plan

## Purpose
Break the work into small, ordered, testable tasks so build can run on a cheaper model.

## Entry
Spec approved; design and architect done or folded. For `tweak`, skip: write an inline 1–5 item checklist into state instead.

## Steps
1. If superpowers is installed: run writing-plans and accept its plan, even for `small` (it will be short).
2. Otherwise: write `docs/plan.md`. Each task: files, what changes, done-condition, test (logic) or check (styling).
3. `small` size: plan (light) — ≤ ~10 tasks. `project`: as many as needed, each ≤ ~1 hour of work.
4. Mark which tasks are Fast-tier (boilerplate, config, copy, renames) so build can delegate them.
5. Update state: `artifacts: plan`, `plan ✓`, next = first task.

## Skills
writing-plans (see `skills-catalog.md` → plan).

## Fallback
Numbered task list with files, done-condition, and test per task; mark Fast-tier tasks with `[fast]`.

## Exit
A task list exists (plan file or state checklist).

## Tier
Deep. At exit the big switch happens: Deep → Balanced for build. Save state, recommend a context reset, then `maestro resume`.
