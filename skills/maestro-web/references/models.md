# Models

Brand-free rules. Concrete names live only in `models-catalog.md`.

## Tiers

- **Deep** — strongest reasoning and judgment. Discover, design direction, architect, plan, hard bugs.
- **Balanced** — strong coder at mid cost. Build, review, applying a design.
- **Fast** — cheapest and quickest. Boilerplate, renames, file scans, summaries, ship chores.

Reasoning-effort knobs (low/medium/high) can stand in for the next tier down on the same model. Mention it at a boundary only when ≥ 2 effective tiers exist after collapse; never when `single`.

Several models in one tier: ask once which they prefer; default to the user's pick, then vision-capable (👁) for design work. Record the choice.

The per-phase budget table lives in `SKILL.md` → Phase map. This file is loaded only at intake, `maestro models`, and `maestro budget`; at intake record the agent's `switch-cmd:` and `reset-cmd:` in state so later switches need no reload.

## Missing tiers

Collapse to the effective tier and use it in the switch message:
- no Fast → Balanced.
- no Deep → Balanced.
- no Balanced → Deep, except in `thrift` budget → Fast (escalate to Deep on 2 failures).
- any other gap (e.g., only Fast) → nearest available tier.
- one effective tier after collapse (one model, or several models of the same tier) → mark `single` in state: no switch or effort advice ever, only context hygiene, no tier delegation.

## How to switch

Show only the line for the user's agent, with the model name from state.

| Agent | Switch | Reset context |
|---|---|---|
| Claude Code | `/model <name>` (aliases work) | `/clear` or `/compact` |
| Antigravity | model picker in the chat input | new conversation or `/compact` |
| Cursor | model dropdown in the chat panel | new chat |
| Codex | `/model` (or `codex --model <name>`) | `/new` or `/compact` |
| Gemini CLI | `/model` (or start with `-m <name>`) | `/clear` or `/compress` |
| Copilot | model picker in Copilot Chat | new chat |
| Windsurf | model selector in Cascade | new Cascade |
| OpenCode | `/models` | `/new` or `/compact` |
| Cline / Roo Code / Kilo Code | provider + model in settings (or mode-specific model) | new task |
| Trae | model selector in the chat panel | new chat |
| Qwen Code | `/model` | `/clear` or `/compress` |
| Kimi CLI | `/model` (also toggles thinking) | `/clear` |
| Other | "use your agent's model picker" | "start a new chat" |

If a command is not recognized in the user's version, fall back to the Other row and ask them to tell you their agent's way once; record it as `switch-cmd:` in state.

## Subagents

Delegate Fast-tier work only where the agent can pin a model per subagent:

| Agent | How |
|---|---|
| Claude Code | agent file `.claude/agents/<name>.md` frontmatter `model:` (alias, full id, or `inherit`) |
| Antigravity | subagent invocation with `Model:` (`flash_lite`, `flash`, `pro`, `inherit`) |
| Cursor | `.cursor/agents/<name>.md` frontmatter `model:` (`fast`, `inherit`, or id) |
| OpenCode | agent `model:` in `.opencode/agents/<name>.md` or `opencode.json` (`provider/model`) |
| Codex | configured worker/subagent models — ask once, don't assume |
| Gemini CLI, Copilot, Windsurf, others | model-pinned subagents not assumed → ask once; default `subagents: no` |

`subagents:` means model-pinned subagents (tier delegation). Plain same-model subagents (e.g., superpowers' subagent-driven-development) are a separate capability: note it as `spawn: yes|no` in the `agent:` line. Creating an agent file (`.claude/agents/…`, `.cursor/agents/…`, `.opencode/agents/…`) needs one-time user approval. Delegate only when the effective Fast tier differs from the current effective tier.

## Compatible endpoints

Many agents accept any Anthropic- or OpenAI-compatible endpoint. Chinese and open-weight models (see catalog) are often used this way: vendor-provided compatible APIs, a gateway such as OpenRouter, or a local server (Ollama, LM Studio). Treat them as normal catalog entries; the switch action is then "change model/provider in settings".

## Unknown models

When the user lists a model that is not in the catalog, split its name into tokens (on space - _ . /), drop the vendor/family word (anything matching a catalog Vendor or family name), then match whole tokens:

Name cues: opus/pro/max/ultra/thinking/reasoner/fable → Deep; sonnet/plus/standard/coder → Balanced; haiku/flash/mini/nano/lite/air/turbo/small → Fast. Always confirm with the user and record in state.

Cues from two tiers, or no cue → ask: "Is <model> your strongest, everyday, or cheapest option?" and map to Deep / Balanced / Fast.
