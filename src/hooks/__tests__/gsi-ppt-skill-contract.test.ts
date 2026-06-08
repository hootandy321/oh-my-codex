import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const repoRoot = new URL('../../..', import.meta.url).pathname;

function readSurface(path: string): string {
  return readFileSync(join(repoRoot, path), 'utf8');
}

describe('GSI stage skill contract', () => {
  it('keeps the generic three-stage flow tied to artifact routing and ppt-master implementation', () => {
    const gsi = readSurface('skills/gsi/SKILL.md');
    const goalSetting = readSurface('skills/goal-setting/SKILL.md');
    const architectureSpec = readSurface('skills/architecture-spec/SKILL.md');
    const ralphImplement = readSurface('skills/ralph-implement/SKILL.md');

    assert.match(gsi, /\$goal-setting/i);
    assert.match(gsi, /\$architecture-spec/i);
    assert.match(gsi, /\$ralph-implement/i);
    assert.match(gsi, /Backprop/i);
    assert.match(gsi, /Artifact type is detected inside the stages/i);

    assert.match(goalSetting, /artifact-agnostic/i);
    assert.match(goalSetting, /PPT Detection/i);
    assert.match(architectureSpec, /PPT\/deck route/i);
    assert.match(architectureSpec, /Do not generate the deck in this stage/i);
    assert.match(ralphImplement, /PPT Implementation Rule/i);
    assert.match(ralphImplement, /ensure-ppt-master-skill\.sh/);
    assert.match(ralphImplement, /bitbucket\.ci-lab\.net\/scm\/wxyteam\/wxyteam-pptmaster-skill\.git/);
    assert.doesNotMatch(ralphImplement, /PPT_MASTER_SKILL_DIR=\/Users\//);
    assert.match(ralphImplement, /exports\/\*\.pptx/);
  });

  it('requires formal stage artifacts to be detailed Markdown outlines', () => {
    const gsi = readSurface('skills/gsi/SKILL.md');
    const goalSetting = readSurface('skills/goal-setting/SKILL.md');
    const architectureSpec = readSurface('skills/architecture-spec/SKILL.md');
    const ralphImplement = readSurface('skills/ralph-implement/SKILL.md');

    assert.match(gsi, /Markdown outline document/i);
    assert.match(gsi, /Use `-` bullets/i);
    assert.match(gsi, /Make each layer semantically narrower than its parent/i);
    assert.match(gsi, /Do not make the outline artificially short/i);

    for (const surface of [goalSetting, architectureSpec, ralphImplement]) {
      assert.match(surface, /Markdown outline document/i);
      assert.match(surface, /must use `-` bullets and nested bullets/i);
      assert.match(surface, /Do not make it terse/i);
      assert.match(surface, /without depending on chat memory|without relying on chat memory/i);
    }
  });

  it('reuses deep-interview mechanics for the goal-setting stage', () => {
    const gsi = readSurface('skills/gsi/SKILL.md');
    const goalSetting = readSurface('skills/goal-setting/SKILL.md');

    assert.match(gsi, /interview-backed/i);
    assert.match(gsi, /\$deep-interview/);
    assert.match(goalSetting, /Deep-Interview Reuse Contract/i);
    assert.match(goalSetting, /one-question-per-round rule/i);
    assert.match(goalSetting, /ambiguity scoring/i);
    assert.match(goalSetting, /weakest-dimension targeting/i);
    assert.match(goalSetting, /Non-goals must be explicit/i);
    assert.match(goalSetting, /Decision boundaries must be explicit/i);
    assert.match(goalSetting, /pressure pass/i);
  });

  it('documents OMC support-agent attachment across GSI stages', () => {
    const gsi = readSurface('skills/gsi/SKILL.md');
    const goalSetting = readSurface('skills/goal-setting/SKILL.md');
    const architectureSpec = readSurface('skills/architecture-spec/SKILL.md');
    const ralphImplement = readSurface('skills/ralph-implement/SKILL.md');

    assert.match(gsi, /OMC Agent Attachment Map/i);
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

  it('defines continuous implementation backlog and Codex supervision for GSI implementation', () => {
    const gsi = readSurface('skills/gsi/SKILL.md');
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
    assert.match(gsi, /Codex remains the main supervisor/i);
  });

  it('adapts the Team-style five-phase runtime model inside GSI implementation', () => {
    const gsi = readSurface('skills/gsi/SKILL.md');
    const architectureSpec = readSurface('skills/architecture-spec/SKILL.md');
    const ralphImplement = readSurface('skills/ralph-implement/SKILL.md');

    assert.match(gsi, /Two-Layer Model/i);
    assert.match(gsi, /Team-Mode Pattern To Reuse/i);
    assert.match(gsi, /Runtime Phase Mapping/i);
    assert.match(gsi, /GSI Runtime State Contract/i);
    for (const phase of ['gsi-goal', 'gsi-spec', 'gsi-dispatch', 'gsi-verify', 'gsi-backprop']) {
      assert.match(gsi, new RegExp(phase));
    }
    for (const field of ['goal_contract', 'architecture_spec', 'backlog', 'dispatches', 'verification', 'backprop_ledger', 'transition_log']) {
      assert.match(gsi, new RegExp(field));
    }

    assert.match(architectureSpec, /Map the spec into GSI runtime phases/i);
    assert.match(ralphImplement, /Team-Like Runtime Phases/i);
    assert.match(ralphImplement, /Require ACK\/readback/i);
    assert.match(ralphImplement, /Runtime phase trace/i);
    assert.match(ralphImplement, /not a requirement to launch tmux Team/i);
  });

  it('documents full-flow GSI auto mode and manual stage controls', () => {
    const gsi = readSurface('skills/gsi/SKILL.md');

    assert.match(gsi, /Manual And Automatic Operation/i);
    assert.match(gsi, /Manual stage operation/i);
    assert.match(gsi, /Automatic full-flow operation/i);
    assert.match(gsi, /\$gsi --team=auto/);
    assert.match(gsi, /\$gsi --team=manual/);
    assert.match(gsi, /\$gsi --team=off/);
    assert.match(gsi, /Autopilot-Style Hook Mode/i);
    assert.match(gsi, /mode: "gsi"/);
    assert.match(gsi, /child stages are supervised phases/i);
    assert.match(gsi, /auto_mode/);
    assert.match(gsi, /team_policy/);
    assert.match(gsi, /handoff_artifacts/);
    assert.match(gsi, /return_to_phase_reason/);
  });

  it('documents Team auto/manual/off policy under GSI supervision', () => {
    const gsi = readSurface('skills/gsi/SKILL.md');
    const ralphImplement = readSurface('skills/ralph-implement/SKILL.md');

    assert.match(gsi, /Team Invocation Policy/i);
    assert.match(gsi, /team_policy: "auto"/);
    assert.match(gsi, /team_policy: "manual"/);
    assert.match(gsi, /team_policy: "off"/);
    assert.match(gsi, /Team workers do not own GSI goal\/spec\/backlog state/i);

    assert.match(ralphImplement, /Team Use Inside Implementation/i);
    assert.match(ralphImplement, /Auto Team launch/i);
    assert.match(ralphImplement, /Manual Team launch/i);
    assert.match(ralphImplement, /Team off/i);
    assert.match(ralphImplement, /Team supervision/i);
    assert.match(ralphImplement, /Codex supervisor owns GSI backlog/i);
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
    const gsiPpt = readSurface('skills/gsi-ppt/SKILL.md');

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

    assert.match(gsiPpt, /Eight Confirmations belong to `\$architecture-spec`/i);
    assert.match(gsiPpt, /consume them instead of re-asking during implementation/i);
  });

  it('ships a helper for resolving or cloning the external ppt-master dependency', () => {
    const helperPath = join(repoRoot, 'skills/ralph-implement/scripts/ensure-ppt-master-skill.sh');
    assert.ok(existsSync(helperPath), 'expected ppt-master dependency helper script');
    assert.ok((statSync(helperPath).mode & 0o111) !== 0, 'expected helper script to be executable');

    const helper = readFileSync(helperPath, 'utf8');
    assert.match(helper, /bitbucket\.ci-lab\.net\/scm\/wxyteam\/wxyteam-pptmaster-skill\.git/);
    assert.match(helper, /PPT_MASTER_SKILL_DIR/);
    assert.match(helper, /git clone/);
    assert.match(helper, /exit 2/);
  });

  it('documents common GSI agents and presentation-route adapter agents', () => {
    const gsi = readSurface('skills/gsi/SKILL.md');
    const goalSetting = readSurface('skills/goal-setting/SKILL.md');
    const architectureSpec = readSurface('skills/architecture-spec/SKILL.md');
    const ralphImplement = readSurface('skills/ralph-implement/SKILL.md');
    const combined = `${gsi}\n${goalSetting}\n${architectureSpec}\n${ralphImplement}`;

    for (const name of [
      'gsi-goal-setter',
      'gsi-perspective-splitter',
      'gsi-variant-designer',
      'gsi-rough-loop-runner',
      'gsi-backprop-critic',
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
