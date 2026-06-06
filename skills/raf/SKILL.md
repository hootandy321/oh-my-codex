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

## Two-Layer Model

RAF has two layers:

- User-facing stage model
  - `$goal-setting`
  - `$architecture-spec`
  - `$ralph-implement`
- Runtime coordination model, adapted from OMX Team's staged lifecycle
  - `raf-goal`
  - `raf-spec`
  - `raf-dispatch`
  - `raf-verify`
  - `raf-backprop`

Do not expose the runtime phases as separate public skills unless the user is debugging the workflow itself. They are the internal control model that keeps the three public stages supervised, resumable, and evidence-driven.

## Team-Mode Pattern To Reuse

Reuse the logic of OMX Team mode, not the tmux-specific implementation details:

- Single source of truth
  - Team uses task JSON, inbox, mailbox, approved handoff, and leader updates.
  - RAF should use goal contract, architecture/spec, implementation backlog, dispatch records, verification evidence, and backprop ledger.
- Leader-owned supervision
  - Team leader owns task state, worker coordination, shutdown, and integration.
  - RAF Codex supervisor owns goal/spec integrity, backlog selection, child-agent dispatch, evidence review, continue/stop decisions, and backprop routing.
- Claim-safe lifecycle
  - Team tasks move through controlled statuses before shutdown.
  - RAF backlog items move through controlled statuses before completion or continuation.
- Closed-loop communication
  - Team workers ACK assignments and report through mailbox/state.
  - RAF child agents must receive bounded assignments and return evidence, risks, and follow-up recommendations before the supervisor accepts their work.
- Verify/fix loop
  - Team runs `team-verify` before `complete` and loops to `team-fix` on failure.
  - RAF runs `raf-verify` before accepting an item and loops to `raf-backprop` or implementation fix on failure.
- State-first control
  - Team should not be driven by blind pane typing.
  - RAF should not be driven by untracked chat claims; formal artifacts and implementation records are the control surface.

## Runtime Phase Mapping

- `raf-goal`
  - Public stage: `$goal-setting`
  - Team analogy: `team-plan` plus the requirements part of `team-prd`
  - Owner: Codex supervisor with `raf-goal-setter`, `analyst`, and `$deep-interview` mechanics
  - Output: goal contract and interview evidence
- `raf-spec`
  - Public stage: `$architecture-spec`
  - Team analogy: `team-prd`
  - Owner: Codex supervisor with architecture/spec agents
  - Output: architecture/spec, implementation backlog, verification plan, supervision plan
- `raf-dispatch`
  - Public stage: inside `$ralph-implement`
  - Team analogy: `team-exec`
  - Owner: Codex supervisor
  - Output: bounded child-agent assignments or direct implementation actions
- `raf-verify`
  - Public stage: inside `$ralph-implement`
  - Team analogy: `team-verify`
  - Owner: Codex supervisor plus verifier/reviewer agents
  - Output: evidence verdict for the current backlog item
- `raf-backprop`
  - Public stage: inside `$ralph-implement`
  - Team analogy: `team-fix`, but with RAF's extra ability to route back to spec or goal
  - Owner: Codex supervisor plus `raf-backprop-critic`
  - Output: local fix decision, backlog reprioritization, `$architecture-spec` backprop, `$goal-setting` backprop, user authority gate, or terminal completion

## RAF Runtime State Contract

Until a dedicated `.omx/state/raf/...` runtime exists, each RAF run must emulate the state contract in its formal documents. When a runtime is added, these fields are the intended state shape:

- `phase`
  - one of `raf-goal`, `raf-spec`, `raf-dispatch`, `raf-verify`, `raf-backprop`, `complete`, `blocked`, `cancelled`
- `goal_contract`
  - path or inline source of truth from `$goal-setting`
- `architecture_spec`
  - path or inline source of truth from `$architecture-spec`
- `backlog`
  - ordered implementation items with id, status, priority, dependency, owner, evidence, and next action
- `dispatches`
  - child-agent assignments with agent type, reasoning effort, scope, expected output, ACK/evidence status, and supervisor verdict
- `verification`
  - commands, artifact checks, review verdicts, and acceptance evidence for the active item
- `backprop_ledger`
  - failure classification and routing decision for every rejected item
- `transition_log`
  - phase transitions, reasons, and timestamps
- `terminal_condition`
  - why the run completed, blocked, cancelled, or returned to an earlier stage

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
  - Codex remains the main supervisor: it owns the adaptive backlog, delegates bounded child-agent work, reviews evidence, decides whether to continue to the next item, and enforces backprop/stop criteria.

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
