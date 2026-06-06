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

The first stage is interview-backed. `$goal-setting` must reuse the `$deep-interview` clarification model when requirements are not already execution-ready: preflight context intake, one focused question per round, ambiguity scoring, weakest-dimension targeting, non-goal and decision-boundary gates, pressure pass, and crystallized handoff artifact.

The workflow can attach OMC agents at each stage, but it must not spawn agents indiscriminately. Each attached agent needs a reason, a contribution, and an output that changes the goal, spec, implementation, or verification evidence.

## OMC Agent Attachment Map

- Goal-setting
  - `raf-goal-setter` owns the final goal contract.
  - `analyst` supports requirements clarity, acceptance criteria, and hidden constraints.
  - `explore` gathers discoverable repo facts before user questioning.
  - `researcher` gathers external or official evidence when current best practice affects the goal.
  - `critic` pressure-tests assumptions, non-goals, and decision boundaries.
  - `scholastic` may advise when the task is concept-heavy or research-framed.
  - Artifact classifiers such as `ppt-intent-classifier`, `designer`, or `writer` may attach only after the generic goal loop detects the artifact type.
- Architecture/spec
  - `raf-perspective-splitter`, `raf-variant-designer`, and `raf-backprop-critic` own the RAF perspective and variant logic.
  - `architect`, `planner`, `test-engineer`, `dependency-expert`, `designer`, `writer`, `researcher`, `vision`, and `critic` attach according to artifact needs.
  - PPT tasks attach `ppt-narrative-architect`, `ppt-page-planner`, `ppt-visual-director`, `ppt-speaker-notes-planner`, `ppt-reviewer`, and `ppt-master-adapter`.
- Ralph implementation
  - `raf-rough-loop-runner` owns champion execution and evidence collection.
  - `executor`, `debugger`, `test-engineer`, `verifier`, `architect`, `code-reviewer`, `code-simplifier`, `git-master`, and `team-executor` attach according to the approved spec and observed failures.
  - PPT tasks use `ppt-master-adapter` and `ppt-master` for final editable PPTX evidence.

## Artifact Document Format

Every formal document produced by the stages must be a Markdown outline document:

- Use `-` bullets for the document body, not numbered-list-first prose, table-first prose, or loose paragraphs.
- Use nested bullets to show logic progression from top-level conclusion, to supporting dimensions, to concrete requirements, evidence, risks, and next actions.
- Make each layer semantically narrower than its parent. A child bullet must explain, constrain, evidence, or operationalize the parent bullet.
- Do not make the outline artificially short. The document should be detailed enough that the next stage can execute from it without relying on chat memory.
- Narrative text in the conversation can stay natural, but saved stage artifacts, handoff documents, specs, ledgers, and review records must follow this outline format.

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

Return an outline-structured Markdown handoff:

- goal contract path or inline contract
- architecture/spec path or inline spec
- selected artifact type and agent routing
- implementation evidence
- backprop decisions
- final artifact location or blocker
