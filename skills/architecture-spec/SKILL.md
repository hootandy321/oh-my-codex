---
name: architecture-spec
description: GSI Stage 2 architecture, perspectives, variants, and implementation spec for any artifact type
---

# Architecture Spec

`$architecture-spec` is GSI Stage 2. It consumes a goal contract and produces the artifact architecture, perspective map, variant choice, and implementation spec needed before persistent execution.

This skill is artifact-agnostic. It detects what kind of artifact the goal requires and routes to the appropriate agents internally.

## Use When

- A goal contract exists or can be inferred from the prompt.
- The user needs architecture, specification, variants, or plan hardening before implementation.
- The next implementation should be judged against a written spec rather than conversation memory.

## Agent Routing

Common GSI agents:

- `gsi-perspective-splitter`
- `gsi-variant-designer`
- `gsi-backprop-critic`

OMC architecture/spec agents:

- `architect` - system boundaries, interfaces, artifact architecture, and tradeoffs.
- `planner` - sequencing, milestones, execution shape, and handoff path.
- `critic` - adversarial review of the selected variant and falsifier.
- `test-engineer` - acceptance checks, test shape, and verification strategy.
- `dependency-expert` - external SDK/API/package feasibility when the spec depends on dependencies.
- `designer` - UX/UI or visual/product interaction architecture when the artifact has user-facing experience.
- `writer` - document/report information architecture and narrative clarity.
- `researcher` - current external evidence or official documentation when it materially affects the spec.
- `vision` - image, screenshot, slide, or visual-reference interpretation when visual inputs shape the artifact.

PPT/deck route, when detected:

- `ppt-narrative-architect`
- `ppt-page-planner`
- `ppt-visual-director`
- `ppt-speaker-notes-planner`
- `ppt-reviewer`
- `ppt-master-adapter`

Code/product route:

- use `architect`, `planner`, `test-engineer`, `dependency-expert`, `critic`, and relevant implementation specialists.

Document/report route:

- use `writer`, `critic`, `researcher`, and relevant domain specialists.

Agent-selection rule:

- Attach only agents whose output changes the spec or verification plan.
- Do not spawn every available agent by default.
- Record the selected agent route in the architecture/spec outline so `$ralph-implement` knows which specialist lanes matter.

## Required Output

Produce an architecture/spec artifact as a Markdown outline document. The body must use `-` bullets and nested bullets, with a clear progression from goal reference, to perspectives, to variants, to selected architecture, to implementation and verification requirements. Do not make it terse; write enough detail for `$ralph-implement` to execute without depending on chat memory.

- Architecture/spec
  - Goal contract reference
    - Link or quote the goal contract source.
    - Restate the parts that constrain this spec most strongly.
  - Detected artifact type and routing decision
    - State the selected artifact route and the agent stack it implies.
    - Explain why other plausible routes were not selected.
    - List which OMC support agents were attached and what each one contributed.
  - Perspective map
    - User perspective
      - Explain what the user is trying to accomplish and what would feel wrong to them.
    - Audience or consumer perspective
      - Explain what the final recipient needs to understand, trust, decide, or operate.
    - Implementer perspective
      - Explain what the toolchain can realistically produce and what constraints it creates.
    - Reviewer perspective
      - Explain what would cause rejection, rework, or loss of confidence.
    - Maintainer perspective
      - Explain how future agents or humans should revise the artifact safely.
  - Champion variant
    - Describe the preferred artifact shape.
    - Explain why it best satisfies the goal contract.
    - Name its assumptions and likely failure modes.
  - Challenger variant
    - Describe at least one materially different artifact shape.
    - Explain what it optimizes differently.
    - State the condition under which it would beat the champion.
  - Falsifier
    - Define the cheapest test, review, prototype, or inspection that could reject the champion.
    - State what evidence would trigger backprop rather than local implementation fixes.
  - Selected approach and rationale
    - Choose the implementation path.
    - Explain the tradeoff against the challenger.
  - Implementation spec with acceptance checks
    - Decompose the artifact into executable pieces.
    - Attach acceptance checks to each piece.
  - Implementation backlog
    - Convert champion and viable challenger ideas into an ordered backlog of implementable work items.
    - Mark each item as `must`, `should`, `could`, or `defer`.
    - For each item, record expected value, risk, dependencies, required agents, verification evidence, and stop/continue criteria.
    - Keep challenger ideas that are not selected for the first pass when they may become the next implementation item after the current one passes.
  - Verification plan
    - Name commands, inspections, review passes, or artifact checks.
    - State what evidence must be captured.
  - Supervision plan
    - State how Codex as the main supervisor will review child-agent work.
    - Define which checks can be delegated and which approval gates must remain with the main Codex supervisor.
    - Define when implementation should continue to the next backlog item, backprop to spec/goal, or stop for user authority.
    - Map the spec into GSI runtime phases: `gsi-dispatch`, `gsi-verify`, and `gsi-backprop`.
    - Identify which backlog items can be independent child-agent dispatches and which must stay sequential because of shared files, dependency ordering, or review risk.
  - Backprop rules
    - Define which failures return to `$goal-setting`.
    - Define which failures return to `$architecture-spec`.
    - Define which failures stay inside `$ralph-implement`.
  - Recommended next stage
    - Point to `$ralph-implement`.
    - Include the exact files or inline sections it should consume.

## PPT Spec Requirements

For presentation tasks, the spec must include:

- Presentation spec
  - Source material path or source-readiness blocker
  - Audience and talk context
  - Deck narrative arc
  - Slide/page purpose list
  - Visual direction
  - Visible-text density target
  - Speaker notes strategy
  - Confirmed `ppt-master` design decisions
    - Canvas format
    - Page count range
    - Target audience and use case
    - Style objective
    - Color scheme
    - Icon library choice
    - Typography plan
    - Image usage policy
  - `ppt-master` project plan
  - Evidence required for editable PPTX completion

`ppt-master` calls these design decisions the Eight Confirmations. Inside GSI/OMX, treat them as Stage 2 architecture/spec decisions, not as an ad hoc Stage 3 implementation prompt. If any of the eight decisions require user judgment, ask before handing off to `$ralph-implement`; otherwise record the recommended defaults as approved-by-spec assumptions.

Do not generate the deck in this stage. Produce the spec that `$ralph-implement` will execute.
