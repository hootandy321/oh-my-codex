---
name: architecture-spec
description: RAF Stage 2 architecture, perspectives, variants, and implementation spec for any artifact type
---

# Architecture Spec

`$architecture-spec` is RAF Stage 2. It consumes a goal contract and produces the artifact architecture, perspective map, variant choice, and implementation spec needed before persistent execution.

This skill is artifact-agnostic. It detects what kind of artifact the goal requires and routes to the appropriate agents internally.

## Use When

- A goal contract exists or can be inferred from the prompt.
- The user needs architecture, specification, variants, or plan hardening before implementation.
- The next implementation should be judged against a written spec rather than conversation memory.

## Agent Routing

Common RAF agents:

- `raf-perspective-splitter`
- `raf-variant-designer`
- `raf-backprop-critic`

PPT/deck route, when detected:

- `ppt-narrative-architect`
- `ppt-page-planner`
- `ppt-visual-director`
- `ppt-speaker-notes-planner`
- `ppt-reviewer`
- `ppt-master-adapter`

Code/product route:

- use `architect`, `planner`, `test-engineer`, and relevant implementation specialists.

Document/report route:

- use `writer`, `quality-reviewer`, and relevant domain/research specialists.

## Required Output

Produce an architecture/spec artifact as a Markdown outline document. The body must use `-` bullets and nested bullets, with a clear progression from goal reference, to perspectives, to variants, to selected architecture, to implementation and verification requirements. Do not make it terse; write enough detail for `$ralph-implement` to execute without depending on chat memory.

- Architecture/spec
  - Goal contract reference
    - Link or quote the goal contract source.
    - Restate the parts that constrain this spec most strongly.
  - Detected artifact type and routing decision
    - State the selected artifact route and the agent stack it implies.
    - Explain why other plausible routes were not selected.
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
  - Verification plan
    - Name commands, inspections, review passes, or artifact checks.
    - State what evidence must be captured.
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
  - `ppt-master` project plan
  - Evidence required for editable PPTX completion

Do not generate the deck in this stage. Produce the spec that `$ralph-implement` will execute.
