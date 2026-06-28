# 品质工程师技能学习平台

> 系统化的品质工程学习平台，从入门到进阶

一款基于 [VitePress](https://vitepress.dev/) 构建的中文静态学习网站，覆盖 QC 七大手法、SPC、FMEA、MSA、PPAP、六西格玛、ISO 9001 等核心质量工程知识。

## 🚀 在线地址

[https://headmietres.github.io/quality-engineer-learning-site/](https://headmietres.github.io/quality-engineer-learning-site/)

## 📚 内容概览

| 模块 | 说明 | 页面数 |
|------|------|--------|
| **学习路径** | 初学者/进阶者学习路线、快速入门、预备知识 | 4 |
| **基础入门** | 质量工程概述、统计基础、常用术语 | 4 |
| **质量工具** | QC 七大手法、SPC、FMEA、MSA、PPAP、8D 报告 | 7 |
| **体系标准** | ISO 9001、IATF 16949、六西格玛、精益生产 | 5 |
| **质检实操** | IQC、IPQC、OQC、不合格品处理 | 5 |
| **认证考试** | CQE 备考、六西格玛绿带/黑带、模拟试题 | 4 |
| **在线工具** | Cp/Cpk 计算器、GRR 计算器（交互式 Vue 组件） | 2 |
| **案例研究** | SPC 汽车案例、FMEA 电子案例、8D 供应商案例 | 4 |

**总计：32 个页面**

## ✨ 特色功能

### 📊 交互式在线计算器

- **Cp/Cpk 计算器** — 支持摘要模式（输入均值+标准差）和原始数据模式（粘贴数据点），自动计算 Cp/Cpk/Cpu/Cpl/Pp/Ppk 及预期不良率
- **GRR 计算器** — 支持 2~4 名操作员 × 5~15 个零件 × 2~3 次测量，使用均值-极差法（AIAG 推荐），自动输出 EV/AV/GRR/%GRR/ndc 及判定结果

### 📝 案例驱动学习

实际制造业案例帮助将理论知识应用于实践：
- **SPC 汽车案例** — 发动机挺柱生产过程能力分析
- **FMEA 电子案例** — 智能手表充电座 DFMEA 分析
- **8D 供应商案例** — PCB 镀层厚度问题完整 8D 过程

### 🔧 SPC 控制图选择指南

完整的控制图选择流程图，涵盖 X̄-R、X̄-S、I-MR、p、np、c、u 七种控制图的使用场景和注意事项。

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| [VitePress](https://vitepress.dev/) 1.6.x | 静态站点生成器 |
| [Vue 3](https://vuejs.org/) | 交互式组件框架 |
| [KaTeX](https://katex.org/) | 数学公式渲染（`markdown.math: true`） |
| GitHub Pages | 部署托管 |

## 📦 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 🌐 部署

项目使用 GitHub Actions 自动部署到 GitHub Pages。推送至 `main` 分支将自动触发构建和部署。

部署配置：
- `.github/workflows/deploy.yml` — GitHub Actions 工作流
- `.vitepress/config.mts` — `base: '/quality-engineer-learning-site/'`

## 📁 项目结构

```
.
├── .github/workflows/deploy.yml    # CI/CD 部署配置
├── .vitepress/
│   ├── config.mts                   # VitePress 站点配置
│   ├── theme/
│   │   ├── index.ts                 # 主题入口（Vue 组件注册）
│   │   ├── CpkCalc.vue             # Cp/Cpk 交互计算器组件
│   │   └── GrrOnline.vue           # GRR 交互计算器组件
│   └── dist/                        # 构建输出（自动生成）
├── src/                             # 站点源文件
│   ├── index.md                     # 首页
│   ├── guide/                       # 学习路径
│   ├── basic/                       # 基础入门
│   ├── tools/                       # 质量工具
│   ├── tools-online/                # 在线工具
│   ├── standards/                   # 体系标准
│   ├── practice/                    # 质检实操
│   ├── certification/               # 认证考试
│   └── case-studies/                # 案例研究
├── public/                          # 静态资源
└── package.json
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进内容或功能。

## 📄 许可

MIT License
