import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import TOML from "@iarna/toml";
import { AGENT_DEFINITIONS, type AgentDefinition } from "./definitions.js";
import { codexHome, codexAgentsDir, projectCodexAgentsDir } from "../utils/paths.js";

export const SAFE_AGENT_NAME_PATTERN = /^[a-z][a-z0-9-]*$/;

type AgentSource = "built-in" | "user" | "project";

interface AgentRegistryOptions {
  projectRoot?: string;
  codexHomeOverride?: string;
  includeBuiltIn?: boolean;
}

interface ParsedAgentFile {
  definition: AgentDefinition;
  developerInstructions?: string;
}

const VALID_REASONING = new Set<AgentDefinition["reasoningEffort"]>([
  "low",
  "medium",
  "high",
  "xhigh",
]);
const VALID_POSTURES = new Set<AgentDefinition["posture"]>([
  "frontier-orchestrator",
  "deep-worker",
  "fast-lane",
]);
const VALID_MODEL_CLASSES = new Set<AgentDefinition["modelClass"]>([
  "frontier",
  "standard",
  "fast",
]);
const VALID_ROUTING_ROLES = new Set<AgentDefinition["routingRole"]>([
  "leader",
  "specialist",
  "executor",
]);
const VALID_TOOLS = new Set<AgentDefinition["tools"]>([
  "read-only",
  "analysis",
  "execution",
  "data",
]);
const VALID_CATEGORIES = new Set<AgentDefinition["category"]>([
  "build",
  "review",
  "domain",
  "product",
  "coordination",
]);

function normalizeAgentName(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const name = value.trim().toLowerCase();
  return SAFE_AGENT_NAME_PATTERN.test(name) ? name : null;
}

function asNonEmptyString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function asEnum<T extends string>(value: unknown, allowed: Set<T>): T | undefined {
  const normalized = asNonEmptyString(value)?.toLowerCase();
  return normalized && allowed.has(normalized as T) ? normalized as T : undefined;
}

function defaultDynamicAgent(name: string): AgentDefinition {
  return {
    name,
    description: `Custom agent role: ${name}`,
    reasoningEffort: "medium",
    posture: "deep-worker",
    modelClass: "standard",
    routingRole: "specialist",
    tools: "analysis",
    category: "domain",
  };
}

function parseFlatFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return {};

  const parsed: Record<string, string> = {};
  for (const rawLine of match[1].split(/\r?\n/)) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || /^\s/.test(rawLine)) continue;
    const kv = line.match(/^([A-Za-z0-9_-]+):(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    const rawValue = kv[2].trim();
    if (!rawValue) continue;
    const quote = rawValue[0];
    const value = (quote === '"' || quote === "'") && rawValue.at(-1) === quote
      ? rawValue.slice(1, -1).trim()
      : rawValue.replace(/\s+#.*$/, "").trim();
    if (value) parsed[key] = value;
  }
  return parsed;
}

function readMetadata(
  source: Record<string, unknown>,
  fallbackName: string,
  baseDefinition?: AgentDefinition,
): AgentDefinition {
  const name = normalizeAgentName(source.name) ?? fallbackName;
  const base = baseDefinition && baseDefinition.name === name
    ? baseDefinition
    : defaultDynamicAgent(name);
  const model = asNonEmptyString(source.model);
  const modelProvider = asNonEmptyString(source.model_provider) ?? asNonEmptyString(source.modelProvider);
  const nativeSubagentDelegation = asNonEmptyString(source.native_subagent_delegation)
    ?? asNonEmptyString(source.nativeSubagentDelegation);

  return {
    ...base,
    description: asNonEmptyString(source.description) ?? base.description,
    reasoningEffort:
      asEnum(source.reasoning_effort, VALID_REASONING)
      ?? asEnum(source.reasoningEffort, VALID_REASONING)
      ?? asEnum(source.model_reasoning_effort, VALID_REASONING)
      ?? base.reasoningEffort,
    exactModel: model !== undefined
      ? (model === "gpt-5.4-mini" ? "gpt-5.4-mini" : undefined)
      : base.exactModel,
    model: model ?? base.model,
    modelProvider: modelProvider ?? base.modelProvider,
    posture: asEnum(source.posture, VALID_POSTURES) ?? base.posture,
    modelClass:
      asEnum(source.model_class, VALID_MODEL_CLASSES)
      ?? asEnum(source.modelClass, VALID_MODEL_CLASSES)
      ?? base.modelClass,
    routingRole:
      asEnum(source.routing_role, VALID_ROUTING_ROLES)
      ?? asEnum(source.routingRole, VALID_ROUTING_ROLES)
      ?? base.routingRole,
    tools: asEnum(source.tools, VALID_TOOLS) ?? base.tools,
    nativeSubagentDelegation: nativeSubagentDelegation === "allowed"
      ? "allowed"
      : base.nativeSubagentDelegation,
    category: asEnum(source.category, VALID_CATEGORIES) ?? base.category,
  };
}

export function parseAgentMarkdownDefinition(
  content: string,
  fallbackName: string,
  baseDefinition?: AgentDefinition,
): AgentDefinition | null {
  const name = normalizeAgentName(fallbackName);
  if (!name) return null;
  return readMetadata(parseFlatFrontmatter(content), name, baseDefinition);
}

export function parseAgentTomlDefinition(
  content: string,
  fallbackName: string,
  baseDefinition?: AgentDefinition,
): ParsedAgentFile | null {
  const name = normalizeAgentName(fallbackName);
  if (!name) return null;
  let parsed: Record<string, unknown>;
  try {
    parsed = TOML.parse(content) as Record<string, unknown>;
  } catch {
    return null;
  }
  return {
    definition: readMetadata(parsed, name, baseDefinition),
    developerInstructions: asNonEmptyString(parsed.developer_instructions),
  };
}

function mergeAgent(
  registry: Record<string, AgentDefinition>,
  next: AgentDefinition,
): void {
  const previous = registry[next.name];
  registry[next.name] = previous ? { ...previous, ...next, name: next.name } : next;
}

function readTomlAgentsFromDir(
  registry: Record<string, AgentDefinition>,
  agentsDir: string,
): void {
  if (!existsSync(agentsDir)) return;
  for (const entry of readdirSync(agentsDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".toml")) continue;
    const name = entry.name.slice(0, -5);
    if (!normalizeAgentName(name)) continue;
    try {
      const content = readFileSync(join(agentsDir, entry.name), "utf-8");
      if (registry[name] && isGeneratedOmxNativeAgentToml(content, name)) {
        continue;
      }
      const parsed = parseAgentTomlDefinition(content, name, registry[name]);
      if (parsed) mergeAgent(registry, parsed.definition);
    } catch {
      continue;
    }
  }
}

function isGeneratedOmxNativeAgentToml(content: string, agentName: string): boolean {
  const firstLine = content.split(/\r?\n/, 1)[0]?.trim();
  return firstLine === `# oh-my-codex agent: ${agentName}`;
}

function loadScope(
  registry: Record<string, AgentDefinition>,
  _source: AgentSource,
  agentsDir: string,
): void {
  void _source;
  readTomlAgentsFromDir(registry, agentsDir);
}

export function loadAgentRegistry(
  options: AgentRegistryOptions = {},
): Record<string, AgentDefinition> {
  const registry: Record<string, AgentDefinition> = options.includeBuiltIn === false
    ? {}
    : { ...AGENT_DEFINITIONS };
  const codexHomeDir = options.codexHomeOverride ?? codexHome();
  loadScope(registry, "user", codexAgentsDir(codexHomeDir));

  const projectRoot = options.projectRoot ?? process.cwd();
  loadScope(
    registry,
    "project",
    projectCodexAgentsDir(projectRoot),
  );
  return registry;
}

export function getRegisteredAgent(
  name: string,
  options: AgentRegistryOptions = {},
): AgentDefinition | undefined {
  const normalized = normalizeAgentName(name);
  if (!normalized) return undefined;
  return loadAgentRegistry(options)[normalized];
}

export function getRegisteredAgentNames(
  options: AgentRegistryOptions = {},
): string[] {
  return Object.keys(loadAgentRegistry(options)).sort();
}

export function loadNativeAgentInstructionsFromPromptsDir(
  role: string,
  promptsDir: string,
): string | null {
  const normalized = normalizeAgentName(role);
  if (!normalized) return null;
  const agentsDir = basename(promptsDir) === "prompts"
    ? join(promptsDir, "..", "agents")
    : promptsDir;
  const filePath = join(agentsDir, `${normalized}.toml`);
  if (!existsSync(filePath)) return null;
  try {
    const parsed = parseAgentTomlDefinition(readFileSync(filePath, "utf-8"), normalized);
    return parsed?.developerInstructions ?? null;
  } catch {
    return null;
  }
}
