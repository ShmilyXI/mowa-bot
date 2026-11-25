<div align="center">

# Mowa Bot

**面向 Web 的程序化角色引擎：一整套由代码生成的角色，配有动画状态、十六种脸型、四种画风和 SVG HUD，以及基于它们的 UI 组件。**

[控制台](https://mowa-bot.vercel.app) | [文档](https://mowa-bot.vercel.app/guide/getting-started) | [场景](https://mowa-bot.vercel.app/scenarios/chat-stream) | [English](./README.en.md)

[![npm](https://img.shields.io/npm/v/@mowa-bot/react?label=%40mowa-bot%2Freact)](https://www.npmjs.com/package/@mowa-bot/react) [![CI](https://github.com/ShmilyXI/mowa-bot/actions/workflows/ci.yml/badge.svg)](https://github.com/ShmilyXI/mowa-bot/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

</div>

<p align="center">
  <img src=".github/media/hero.gif" width="860" alt="六个 Mowa Bot 角色：球球、草莓、猫、星星、机器人和云宝，在开心、兴奋、害羞、惊讶、好奇、思考、入睡、生气、庆祝与大笑之间不停切换">
</p>

---

## 这是什么

Mowa Bot 的卡通角色完全由代码绘制，不用精灵图，也不用 Lottie 文件。每个角色的身体是一条轮廓线，耳朵、叶子、天线这类部件单独绘制；每个表情是几个数字描述的曲线笔画，由弹簧驱动过渡；每一帧动画都由 `requestAnimationFrame` 循环直接写入 SVG 属性。

阵容共有 71 个角色，从圆滚滚的团子、年糕，到水果、甜点、小动物、物件、人物和煤球。下图是全体成员开心的样子，每个角色都用自己的脸型和颜色，排在第一位的是奶白色的小圆球「球球」：

<p align="center">
  <img src=".github/media/cast.png" width="760" alt="全部 71 个阵容成员排成网格，个个笑着，下方标注成员 id，第一个是球球">
</p>

此外还有 7 个节日与季节主题：万圣节、圣诞节、春节、中秋节、复活节、夏日和情人节，共 122 个主题角色。每个主题都是单独的入口（`@mowa-bot/engine/themes/<id>`），用到时才加载，不会增加主包体积。全部主题见[主题展](https://mowa-bot.vercel.app/themes/)。

<p align="center">
  <img src=".github/media/themes.png" width="760" alt="7 个主题各一行，每行 6 个主题角色，个个笑着，下方标注角色 id">
</p>

每个角色都由几项相互独立的设置组合而成：角色本身、画风（`vector`、`pixel`、`kaomoji` 或 `ascii`）及其变体、墨色、脸型和动画状态。这些都可以在[控制台](https://mowa-bot.vercel.app)里直接试。

<p align="center">
  <img src=".github/media/styles.gif" width="860" alt="球球的所有画风：十六种 vector 变体，以及 pixel、kaomoji、ascii 各自的全部变体，同步动起来">
  <br>
  <sub>球球的所有画风：<code>vector</code>（<code>solid</code>、<code>outline</code>、<code>glass</code>、<code>sticker</code>、<code>paper</code>、<code>soft</code>、<code>riso</code>、<code>pencil</code>、<code>marker</code>、<code>crayon</code>、<code>watercolor</code>、<code>neon</code>、<code>chalk</code>、<code>origami</code>、<code>relief</code>、<code>gothic</code>）、<code>pixel</code>（<code>crisp</code>、<code>dot</code>、<code>block</code>）和 <code>kaomoji</code>（<code>plain</code>、<code>bubble</code>）。</sub>
</p>

引擎之上是一组 React 组件，覆盖产品里常用的角色功能：根据任意 id 给每个用户分配固定的角色，形状与颜色选择器，支持图片裁切的头像编辑器，群组头像，聊天里的活动提示，供 AI 智能体使用的数字情绪协议，在角色外圈显示进度、计时、波形和 KPI 的 HUD，以及让上百个角色共用少量动画的舞台。引导流程、受限状态场景、模板发布、占用列表和角色编排放在另一个包里，基于这些组件构建。

默认脸型是 `cute`（圆点眼、小嘴和腮红）。此外还有 `eyes`、**线条脸** `line`（鼻子和嘴与眼睛同墨色、同线宽）和 13 种手绘脸，共 16 种，用 `face` 选择，见[五官](https://mowa-bot.vercel.app/design/face)。

## 快速开始

```bash
pnpm add @mowa-bot/react
```

```tsx
import { CharacterMark } from '@mowa-bot/react';
import '@mowa-bot/react/styles.css';

<CharacterMark shape="mochi" state="happy" sizePx={96} />;
```

需要 React 19。产品组件（引导页、场景、模板对话框、占用列表、角色编排）是可选的，需要单独安装：

```bash
pnpm add @mowa-bot/surfaces @mowa-bot/react
```

```tsx
import { RestrictedScene } from '@mowa-bot/surfaces';
import '@mowa-bot/react/styles.css';
import '@mowa-bot/surfaces/styles.css'; // 放在 react 样式之后
```

不用 React 时，一个 script 标签就能把角色放进任意网页：

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@mowa-bot/element"></script>
<mowa-bot character="mochi" state="happy" size="96"></mowa-bot>
```

只需要头像图片时，把[头像接口](https://mowa-bot.vercel.app/guide/avatar-api)的地址写进 `<img>` 即可，同一个 id 始终对应同一个角色：

```html
<img src="https://mowa-bot.vercel.app/avatar/alice.svg" width="64" height="64" alt="alice" />
```

> CDN 引入和头像接口目前在中国大陆无法访问；通过 npm 安装、随项目一起打包则不受影响。面向大陆用户的访问方案正在规划中。

## 包

| 包                   | 作用                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@mowa-bot/engine`   | 核心引擎：形状与画风、五官拟合、姿态投影、弹簧积分器、状态机、腰带、HUD 表盘、粒子、情绪协议与仲裁器。不依赖 React，`/static` 和 `/agent` 入口也不依赖 DOM。 |
| `@mowa-bot/element`  | `<mowa-bot>` Web Component，不依赖 React；另有内置引擎的单文件 CDN 版本，一个 script 标签即可引入。                                                          |
| `@mowa-bot/react`    | React 组件：`CharacterMark`、`CharacterStageProvider`、头像与群组头像、选择器、头像编辑器、活动徽标、HUD 底盘、智能体状态、精灵图、庆祝特效和多语言。        |
| `@mowa-bot/surfaces` | 基于 `@mowa-bot/react` 的产品组件：引导页、场景、模板对话框与发布、占用列表、角色编排。引擎和 React 包作为 peer 依赖。                                       |

每个包都有自己的 README：[`packages/engine`](./packages/engine/README.md)、[`packages/element`](./packages/element/README.md)、[`packages/react`](./packages/react/README.md)、[`packages/surfaces`](./packages/surfaces/README.md)。

## 仓库结构

```
packages/engine/     从零实现的角色引擎（TypeScript）
packages/element/    不依赖 React 的 Web Component
packages/react/      React 组件层
packages/surfaces/   基于 React 组件层的产品组件
docs/                Rspress 文档站
api/                 头像接口（Vercel Function）
examples/            独立示例，不参与工作区构建
```

## 基于 Aora Bot

Mowa Bot 基于 [Aora Bot](https://github.com/sam70361/aora-bot)（作者 sam70361，MIT 许可证）改造，起点为上游提交 `63c6c4f`（0.3.0）。我们更换了名称、npm 包名、CSS 变量前缀、标志和文档站点，并在此基础上继续开发。角色引擎、角色设计和文档内容主要来自 Aora Bot，感谢原作者的工作。

Mowa Bot 是独立维护的分支，与 Aora Bot 官方项目没有关联，也未获其认可或背书。「Aora Bot」名称和标志归其所有者，使用规则见上游的[商标政策](https://github.com/sam70361/aora-bot/blob/main/TRADEMARKS.md)。

## 参与贡献

见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 许可证

本项目以 [MIT 许可证](./LICENSE)开源，范围包括源代码、角色设计（造型、配色、五官、动画状态及相关数据）、文档和示例。来自 Aora Bot 的部分版权归 sam70361 所有，按 MIT 许可使用；Mowa Bot 的修改部分版权归 ShmilyXI 所有，同样按 MIT 发布。分发时请保留 [LICENSE](./LICENSE) 中的全部版权声明和许可声明。来源说明见 [NOTICE.md](./NOTICE.md)。
