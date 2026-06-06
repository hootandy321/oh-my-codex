# Codex/OMX 本轮能力增量汇报源稿

## Source Contract

- 汇报对象：上级，默认熟悉 Codex/OMX 的基本用途，但不需要逐文件理解实现。
- 汇报目标：说明本轮改动不是简单新增几个 prompt 或 skill，而是把 OMX 从固定工作流集合推进到可动态扩展、目标驱动、带反馈闭环的任务操作系统。
- 汇报重点：
  - RAF 三层 V 架构的增量价值。
  - RAF 和原 OMX 工作方式的区别。
  - 动态运行时加载 agent/skill 的价值。
  - 用必要实现证据支撑论点，但不做代码 diff 走读。
- 非目标：
  - 不讲 npm、代理、构建环境问题。
  - 不把重点放在每个文件具体改了什么。
  - 不把 RAF 讲成单一 PPT 工具。
  - 不宣称 JS/TS 代码插件 agent 已完全动态化。
- 建议页数：9 页。
- 建议时长：8 到 12 分钟。
- Canonical source scope：以 `/Users/lxy/lxygit/oh-my-codex` 当前本地工作树为准；`80589be3 Enable project-loaded RAF presentation agents` 是已提交的动态 project agent 和 RAF/PPT 基线，当前工作树进一步把 RAF-PPT 收敛为通用 RAF 三阶段入口。

## Deck Narrative

一句话主线：

本轮改动的价值不是“多了几个执行入口”，而是让 Codex/OMX 开始具备可治理的复杂任务能力：先把目标和验收标准锁住，再让专家和执行工具围绕目标闭环工作，并且专家能力可以在项目运行时扩展。

叙事顺序：

1. 上级真正关心的是：这轮投入是否带来可复用能力，而不是一次性 demo。
2. 原 OMX 的强项是执行编排，但复杂目标仍缺“目标冻结、规格反推、失败归因”的治理结构。
3. RAF 三层 V 架构补上这层治理：目标契约、架构规格、实现闭环。
4. 动态 agent/skill 加载降低能力扩展成本，让新专家可以先项目化试验，再沉淀为通用能力。
5. PPT 路径是首个验证场景，用真实可交付物证明 RAF 不是抽象方法论。
6. 实现证据只用于支撑结论，不抢占汇报主线。

## Audience Decision Narrative

### 上级视角的核心问题

| 上级可能关心的问题 | 本轮汇报要回答的结论 |
| --- | --- |
| 这是不是又加了一组 prompt？ | 不是。增量是把复杂任务执行前后的控制点制度化。 |
| 和原 OMX 有什么本质区别？ | 原 OMX 更偏运行时编排；RAF 增加目标契约、规格反推和失败回溯。 |
| 为什么值得继续投入？ | 这套结构可以复用到 PPT、代码、报告、研究等多类产物，而不是一次性功能。 |
| 动态加载有什么管理价值？ | 新专家可以项目级配置、刷新、验证，再决定是否产品化，降低试错成本。 |
| 当前做到什么程度？ | 已有 skill、project agent、registry、CLI refresh、测试和插件目录支撑；还需用真实 PPTX 闭环验证。 |

### 论点链

1. **管理问题**：复杂任务失败的原因常常不是“执行不努力”，而是目标、视角、验收标准没有被提前固定。
2. **方法增量**：RAF 用三层 V 架构把目标、规格、执行证据连起来，让失败能回溯到正确层级。
3. **工程增量**：动态加载 agent/skill 让专家能力从“改代码发布”变成“项目级配置、刷新、验证”。
4. **验证路径**：PPT 任务同时需要目标、受众、叙事、视觉、证据和可编辑产物，适合作为第一条闭环验证路径。
5. **决策请求**：确认以 RAF 作为下一阶段复杂任务组织模型，并用本次汇报 PPT 跑通端到端验证。

## Slide 1: 给上级的一句话结论

### Visible Message

这轮增量让 OMX 从“会执行”向“可治理地完成复杂目标”迈了一步。

### Key Points

- 本轮重点不是实现清单，而是能力边界变化。
- 原来 OMX 强在调度和执行；现在开始补上目标治理、规格反推和证据闭环。
- 这个能力可以复用到 PPT、代码、报告、研究等复杂产物。

### Evidence

- `skills/goal-setting/SKILL.md`
- `skills/architecture-spec/SKILL.md`
- `skills/ralph-implement/SKILL.md`
- `src/agents/registry.ts`

### Speaker Notes

开场先避免进入技术细节。我要传达的是：这次不是“又加了一个工具”，而是让 AI 执行复杂任务时有了更明确的管理控制点。上级需要判断的是这套模型能否作为后续复杂任务的基础方法。

## Slide 2: 为什么上级需要关心

### Visible Message

复杂任务的主要风险不是做不出来，而是 AI 很快做了一个偏离真实目标的产物。

### Key Points

- 复杂任务失败经常出现在三个位置：
  - 目标没有冻结，执行中不断漂移。
  - 缺少甲方/受众/实现/评审等多视角反推。
  - 失败只被局部修补，没有回到目标或规格层。
- 对上级而言，这会带来返工、不可复用、难评估的问题。
- RAF 的价值是把这些风险前置成流程控制点。

### Evidence

- `skills/goal-setting/SKILL.md` 记录目标、非目标、验收标准和授权边界。
- `skills/architecture-spec/SKILL.md` 要求 perspective map、champion/challenger、falsifier。
- `skills/ralph-implement/SKILL.md` 要求失败归因和 backprop。

### Speaker Notes

这里要从管理风险讲，不从代码讲。上级真正关心的是：我们能不能降低 AI 产物返工，能不能让复杂任务变得可审阅、可复用。RAF 解决的是这个问题。

## Slide 3: 原 OMX 与 RAF 的定位差异

### Visible Message

原 OMX 是强执行底座；RAF 是加在执行底座上的任务治理层。

### Comparison Table

| 维度 | 原 OMX | RAF 增量 |
| --- | --- | --- |
| 主要价值 | 调度 skill、agent、runtime 模式 | 约束复杂任务的目标、规格和验收 |
| 用户入口 | 选择或触发某个工作流 | 先形成目标契约，再进入规格和执行 |
| 执行依据 | prompt、上下文、role 定义 | goal contract + architecture/spec |
| 失败处理 | 局部修复为主 | 回溯到目标、规格或实现层 |
| 复用方式 | 复用工具和模式 | 复用任务组织方法 |

### Evidence

- `README.md` 将 OMX 定位为 task routing、workflow、runtime。
- `skills/raf/SKILL.md` 将 RAF 定义为 `$goal-setting -> $architecture-spec -> $ralph-implement`。
- `src/hooks/__tests__/raf-ppt-skill-contract.test.ts` 保护 RAF stage contract。

### Speaker Notes

不要把原 OMX 和 RAF 对立起来。更准确的说法是：原 OMX 是执行底座，RAF 是治理层。上级要看到的是两者叠加后的能力增量。

## Slide 4: RAF 三层 V 架构

### Visible Message

RAF 把复杂任务拆成三个可审阅阶段：目标契约、架构规格、实现闭环。

### Key Points

- Stage 1: `$goal-setting`
  - 目标、受众、非目标、验收标准、授权边界。
- Stage 2: `$architecture-spec`
  - 甲方/受众/实现/评审/维护视角，方案变体和反证测试。
- Stage 3: `$ralph-implement`
  - 按目标和规格执行，收集证据，失败时做 backprop。

### Evidence

- `skills/goal-setting/SKILL.md`
- `skills/architecture-spec/SKILL.md`
- `skills/ralph-implement/SKILL.md`

### Speaker Notes

这页解释方法论本体。V 字不是视觉噱头，而是“前端定义目标和规格，后端用验证结果反向归因”。这样复杂任务才有可审阅的中间产物。

## Slide 5: 动态加载带来的扩展方式变化

### Visible Message

专家能力从“写死进源码”变成“项目级配置、刷新、验证、再沉淀”。

### Key Points

- 支持从项目和用户目录加载 agent：
  - `.codex/prompts/*.md`
  - `.codex/agents/*.toml`
  - `~/.codex/prompts/*.md`
  - `~/.codex/agents/*.toml`
- Markdown/TOML 定义专家角色、模型、推理强度、工具边界和指令。
- `omx agents refresh` 把 Markdown agent 同步为 Codex native TOML。

### Evidence

- `src/agents/registry.ts`
- `src/cli/agents.ts`
- `.codex/prompts/raf-goal-setter.md`
- `.codex/agents/raf-goal-setter.toml`
- `skills/agents-refresh/SKILL.md`

### Speaker Notes

这页回答“为什么动态加载重要”。它不是炫技，而是改变能力供给方式。项目可以先试验一个专家角色，跑通后再决定是否产品化，降低主线代码和发布节奏的负担。

## Slide 6: PPT 路径为什么适合做首个验证

### Visible Message

PPT 不是边界，而是检验 RAF 是否能交付真实产物的高压场景。

### Key Points

- PPT 任务同时要求：
  - 目标清楚。
  - 受众明确。
  - 叙事成立。
  - 视觉可读。
  - 讲稿可用。
  - 最终产物可编辑。
- 当前 `$raf-ppt` 已收敛为兼容入口。
- 真正执行由通用 RAF 阶段识别 PPT artifact，再路由到 `ppt-master`。

### Evidence

- `skills/raf-ppt/SKILL.md`
- `skills/architecture-spec/SKILL.md`
- `skills/ralph-implement/SKILL.md`
- `skills/ralph-implement/scripts/ensure-ppt-master-skill.sh`

### Speaker Notes

这页防止误解：我们不是把 RAF 限定为 PPT 工具，而是用 PPT 作为第一条验证路径。PPT 对目标、结构和产物质量要求都高，适合证明这套方法不是空转。

## Slide 7: 当前实现证据足够支撑哪些判断

### Visible Message

当前实现已经覆盖“模型定义、动态加载、刷新入口、测试保护、插件交付”。

### Evidence Matrix

| 管理判断 | 实现证据 |
| --- | --- |
| RAF 已不是口头概念 | `skills/goal-setting/SKILL.md`、`skills/architecture-spec/SKILL.md`、`skills/ralph-implement/SKILL.md` |
| PPT 是路由适配 | `skills/raf-ppt/SKILL.md`、`skills/architecture-spec/SKILL.md` |
| agent 可动态加载 | `src/agents/registry.ts` |
| agent 可刷新为 native TOML | `src/cli/agents.ts`、`.codex/agents/*.toml` |
| 关键契约有测试保护 | `src/agents/__tests__/registry.test.ts`、`src/hooks/__tests__/raf-ppt-skill-contract.test.ts` |
| 插件侧可分发 | `plugins/oh-my-codex/skills/*`、`src/catalog/manifest.json`、`templates/catalog-manifest.json` |

### Speaker Notes

这页只讲支撑判断的证据。不要把听众拉进代码细节。证据的作用是说明：这些能力不是想法，而是已经有入口、文件、测试和插件交付路径。

## Slide 8: 边界与风险

### Visible Message

当前能力已经可验证，但还需要明确动态扩展治理边界。

### Risk Matrix

| 风险 | 当前处理 | 下一步 |
| --- | --- |
| 被误解为任意代码插件 | 明确当前是 Markdown/TOML agent 配置加载 | 单独评估 JS/TS 插件安全模型 |
| RAF 被误解为 PPT 工具 | `$raf-ppt` 已变成兼容入口 | 继续沉淀代码、报告、研究 artifact 路由 |
| 新专家质量不稳定 | project scope 先试验 | 建立提升为内置 agent 的标准 |
| 只停留在文档层 | 本次汇报用 PPTX 闭环验证 | 生成 `ppt-master` 项目和 editable PPTX |

### Speaker Notes

这页主动讲边界，增加可信度。最关键的边界是：当前动态加载不是任意代码插件执行，而是 agent 配置和指令加载。代码插件如果要做，需要另一个安全设计。

## Slide 9: 希望上级做出的判断

### Visible Message

建议把 RAF 作为下一阶段复杂任务组织模型，并用本次 PPT 任务完成端到端验证。

### Decision Points

- 认可方向：
  - RAF 作为复杂任务治理层。
  - 动态 agent/skill 作为专家能力试验机制。
  - PPT 作为第一条端到端验证路径。
- 本轮后续交付：
  - 用这份 Markdown 进入 `ppt-master`。
  - 生成 `design_spec.md`、`spec_lock.md`、SVG 页面和 editable PPTX。
  - 用实际汇报 PPT 检验 RAF-PPT 闭环。

### Next Steps

- 短期：完成本 PPT 的 `ppt-master` 产物闭环。
- 中期：补齐更多 artifact routes。
- 长期：制定动态专家能力的治理标准和沉淀机制。

### Speaker Notes

最后要让上级知道“下一步要批什么”。不是批一堆技术细节，而是确认这条路线值得作为复杂任务组织模型继续推进，并允许用本次 PPT 任务做端到端验证。

## Architecture-Spec Design Decisions For PPT-Master

这些是 RAF Stage 2 为 `ppt-master` 提前固化的设计决策。它们对应原生 `ppt-master` 的 Eight Confirmations，但在 OMX/RAF 集成流程里属于 `$architecture-spec`，不应在 `$ralph-implement` 阶段临时追问。

1. Canvas format：`ppt169`。
2. Page count range：9 页。
3. Target audience：上级，偏管理和技术判断，不做代码细节走读。
4. Style objective：决策型技术汇报，先讲管理价值，再讲必要实现证据。
5. Color scheme：深灰、白、蓝绿强调色；避免花哨渐变。
6. Typography：中文优先，标题强对比，正文中等密度。
7. Visual system：决策问题表、before/after 对比、V 架构图、证据矩阵、风险矩阵为主；少用装饰图。
8. Speaker notes：需要，每页保留口头讲解要点，方便 8 到 12 分钟汇报。

## Backprop Ledger

| Risk | Classification | Owner | Handling |
| --- | --- | --- | --- |
| 听众误解为只做了 PPT 工具 | DeckNarrativeMismatch | Phase 2 narrative | 在 Slide 5 明确 PPT 是第一条验证路径，不是 RAF 边界 |
| 代码证据过多导致主线变成开发日志 | VisualReadabilityFailure | Phase 2 page plan | 只保留 evidence matrix，不做逐文件 diff |
| 动态加载被理解成任意代码插件 | DeckNarrativeMismatch | Phase 1 goal contract | 在 Slide 6 明确当前是 Markdown/TOML agent 配置加载 |
| 当前工作树和已提交 commit 存在差异 | PptMasterInputError | Phase 1 source contract | 在 Source Contract 标明以当前本地工作树为准，并说明 80589be3 是基线 |
