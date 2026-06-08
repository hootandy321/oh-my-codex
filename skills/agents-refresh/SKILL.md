---
name: agents-refresh
description: Refresh/check dynamically loaded OMX/Codex native agents from scoped TOML agent definitions
argument-hint: "[--scope user|project] [--dry-run]"
---

# Agents Refresh

Use this skill when the user adds or edits custom native agent TOML definitions and wants Codex/OMX to check the scoped agent surface without rerunning full setup.

## Command

```bash
omx agents refresh [--scope user|project] [--dry-run]
```

## What It Does

1. Scans the selected scope's native agent TOML directory:
   - project: `./.omx/agents/*.toml`
   - user: `${CODEX_HOME:-~/.codex}/agents/*.toml`
2. Reports which TOML agent definitions are present.
3. Does not read Markdown prompt files or generate TOML from prompt frontmatter.

## Notes

- Use direct TOML files in `.omx/agents/` for project-level native agents.
- Use direct TOML files in `${CODEX_HOME:-~/.codex}/agents/` for user-level native agents.
- This skill is narrower than `omx setup --force`; it only checks scoped native agent TOML surfaces.
