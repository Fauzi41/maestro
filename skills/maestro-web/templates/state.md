# maestro state
project: <one line>
size: tweak|small|project · budget: thrift|balanced|quality
agent: <name> · subagents: yes|no · switch-cmd: <override, if the default didn't work>
models: deep=<…> balanced=<…> fast=<…> (mark: single · unlisted-confirmed · →collapsed)
phase: <current> · next: <next step, one line>
phases: discover · | design · | architect · | plan · | build · | qa · | ship ·
checklist: <tweak only: 1–5 items>
decisions:
- <≤ 10 one-line decisions with why; skip reasons go here>
artifacts:
- spec: <path> · design: <path or spec §> · stack: <path or spec §> · plan: <path>
evidence: <qa: test + build result lines> · minors: <open minor issues>
url: <deployed URL or release notes>
skills: installed <…> · declined <…>
open: <blocking questions, if any>

<!-- Legend: ✓ done · → current · · pending · ⤼ skipped. Overwrite this file; never append history. -->
