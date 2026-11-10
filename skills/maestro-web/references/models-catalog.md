# Model catalog

Examples per tier, used at intake to offer a checklist. Names drift monthly: trust the user's model picker over this table, and map anything unlisted with the name cues in `models.md`. `(unverified)` = seen only in secondary sources at the verification date. 👁 = vision input (useful for design review).

| Vendor | Region | Deep | Balanced | Fast | Vision | Exposed in |
|---|---|---|---|---|---|---|
| Anthropic | US | Claude Fable 5.2, Claude Opus 5.5 | Claude Sonnet 5.5 | Claude Haiku 5.5 | 👁 | Claude Code, Antigravity, Cursor, Copilot, Windsurf, OpenCode, Cline/Roo/Kilo, Trae |
| OpenAI | US | GPT-6 Astra (unverified), GPT-6.1 Sol (unverified) | GPT-6.1 Terra (unverified) | GPT-6 Luna (unverified) | 👁 | Codex, Cursor, Copilot, Windsurf, OpenCode, Cline/Roo/Kilo, Trae |
| Google | US | Gemini 4 (unverified), Gemini 3.x Pro | Gemini 3.x Flash | Gemini 3.x Flash-Lite | 👁 | Antigravity, Gemini CLI, Cursor, Copilot, OpenCode, Cline/Roo/Kilo |
| xAI | US | Grok 4.x (e.g., 4.7) | Grok 4.x code/build variant (unverified) | Grok 4.x Fast | 👁 | Cursor, Copilot, OpenCode, Cline/Roo/Kilo |
| Mistral | EU | Mistral Large, Magistral Medium | Devstral 2, Mistral Medium | Devstral Small 2, Mistral Small, Codestral | 👁 (Large/Medium) | OpenCode, Cline/Roo/Kilo, local |
| Meta | US | Llama (largest current, unverified) | Llama mid-size (unverified) | Llama small (unverified) | 👁 (some) | OpenCode, Cline/Roo/Kilo, local |
| DeepSeek | CN | DeepSeek V4 Pro (unverified), DeepSeek reasoner | DeepSeek V4 chat (unverified) | DeepSeek V4.x Flash (unverified) | — | OpenCode, Cline/Roo/Kilo, Trae, Cursor (some), compatible endpoint, local |
| Alibaba Qwen | CN | Qwen 3.x Max (unverified) | Qwen3-Coder (Plus/Next) | Qwen3-Coder Flash, Qwen 3.x small dense | 👁 (VL models) | Qwen Code, OpenCode, Cline/Roo/Kilo, Trae, compatible endpoint, local |
| Moonshot Kimi | CN | Kimi K3 (unverified), Kimi K2.x thinking | Kimi K2.x | Kimi K2.x turbo (unverified) | 👁 (some) | Kimi CLI, OpenCode, Cline/Roo/Kilo, Trae, Cursor (some), compatible endpoint |
| Zhipu / Z.ai GLM | CN | GLM-5.x (unverified) | GLM-5.x Air (unverified) | GLM-5.x Flash (unverified) | 👁 (V models) | OpenCode, Cline/Roo/Kilo, Trae, compatible endpoint (incl. Claude Code), local |
| MiniMax | CN | MiniMax M3 (unverified) | MiniMax M-series | MiniMax M-series lightning (unverified) | — | OpenCode, Cline/Roo/Kilo, compatible endpoint (incl. Claude Code) |
| ByteDance Seed / Doubao | CN | Doubao-Seed Pro (unverified) | Doubao-Seed Code (unverified) | Doubao-Seed Lite (unverified) | 👁 | Trae, compatible endpoint |
| Local (Ollama, LM Studio) | — | rarely Deep; largest open model you can run | open Qwen / DeepSeek / GLM / Devstral | small open models | varies | OpenCode, Cline/Roo/Kilo, Continue, compatible endpoint |

Agent-native picks:
- Antigravity subagents: `pro` → Deep/Balanced, `flash` → Balanced/Fast, `flash_lite` → Fast.
- Claude Code aliases: `fable`, `opus` → Deep · `sonnet` → Balanced · `haiku` → Fast.
- Cursor and Windsurf also offer their own in-house fast models (Composer, SWE family) → usually Fast/Balanced.

Last verified: 2026-11-10

<!-- Sources (2026-11-10, via web search summaries): claude.com / anthropic.com model docs; openai.com models pages; ai.google.dev / blog.google; x.ai; mistral.ai; vendor and aggregator posts for DeepSeek, Qwen, Kimi, GLM, MiniMax, Doubao-Seed. Update this table + date when contributing. -->
