#!/usr/bin/env node
// Structural checks for skills/maestro-web. Usage: node tools/check.mjs
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILL = join(ROOT, "skills", "maestro-web");
const REF = join(SKILL, "references");
const PHASES = ["intake", "discover", "design", "architect", "plan", "build", "qa", "ship"];
const COMMANDS = ["`maestro`", "maestro resume", "maestro status", "maestro skip <phase>", "maestro models", "maestro budget <thrift|balanced|quality>"];
const BANNED = ["opus", "sonnet", "haiku", "fable", "gpt-", "gemini", "grok", "deepseek", "qwen", "kimi", "glm", "minimax", "doubao", "llama", "mistral", "magistral", "devstral", "codestral"];
const AGENT_NAMES = [/gemini cli/gi, /qwen code/gi, /kimi cli/gi];
const VENDORS = ["Anthropic", "OpenAI", "Google", "xAI", "Mistral", "Meta", "DeepSeek", "Alibaba Qwen", "Moonshot Kimi", "Zhipu", "MiniMax", "ByteDance", "Local"];
const AGENTS = ["Claude Code", "Antigravity", "Cursor", "Codex", "Gemini CLI", "Copilot", "Windsurf", "OpenCode", "Cline", "Trae", "Qwen Code", "Kimi CLI"];
const SECTIONS = ["Purpose", "Entry", "Steps", "Skills", "Fallback", "Exit", "Tier"];

let failed = 0;
const read = (p) => (existsSync(p) ? readFileSync(p, "utf8").replace(/\r\n/g, "\n") : null);
const lines = (s) => s.replace(/\n$/, "").split("\n").length;
function check(name, fn) {
  let reason;
  try { reason = fn(); } catch (e) { reason = e.message; }
  if (reason) { failed++; console.log(`FAIL ${name}: ${reason}`); } else console.log(`PASS ${name}`);
}
function need(p) { const s = read(p); if (s === null) throw new Error(`missing ${p.slice(ROOT.length + 1)}`); return s; }
function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
}
function frontmatter(s) {
  const m = s.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) throw new Error("no frontmatter");
  return { fm: m[1], body: s.slice(m[0].length) };
}
function bannedIn(text) {
  let t = text.toLowerCase();
  for (const a of AGENT_NAMES) t = t.replace(a, "");
  return BANNED.filter((w) => new RegExp(`(^|[^a-z])${w.replace("-", "\\-")}`).test(t));
}
function tableRows(section) { return section.split("\n").filter((l) => l.startsWith("|") && !/^\|\s*-/.test(l)).slice(1); }

const skillPath = join(SKILL, "SKILL.md");

check("skill:frontmatter", () => {
  const { fm } = frontmatter(need(skillPath));
  const keys = fm.split("\n").filter((l) => /^[a-zA-Z_-]+:/.test(l)).map((l) => l.split(":")[0].trim());
  if (keys.join(",") !== "name,description") return `frontmatter keys must be name,description (got ${keys.join(",")})`;
  if (!/^name: maestro-web$/m.test(fm)) return "name must be maestro-web";
  const d = fm.match(/^description:\s*([\s\S]+?)$/m);
  if (!d) return "no description";
  const desc = d[1].replace(/^["'>|-]+\s*|\s*["']$/g, "").replace(/\s+/g, " ").trim();
  if (desc.length > 300) return `description ${desc.length} > 300 chars`;
  if (!/maestro/i.test(desc)) return "description must mention maestro";
  if (!/web/i.test(desc)) return "description must mention web";
});
check("skill:length", () => { const n = lines(frontmatter(need(skillPath)).body); if (n > 150) return `body ${n} > 150 lines`; });
check("skill:links", () => {
  const s = need(skillPath);
  const refs = [...s.matchAll(/((?:references|templates)\/[\w./<>-]+\.md)/g)].map((m) => m[1]);
  const missing = [];
  for (const r of new Set(refs)) {
    const targets = r.includes("<id>") ? PHASES.map((p) => r.replace("<id>", p)) : [r];
    for (const t of targets) if (!existsSync(join(SKILL, t))) missing.push(t);
  }
  for (const p of PHASES) {
    const ps = read(join(REF, "phases", `${p}.md`)) || "";
    for (const m of ps.matchAll(/`([\w-]+\.md)`/g)) {
      if (m[1] === "SKILL.md" && !existsSync(skillPath)) missing.push(m[1]);
      else if (m[1] !== "SKILL.md" && ! ["spec.md", "design.md", "stack.md", "plan.md", "state.md"].includes(m[1]) && !existsSync(join(REF, m[1]))) missing.push(`${p}: ${m[1]}`);
    }
  }
  if (!refs.length) return "no references linked";
  if (missing.length) return `missing ${missing.join(", ")}`;
});
check("skill:commands", () => { const s = need(skillPath); const m = COMMANDS.filter((c) => !s.includes(c)); if (m.length) return `missing ${m.join(", ")}`; });
check("skill:switch-format", () => {
  const s = need(skillPath);
  for (const line of ["⇄ SWITCH →", "Phase: <from> → <to> · why:", "<Agent>:", "Context: state saved →"]) {
    if (!s.includes(line)) return `missing switch format line: ${line}`;
  }
});
check("skill:no-model-names", () => {
  const files = [skillPath, join(SKILL, "templates", "state.md"), join(REF, "models.md"), ...PHASES.map((p) => join(REF, "phases", `${p}.md`))];
  const hits = [];
  for (const f of files) {
    const s = read(f); if (s === null) continue;
    const text = s.split("\n").filter((l) => !l.startsWith("Name cues:")).join("\n");
    const b = bannedIn(text); if (b.length) hits.push(`${f.slice(SKILL.length + 1)}: ${b.join(",")}`);
  }
  if (hits.length) return hits.join("; ");
});
check("skill:refs-length", () => {
  const bad = [];
  for (const f of walk(REF).filter((f) => f.endsWith(".md"))) {
    const max = f.endsWith("models-catalog.md") ? 200 : 120; const n = lines(read(f));
    if (n > max) bad.push(`${f.slice(SKILL.length + 1)} ${n}>${max}`);
  }
  const st = need(join(SKILL, "templates", "state.md")); if (lines(st) > 30) bad.push(`templates/state.md ${lines(st)}>30`);
  if (!walk(REF).length) return "no references";
  if (bad.length) return bad.join("; ");
});
check("models:vendors", () => {
  const s = need(join(REF, "models-catalog.md"));
  const m = VENDORS.filter((v) => !new RegExp(`^\\|\\s*${v}`, "m").test(s)); if (m.length) return `missing rows ${m.join(", ")}`;
});
check("models:verified", () => { if (!/^Last verified: \d{4}-\d{2}-\d{2}$/m.test(need(join(REF, "models-catalog.md")))) return "no 'Last verified: YYYY-MM-DD' line"; });
check("models:switch", () => {
  const s = need(join(REF, "models.md"));
  const sec = s.split(/^## /m).find((x) => x.startsWith("How to switch")); if (!sec) return "no '## How to switch'";
  const m = AGENTS.filter((a) => !sec.includes(a)); if (m.length) return `missing ${m.join(", ")}`;
});
check("catalog:phases", () => {
  const s = need(join(REF, "skills-catalog.md"));
  const parts = Object.fromEntries(s.split(/^## /m).slice(1).map((x) => [x.split("\n")[0].trim(), x]));
  const errs = [];
  for (const p of PHASES.filter((p) => p !== "intake")) {
    const sec = parts[p]; if (!sec) { errs.push(`no ## ${p}`); continue; }
    const header = sec.split("\n").find((l) => l.startsWith("|")) || "";
    const fi = header.split("|").map((c) => c.trim()).indexOf("Fallback");
    if (fi < 0) { errs.push(`${p}: no Fallback column`); continue; }
    const rows = tableRows(sec); if (!rows.length) errs.push(`${p}: no rows`);
    for (const r of rows) {
      if (!r.includes("npx skills add")) errs.push(`${p}: row without install`);
      if (!(r.split("|")[fi] || "").trim()) errs.push(`${p}: empty fallback`);
    }
  }
  if (errs.length) return errs.join("; ");
});
check("phases:sections", () => {
  const errs = [];
  for (const p of PHASES) {
    const s = read(join(REF, "phases", `${p}.md`)); if (s === null) { errs.push(`missing ${p}.md`); continue; }
    const m = SECTIONS.filter((h) => !new RegExp(`^## ${h}$`, "m").test(s)); if (m.length) errs.push(`${p}: ${m.join(",")}`);
  }
  if (errs.length) return errs.join("; ");
});
check("repo:files", () => {
  if (!existsSync(join(ROOT, "LICENSE"))) return "missing LICENSE";
  if (!need(join(ROOT, "README.md")).includes("npx skills add Fauzi41/maestro --skill maestro-web")) return "README lacks install command";
});

process.exit(failed ? 1 : 0);
