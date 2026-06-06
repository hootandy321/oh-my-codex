---
name: goal-setting
description: RAF Stage 1 goal contract for any artifact type before architecture/spec or implementation work
---

# Goal Setting

`$goal-setting` is RAF Stage 1. It turns the user's rough request into a goal contract that later agents can execute without losing the user's intent.

This skill is artifact-agnostic. Do not ask the user to pick PPT, code, document, report, or research mode up front. Detect the likely artifact type from the request and record that classification as routing context, not as a separate workflow branch.

## Use When

- The user is describing a desired outcome, product, document, deck, code change, or research artifact.
- The task is broad enough that implementation should not start until the target is frozen.
- Later work needs a durable contract for acceptance, non-goals, and authority.

## Agent Routing

Primary agent:

- `raf-goal-setter`

Optional artifact classifiers:

- PPT/deck tasks: `ppt-intent-classifier`
- Other artifact types: use the closest existing specialist or the generic planner/architect roles.

## Required Output

Produce a concise goal contract:

- user intent in the user's words
- detected artifact type and confidence
- desired artifact and artifact owner
- audience, operator, or consumer
- usage scenario
- completion rubric with testable checks
- non-goals and forbidden shortcuts
- authority boundary: what the agent can decide versus what needs user input
- stop condition and evidence required to claim completion
- recommended next stage: `$architecture-spec`

## Decision Boundary

Ask only when a missing answer would materially change the artifact or create irreversible risk. Otherwise use repo/context evidence, state the assumption, and continue.

## PPT Detection

If the task mentions slides, presentation, PowerPoint, PPT, PPTX, deck, speaker notes, or `ppt-master`, classify it as a presentation task. Record source readiness, audience, deck purpose, style constraints, page-count expectations, speaker-note expectations, and the need for final editable PPTX evidence. Do not invoke a separate PPT skill.
