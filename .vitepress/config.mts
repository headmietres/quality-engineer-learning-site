import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '品质工程师技能学习',
  description: '系统化的品质工程学习平台，从入门到进阶',
  lang: 'zh-CN',
  srcDir: 'src',
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  base: '/quality-engineer-learning-site/',
  themeConfig: {
    siteTitle: '品质工程师技能学习',
    nav: [
      { text: '首页', link: '/' },
      { text: '学习路径', link: '/guide/' },
      { text: '质量工具', link: '/tools/' },
      { text: '体系标准', link: '/standards/' },
      { text: '质检实操', link: '/practice/' },
      { text: '认证考试', link: '/certification/' },
      { text: '在线工具', link: '/tools-online/' },
      { text: '案例研究', link: '/case-studies/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '学习路径',
          items: [
            { text: '总览', link: '/guide/' },
            { text: '快速入门', link: '/guide/getting-started' },
            { text: '预备知识', link: '/guide/prerequisites' },
            { text: '控制图选择指南', link: '/guide/control-chart-guide' },
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
      '/case-studies/': [
        {
          text: '案例研究',
          items: [
            { text: '案例总览', link: '/case-studies/' },
            { text: 'SPC 汽车案例', link: '/case-studies/spc-automotive' },
            { text: 'FMEA 电子案例', link: '/case-studies/fmea-electronics' },
            { text: '8D 供应商案例', link: '/case-studies/8d-supplier' },
          ]
        }
      ],
    },
    editLink: {
      pattern: 'https://github.com/your-username/quality-engineer-learning-site/edit/main/src/:path',
      text: '在 GitHub 上编辑此页'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/quality-engineer-learning-site' }
    ],
    footer: {
      message: '用心学习，匠心品质',
      copyright: 'Copyright © 2026'
    },
    search: {
      provider: 'local'
    }
  },
  markdown: {
    math: true
  }
})
