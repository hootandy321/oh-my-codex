---
name: gsi
description: Complete three-stage GSI flow that routes artifact-specific agents after goal and spec grounding
---

# GSI Complete Flow

`$gsi` is the umbrella flow for the three-stage model:

1. `$goal-setting` freezes the user's target, constraints, evidence standard, and authority boundary.
2. `$architecture-spec` turns the goal into artifact architecture, perspectives, variants, and an implementation spec.
3. `$ralph-implement` runs a persistent Ralph-style implementation loop against the approved goal/spec artifacts.

Do not split public workflow choice by artifact type. The same three stages apply to PPT, code, documents, reports, research artifacts, and other deliverables. Artifact type is detected inside the stages and used only for agent routing.

The first stage is interview-backed. `$goal-setting` must reuse the `$deep-interview` clarification model when requirements are not already execution-ready: preflight context intake, one focused question per round, ambiguity scoring, weakest-dimension targeting, non-goal and decision-boundary gates, pressure pass, and crystallized handoff artifact.

The workflow can attach OMC agents at each stage, but it must not spawn agents indiscriminately. Each attached agent needs a reason, a contribution, and an output that changes the goal, spec, implementation, or verification evidence.

## Two-Layer Model

GSI has two layers:

- User-facing stage model
  - `$goal-setting`
  - `$architecture-spec`
  - `$ralph-implement`
- Runtime coordination model, adapted from OMX Team's staged lifecycle
  - `gsi-goal`
  - `gsi-spec`
  - `gsi-dispatch`
  - `gsi-verify`
  - `gsi-backprop`

Do not expose the runtime phases as separate public skills unless the user is debugging the workflow itself. They are the internal control model that keeps the three public stages supervised, resumable, and evidence-driven.

## Manual And Automatic Operation

GSI supports both manual stage operation and an Autopilot-style automatic supervisor mode.

- Manual stage operation
  - The user invokes `$goal-setting`, `$architecture-spec`, and `$ralph-implement` directly.
  - Each stage produces its own formal outline artifact.
  - The user or supervisor chooses when to hand off to the next stage.
  - Use this when the user wants to inspect, revise, or approve each stage before continuing.
- Automatic full-flow operation
  - The user invokes `$gsi <task>` as the full-flow entrypoint.
  - `$gsi` acts as the supervisor over the child stages, similar to how `$autopilot` supervises its child phases.
  - When a phase gate is satisfied, `$gsi` automatically updates state and transitions to the next GSI runtime phase.
  - The automatic path still respects user authority gates, destructive boundaries, credential gates, and unresolved high ambiguity.
  - The automatic path must not skip `$goal-setting` merely because implementation sounds obvious.

Recommended invocation forms:

- `$gsi "<task>"`
  - Default full-flow automatic mode.
  - Uses `team_policy: "manual"` unless the spec explicitly selects another policy.
- `$gsi --team=auto "<task>"`
  - Allows GSI to launch or recommend `$team` automatically when implementation lanes are independent, runtime support is available, and supervision evidence can be collected.
- `$gsi --team=manual "<task>"`
  - GSI may recommend `$team`, but the user or supervisor must explicitly approve launch.
- `$gsi --team=off "<task>"`
  - GSI uses direct work or native subagents only; it does not invoke `$team`.
- `$goal-setting` / `$architecture-spec` / `$ralph-implement`
  - Manual stage controls.

## Autopilot-Style Hook Mode

The full `$gsi` entrypoint should behave like a supervised hook mode rather than a one-shot prompt. The hook state belongs to `mode: "gsi"` and child stages are supervised phases, not independent peer workflows.

- Phase cycle
  - `gsi-goal`
  - `gsi-spec`
  - `gsi-dispatch`
  - `gsi-verify`
  - `gsi-backprop`
- Automatic transitions
  - `gsi-goal -> gsi-spec`
    - Allowed only after the goal contract exists, non-goals and decision boundaries are explicit, the deep-interview ambiguity gate is satisfied or explicitly risk-accepted, and the goal artifact is written.
  - `gsi-spec -> gsi-dispatch`
    - Allowed only after architecture/spec, implementation backlog, verification plan, supervision plan, and team policy are written.
  - `gsi-dispatch -> gsi-verify`
    - Allowed only after the active backlog item has implementation evidence or a child-agent/team dispatch has returned evidence.
  - `gsi-verify -> gsi-backprop`
    - Required when verification fails, scope changes, reviewer evidence is non-clean, or the next continuation decision needs classification.
  - `gsi-verify -> gsi-dispatch`
    - Allowed when the active item passes and another approved backlog item remains.
  - `gsi-backprop -> gsi-dispatch`
    - Allowed for local implementation bugs or backlog reprioritization inside the approved spec.
  - `gsi-backprop -> gsi-spec`
    - Required for weak architecture, missing viewpoints, bad variants, missing implementation backlog, or team policy mismatch.
  - `gsi-backprop -> gsi-goal`
    - Required for wrong target, wrong rubric, non-goal conflict, missing authority, or user-intent mismatch.
  - `gsi-verify|gsi-backprop -> complete`
    - Allowed only when required backlog items are done, verification evidence is clean, and the goal rubric is satisfied.
- Resume behavior
  - On `continue` / `resume`, read GSI state or the formal implementation record and continue from the current runtime phase.
  - Do not restart goal discovery if a valid goal contract already exists.
  - Do not regenerate spec if an approved spec/backlog already exists unless backprop requires it.
- Hook safety
  - Ask the user only for destructive, credentialed, external-production, or materially preference-dependent branches.
  - Continue automatically through safe, reversible, already-approved phase transitions.
  - Preserve every handoff artifact and transition reason.

## Team-Mode Pattern To Reuse

Reuse the logic of OMX Team mode, not the tmux-specific implementation details:

- Single source of truth
  - Team uses task JSON, inbox, mailbox, approved handoff, and leader updates.
  - GSI should use goal contract, architecture/spec, implementation backlog, dispatch records, verification evidence, and backprop ledger.
- Leader-owned supervision
  - Team leader owns task state, worker coordination, shutdown, and integration.
  - GSI Codex supervisor owns goal/spec integrity, backlog selection, child-agent dispatch, evidence review, continue/stop decisions, and backprop routing.
- Claim-safe lifecycle
  - Team tasks move through controlled statuses before shutdown.
  - GSI backlog items move through controlled statuses before completion or continuation.
- Closed-loop communication
  - Team workers ACK assignments and report through mailbox/state.
  - GSI child agents must receive bounded assignments and return evidence, risks, and follow-up recommendations before the supervisor accepts their work.
- Verify/fix loop
  - Team runs `team-verify` before `complete` and loops to `team-fix` on failure.
  - GSI runs `gsi-verify` before accepting an item and loops to `gsi-backprop` or implementation fix on failure.
- State-first control
  - Team should not be driven by blind pane typing.
  - GSI should not be driven by untracked chat claims; formal artifacts and implementation records are the control surface.

## Runtime Phase Mapping

- `gsi-goal`
  - Public stage: `$goal-setting`
  - Team analogy: `team-plan` plus the requirements part of `team-prd`
  - Owner: Codex supervisor with `gsi-goal-setter`, `analyst`, and `$deep-interview` mechanics
  - Output: goal contract and interview evidence
- `gsi-spec`
  - Public stage: `$architecture-spec`
  - Team analogy: `team-prd`
  - Owner: Codex supervisor with architecture/spec agents
  - Output: architecture/spec, implementation backlog, verification plan, supervision plan
- `gsi-dispatch`
  - Public stage: inside `$ralph-implement`
  - Team analogy: `team-exec`
  - Owner: Codex supervisor
  - Output: bounded child-agent assignments or direct implementation actions
- `gsi-verify`
  - Public stage: inside `$ralph-implement`
  - Team analogy: `team-verify`
  - Owner: Codex supervisor plus verifier/reviewer agents
  - Output: evidence verdict for the current backlog item
- `gsi-backprop`
  - Public stage: inside `$ralph-implement`
  - Team analogy: `team-fix`, but with GSI's extra ability to route back to spec or goal
  - Owner: Codex supervisor plus `gsi-backprop-critic`
  - Output: local fix decision, backlog reprioritization, `$architecture-spec` backprop, `$goal-setting` backprop, user authority gate, or terminal completion

## GSI Runtime State Contract

Until a dedicated `.omx/state/gsi/...` runtime exists, each GSI run must emulate the state contract in its formal documents. When a runtime is added, these fields are the intended state shape:

- `phase`
  - one of `gsi-goal`, `gsi-spec`, `gsi-dispatch`, `gsi-verify`, `gsi-backprop`, `complete`, `blocked`, `cancelled`
- `phase_cycle`
  - `["gsi-goal","gsi-spec","gsi-dispatch","gsi-verify","gsi-backprop"]`
- `auto_mode`
  - `true` for full `$gsi`, `false` for manual stage-only operation
- `team_policy`
  - one of `auto`, `manual`, or `off`
- `goal_contract`
  - path or inline source of truth from `$goal-setting`
- `architecture_spec`
  - path or inline source of truth from `$architecture-spec`
- `backlog`
  - ordered implementation items with id, status, priority, dependency, owner, evidence, and next action
- `dispatches`
  - child-agent assignments with agent type, reasoning effort, scope, expected output, ACK/evidence status, and supervisor verdict
- `team_invocations`
  - recommended, launched, skipped, blocked, or completed `$team` runs with reason and evidence
- `verification`
  - commands, artifact checks, review verdicts, and acceptance evidence for the active item
- `backprop_ledger`
  - failure classification and routing decision for every rejected item
- `transition_log`
  - phase transitions, reasons, and timestamps
- `terminal_condition`
  - why the run completed, blocked, cancelled, or returned to an earlier stage

Example state skeleton:

```json
{
  "mode": "gsi",
  "active": true,
  "current_phase": "gsi-goal",
  "iteration": 1,
  "phase_cycle": ["gsi-goal", "gsi-spec", "gsi-dispatch", "gsi-verify", "gsi-backprop"],
  "auto_mode": true,
  "team_policy": "manual",
  "handoff_artifacts": {
    "goal_contract": null,
    "architecture_spec": null,
    "implementation_record": null
  },
  "backlog": [],
  "dispatches": [],
  "team_invocations": [],
  "verification": null,
  "backprop_ledger": [],
  "return_to_phase_reason": null
}
```

## Team Invocation Policy

GSI can call `$team`, but `$team` remains an execution engine inside GSI rather than the owner of the GSI workflow.

- `team_policy: "auto"`
  - GSI may launch `$team` automatically when all conditions are true:
    - the active implementation backlog has independent lanes or a broad verification matrix;
    - shared files, dependencies, and integration boundaries are explicit;
    - the current environment supports OMX Team runtime, or a durable team launch has been explicitly authorized;
    - Codex supervisor can monitor state, mailbox/ACK, task terminal status, and verification evidence;
    - the launch does not require destructive, credentialed, or external-production authority not already granted.
  - If any condition is false, fall back to native subagents or direct supervised execution and record why Team was skipped.
- `team_policy: "manual"`
  - GSI may recommend `$team` and produce a launch hint.
  - Do not launch `$team` without explicit user/supervisor approval.
- `team_policy: "off"`
  - GSI does not launch `$team`.
  - Use direct Codex supervision and native subagents only.
- In every policy
  - Team workers do not own GSI goal/spec/backlog state.
  - Team evidence returns to Codex supervisor.
  - Codex supervisor decides whether the Team result completes the active item, requires fix, or triggers backprop.

## OMC Agent Attachment Map

- Goal-setting
  - `gsi-goal-setter` owns the final goal contract.
  - `analyst` supports requirements clarity, acceptance criteria, and hidden constraints.
  - `explore` gathers discoverable repo facts before user questioning.
  - `researcher` gathers external or official evidence when current best practice affects the goal.
  - `critic` pressure-tests assumptions, non-goals, and decision boundaries.
  - `scholastic` may advise when the task is concept-heavy or research-framed.
  - Artifact classifiers such as `ppt-intent-classifier`, `designer`, or `writer` may attach only after the generic goal loop detects the artifact type.
- Architecture/spec
  - `gsi-perspective-splitter`, `gsi-variant-designer`, and `gsi-backprop-critic` own the GSI perspective and variant logic.
  - `architect`, `planner`, `test-engineer`, `dependency-expert`, `designer`, `writer`, `researcher`, `vision`, and `critic` attach according to artifact needs.
  - PPT tasks attach `ppt-narrative-architect`, `ppt-page-planner`, `ppt-visual-director`, `ppt-speaker-notes-planner`, `ppt-reviewer`, and `ppt-master-adapter`.
- Ralph implementation
  - `gsi-rough-loop-runner` owns champion execution and evidence collection.
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
- The user asks for the complete GSI flow rather than a single stage.

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
