# GSI/PPT ppt-master Dependency

GSI presentation routes use `ppt-master` to generate editable PPTX decks. The `ppt-master` implementation is kept as a separate repository instead of being vendored into this GitHub repository.

## Automatic Resolution

When `$ralph-implement` executes a PPT/deck task, it must resolve `ppt-master` with:

```bash
PPT_MASTER_SKILL_DIR="$(./skills/ralph-implement/scripts/ensure-ppt-master-skill.sh)"
```

The helper checks, in order:

1. `PPT_MASTER_SKILL_DIR` if already set.
2. `${CODEX_HOME:-~/.codex}/external/wxyteam-pptmaster-skill/skills/ppt-master`.
3. `${CODEX_HOME:-~/.codex}/skills/ppt-master`.

If no usable `SKILL.md` is found, the helper clones:

```text
http://bitbucket.ci-lab.net/scm/wxyteam/wxyteam-pptmaster-skill.git
```

into:

```text
${CODEX_HOME:-~/.codex}/external/wxyteam-pptmaster-skill
```

## Manual Setup

If automatic clone fails because of network, credentials, or repository access, clone the dependency manually:

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/external"
git clone http://bitbucket.ci-lab.net/scm/wxyteam/wxyteam-pptmaster-skill.git \
  "${CODEX_HOME:-$HOME/.codex}/external/wxyteam-pptmaster-skill"
```

Then verify:

```bash
test -f "${CODEX_HOME:-$HOME/.codex}/external/wxyteam-pptmaster-skill/skills/ppt-master/SKILL.md"
```

Alternatively, point OMX at an existing checkout:

```bash
export PPT_MASTER_SKILL_DIR=/path/to/wxyteam-pptmaster-skill/skills/ppt-master
```

## Failure Contract

If `ppt-master` cannot be resolved or cloned, GSI/PPT implementation must stop with a dependency blocker and show the Bitbucket URL above. It must not substitute a generic presentation generator, HTML mock, or outline-only result.
