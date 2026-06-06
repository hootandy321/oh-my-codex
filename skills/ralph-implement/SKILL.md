---
name: ralph-implement
description: RAF Stage 3 persistent Ralph-style implementation against an approved goal and architecture spec
---

# Ralph Implement

`$ralph-implement` is RAF Stage 3. It consumes the goal contract and architecture/spec artifacts, then runs persistent implementation until the artifact satisfies the rubric and verification evidence is collected.

This skill is artifact-agnostic. It does not choose a public PPT/code/document branch. It reads the spec's artifact type and routes implementation accordingly.

## Use When

- A goal contract and architecture/spec are already available.
- The user wants the approved spec carried to completion.
- The task needs a persistent loop with verification and backprop, not a one-shot attempt.

## Prerequisites

Before implementation, verify one of the following exists:

- explicit goal contract and architecture/spec paths
- inline goal/spec text in the prompt
- `.omx/plans/prd-*.md` and `.omx/plans/test-spec-*.md` artifacts sufficient to ground the run

If the spec is missing, route back to `$architecture-spec`. If the goal is missing, route back to `$goal-setting`.

## Implementation Loop

1. Load the goal contract and architecture/spec.
2. Confirm artifact type and selected agent route.
3. Execute the champion approach.
4. Collect fresh evidence.
5. Run the falsifier and acceptance checks.
6. Classify failures with `raf-backprop-critic`.
7. Fix implementation failures locally.
8. Backprop goal/spec failures to the owning earlier stage.
9. Repeat until the rubric passes or a real blocker is proven.

## Agent Routing

Common RAF agents:

- `raf-rough-loop-runner`
- `raf-backprop-critic`

Use implementation agents based on the spec:

- PPT/deck: `ppt-master-adapter` plus PPT reviewer agents.
- Code/product: `executor`, `test-engineer`, `debugger`, `architect`.
- Document/report: `writer`, `quality-reviewer`, relevant domain specialists.

## PPT Implementation Rule

For presentation tasks, final implementation MUST use:

```bash
PPT_MASTER_SKILL_DIR=/Users/lxy/lxygit/wxyteam-pptmaster-skill/skills/ppt-master
```

Read `$PPT_MASTER_SKILL_DIR/SKILL.md` before implementation. Use `uv run` for `ppt-master` scripts. Completion requires a real editable PPTX under `exports/*.pptx`; an outline or HTML mock is not enough.

## Output Shape

Return an implementation record as a Markdown outline document. The body must use `-` bullets and nested bullets, with a clear progression from inputs, to route, to execution, to evidence, to backprop, to final artifact or blocker. Do not make it terse; write enough detail that a future run can resume from the record without relying on chat memory.

- Implementation record
  - Goal/spec inputs used
    - Link or quote the goal contract and architecture/spec consumed.
    - State any assumptions made while loading them.
  - Artifact type and agent route
    - State the route selected from the spec.
    - Name the agents or specialist skills used.
  - Implementation steps completed
    - Describe each meaningful implementation step.
    - Tie each step back to the spec requirement it satisfies.
  - Verification evidence
    - Include commands, artifact inspections, review results, or generated file paths.
    - State pass/fail status and what each result proves.
  - Backprop ledger
    - Classify each failure or uncertainty.
    - State whether it was fixed locally or routed back to goal/spec.
  - Final artifact path or blocker
    - Name the final artifact path when complete.
    - If blocked, state the exact missing authority, dependency, input, or environmental condition.
