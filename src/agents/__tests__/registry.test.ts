import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getRegisteredAgent, getRegisteredAgentNames } from "../registry.js";

describe("agents/registry", () => {
  it("does not load dynamic agents from project Markdown prompt paths", async () => {
    const root = await mkdtemp(join(tmpdir(), "omx-agent-registry-md-"));
    const codexHome = join(root, "codex-home");
    try {
      await mkdir(join(root, ".codex", "prompts"), { recursive: true });
      await mkdir(codexHome, { recursive: true });
      await writeFile(join(root, ".codex", "prompts", "repo-specialist.md"), [
        "---",
        "description: Repo-specific specialist",
        "reasoning_effort: high",
        "posture: frontier-orchestrator",
        "model_class: frontier",
        "routing_role: leader",
        "tools: read-only",
        "category: domain",
        "---",
        "",
        "Inspect this repository's custom contracts.",
      ].join("\n"));

      const agent = getRegisteredAgent("repo-specialist", {
        projectRoot: root,
        codexHomeOverride: codexHome,
      });

      assert.equal(agent, undefined);
      assert.equal(getRegisteredAgentNames({
        projectRoot: root,
        codexHomeOverride: codexHome,
      }).includes("repo-specialist"), false);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("lets project native TOML agents override user agents", async () => {
    const root = await mkdtemp(join(tmpdir(), "omx-agent-registry-toml-"));
    const codexHome = join(root, "codex-home");
    try {
      await mkdir(join(codexHome, "agents"), { recursive: true });
      await mkdir(join(root, ".omx", "agents"), { recursive: true });
      await writeFile(join(codexHome, "agents", "custom-agent.toml"), [
        'name = "custom-agent"',
        'description = "User custom agent"',
        'model_class = "standard"',
        'model_reasoning_effort = "medium"',
        'tools = "analysis"',
      ].join("\n"));
      await writeFile(join(root, ".omx", "agents", "custom-agent.toml"), [
        'name = "custom-agent"',
        'description = "Project custom agent"',
        'model = "gpt-custom"',
        'model_class = "fast"',
        'model_reasoning_effort = "low"',
        'tools = "execution"',
        'developer_instructions = """Project agent instructions."""',
      ].join("\n"));

      const agent = getRegisteredAgent("custom-agent", {
        projectRoot: root,
        codexHomeOverride: codexHome,
      });

      assert.equal(agent?.description, "Project custom agent");
      assert.equal(agent?.model, "gpt-custom");
      assert.equal(agent?.modelClass, "fast");
      assert.equal(agent?.reasoningEffort, "low");
      assert.equal(agent?.tools, "execution");
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("loads GSI/PPT project roles from dynamic project agents", async () => {
    const codexHome = await mkdtemp(join(tmpdir(), "omx-agent-registry-empty-home-"));
    try {
      const registryNames = getRegisteredAgentNames({
        projectRoot: process.cwd(),
        codexHomeOverride: codexHome,
        includeBuiltIn: false,
      });

      for (const name of [
        "gsi-goal-setter",
        "gsi-perspective-splitter",
        "gsi-variant-designer",
        "gsi-rough-loop-runner",
        "gsi-backprop-critic",
        "ppt-intent-classifier",
        "ppt-narrative-architect",
        "ppt-page-planner",
        "ppt-visual-director",
        "ppt-speaker-notes-planner",
        "ppt-reviewer",
        "ppt-master-adapter",
      ]) {
        assert.ok(registryNames.includes(name), `expected dynamic project agent: ${name}`);
      }

      const gsiGoalSetter = getRegisteredAgent("gsi-goal-setter", {
        projectRoot: process.cwd(),
        codexHomeOverride: codexHome,
        includeBuiltIn: false,
      });
      assert.equal(gsiGoalSetter?.category, "coordination");
      assert.equal(gsiGoalSetter?.modelClass, "frontier");
      assert.equal(gsiGoalSetter?.routingRole, "leader");

      const pptAdapter = getRegisteredAgent("ppt-master-adapter", {
        projectRoot: process.cwd(),
        codexHomeOverride: codexHome,
        includeBuiltIn: false,
      });
      assert.equal(pptAdapter?.category, "domain");
      assert.equal(pptAdapter?.tools, "execution");
      assert.equal(pptAdapter?.routingRole, "executor");
    } finally {
      await rm(codexHome, { recursive: true, force: true });
    }
  });
});
