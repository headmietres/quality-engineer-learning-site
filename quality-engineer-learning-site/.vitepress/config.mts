import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '品质工程师技能学习',
  description: '系统化的品质工程学习平台，从入门到进阶',
  lang: 'zh-CN',
  srcDir: 'src',
  lastUpdated: true,
  cleanUrls: true,
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
