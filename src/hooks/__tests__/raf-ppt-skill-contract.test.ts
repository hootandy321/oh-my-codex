import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const repoRoot = new URL('../../..', import.meta.url).pathname;

function readSurface(path: string): string {
  return readFileSync(join(repoRoot, path), 'utf8');
}

describe('RAF stage skill contract', () => {
  it('keeps the generic three-stage flow tied to artifact routing and ppt-master implementation', () => {
    const raf = readSurface('skills/raf/SKILL.md');
    const goalSetting = readSurface('skills/goal-setting/SKILL.md');
    const architectureSpec = readSurface('skills/architecture-spec/SKILL.md');
    const ralphImplement = readSurface('skills/ralph-implement/SKILL.md');

    assert.match(raf, /\$goal-setting/i);
    assert.match(raf, /\$architecture-spec/i);
    assert.match(raf, /\$ralph-implement/i);
    assert.match(raf, /Backprop/i);
    assert.match(raf, /Artifact type is detected inside the stages/i);

    assert.match(goalSetting, /artifact-agnostic/i);
    assert.match(goalSetting, /PPT Detection/i);
    assert.match(architectureSpec, /PPT\/deck route/i);
    assert.match(architectureSpec, /Do not generate the deck in this stage/i);
    assert.match(ralphImplement, /PPT Implementation Rule/i);
    assert.match(ralphImplement, /bundled OMX `ppt-master` skill/i);
    assert.match(ralphImplement, /<current-omx-root>\/skills\/ppt-master/);
    assert.doesNotMatch(ralphImplement, /PPT_MASTER_SKILL_DIR=\/Users\//);
    assert.match(ralphImplement, /exports\/\*\.pptx/);
  });

  it('requires formal stage artifacts to be detailed Markdown outlines', () => {
    const raf = readSurface('skills/raf/SKILL.md');
    const goalSetting = readSurface('skills/goal-setting/SKILL.md');
    const architectureSpec = readSurface('skills/architecture-spec/SKILL.md');
    const ralphImplement = readSurface('skills/ralph-implement/SKILL.md');

    assert.match(raf, /Markdown outline document/i);
    assert.match(raf, /Use `-` bullets/i);
    assert.match(raf, /Make each layer semantically narrower than its parent/i);
    assert.match(raf, /Do not make the outline artificially short/i);

    for (const surface of [goalSetting, architectureSpec, ralphImplement]) {
      assert.match(surface, /Markdown outline document/i);
      assert.match(surface, /must use `-` bullets and nested bullets/i);
      assert.match(surface, /Do not make it terse/i);
      assert.match(surface, /without depending on chat memory|without relying on chat memory/i);
    }
  });

  it('reuses deep-interview mechanics for the goal-setting stage', () => {
    const raf = readSurface('skills/raf/SKILL.md');
    const goalSetting = readSurface('skills/goal-setting/SKILL.md');

    assert.match(raf, /interview-backed/i);
    assert.match(raf, /\$deep-interview/);
    assert.match(goalSetting, /Deep-Interview Reuse Contract/i);
    assert.match(goalSetting, /one-question-per-round rule/i);
    assert.match(goalSetting, /ambiguity scoring/i);
    assert.match(goalSetting, /weakest-dimension targeting/i);
    assert.match(goalSetting, /Non-goals must be explicit/i);
    assert.match(goalSetting, /Decision boundaries must be explicit/i);
    assert.match(goalSetting, /pressure pass/i);
  });

  it('documents OMC support-agent attachment across RAF stages', () => {
    const raf = readSurface('skills/raf/SKILL.md');
    const goalSetting = readSurface('skills/goal-setting/SKILL.md');
    const architectureSpec = readSurface('skills/architecture-spec/SKILL.md');
    const ralphImplement = readSurface('skills/ralph-implement/SKILL.md');

    assert.match(raf, /OMC Agent Attachment Map/i);
    for (const name of ['analyst', 'explore', 'researcher', 'critic', 'scholastic']) {
      assert.match(goalSetting, new RegExp(name));
    }

    for (const name of [
      'architect',
      'planner',
      'test-engineer',
      'dependency-expert',
      'designer',
      'writer',
      'vision',
    ]) {
      assert.match(architectureSpec, new RegExp(name));
    }

    for (const name of [
      'executor',
      'debugger',
      'verifier',
      'code-reviewer',
      'code-simplifier',
      'git-master',
      'team-executor',
    ]) {
      assert.match(ralphImplement, new RegExp(name));
    }
  });

  it('defines continuous implementation backlog and Codex supervision for RAF implementation', () => {
    const raf = readSurface('skills/raf/SKILL.md');
    const architectureSpec = readSurface('skills/architecture-spec/SKILL.md');
    const ralphImplement = readSurface('skills/ralph-implement/SKILL.md');

    assert.match(architectureSpec, /Implementation backlog/i);
    assert.match(architectureSpec, /Supervision plan/i);
    assert.match(ralphImplement, /Continuous Implementation Backlog/i);
    assert.match(ralphImplement, /pending/);
    assert.match(ralphImplement, /active/);
    assert.match(ralphImplement, /verifying/);
    assert.match(ralphImplement, /reviewing/);
    assert.match(ralphImplement, /backprop/);
    assert.match(ralphImplement, /Continue to the next backlog item/i);
    assert.match(ralphImplement, /Codex is the main supervisor/i);
    assert.match(raf, /Codex remains the main supervisor/i);
  });

  it('adapts the Team-style five-phase runtime model inside RAF implementation', () => {
    const raf = readSurface('skills/raf/SKILL.md');
    const architectureSpec = readSurface('skills/architecture-spec/SKILL.md');
    const ralphImplement = readSurface('skills/ralph-implement/SKILL.md');

    assert.match(raf, /Two-Layer Model/i);
    assert.match(raf, /Team-Mode Pattern To Reuse/i);
    assert.match(raf, /Runtime Phase Mapping/i);
    assert.match(raf, /RAF Runtime State Contract/i);
    for (const phase of ['raf-goal', 'raf-spec', 'raf-dispatch', 'raf-verify', 'raf-backprop']) {
      assert.match(raf, new RegExp(phase));
    }
    for (const field of ['goal_contract', 'architecture_spec', 'backlog', 'dispatches', 'verification', 'backprop_ledger', 'transition_log']) {
      assert.match(raf, new RegExp(field));
    }

    assert.match(architectureSpec, /Map the spec into RAF runtime phases/i);
    assert.match(ralphImplement, /Team-Like Runtime Phases/i);
    assert.match(ralphImplement, /Require ACK\/readback/i);
    assert.match(ralphImplement, /Runtime phase trace/i);
    assert.match(ralphImplement, /not a requirement to launch tmux Team/i);
  });

  it('documents full-flow RAF auto mode and manual stage controls', () => {
    const raf = readSurface('skills/raf/SKILL.md');

    assert.match(raf, /Manual And Automatic Operation/i);
    assert.match(raf, /Manual stage operation/i);
    assert.match(raf, /Automatic full-flow operation/i);
    assert.match(raf, /\$raf --team=auto/);
    assert.match(raf, /\$raf --team=manual/);
    assert.match(raf, /\$raf --team=off/);
    assert.match(raf, /Autopilot-Style Hook Mode/i);
    assert.match(raf, /mode: "raf"/);
    assert.match(raf, /child stages are supervised phases/i);
    assert.match(raf, /auto_mode/);
    assert.match(raf, /team_policy/);
    assert.match(raf, /handoff_artifacts/);
    assert.match(raf, /return_to_phase_reason/);
  });

  it('documents Team auto/manual/off policy under RAF supervision', () => {
    const raf = readSurface('skills/raf/SKILL.md');
    const ralphImplement = readSurface('skills/ralph-implement/SKILL.md');

    assert.match(raf, /Team Invocation Policy/i);
    assert.match(raf, /team_policy: "auto"/);
    assert.match(raf, /team_policy: "manual"/);
    assert.match(raf, /team_policy: "off"/);
    assert.match(raf, /Team workers do not own RAF goal\/spec\/backlog state/i);

    assert.match(ralphImplement, /Team Use Inside Implementation/i);
    assert.match(ralphImplement, /Auto Team launch/i);
    assert.match(ralphImplement, /Manual Team launch/i);
    assert.match(ralphImplement, /Team off/i);
    assert.match(ralphImplement, /Team supervision/i);
    assert.match(ralphImplement, /Codex supervisor owns RAF backlog/i);
  });

  it('documents child-agent configuration and task-type governance for implementation', () => {
    const ralphImplement = readSurface('skills/ralph-implement/SKILL.md');

    assert.match(ralphImplement, /Child-Agent And Model Configuration/i);
    assert.match(ralphImplement, /agent_type: "executor"/);
    assert.match(ralphImplement, /agent_type: "debugger"/);
    assert.match(ralphImplement, /agent_type: "verifier"/);
    assert.match(ralphImplement, /reasoning_effort/i);
    assert.match(ralphImplement, /do not hardcode stale model names/i);
    assert.match(ralphImplement, /Governance By Task Type/i);
    assert.match(ralphImplement, /Code implementation/i);
    assert.match(ralphImplement, /PPT\/deck implementation/i);
    assert.match(ralphImplement, /Document\/report implementation/i);
    assert.match(ralphImplement, /Research implementation/i);
    assert.match(ralphImplement, /Child-agent supervision/i);
  });

  it('keeps ppt-master Eight Confirmations in architecture/spec rather than implementation prompts', () => {
    const architectureSpec = readSurface('skills/architecture-spec/SKILL.md');
    const ralphImplement = readSurface('skills/ralph-implement/SKILL.md');
    const rafPpt = readSurface('skills/raf-ppt/SKILL.md');

    for (const decision of [
      'Canvas format',
      'Page count range',
      'Target audience and use case',
      'Style objective',
      'Color scheme',
      'Icon library choice',
      'Typography plan',
      'Image usage policy',
    ]) {
      assert.match(architectureSpec, new RegExp(decision));
    }

    assert.match(architectureSpec, /Eight Confirmations/i);
    assert.match(architectureSpec, /Stage 2 architecture\/spec decisions/i);
    assert.match(architectureSpec, /before handing off to `\$ralph-implement`/i);

    assert.match(ralphImplement, /stage boundary for `ppt-master` Eight Confirmations/i);
    assert.match(ralphImplement, /\$architecture-spec` owns the eight design decisions/i);
    assert.match(ralphImplement, /Do not stop in Stage 3 to ask the user for Eight Confirmations/i);
    assert.match(ralphImplement, /route back to `\$architecture-spec`/i);

    assert.match(rafPpt, /Eight Confirmations belong to `\$architecture-spec`/i);
    assert.match(rafPpt, /consume them instead of re-asking during implementation/i);
  });

  it('documents common RAF agents and presentation-route adapter agents', () => {
    const raf = readSurface('skills/raf/SKILL.md');
    const goalSetting = readSurface('skills/goal-setting/SKILL.md');
    const architectureSpec = readSurface('skills/architecture-spec/SKILL.md');
    const ralphImplement = readSurface('skills/ralph-implement/SKILL.md');
    const combined = `${raf}\n${goalSetting}\n${architectureSpec}\n${ralphImplement}`;

    for (const name of [
      'raf-goal-setter',
      'raf-perspective-splitter',
      'raf-variant-designer',
      'raf-rough-loop-runner',
      'raf-backprop-critic',
    ]) {
      assert.match(combined, new RegExp(name));
    }

    for (const name of [
      'ppt-intent-classifier',
      'ppt-narrative-architect',
      'ppt-page-planner',
      'ppt-visual-director',
      'ppt-speaker-notes-planner',
      'ppt-reviewer',
      'ppt-master-adapter',
    ]) {
      assert.match(combined, new RegExp(name));
    }
  });
});
