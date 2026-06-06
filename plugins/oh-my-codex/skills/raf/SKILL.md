---
name: raf
description: Complete three-stage RAF flow that routes artifact-specific agents after goal and spec grounding
---

# RAF Complete Flow

`$raf` is the umbrella flow for the three-stage model:

1. `$goal-setting` freezes the user's target, constraints, evidence standard, and authority boundary.
2. `$architecture-spec` turns the goal into artifact architecture, perspectives, variants, and an implementation spec.
3. `$ralph-implement` runs a persistent Ralph-style implementation loop against the approved goal/spec artifacts.

Do not split public workflow choice by artifact type. The same three stages apply to PPT, code, documents, reports, research artifacts, and other deliverables. Artifact type is detected inside the stages and used only for agent routing.

## Use When

- The user wants the agent to work from their thinking model, not just execute a narrow instruction.
- The task has enough ambiguity that premature implementation would optimize the wrong artifact.
- Completion requires a real artifact plus verification evidence.
- The user asks for the complete RAF flow rather than a single stage.

## Stage Contract

### Stage 1: `$goal-setting`

Run the goal-setting skill first. It produces a durable goal contract that later stages must preserve.

### Stage 2: `$architecture-spec`

Run the architecture/spec skill second. It detects the artifact type and selects the agent stack. For PPT tasks it may route to `ppt-intent-classifier`, `ppt-narrative-architect`, `ppt-page-planner`, `ppt-visual-director`, `ppt-speaker-notes-planner`, `ppt-reviewer`, and `ppt-master-adapter`.

### Stage 3: `$ralph-implement`

Run the persistent implementation skill last. It must consume the goal contract and architecture/spec artifacts. For PPT tasks, final implementation must use `ppt-master`; for other artifact types, use the matching implementation and verification path.

## Backprop

Every failure is routed to the earliest owning stage:

| Failure Type | Owning Stage |
| --- | --- |
| wrong target, rubric, or authority | `$goal-setting` |
| weak architecture, missing viewpoint, or bad variant | `$architecture-spec` |
| implementation bug or verification failure | `$ralph-implement` |
| missing user authority | user decision gate |

Do not hide these failures under generic "needs polish" language.

## Output Shape

Return:

- goal contract path or inline contract
- architecture/spec path or inline spec
- selected artifact type and agent routing
- implementation evidence
- backprop decisions
- final artifact location or blocker
