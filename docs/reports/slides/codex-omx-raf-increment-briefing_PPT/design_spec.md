# codex-omx-raf-increment-briefing - Design Spec

> Human-readable design narrative for the RAF/OMX increment briefing deck.
> Machine-readable execution contract: `spec_lock.md`.

## I. Project Information

| Item | Value |
| ---- | ----- |
| **Project Name** | codex-omx-raf-increment-briefing |
| **Canvas Format** | PPT 16:9 (1280x720) |
| **Page Count** | 9 |
| **Design Style** | Top Consulting / decision-focused technical briefing |
| **Target Audience** | 上级，偏管理判断和技术方向评估 |
| **Use Case** | 8 到 12 分钟内部汇报，解释本轮 Codex/OMX 改动的能力增量与后续投入价值 |
| **Created Date** | 2026-06-06 |

---

## II. Canvas Specification

| Property | Value |
| -------- | ----- |
| **Format** | PPT 16:9 |
| **Dimensions** | 1280x720 |
| **viewBox** | `0 0 1280 720` |
| **Margins** | left/right 64px, top 52px, bottom 46px |
| **Content Area** | 1152x622 |

---

## III. Visual Theme

### Theme Style

- **Style**: decision-first technical consulting deck
- **Theme**: light theme
- **Tone**: restrained, executive, engineering-grounded, evidence-backed

### Color Scheme

| Role | HEX | Purpose |
| ---- | --- | ------- |
| **Background** | `#F7F9FC` | Page background |
| **Secondary bg** | `#FFFFFF` | Cards, tables, emphasis panels |
| **Primary** | `#1E3A5F` | Titles, major lines, structural graphics |
| **Accent** | `#00A6A6` | Key increment, positive route, active stage |
| **Secondary accent** | `#6B7A90` | Neutral connectors, secondary labels |
| **Body text** | `#172033` | Main text |
| **Secondary text** | `#4B5565` | Captions, notes, secondary statements |
| **Tertiary text** | `#7A869A` | Footers, page numbers, subtle labels |
| **Border/divider** | `#D8E0EA` | Card borders, matrix lines |
| **Success** | `#2E7D32` | Pass/verified indicators |
| **Warning** | `#C2410C` | Risk and boundary indicators |

### Gradient Scheme

Use gradients sparingly. Default pages are flat light-background pages. If a cover or chapter band needs depth, use a subtle linear gradient between `#F7F9FC` and `#E8EEF5`.

---

## IV. Typography System

### Font Plan

**Typography direction**: modern CJK sans, PPT-safe, executive-readable.

| Role | Chinese | English | Fallback tail |
| ---- | ------- | ------- | ------------- |
| **Title** | `"Microsoft YaHei", "PingFang SC"` | Arial | sans-serif |
| **Body** | `"Microsoft YaHei", "PingFang SC"` | Arial | sans-serif |
| **Emphasis** | `"Microsoft YaHei", "PingFang SC"` | Arial | sans-serif |
| **Code** | — | `Consolas, "Courier New"` | monospace |

**Per-role font stacks**

- Title: `"Microsoft YaHei", "PingFang SC", Arial, sans-serif`
- Body: `"Microsoft YaHei", "PingFang SC", Arial, sans-serif`
- Emphasis: `"Microsoft YaHei", "PingFang SC", Arial, sans-serif`
- Code: `Consolas, "Courier New", monospace`

### Font Size Hierarchy

**Baseline**: Body font size = 20px.

| Purpose | Size | Weight |
| ------- | ---- | ------ |
| Cover title | 52px | Bold |
| Page title | 34px | Bold |
| Section label | 18px | Semibold |
| Subtitle | 24px | Semibold |
| Body content | 20px | Regular |
| Table content | 17px | Regular |
| Annotation / caption | 14px | Regular |
| Footer | 12px | Regular |

---

## V. Layout Principles

### Page Structure

- **Header area**: 52px top band, page title or section label.
- **Content area**: 590px body region, using decision tables, comparison grids, V architecture, route diagrams, and evidence/risk matrices.
- **Footer area**: 46px for source label and page number.

### Layout Pattern Library

- Cover/conclusion: large conclusion statement with three compact proof chips.
- Decision pages: two-column or matrix tables with clear question/answer relationships.
- Architecture pages: left-to-right or V-shaped route diagrams, avoiding decorative complexity.
- Evidence pages: compact matrix tables with supporting paths.
- Risk pages: risk matrix with current handling and next action.

### Spacing Specification

**Universal**

| Element | Current Project |
| ------- | --------------- |
| Safe margin from canvas edge | 64px |
| Content block gap | 28px |
| Icon-text gap | 10px |

**Card-based layouts**

| Element | Current Project |
| ------- | --------------- |
| Card gap | 20px |
| Card padding | 22px |
| Card border radius | 8px |
| Double-row card height | 250-280px |
| Three-column card width | 350-370px |

**Non-card containers**

- Use divider lines, whitespace, and section labels rather than nested cards.
- Tables use thin borders and light fills; no heavy card walls.
- Preserve dense but readable executive briefing composition.

---

## VI. Icon Usage Specification

### Source

- **Built-in icon library**: `templates/icons/tabler-outline`
- **Stroke width**: 2
- **Usage method**: SVG placeholder `<use data-icon="tabler-outline/icon-name" .../>` when post-processing can embed icons. If icon embedding is unavailable, use simple geometric SVG shapes.

### Recommended Icon List

| Purpose | Icon Path | Page |
| ------- | --------- | ---- |
| Goal / target | `tabler-outline/target` | P01, P04 |
| Route / flow | `tabler-outline/route-2` | P03, P06 |
| Governance / risk | `tabler-outline/shield-exclamation` | P02, P08 |
| Dynamic refresh | `tabler-outline/refresh` | P05 |
| Presentation validation | `tabler-outline/presentation` | P06 |
| Evidence | `tabler-outline/chart-bar-popular` | P07 |
| Completion | `tabler-outline/circle-check` | P09 |

---

## VII. Visualization Reference List

| Page | Visualization Type | Purpose |
| ---- | ------------------ | ------- |
| P02 | Risk chain diagram | Show why complex tasks fail without goal/spec control |
| P03 | Before/after comparison table | Position original OMX vs RAF governance layer |
| P04 | Three-stage V diagram | Explain RAF goal/spec/implementation loop |
| P05 | Dependency and refresh flow | Show project/user agent loading and refresh |
| P07 | Evidence matrix | Map management claims to implementation evidence |
| P08 | Risk matrix | Show boundary and next action |

---

## VIII. Image Resource List

No external photos, AI images, or web images are required. The deck uses native SVG diagrams, tables, and icon placeholders only.

---

## IX. Content Outline

### P01 - 给上级的一句话结论

- **Role**: Cover / executive conclusion.
- **Visible message**: 这轮增量让 OMX 从“会执行”向“可治理地完成复杂目标”迈了一步。
- **Content**: three proof chips: RAF governance, dynamic experts, PPTX validation route.
- **Rhythm**: anchor.

### P02 - 为什么上级需要关心

- **Role**: Problem framing.
- **Visible message**: 复杂任务的主要风险不是做不出来，而是 AI 很快做了一个偏离真实目标的产物。
- **Content**: three risk nodes: target drift, missing perspectives, local-only fixes.
- **Rhythm**: dense.

### P03 - 原 OMX 与 RAF 的定位差异

- **Role**: Before/after positioning.
- **Visible message**: 原 OMX 是强执行底座；RAF 是加在执行底座上的任务治理层。
- **Content**: comparison table across value, entry, execution basis, failure handling, reuse mode.
- **Rhythm**: dense.

### P04 - RAF 三层 V 架构

- **Role**: Core method.
- **Visible message**: RAF 把复杂任务拆成三个可审阅阶段：目标契约、架构规格、实现闭环。
- **Content**: V-shaped three-stage diagram, backprop arrow, stage outputs.
- **Rhythm**: anchor.

### P05 - 动态加载带来的扩展方式变化

- **Role**: Engineering increment.
- **Visible message**: 专家能力从“写死进源码”变成“项目级配置、刷新、验证、再沉淀”。
- **Content**: source locations -> registry -> native TOML -> OMX route.
- **Rhythm**: dense.

### P06 - PPT 路径为什么适合做首个验证

- **Role**: Validation route.
- **Visible message**: PPT 不是边界，而是检验 RAF 是否能交付真实产物的高压场景。
- **Content**: six validation requirements plus dependency helper.
- **Rhythm**: breathing.

### P07 - 当前实现证据足够支撑哪些判断

- **Role**: Evidence matrix.
- **Visible message**: 当前实现已经覆盖“模型定义、动态加载、刷新入口、测试保护、插件交付”。
- **Content**: claim/evidence matrix.
- **Rhythm**: dense.

### P08 - 边界与风险

- **Role**: Risk and boundary.
- **Visible message**: 当前能力已经可验证，但还需要明确动态扩展治理边界。
- **Content**: risk/current handling/next step matrix.
- **Rhythm**: dense.

### P09 - 希望上级做出的判断

- **Role**: Decision request.
- **Visible message**: 建议把 RAF 作为下一阶段复杂任务组织模型，并用本次 PPT 任务完成端到端验证。
- **Content**: decision points and short/mid/long next steps.
- **Rhythm**: anchor.

---

## X. Speaker Notes Requirements

- Every page needs speaker notes.
- Notes should support an 8 to 12 minute briefing.
- Notes should speak from a management/decision viewpoint first and implementation evidence second.
- Avoid code-diff narration except where evidence paths are needed.

---

## XI. Technical Constraints

- Use only SVG-compatible constructs supported by the ppt-master pipeline.
- Avoid `rgba()`, `<style>`, CSS classes, external fonts, animations, and embedded scripts.
- Re-read `spec_lock.md` before each page.
- Final export must be an editable PPTX under `exports/*.pptx`.
- Canonical source remains `../../../codex-omx-raf-increment-briefing.md`; do not duplicate source content into the project.
