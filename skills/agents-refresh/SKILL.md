---
name: agents-refresh
description: Refresh dynamically loaded OMX/Codex native agents from scoped Markdown prompt definitions
argument-hint: "[--scope user|project] [--dry-run]"
---

# Agents Refresh

Use this skill when the user adds or edits custom agent definitions and wants Codex/OMX to load the updated agent without rerunning full setup.

## Command

```bash
omx agents refresh [--scope user|project] [--dry-run]
```

## What It Does

1. Scans the selected scope's prompt directory:
   - project: `./.codex/prompts/*.md`
   - user: `${CODEX_HOME:-~/.codex}/prompts/*.md`
2. Parses agent metadata from Markdown frontmatter.
3. Generates matching native agent TOML files:
   - project: `./.codex/agents/*.toml`
   - user: `${CODEX_HOME:-~/.codex}/agents/*.toml`
4. Leaves hand-written TOML agents intact unless they correspond to a refreshed prompt with the same name.

## Notes

- Use direct TOML files in `.codex/agents/` when you want immediate native-agent loading without a refresh step.
- Use Markdown files in `.codex/prompts/` when you prefer editable prompt text and frontmatter metadata, then run this refresh skill.
- This skill is narrower than `omx setup --force`; it only refreshes custom native agent TOMLs from prompt definitions.
