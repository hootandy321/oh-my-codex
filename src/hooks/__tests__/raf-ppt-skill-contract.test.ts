import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const repoRoot = new URL('../../..', import.meta.url).pathname;

function readSurface(path: string): string {
  return readFileSync(join(repoRoot, path), 'utf8');
}

describe('RAF-PPT skill contract', () => {
  it('keeps RAF-PPT tied to the three-phase V-model and ppt-master implementation path', () => {
    const raf = readSurface('skills/raf/SKILL.md');
    const rafPpt = readSurface('skills/raf-ppt/SKILL.md');

    assert.match(raf, /Phase 1 goal contract/i);
    assert.match(raf, /Phase 2 perspective inversion/i);
    assert.match(raf, /Phase 3 rough-loop execution/i);
    assert.match(raf, /Backprop/i);
    assert.match(raf, /\$raf-ppt/i);

    assert.match(rafPpt, /Final PPT implementation MUST use `ppt-master`/);
    assert.match(rafPpt, /\/Users\/lxy\/lxygit\/wxyteam-pptmaster-skill\/skills\/ppt-master/);
    assert.match(rafPpt, /Eight Confirmations/);
    assert.match(rafPpt, /slides\/<source_stem>_PPT/);
    assert.match(rafPpt, /uv run "\$PPT_MASTER_SKILL_DIR\/scripts\/project_manager\.py"/);
    assert.match(rafPpt, /design_spec\.md/);
    assert.match(rafPpt, /spec_lock\.md/);
    assert.match(rafPpt, /exports\/\*\.pptx/);
    assert.match(rafPpt, /PptMasterInputError/);
    assert.match(rafPpt, /SlideImplementationBug/);
  });

  it('documents common RAF agents and PPT-specific adapter agents', () => {
    const raf = readSurface('skills/raf/SKILL.md');
    const rafPpt = readSurface('skills/raf-ppt/SKILL.md');

    for (const name of [
      'raf-goal-setter',
      'raf-perspective-splitter',
      'raf-variant-designer',
      'raf-rough-loop-runner',
      'raf-backprop-critic',
    ]) {
      assert.match(raf, new RegExp(name));
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
      assert.match(`${raf}\n${rafPpt}`, new RegExp(name));
    }
  });
});
