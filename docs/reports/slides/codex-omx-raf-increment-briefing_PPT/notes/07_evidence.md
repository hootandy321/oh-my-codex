这一页只用于支撑判断，不做代码走读。RAF 已经不是口头概念，因为 `goal-setting`、`architecture-spec`、`ralph-implement` 都有对应 skill contract。PPT 也不是单独孤岛，因为 `raf-ppt` 已经变成兼容入口，真正路径是通用 RAF 三阶段里的 PPT route。

动态加载由 `src/agents/registry.ts` 支撑，刷新入口由 `src/cli/agents.ts` 和 `.codex/agents/*.toml` 支撑，契约由 `registry.test.ts` 和 `raf-ppt-skill-contract.test.ts` 保护。插件侧还有 `plugins/oh-my-codex/skills/*` 和 catalog manifest。这里的目的就是让上级知道这些结论都有实现依据。