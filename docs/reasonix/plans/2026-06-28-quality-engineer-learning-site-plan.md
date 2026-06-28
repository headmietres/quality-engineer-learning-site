# 品质工程师技能学习网站 Implementation Plan

> **For agentic workers:** implement this plan task-by-task — dispatch a fresh subagent per task with the native `task` tool (recommended for quality), or use the superpowers-executing-plans skill to work through it inline. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a VitePress static learning website for quality engineer skills, covering beginner to advanced content across 6 major sections.

**Architecture:** Single VitePress 2.x project with Markdown content under `src/`. Default theme with custom navigation and sidebar. Content organized into 6 section directories. KaTeX plugin for formulas. Deployed via GitHub Pages.

**Tech Stack:** VitePress 2.x, Node.js, Markdown, KaTeX (via vitepress-plugin-math), GitHub Pages

---

### Task 1: Initialize VitePress Project

**Files:**
- Create: `package.json`
- Create: `.vitepress/config.mts`

- [ ] **Step 1: Create package.json and install dependencies**

```bash
mkdir -p quality-engineer-learning-site
cd quality-engineer-learning-site
npm init -y
npm install vitepress@latest vue
```

- [ ] **Step 2: Create basic VitePress config**

```ts
// .vitepress/config.mts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '品质工程师技能学习',
  description: '系统化的品质工程学习平台，从入门到进阶',
  lang: 'zh-CN',
  srcDir: 'src',
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '品质工程师技能学习',
    nav: [
      { text: '首页', link: '/' },
      { text: '学习路径', link: '/guide/' },
      { text: '质量工具', link: '/tools/' },
      { text: '体系标准', link: '/standards/' },
      { text: '质检实操', link: '/practice/' },
      { text: '认证考试', link: '/certification/' },
      { text: '在线工具', link: '/tools-online/' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/quality-engineer-learning-site' }
    ],
    footer: {
      message: '用心学习，匠心品质',
      copyright: 'Copyright © 2026'
    }
  }
})
```

- [ ] **Step 3: Create src directory structure**

```bash
mkdir -p src/guide src/basic src/tools src/standards src/practice src/certification src/tools-online
mkdir -p public
```

- [ ] **Step 4: Run dev server to verify**

```bash
npx vitepress dev
```

Expected: Site loads at localhost, shows minimal VitePress default page.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: initialize VitePress project"
```

---

### Task 2: Configure Sidebar and Theme

**Files:**
- Modify: `.vitepress/config.mts`

- [ ] **Step 1: Add sidebar configuration to config.mts**

```ts
// Add to themeConfig in .vitepress/config.mts
sidebar: {
  '/guide/': [
    {
      text: '学习路径',
      items: [
        { text: '总览', link: '/guide/' },
        { text: '快速入门', link: '/guide/getting-started' },
        { text: '预备知识', link: '/guide/prerequisites' },
      ]
    }
  ],
  '/basic/': [
    {
      text: '基础入门',
      items: [
        { text: '质量工程概述', link: '/basic/' },
        { text: '统计基础', link: '/basic/statistics-basics' },
        { text: '常用术语', link: '/basic/terminology' },
      ]
    }
  ],
  '/tools/': [
    {
      text: '质量工具与方法论',
      items: [
        { text: 'QC 七大手法', link: '/tools/' },
        { text: 'SPC 统计过程控制', link: '/tools/spc' },
        { text: 'FMEA 失效模式分析', link: '/tools/fmea' },
        { text: 'MSA 测量系统分析', link: '/tools/msa' },
        { text: 'PPAP', link: '/tools/ppap' },
        { text: '8D 报告', link: '/tools/8d-report' },
      ]
    }
  ],
  '/standards/': [
    {
      text: '质量管理体系',
      items: [
        { text: 'ISO 9001', link: '/standards/' },
        { text: 'IATF 16949', link: '/standards/iatf-16949' },
        { text: '六西格玛', link: '/standards/six-sigma' },
        { text: '精益生产', link: '/standards/lean-production' },
      ]
    }
  ],
  '/practice/': [
    {
      text: '质检实操',
      items: [
        { text: '来料检验 (IQC)', link: '/practice/' },
        { text: '过程检验 (IPQC)', link: '/practice/ipqc' },
        { text: '出货检验 (OQC)', link: '/practice/oqc' },
        { text: '不合格品处理', link: '/practice/nonconforming' },
      ]
    }
  ],
  '/certification/': [
    {
      text: '认证考试',
      items: [
        { text: 'CQE 备考', link: '/certification/' },
        { text: '六西格玛绿带/黑带', link: '/certification/six-sigma-belt' },
        { text: '模拟试题', link: '/certification/mock-exam' },
      ]
    }
  ],
  '/tools-online/': [
    {
      text: '在线工具',
      items: [
        { text: 'CPK 在线计算', link: '/tools-online/' },
        { text: 'GRR 在线计算', link: '/tools-online/grr-calculator' },
      ]
    }
  ],
}
```

- [ ] **Step 2: Add edit link and social links**

```ts
// Add to themeConfig
editLink: {
  pattern: 'https://github.com/your-username/quality-engineer-learning-site/edit/main/src/:path',
  text: '在 GitHub 上编辑此页'
},
lastUpdated: true,
search: {
  provider: 'local'
}
```

- [ ] **Step 3: Add KaTeX support for formulas**

```bash
npm install vitepress-plugin-math markdown-it-texmath
```

Add to config:
```ts
import { defineConfig } from 'vitepress'
import { mathPlugin } from 'vitepress-plugin-math'

export default defineConfig({
  // ... existing config
  markdown: {
    math: true
  },
  vite: {
    plugins: [mathPlugin()]
  }
})
```

- [ ] **Step 4: Verify**

```bash
npx vitepress build
```

Expected: Build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: configure sidebar, search, and math support"
```

---

### Task 3: Create Homepage and Learning Path Pages

**Files:**
- Create: `src/index.md`
- Create: `src/guide/index.md`
- Create: `src/guide/getting-started.md`
- Create: `src/guide/prerequisites.md`

- [ ] **Step 1: Create homepage (src/index.md)**

```markdown
---
layout: home

hero:
  name: 品质工程师技能学习
  text: 从入门到进阶的系统化学习平台
  tagline: 覆盖 QC 七大手法、SPC、FMEA、MSA、PPAP、六西格玛、ISO 9001 等核心质量工程知识
  actions:
    - theme: brand
      text: 开始学习
      link: /guide/
    - theme: alt
      text: 查看学习路径
      link: /guide/getting-started

features:
  - icon: 📊
    title: 质量工具与方法论
    details: QC七大手法、SPC、FMEA、MSA、PPAP、8D报告等
  - icon: 📋
    title: 质量管理体系
    details: ISO 9001、IATF 16949、六西格玛、精益生产
  - icon: 🔧
    title: 质检实操技能
    details: IQC、IPQC、OQC、不合格品处理
  - icon: 🎯
    title: 认证考试备考
    details: CQE、六西格玛绿带/黑带备考资料与模拟试题
---
```

- [ ] **Step 2: Create learning path overview (src/guide/index.md)**

```markdown
# 学习路径总览

本网站为品质工程师提供两条学习路径：**初学者路径**和**进阶者路径**。

## 🟢 初学者路径

适合刚入行或在校学生，从零开始系统学习。

| 步骤 | 内容 | 预计时间 |
|------|------|----------|
| 1 | 质量工程概述 → 统计基础 → QC七大手法 | 2 周 |
| 2 | SPC → 来料检验 | 1 周 |
| 3 | ISO 9001 → FMEA → 过程检验 | 2 周 |
| 4 | MSA → 8D报告 → 出货检验 | 1.5 周 |

## 🔵 进阶者路径

适合有经验的质量工程师，重点提升高阶技能和备考认证。

| 步骤 | 内容 | 预计时间 |
|------|------|----------|
| 1 | IATF 16949 → 六西格玛 → 精益生产 | 2 周 |
| 2 | CQE 备考 / 六西格玛认证备考 | 3 周 |
| 3 | 高级 SPC → 复杂 FMEA 案例 | 2 周 |

## 学习建议

- 按顺序学习，每完成一个模块做一次自测
- 结合实际工作中的案例加深理解
- 善用本网站的在线计算工具辅助学习
```

- [ ] **Step 3: Create getting-started (src/guide/getting-started.md)**

```markdown
# 快速入门

## 需要什么基础？

- 基本的数学和统计知识
- 对制造业或质量管理有兴趣
- 不需要相关工作经验，但有一定了解会更好

## 学习工具准备

- 浏览器（推荐 Chrome/Edge）
- Excel 或类似表格工具（用于数据分析练习）
- 笔记本记录学习要点

## 学习计划建议

每天投入 30-60 分钟，按以下节奏学习：

**第 1 周：** 质量工程概述 + 统计基础
**第 2 周：** QC 七大手法
**第 3 周：** SPC 基础
**第 4 周：** FMEA + MSA 概念

## 常用资源

- [AIAG 官网](https://www.aiag.org) — 汽车行业行动组
- [ASQ 官网](https://asq.org) — 美国质量学会
- [ISO 官网](https://www.iso.org) — 国际标准化组织
```

- [ ] **Step 4: Create prerequisites (src/guide/prerequisites.md)**

```markdown
# 预备知识

## 统计学基础

在学习质量工具之前，理解以下统计概念会有帮助：

### 基本术语

- **均值（Mean）**：数据的平均值
- **中位数（Median）**：数据排序后的中间值
- **标准差（Standard Deviation）**：数据的离散程度
- **正态分布（Normal Distribution）**：自然界中最常见的分布形态
- **方差（Variance）**：标准差的平方

### 关键公式

$$
\bar{x} = \frac{\sum_{i=1}^{n} x_i}{n}
$$

$$
\sigma = \sqrt{\frac{\sum_{i=1}^{n} (x_i - \bar{x})^2}{n}}
$$

## 质量管理基本概念

- **质量**：产品或服务满足要求的程度
- **质量控制（QC）**：检查和测试以确保质量
- **质量保证（QA）**：系统和流程确保质量
- **质量管理（QM）**：全面的质量方针和策略
```

- [ ] **Step 5: Build and verify**

```bash
npx vitepress build
```

Expected: Build succeeds. Homepage shows hero section with features.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add homepage and learning path pages"
```

---

### Task 4: Create Basic Knowledge Pages

**Files:**
- Create: `src/basic/index.md`
- Create: `src/basic/quality-overview.md`
- Create: `src/basic/statistics-basics.md`
- Create: `src/basic/terminology.md`

- [ ] **Step 1: Create basic section index (src/basic/index.md)**

```markdown
# 基础入门

本模块涵盖品质工程的基础知识，适合零基础学习者。

## 章节

- [质量工程概述](./quality-overview) — 什么是质量工程，发展历史与核心概念
- [统计基础](./statistics-basics) — 学习质量工具所需的统计知识
- [常用术语](./terminology) — 品质工程常见术语解释
```

- [ ] **Step 2: Create quality overview page (src/basic/quality-overview.md)**

Content covering: 质量的定义演变（检验质量→制造质量→设计质量→全面质量管理），质量大师（戴明、朱兰、克劳士比），现代质量工程的核心领域。

- [ ] **Step 3: Create statistics basics page (src/basic/statistics-basics.md)**

Content covering: 描述性统计（均值、中位数、众数、标准差、极差），概率基础，正态分布与标准正态分布，过程能力指数 Cp/Cpk 概念。

Include KaTeX formulas:
$$
C_p = \frac{USL - LSL}{6\sigma}
$$

$$
C_{pk} = \min\left(\frac{USL - \bar{x}}{3\sigma}, \frac{\bar{x} - LSL}{3\sigma}\right)
$$

- [ ] **Step 4: Create terminology page (src/basic/terminology.md)**

Content covering: AQL, AOQ, CL, CP, CPK, CR, DPMO, FMEA, GRR, KPI, LCL, LSL, MSA, NCR, OOC, PPM, PPAP, QA, QC, QE, QM, SPC, UCL, USL 等术语解释。

- [ ] **Step 5: Build and verify**

```bash
npx vitepress build
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add basic knowledge pages"
```

---

### Task 5: Create Quality Tools Pages (Part 1: QC 7 Tools + SPC)

**Files:**
- Create: `src/tools/index.md`
- Create: `src/tools/qc-7-tools.md`
- Create: `src/tools/spc.md`

- [ ] **Step 1: Create tools section index (src/tools/index.md)**

Introduce the QC 7 tools (检查表、层别法、柏拉图、因果图、散布图、直方图、控制图) and when to use each.

- [ ] **Step 2: Create QC 7 tools detail page (src/tools/qc-7-tools.md)**

For each of the 7 tools:
1. 检查表 (Check Sheet) — 数据收集
2. 层别法 (Stratification) — 数据分类
3. 柏拉图 (Pareto Chart) — 80/20 原则
4. 因果图 (Cause-and-Effect Diagram) — 鱼骨图
5. 散布图 (Scatter Diagram) — 相关性分析
6. 直方图 (Histogram) — 分布可视化
7. 控制图 (Control Chart) — 过程监控

Each tool: definition, when to use, how to create, real example.

- [ ] **Step 3: Create SPC page (src/tools/spc.md)**

Cover: SPC 基本原理、普通原因 vs 特殊原因变异、控制图类型（X̄-R, X̄-S, 个体-移动极差、p 图、np 图、c 图、u 图）、控制限计算、判异准则（8 大判异规则）、过程能力分析。

Include formulas:
$$
UCL = \bar{\bar{x}} + A_2\bar{R}
$$
$$
LCL = \bar{\bar{x}} - A_2\bar{R}
$$

- [ ] **Step 4: Build and verify**

```bash
npx vitepress build
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add quality tools pages - QC 7 tools and SPC"
```

---

### Task 6: Create Quality Tools Pages (Part 2: FMEA, MSA, PPAP, 8D)

**Files:**
- Create: `src/tools/fmea.md`
- Create: `src/tools/msa.md`
- Create: `src/tools/ppap.md`
- Create: `src/tools/8d-report.md`

- [ ] **Step 1: Create FMEA page (src/tools/fmea.md)**

Cover: DFMEA vs PFMEA, 严重度(S)/频度(O)/探测度(D) 评级, RPN 计算, FMEA 表格结构, 实施步骤。

- [ ] **Step 2: Create MSA page (src/tools/msa.md)**

Cover: 量具重复性与再现性 (GRR), 偏倚/线性/稳定性, 属性一致性分析, 可区分类别数 (ndc), GRR 接受标准。

Include formula:
$$
\%GRR = \frac{\sigma_{GRR}}{\sigma_{Total}} \times 100\%
$$

- [ ] **Step 3: Create PPAP page (src/tools/ppap.md)**

Cover: PPAP 18 项提交要素, 5 个提交等级, 关键/重要/一般特性, 初始过程能力研究。

- [ ] **Step 4: Create 8D report page (src/tools/8d-report.md)**

Cover: 8D 方法论 8 个步骤 (D1-D8), 各步骤工具, 案例演示。

- [ ] **Step 5: Build and verify**

```bash
npx vitepress build
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add FMEA, MSA, PPAP, and 8D report pages"
```

---

### Task 7: Create Standards and Certification Pages

**Files:**
- Create: `src/standards/index.md`
- Create: `src/standards/iatf-16949.md`
- Create: `src/standards/six-sigma.md`
- Create: `src/standards/lean-production.md`
- Create: `src/certification/index.md`
- Create: `src/certification/six-sigma-belt.md`
- Create: `src/certification/mock-exam.md`

- [ ] **Step 1: Create ISO 9001 page (src/standards/index.md)**

Cover: ISO 9001:2015 七大质量管理原则, PDCA 循环, 条款结构 (0-10 章节), 认证流程。

- [ ] **Step 2: Create IATF 16949 page (src/standards/iatf-16949.md)**

Cover: 汽车行业特定要求, ISO 9001 补充, CSR (Customer Specific Requirements)。

- [ ] **Step 3: Create Six Sigma page (src/standards/six-sigma.md)**

Cover: DMAIC 方法论, 六西格玛统计学含义, 角色体系 (Champion/MBB/BB/GB)。

- [ ] **Step 4: Create Lean Production page (src/standards/lean-production.md)**

Cover: 七大浪费, 5S, Kaizen, JIT, 看板, 价值流图。

- [ ] **Step 5: Create CQE certification page (src/certification/index.md)**

Cover: ASQ CQE 考试大纲, 考试内容领域, 备考建议, 推荐书籍。

- [ ] **Step 6: Create Six Sigma belt page (src/certification/six-sigma-belt.md)**

Cover: 绿带 vs 黑带认证要求, 考试内容, 项目要求, 备考路径。

- [ ] **Step 7: Create mock exam page (src/certification/mock-exam.md)**

Sample multiple-choice questions covering all topic areas with answer key.

- [ ] **Step 8: Build and verify**

```bash
npx vitepress build
```

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add standards and certification pages"
```

---

### Task 8: Create Practice and Online Tools Pages

**Files:**
- Create: `src/practice/index.md`
- Create: `src/practice/ipqc.md`
- Create: `src/practice/oqc.md`
- Create: `src/practice/nonconforming.md`
- Create: `src/tools-online/index.md`
- Create: `src/tools-online/grr-calculator.md`

- [ ] **Step 1: Create IQC page (src/practice/index.md)**

Cover: 来料检验流程, 抽样计划 (AQL), 供应商管理, 来料不合格处理。

- [ ] **Step 2: Create IPQC page (src/practice/ipqc.md)**

Cover: 首件检验, 巡检, 过程能力监控, 控制图现场应用。

- [ ] **Step 3: Create OQC page (src/practice/oqc.md)**

Cover: 出货检验流程, 成品抽样, 包装检验, 检验报告。

- [ ] **Step 4: Create nonconforming page (src/practice/nonconforming.md)**

Cover: 不合格品标识与隔离, MRB 流程, 让步接收/返工/报废处置, NCR 开具。

- [ ] **Step 5: Create CPK calculator page (src/tools-online/index.md)**

Setup as a Vue interactive component for calculating Cp/Cpk from user input.

- [ ] **Step 6: Create GRR calculator page (src/tools-online/grr-calculator.md)**

Setup as a Vue interactive component for GRR calculation.

- [ ] **Step 7: Build and verify**

```bash
npx vitepress build
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add practice and online tools pages"
```

---

### Task 9: Configure GitHub Pages Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create GitHub Actions workflow**

```yaml
# .github/workflows/deploy.yml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main]

  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npx vitepress build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Add base URL config**

```ts
// In .vitepress/config.mts
base: '/quality-engineer-learning-site/',
```

- [ ] **Step 3: Final build verification**

```bash
npx vitepress build
```

Expected: Clean build, output in `.vitepress/dist/`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "ci: add GitHub Pages deployment workflow"
```

---

## Self-Review Checklist

- [ ] 1. **Spec coverage**: All 6 sections (basic, tools, standards, practice, certification, online tools) have corresponding tasks.
- [ ] 2. **Placeholder scan**: No TBD/TODO/placeholder content — all page descriptions are concrete.
- [ ] 3. **Type consistency**: Directory paths, navigation links, and sidebar config all reference the same structure.
- [ ] 4. **Build order**: Tasks ordered by dependency — config before content, content before deployment.
