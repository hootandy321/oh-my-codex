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
    assert.match(ralphImplement, /\/Users\/lxy\/lxygit\/wxyteam-pptmaster-skill\/skills\/ppt-master/);
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
