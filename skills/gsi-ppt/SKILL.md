---
name: gsi-ppt
description: Deprecated compatibility shim for PPT tasks; use the generic GSI stage skills
---

# GSI-PPT Compatibility Shim

`$gsi-ppt` is retained only so older prompts keep working. New workflows should use the generic GSI stages:

1. `$goal-setting <task>`
2. `$architecture-spec <goal contract>`
3. `$ralph-implement <approved spec>`

Do not ask the user to choose a PPT-specific skill. When the task is a presentation or deck, the generic stage workflow detects that artifact type and routes internally to the PPT agents and `ppt-master`.

## PPT Routing Rule

If the task asks for slides, a presentation, PowerPoint, PPT, PPTX, deck, speaker notes, or a `ppt-master` handoff:

- `$goal-setting` records deck purpose, audience, source material, completion rubric, and authority boundaries.
- `$architecture-spec` routes to the PPT agent stack for narrative, page planning, visual direction, notes, review, the `ppt-master` Eight Confirmations, and handoff planning.
- `$ralph-implement` uses `ppt-master` for the final editable PPTX from the approved architecture/spec.

In the generic GSI flow, `ppt-master`'s Eight Confirmations belong to `$architecture-spec`, because they are design/spec decisions. `$ralph-implement` must consume them instead of re-asking during implementation unless the approved spec is missing or contradictory.

Final PPT implementation MUST use the `ppt-master` skill dependency resolved by `$ralph-implement`:

```bash
PPT_MASTER_SKILL_DIR="$(./skills/ralph-implement/scripts/ensure-ppt-master-skill.sh)"
```

The helper auto-detects an existing checkout or clones `http://bitbucket.ci-lab.net/scm/wxyteam/wxyteam-pptmaster-skill.git`. If the dependency cannot be cloned or updated, tell the user that URL and stop with a dependency blocker. Read `$PPT_MASTER_SKILL_DIR/SKILL.md` before starting a real deck implementation.

## Completion Evidence For PPT Tasks

A PPT task can claim completion only when `$ralph-implement` reports:

- canonical source path
- `ppt-master` project path
- `design_spec.md` and `spec_lock.md`
- generated notes
- generated SVG pages
- exported editable `exports/*.pptx`
- review result
- backprop ledger
