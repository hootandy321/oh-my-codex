---
name: raf-ppt
description: PPT-first RAF adapter that validates the three-phase V-model through ppt-master deck generation
---

# RAF-PPT

RAF-PPT is the PPT-first adapter for the RAF three-phase V-model. It uses the common RAF roles to preserve the user's thinking model, then hands the final deck implementation to `ppt-master`.

Final PPT implementation MUST use `ppt-master` from:

```bash
PPT_MASTER_SKILL_DIR=/Users/lxy/lxygit/wxyteam-pptmaster-skill/skills/ppt-master
```

The adapter's completion proof is not "a PPT outline". The proof is a `ppt-master` project with trackable source-of-truth files and an exported editable PPTX under `exports/*.pptx`.

## Hard Dependencies

- Read `/Users/lxy/lxygit/wxyteam-pptmaster-skill/skills/ppt-master/SKILL.md` before starting a real deck implementation.
- Preserve the user-provided Markdown as the canonical source.
- Create the PPT project beside that Markdown under `slides/<source_stem>_PPT`.
- Run executable scripts with `uv run`.
- Treat ppt-master Step 4 Eight Confirmations as the single blocking user confirmation point.
- After Eight Confirmations are confirmed, continue serially through design spec, notes, SVG, post-processing, and export.

## Agent Stack

Common RAF roles:

- `raf-goal-setter`
- `raf-perspective-splitter`
- `raf-variant-designer`
- `raf-rough-loop-runner`
- `raf-backprop-critic`

PPT adapter roles:

- `ppt-intent-classifier` - classify audience, deck type, source readiness, and PPT success rubric.
- `ppt-narrative-architect` - turn the goal contract into a deck narrative and argument arc.
- `ppt-page-planner` - map the narrative into slide-level page intents and acceptance checks.
- `ppt-visual-director` - define visual system, rhythm, image/icon strategy, and readability constraints.
- `ppt-speaker-notes-planner` - separate visible slide text from speaker notes and narrative detail.
- `ppt-reviewer` - review story, visual quality, audience fit, and rejection risks.
- `ppt-master-adapter` - convert RAF/PPT artifacts into a ppt-master project and collect export evidence.

## Phase Mapping

### Phase 1 goal contract

`raf-goal-setter` and `ppt-intent-classifier` produce:

- source Markdown path
- audience and presentation context
- deck purpose and desired decision/action
- page-count range
- style objective
- visible-text density target
- speaker-notes expectation
- completion rubric
- non-goals, including "do not create a PPT-like web page instead of a PPTX"
- required evidence for completion

If the user provides non-Markdown content, convert it to Markdown next to the original first. Do not start a `ppt-master` project from conversation-only content unless the user supplies or accepts a Markdown source file.

### Phase 2 perspective inversion

Use RAF viewpoints plus PPT-specific perspectives:

- audience comprehension
- presenter flow
- reviewer attack surface
- slide readability
- visual coherence
- ppt-master implementation feasibility
- future editability from source Markdown through SVG and PPTX

`ppt-narrative-architect`, `ppt-page-planner`, `ppt-visual-director`, and `ppt-speaker-notes-planner` create champion/challenger deck variants. Each variant must include:

- narrative arc
- slide count and page purpose list
- visual direction
- notes strategy
- rejection test

### Phase 3 rough-loop execution

The rough loop creates a real `ppt-master` project and exported PPTX.

Required initialization command:

```bash
uv run "$PPT_MASTER_SKILL_DIR/scripts/project_manager.py" init --format <format> --source <source_markdown.md>
```

Expected project path:

```text
<source_markdown_directory>/slides/<source_stem>_PPT/
```

Required trackable project files:

- `resources/source.md`
- `design_spec.md`
- `spec_lock.md`
- `notes/total.md`
- `notes/*.md`
- `svg_output/*.svg`
- `exports/*.pptx`

Implementation must follow the `ppt-master` serial pipeline:

1. source Markdown readiness
2. project initialization
3. template option check
4. Strategist phase and Eight Confirmations
5. conditional image acquisition
6. sequential SVG page generation
7. quality check and post-processing
8. PPTX export

Do not generate SVG pages in parallel subagents. The `ppt-master` skill requires current-main-agent, sequential page generation with `spec_lock.md` re-read before each page.

## Backprop Rules

`raf-backprop-critic` classifies PPT failures with stable error names:

| Error Name | Meaning | Backprop Target |
| --- | --- | --- |
| `PptMasterInputError` | Source file, Markdown readiness, path, or project init is invalid | Phase 1 goal/source contract |
| `DeckNarrativeMismatch` | Slide story does not satisfy the user's goal or audience | Phase 2 narrative/page variants |
| `SlideImplementationBug` | Generated SVG/PPTX violates the accepted design spec or slide intent | Phase 3 implementation |
| `VisualReadabilityFailure` | Text, layout, contrast, or density fails review | Phase 2 visual plan or Phase 3 page execution |
| `EditabilityFailure` | Output cannot be revised through source -> notes -> SVG -> PPTX chain | Phase 3 implementation contract |
| `MissingAuthority` | Eight Confirmations or another blocking choice lacks user authority | user decision gate |

Do not hide these failures under generic "needs polish" language. Route the failure back to the earliest phase that owns it.

## Completion Evidence

A RAF-PPT run can claim completion only when it reports:

- canonical source Markdown path
- project path under `slides/<source_stem>_PPT`
- confirmed Eight Confirmations or explicit blocking state
- `design_spec.md` and `spec_lock.md` existence
- generated `notes/total.md`
- generated `svg_output/*.svg`
- exported `exports/*.pptx`
- review result from `ppt-reviewer`
- backprop ledger with every failure classified

If `ppt-master` cannot run in the current environment, report the exact missing command, dependency, or authority and keep the RAF goal active rather than claiming completion.
