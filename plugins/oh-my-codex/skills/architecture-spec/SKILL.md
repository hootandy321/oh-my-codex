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

Produce an architecture/spec artifact containing:

- goal contract reference
- detected artifact type and routing decision
- perspective map: user, audience/consumer, implementer, reviewer, maintainer
- champion variant
- at least one materially different challenger variant
- falsifier: the cheapest test that could reject the champion
- selected approach and rationale
- implementation spec with acceptance checks
- verification plan
- backprop rules
- recommended next stage: `$ralph-implement`

## PPT Spec Requirements

For presentation tasks, the spec must include:

- source material path or source-readiness blocker
- audience and talk context
- deck narrative arc
- slide/page purpose list
- visual direction
- visible-text density target
- speaker notes strategy
- `ppt-master` project plan
- evidence required for editable PPTX completion

Do not generate the deck in this stage. Produce the spec that `$ralph-implement` will execute.
