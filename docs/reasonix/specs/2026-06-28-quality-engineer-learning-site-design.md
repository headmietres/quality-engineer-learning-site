# 品质工程师技能学习网站 — 设计文档

## 1. 概述

一个面向品质工程师的静态技能学习网站，覆盖从入门到进阶的系统化学习路径。采用 VitePress 构建，Markdown 编写内容，部署简单，维护成本低。

## 2. 目标用户

- **初学者**：刚入行或在校学生，需要系统学习品质工程基础知识
- **进阶者**：有经验的质量工程师，希望提升高阶技能或备考认证
- 网站同时为两类用户提供区分的学习路径

## 3. 技术选型

| 层面 | 选择 | 理由 |
|---|---|---|
| 框架 | VitePress 2.x | 轻量、快速、中文友好、基于 Vite |
| 语言 | Markdown + Vue 组件 | 内容编写简单，必要时可嵌入互动组件 |
| 主题 | VitePress 默认主题 | 内置导航、侧边栏、搜索，满足需求 |
| 部署 | GitHub Pages / Vercel / Netlify | 静态站点，任意 CDN 均可 |
| 搜索 | VitePress 内置 `minisearch` | 支持中文全文搜索 |
| 版本管理 | Git | 内容即代码 |

## 4. 内容结构

```
quality-engineer-learning-site/
├── .vitepress/
│   └── config.mts              # 站点配置
├── public/                      # 静态资源
├── src/
│   ├── index.md                 # 首页
│   ├── guide/
│   │   ├── index.md             # 学习路径总览
│   │   ├── getting-started.md   # 快速入门
│   │   └── prerequisites.md     # 预备知识
│   ├── basic/                   # 基础入门
│   │   ├── index.md
│   │   ├── quality-overview.md  # 质量工程概述
│   │   ├── statistics-basics.md # 统计基础
│   │   └── terminology.md       # 常用术语
│   ├── tools/                   # 质量工具与方法论
│   │   ├── index.md
│   │   ├── qc-7-tools.md        # QC 七大手法
│   │   ├── spc.md               # SPC 统计过程控制
│   │   ├── fmea.md              # FMEA 失效模式分析
│   │   ├── msa.md               # MSA 测量系统分析
│   │   ├── ppap.md              # PPAP
│   │   └── 8d-report.md         # 8D 报告
│   ├── standards/               # 质量管理体系
│   │   ├── index.md
│   │   ├── iso-9001.md
│   │   ├── iatf-16949.md
│   │   ├── six-sigma.md
│   │   └── lean-production.md
│   ├── practice/                # 质检实操
│   │   ├── index.md
│   │   ├── iqc.md               # 来料检验
│   │   ├── ipqc.md              # 过程检验
│   │   ├── oqc.md               # 出货检验
│   │   └── nonconforming.md     # 不合格品处理
│   ├── certification/           # 认证考试
│   │   ├── index.md
│   │   ├── cqe.md               # CQE 备考
│   │   ├── six-sigma-belt.md    # 六西格玛绿带/黑带
│   │   └── mock-exam.md         # 模拟试题
│   └── tools-online/            # 在线工具
│       ├── index.md
│       ├── cpk-calculator.md    # CPK 在线计算
│       └── grr-calculator.md    # GRR 在线计算
└── package.json
```

## 5. 导航与信息架构

### 顶层导航

```
首页 | 学习路径 | 质量工具 | 体系标准 | 质检实操 | 认证考试 | 在线工具
```

### 侧边栏结构

按内容板块组织，每个板块可折叠展开。初学用户从"学习路径"开始，进阶用户可直接跳转到所需模块。

### 学习路径设计

**初学者路径：**
1. 质量工程概述 → 统计基础 → QC七大手法 → SPC → 来料检验
2. ISO 9001 基础 → FMEA → 过程检验
3. MSA → 8D报告 → 出货检验

**进阶者路径：**
1. IATF 16949 → 六西格玛 → 精益生产
2. CQE 备考 / 六西格玛认证备考
3. 高级 SPC → 复杂 FMEA 案例

## 6. 页面模板与风格

### 内容页面规范
- 每个知识点页面包含：概述、核心概念、图文说明、案例/示例、自测问题
- 代码块用于公式、流程、检查表等
- 数学公式使用 KaTeX（VitePress 插件支持）

### 视觉风格
- 清爽、专业的技术文档风格
- 配色：蓝色系为主（稳重、专业），配合暖色高亮
- 支持明暗主题切换

## 7. 扩展性

- **第一阶段**：内容站点（本文档范围）
- **第二阶段**：在线工具（CPK/GRR 计算器等 Vue 组件）
- **第三阶段**：交互式测验、学习进度追踪（可选）

## 8. 部署方案

| 平台 | 优点 |
|---|---|
| GitHub Pages | 免费，与 Git 工作流集成 |
| Vercel | 自动部署，国内访问需注意 |
| Netlify | 同上，适合国际用户 |

推荐：**GitHub Pages**（集成最简单，适合内容站点）。

## 9. 项目实施计划

1. 初始化 VitePress 项目
2. 配置导航和侧边栏
3. 编写核心内容（按优先级：基础入门 → 质量工具 → 体系标准 → 质检实操 → 认证考试）
4. 配置部署
5. 上线迭代

---

*设计版本：v1.0*
*日期：2026-06-28*
