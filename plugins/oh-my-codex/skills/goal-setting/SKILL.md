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

Produce a goal contract as a Markdown outline document. The body must use `-` bullets and nested bullets, with each layer narrowing or operationalizing the layer above it. Do not make it terse; write enough detail for `$architecture-spec` to proceed without depending on chat memory.

- Goal contract
  - User intent in the user's words
    - Preserve the user's framing, important nouns, and concrete examples.
    - Explain what outcome the user is actually trying to achieve, not only the immediate artifact request.
  - Detected artifact type and confidence
    - State the detected type, such as presentation, code change, document, report, research artifact, or mixed artifact.
    - Record the evidence that led to the classification and any uncertainty that later stages must watch.
  - Desired artifact and owner
    - Name the artifact that should exist at completion.
    - State who will use, review, edit, present, or operate it.
  - Audience, operator, or consumer
    - Describe what this audience needs to understand, trust, decide, or do.
    - Capture differences between the user, final audience, reviewer, and maintainer when they are not the same person.
  - Usage scenario
    - Explain where and how the artifact will be used.
    - Include constraints from that scenario, such as time, format, editability, environment, or review pressure.
  - Completion rubric with testable checks
    - Define what must be true for the artifact to count as done.
    - Include evidence checks that later stages can actually run or inspect.
  - Non-goals and forbidden shortcuts
    - State what must not be optimized for.
    - Name shortcuts that would look productive but violate the user's intent.
  - Authority boundary
    - State what the agent can decide independently.
    - State what requires user confirmation because it changes goal, scope, risk, or irreversible output.
  - Stop condition and required evidence
    - Define the exact condition for stopping.
    - Name the artifact paths, logs, review records, or verification results expected at completion.
  - Recommended next stage
    - Point to `$architecture-spec`.
    - Include the information that stage must preserve.

## Decision Boundary

Ask only when a missing answer would materially change the artifact or create irreversible risk. Otherwise use repo/context evidence, state the assumption, and continue.

## PPT Detection

If the task mentions slides, presentation, PowerPoint, PPT, PPTX, deck, speaker notes, or `ppt-master`, classify it as a presentation task. Record source readiness, audience, deck purpose, style constraints, page-count expectations, speaker-note expectations, and the need for final editable PPTX evidence. Do not invoke a separate PPT skill.
