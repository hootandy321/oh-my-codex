---
name: raf
description: Three-phase V-model workflow for goal-first, perspective-inverted, evidence-backed AI execution
---

# RAF Three-Phase V-Model

RAF turns a user's rough intent into an executable artifact through a V-shaped loop:

1. **Phase 1 goal contract** freezes the target, non-goals, audience, authority, rubric, and stop condition.
2. **Phase 2 perspective inversion** splits the target into reviewer/user/implementer viewpoints, then creates falsifiable champion/challenger variants.
3. **Phase 3 rough-loop execution** builds the smallest artifact that can be judged against the rubric, records evidence, and feeds failures back into the earlier phases.

The model is not a minimal implementation shortcut. It is a completion-oriented workflow that lets the AI act from the user's thinking model while still producing concrete evidence.

## Use When

- The user says the agent should work from their thinking, strategy, or mental model.
- The task is broad enough that normal direct execution risks optimizing for the wrong output.
- The requested completion proof is an artifact, not just a plan.
- A domain adapter exists, such as `$raf-ppt` for PPT generation.

## Do Not Use When

- The user asks for a small, already-scoped edit with obvious acceptance criteria.
- The user wants only a code review, investigation, or one-off command output.
- The next step is destructive, external-production, or credential-gated and no authority is present.

## Common Agent Roles

- `raf-goal-setter` - Phase 1 owner for objective, rubric, non-goals, authority, and stop condition.
- `raf-perspective-splitter` - Phase 2 owner for viewpoints, artifact dimensions, and evaluation angles.
- `raf-variant-designer` - Phase 2 owner for champion/challenger variants and falsification probes.
- `raf-rough-loop-runner` - Phase 3 owner for rough artifact execution, evidence capture, and iteration ledger.
- `raf-backprop-critic` - Backprop owner for deciding whether failures change execution, variants, viewpoints, or the goal contract.

Domain adapters may add specialist agents. The PPT-first adapter is `$raf-ppt`, which adds:

- `ppt-intent-classifier`
- `ppt-narrative-architect`
- `ppt-page-planner`
- `ppt-visual-director`
- `ppt-speaker-notes-planner`
- `ppt-reviewer`
- `ppt-master-adapter`

## Execution Contract

### Phase 1: Goal Contract

Produce a concise contract before implementation:

- user intent in the user's words
- desired artifact and artifact owner
- target audience and usage scenario
- completion rubric with testable checks
- non-goals and forbidden shortcuts
- authority boundary: what the agent can decide versus what needs user input
- stop condition and evidence required to claim completion

Ask only when a missing answer would materially change the artifact or create irreversible risk. Otherwise use repo/context evidence and state the assumption.

### Phase 2: Perspective Inversion

Derive viewpoints that will judge the artifact:

- user viewpoint: what the user is trying to get done
- audience viewpoint: what the recipient needs to understand or trust
- implementer viewpoint: what the toolchain can actually produce
- reviewer viewpoint: what would cause rejection
- maintenance viewpoint: how future agents can revise the output safely

Then create variants:

- champion: the favored path
- challenger: at least one materially different path
- falsifier: the strongest cheap test that could reject the champion

Do not keep variants as abstract prose. Tie each variant to a concrete artifact shape and verification method.

### Phase 3: Rough-Loop Execution

Build the smallest real artifact that can be judged:

- execute the champion path
- collect direct evidence
- run the falsifier
- record what passed, failed, and remained uncertain
- revise locally if failures are execution mistakes

The rough loop stops only when the artifact meets the Phase 1 rubric or `raf-backprop-critic` identifies a mismatch that must backpropagate.

### Backprop

For every failure, classify the cause:

| Failure Type | Backprop Target |
| --- | --- |
| implementation bug | Phase 3 execution fix |
| weak variant | Phase 2 variant redesign |
| missing viewpoint | Phase 2 perspective split |
| wrong rubric | Phase 1 goal contract |
| missing authority | user decision gate |

Backprop is mandatory. Do not silently patch over a failure that changes the goal, viewpoint, or acceptance rubric.

## Output Shape

Return:

- goal contract
- viewpoint map
- champion/challenger variants
- rough-loop evidence
- backprop decisions
- final artifact location or blocker

## PPT Adapter

Use `$raf-ppt` when the completion proof is a generated deck. `$raf-ppt` keeps the same RAF model but specializes Phase 3 so the rough artifact is an editable PPTX produced through `ppt-master`.
