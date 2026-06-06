#!/usr/bin/env bash
set -euo pipefail

repo_url="${PPT_MASTER_REPO_URL:-http://bitbucket.ci-lab.net/scm/wxyteam/wxyteam-pptmaster-skill.git}"
repo_dir="${PPT_MASTER_REPO_DIR:-${CODEX_HOME:-$HOME/.codex}/external/wxyteam-pptmaster-skill}"

candidate_skill_dirs=()

if [[ -n "${PPT_MASTER_SKILL_DIR:-}" ]]; then
  candidate_skill_dirs+=("$PPT_MASTER_SKILL_DIR")
fi

candidate_skill_dirs+=(
  "$repo_dir/skills/ppt-master"
  "${CODEX_HOME:-$HOME/.codex}/skills/ppt-master"
)

for skill_dir in "${candidate_skill_dirs[@]}"; do
  if [[ -f "$skill_dir/SKILL.md" ]]; then
    printf '%s\n' "$skill_dir"
    exit 0
  fi
done

if ! command -v git >/dev/null 2>&1; then
  printf 'ppt-master skill is missing and git is not available.\n' >&2
  printf 'Install git or clone manually: %s\n' "$repo_url" >&2
  exit 2
fi

if [[ -d "$repo_dir/.git" ]]; then
  printf 'Refreshing existing ppt-master checkout: %s\n' "$repo_dir" >&2
  if ! git -C "$repo_dir" pull --ff-only >&2; then
    printf 'Could not update ppt-master from %s\n' "$repo_url" >&2
    printf 'Please clone or update it manually, then set PPT_MASTER_SKILL_DIR.\n' >&2
    exit 2
  fi
else
  printf 'ppt-master skill not found; cloning from %s\n' "$repo_url" >&2
  mkdir -p "$(dirname "$repo_dir")"
  if ! git clone "$repo_url" "$repo_dir" >&2; then
    printf 'Could not clone ppt-master from %s\n' "$repo_url" >&2
    printf 'Please check network/access or clone it manually, then set PPT_MASTER_SKILL_DIR.\n' >&2
    exit 2
  fi
fi

skill_dir="$repo_dir/skills/ppt-master"
if [[ ! -f "$skill_dir/SKILL.md" ]]; then
  printf 'ppt-master checkout exists but %s/SKILL.md was not found.\n' "$skill_dir" >&2
  printf 'Expected repository: %s\n' "$repo_url" >&2
  exit 2
fi

printf '%s\n' "$skill_dir"
