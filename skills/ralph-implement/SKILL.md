---
name: ralph-implement
description: GSI Stage 3 persistent Ralph-style implementation against an approved goal and architecture spec
---

# Ralph Implement

`$ralph-implement` is GSI Stage 3. It consumes the goal contract and architecture/spec artifacts, then runs persistent implementation until the artifact satisfies the rubric, verification evidence is collected, and the implementation backlog is exhausted or intentionally stopped.

This skill is artifact-agnostic. It does not choose a public PPT/code/document branch. It reads the spec's artifact type and routes implementation accordingly.

## Use When

- A goal contract and architecture/spec are already available.
- The user wants the approved spec carried to completion.
- The task needs a persistent loop with verification and backprop, not a one-shot attempt.
- The task should continue beyond the first completed implementation item and pick up the next approved idea, variant, or backlog item.

## Prerequisites

Before implementation, verify one of the following exists:

- explicit goal contract and architecture/spec paths
- inline goal/spec text in the prompt
- `.omx/plans/prd-*.md` and `.omx/plans/test-spec-*.md` artifacts sufficient to ground the run

If the spec is missing, route back to `$architecture-spec`. If the goal is missing, route back to `$goal-setting`.

## Implementation Loop

1. Load the goal contract and architecture/spec.
2. Enter `gsi-dispatch`: confirm artifact type, selected agent route, implementation backlog, and supervision plan.
3. Select the next backlog item using the priority, dependency, risk, and value criteria from the spec.
4. Dispatch that item through the appropriate child agents or direct implementation lane.
5. Collect child-agent ACK/evidence or direct implementation evidence.
6. Enter `gsi-verify`: run the falsifier and acceptance checks for the current item.
7. Classify failures with `gsi-backprop-critic`.
8. Enter `gsi-backprop` when evidence fails, scope changes, or a challenger/backlog decision is needed.
9. Fix implementation failures locally when they are inside the approved spec.
10. Backprop goal/spec failures to the owning earlier stage.
11. If the item passes, mark it complete, update the backlog, and select the next implementable item.
12. Repeat until all required backlog items are complete, the goal rubric is satisfied, or a real blocker/user authority gate is proven.

## Team-Like Runtime Phases

`$ralph-implement` borrows OMX Team's staged lifecycle while keeping Codex as the single supervisor.

- `gsi-dispatch`
  - Select the next implementable backlog item.
  - Decide direct work versus child-agent dispatch.
  - Write a bounded assignment: item id, scope, files/artifacts, expected evidence, non-goals, and escalation triggers.
  - Require ACK/readback when a child agent or team lane is used.
- `gsi-verify`
  - Verify the active backlog item before accepting it.
  - Use tests, builds, lint, artifact checks, reviewer agents, visual checks, or domain evidence as appropriate.
  - Treat implementer claims as untrusted until evidence is inspected by Codex supervisor or independent verifier/reviewer agents.
- `gsi-backprop`
  - Classify failure as implementation bug, weak backlog item, spec mismatch, goal mismatch, missing authority, or environmental blocker.
  - Route implementation bugs back to `gsi-dispatch`.
  - Route weak item/spec issues back to `$architecture-spec`.
  - Route wrong-goal or authority issues back to `$goal-setting` or the user.
  - Route passed items to backlog continuation or terminal completion.

This is a control model, not a requirement to launch tmux Team. Use native subagents for bounded in-session parallelism; use OMX Team only when durable tmux workers, worktrees, mailbox coordination, or long-running parallel lanes are actually needed.

## Team Use Inside Implementation

`$ralph-implement` may use `$team` as an execution engine when the approved spec and GSI state permit it.

- Inputs from `$architecture-spec`
  - `team_policy`: `auto`, `manual`, or `off`
  - candidate parallel lanes
  - shared-file/dependency map
  - verification and integration evidence required from Team
- Auto Team launch
  - Allowed only when `team_policy` is `auto`.
  - Allowed only when the environment can actually run OMX Team or the supervisor has a valid external Team handoff path.
  - Required launch evidence: team name, worker count/roles, task ids, ACK or equivalent startup evidence, status path, and shutdown/completion gate.
  - If Team runtime is unavailable, fall back to native subagents or direct implementation and record `team_invocations[].status = "skipped"` with reason.
- Manual Team launch
  - Required when `team_policy` is `manual`.
  - Produce a launch hint and wait for explicit approval before starting durable Team runtime.
- Team off
  - Required when `team_policy` is `off`.
  - Do not invoke Team; use native subagents or direct supervisor execution.
- Supervisor invariant
  - Team workers own only their assigned tasks.
  - Codex supervisor owns GSI backlog, phase transitions, evidence acceptance, and backprop decisions.

## Continuous Implementation Backlog

The implementation stage is not limited to the first champion pass. It should keep working through an approved adaptive backlog.

- Backlog sources
  - Champion implementation pieces from `$architecture-spec`.
  - Challenger ideas that become worthwhile after the first implementation passes.
  - Verification-driven follow-ups discovered during tests, reviews, or usage evidence.
  - Backprop items returned from implementation failures that do not require a new user decision.
- Item lifecycle
  - `pending` - approved but not started.
  - `dispatched` - assigned to Codex supervisor, native subagent, or Team worker lane with a bounded scope.
  - `active` - currently owned by the main Codex supervisor or a child agent.
  - `verifying` - implementation appears complete and evidence is being collected.
  - `reviewing` - Codex supervisor and review agents are checking whether the evidence is sufficient.
  - `done` - accepted with evidence.
  - `backprop` - returned to `$architecture-spec` or `$goal-setting`.
  - `blocked` - cannot proceed without missing input, dependency, authority, or environmental change.
  - `deferred` - intentionally not pursued in this run.
- Continue criteria
  - Continue to the next backlog item when the current item is implemented, tests/reviews pass, and the remaining item is still inside the approved goal/spec boundary.
  - Continue to a challenger item when the champion item passes but the spec says the challenger would add value and does not violate scope.
  - Continue to hardening/refinement when verification reveals improvement work that is inside the current implementation authority.
- Stop criteria
  - Stop when all `must` and selected `should` items are done and the goal rubric passes.
  - Stop when the next item would change goal, scope, non-goals, or authority.
  - Stop when repeated failures prove the spec or goal is wrong and backprop is required.
  - Stop when the user explicitly pauses or cancels.

## Codex Supervisor Role

Codex is the main supervisor. Child agents can implement, test, critique, research, or verify, but they do not own the adaptive loop.

- Main-supervisor responsibilities
  - Own the backlog and decide which item is next.
  - Translate the approved spec into bounded child-agent assignments.
  - Require ACK/readback for delegated work when the runtime supports it.
  - Review child-agent outputs before merging them into the main implementation record.
  - Enforce non-goals, decision boundaries, and stop criteria.
  - Decide whether a failure is local implementation work, backlog reprioritization, `$architecture-spec` backprop, `$goal-setting` backprop, or a user authority gate.
  - Keep the implementation record current after every item.
- Child-agent responsibilities
  - Work only on the assigned backlog item.
  - Return evidence, changed files/artifacts, risks, and recommended follow-up.
  - Escalate scope conflicts, shared-file conflicts, missing authority, or unclear acceptance criteria to the main supervisor.
  - Avoid recursively launching their own workflow unless explicitly assigned as a team/supervised lane.
- Review gates
  - Every implementation item needs fresh evidence before it can move to `done`.
  - Code changes require test/build/lint evidence appropriate to risk.
  - Source-code changes should receive independent `code-reviewer` and/or `architect` review when risk is moderate or higher.
  - Claims from the implementing agent are not enough; the supervisor must inspect evidence or receive independent verifier evidence.

## Child-Agent And Model Configuration

Use installed native agent types whenever available. Configure capability through `agent_type` and `reasoning_effort`; do not hardcode stale model names unless the user explicitly asks for a provider/model override.

- Default dispatch pattern
  - Exploration: `agent_type: "explore"`, `reasoning_effort: "low"`.
  - Implementation: `agent_type: "executor"`, `reasoning_effort: "medium"` or `"high"` depending on risk.
  - Failure diagnosis: `agent_type: "debugger"`, `reasoning_effort: "high"`.
  - Test strategy or test implementation: `agent_type: "test-engineer"`, `reasoning_effort: "medium"` or `"high"`.
  - Architecture review: `agent_type: "architect"`, `reasoning_effort: "high"`.
  - Completion verification: `agent_type: "verifier"`, `reasoning_effort: "high"`.
  - Code review: `agent_type: "code-reviewer"`, `reasoning_effort: "high"`.
  - Parallel supervised execution: `agent_type: "team-executor"` only when the spec has independent lanes and the main supervisor can integrate them.
- Configuration rules
  - Prefer inherited model configuration from OMX/Codex and the generated native-agent TOMLs.
  - Use `reasoning_effort` to tune depth before overriding `model`.
  - If the user wants other models or providers, capture that as an implementation policy in the spec before dispatch.
  - Record every dispatched child agent in the implementation record with agent type, purpose, item id, reasoning effort, and evidence returned.
  - Do not let child agents silently broaden scope or mark the whole task complete.

## Governance By Task Type

Different implementation tasks need different supervision evidence.

- Code implementation
  - Required governance: scoped backlog item, changed-file inventory, tests/build/lint, regression risk note, review gate for moderate risk.
  - Continue condition: current item passes and the next backlog item is still inside approved scope.
  - Escalate when API contracts, data migrations, security boundaries, or user-visible behavior change beyond the spec.
- PPT/deck implementation
  - Required governance: `ppt-master` project evidence, source path, notes, SVG output, exported PPTX, visual/readability review.
  - Continue condition: exported deck passes review and remaining backlog items are slide improvements or approved challenger refinements.
  - Escalate when narrative direction, audience, style, or source interpretation changes the goal contract.
- Document/report implementation
  - Required governance: outline/source traceability, factual checks, reviewer pass, final artifact path.
  - Continue condition: the current document section passes and the next section/backlog item remains inside the approved narrative and evidence boundary.
  - Escalate when claims, tone, public/private boundary, or audience commitments change.
- Research implementation
  - Required governance: source ledger, citation quality, claim/evidence mapping, uncertainty ledger.
  - Continue condition: current research question is answered and the next question is in the approved research backlog.
  - Escalate when evidence changes the research question, scope, or conclusion strength.

## Agent Routing

Common GSI agents:

- `gsi-rough-loop-runner`
- `gsi-backprop-critic`

OMC implementation agents:

- `executor` - implementation and refactoring work.
- `debugger` - root-cause analysis and regression isolation when implementation fails.
- `test-engineer` - test implementation and test adequacy checks.
- `verifier` - final completion evidence and claim validation.
- `architect` - implementation-signoff for architectural or cross-boundary changes.
- `code-reviewer` - comprehensive code review when source code changed.
- `code-simplifier` - post-implementation cleanup on changed files when code was modified.
- `git-master` - commit strategy, staging hygiene, and history cleanup when the task includes publication.
- `team-executor` - supervised coordinated execution when the approved spec needs parallel lanes.

Use implementation agents based on the spec:

- PPT/deck: `ppt-master-adapter` plus PPT reviewer agents.
- Code/product: `executor`, `test-engineer`, `debugger`, `architect`.
- Document/report: `writer`, `quality-reviewer`, relevant domain specialists.

Agent-selection rule:

- Start from the route written by `$architecture-spec`.
- Add implementation agents only when the evidence or failure mode requires them.
- Record every attached OMC agent in the implementation record with the reason it was used and the evidence it produced.

## PPT Implementation Rule

For presentation tasks, final implementation MUST use the `ppt-master` skill dependency. Resolve it with the GSI helper before running any PPT implementation command:

```bash
PPT_MASTER_SKILL_DIR="$(./skills/ralph-implement/scripts/ensure-ppt-master-skill.sh)"
uv run "$PPT_MASTER_SKILL_DIR/scripts/project_manager.py" ...
```

The helper checks `PPT_MASTER_SKILL_DIR`, `${CODEX_HOME:-~/.codex}/external/wxyteam-pptmaster-skill/skills/ppt-master`, and `${CODEX_HOME:-~/.codex}/skills/ppt-master`. If none exists, it tries to clone `http://bitbucket.ci-lab.net/scm/wxyteam/wxyteam-pptmaster-skill.git`. If clone or update fails, report that URL to the user and keep the PPT implementation blocked instead of fabricating a deck through another tool.

Read `$PPT_MASTER_SKILL_DIR/SKILL.md` before implementation. Use `uv run` for `ppt-master` scripts. Completion requires a real editable PPTX under `exports/*.pptx`; an outline or HTML mock is not enough.

GSI/OMX stage boundary for `ppt-master` Eight Confirmations:

- `$architecture-spec` owns the eight design decisions: canvas format, page count range, target audience/use case, style objective, color scheme, icon library, typography plan, and image usage policy.
- `$ralph-implement` consumes those decisions from the approved spec and writes `design_spec.md` / `spec_lock.md` accordingly.
- Do not stop in Stage 3 to ask the user for Eight Confirmations if they are already present in the approved architecture/spec.
- If they are missing or materially conflict with the source/goals, route back to `$architecture-spec` or classify the issue as a user authority gate; do not continue by inventing a new implementation-layer decision.

## Output Shape

Return an implementation record as a Markdown outline document. The body must use `-` bullets and nested bullets, with a clear progression from inputs, to route, to execution, to evidence, to backprop, to final artifact or blocker. Do not make it terse; write enough detail that a future run can resume from the record without relying on chat memory.

- Implementation record
  - Goal/spec inputs used
    - Link or quote the goal contract and architecture/spec consumed.
    - State any assumptions made while loading them.
  - Artifact type and agent route
    - State the route selected from the spec.
    - Name the agents or specialist skills used.
    - Explain why each OMC support agent was attached or skipped.
  - Adaptive backlog
    - List each item with status, owner, evidence, and next action.
    - Explain why the supervisor continued, stopped, deferred, or backpropagated after each item.
  - Runtime phase trace
    - Record each `gsi-dispatch`, `gsi-verify`, and `gsi-backprop` transition.
    - State the reason for every transition and the evidence that triggered it.
  - Child-agent supervision
    - Record child agent type, assigned item, reasoning effort, returned evidence, and supervisor verdict.
    - Record any model/provider override requested by the user or inherited from configuration.
  - Team supervision
    - Record `team_policy`.
    - Record any Team launch hint, actual Team run, skip reason, status evidence, and terminal task evidence.
    - Record how Codex supervisor integrated or rejected Team output.
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
