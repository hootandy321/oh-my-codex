---
name: goal-setting
description: RAF Stage 1 goal contract for any artifact type before architecture/spec or implementation work
---

# Goal Setting

`$goal-setting` is RAF Stage 1. It turns the user's rough request into a goal contract that later agents can execute without losing the user's intent.

This skill is artifact-agnostic. Do not ask the user to pick PPT, code, document, report, or research mode up front. Detect the likely artifact type from the request and record that classification as routing context, not as a separate workflow branch.

Goal-setting is the most important RAF stage. It must reuse the `$deep-interview` clarification model rather than acting as a one-shot summarizer.

## Use When

- The user is describing a desired outcome, product, document, deck, code change, or research artifact.
- The task is broad enough that implementation should not start until the target is frozen.
- Later work needs a durable contract for acceptance, non-goals, and authority.

## Agent Routing

Primary agents:

- `raf-goal-setter`
- `analyst`

Deep-interview intake support:

- Use the `$deep-interview` mechanism for multi-round clarification whenever the goal is not already execution-ready.
- Reuse its preflight context intake, one-question-per-round rule, ambiguity scoring, weakest-dimension targeting, readiness gates, pressure pass, and crystallized artifact handoff.
- Do not replace this with a single "requirements summary" pass. The demand phase must keep asking until the goal is clear enough or the user explicitly accepts residual risk.

OMC support agents:

- `explore` - gather discoverable repo facts before asking the user.
- `researcher` - gather external or official context when current best practice affects the goal.
- `critic` - pressure-test assumptions, non-goals, and decision boundaries before freezing the contract.
- `scholastic` - optional concept-heavy advisory lane when the goal depends on theory, methodology, or research framing.

Artifact classifiers:

- PPT/deck tasks: `ppt-intent-classifier`
- UX/product tasks: `designer`
- Code/product tasks: `architect` only as a boundary advisor, not as the implementation planner.
- Document/report tasks: `writer`
- Other artifact types: use the closest existing specialist, but keep `raf-goal-setter` and `analyst` as the owners.

## Deep-Interview Reuse Contract

Run goal-setting as an interview-backed clarification loop unless the prompt already contains explicit intent, outcome, scope, constraints, success criteria, non-goals, and decision boundaries.

- Preflight context intake
  - Inspect discoverable repo/project facts before asking the user.
  - Record what was learned from code/docs as evidence, not as a user decision.
  - Ask the user only for judgment, preference, boundary, or authority decisions that cannot be discovered.
- Interview loop
  - Ask exactly one focused question per round.
  - Target the weakest clarity dimension.
  - Prioritize intent, outcome, scope, non-goals, and decision boundaries before implementation details.
  - Re-score ambiguity after each user answer.
  - Show ambiguity progress in the working interaction when the runtime supports it.
- Readiness gates
  - Non-goals must be explicit.
  - Decision boundaries must be explicit.
  - At least one pressure pass must revisit an earlier answer with an assumption, evidence, or tradeoff challenge.
  - Do not freeze the goal while ambiguity is above the selected threshold unless the user explicitly accepts residual risk.
- Depth profiles
  - Quick: use when the user asks for a fast pass or the task is already mostly clear.
  - Standard: default for normal RAF goal-setting.
  - Deep: use when the artifact is high-stakes, cross-functional, concept-heavy, or repeatedly misunderstood.
- Crystallization
  - Write the final goal contract as the stage artifact.
  - Preserve final ambiguity, unresolved risks, accepted assumptions, non-goals, and decision boundaries in the outline document.
  - Hand off to `$architecture-spec`; do not implement directly from goal-setting.

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
  - Interview evidence
    - Record the final ambiguity score or qualitative ambiguity state.
    - Summarize the decisive interview rounds that changed the goal.
    - Record pressure-pass findings and assumptions that were accepted or rejected.
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
