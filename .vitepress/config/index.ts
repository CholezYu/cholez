import { defineConfig } from "vitepress"
import sidebar from "./sidebar"
import nav from "./nav"

export default defineConfig({
  title: "Cholez",
  titleTemplate: true,
  description: "前端文档、算法、深入解析 Vue.js、记录生活",
  
  srcDir: "src",
  outDir: "dist",
  
  themeConfig: {
    sidebar,
    nav,
    
    logo: "/icon.png",
    
    socialLinks: [
      { icon: "github", link: "https://github.com/CholezYu/cholez" }
    ],
    
    outline: {
      level: [2, 6],
      label: "导航栏"
    },
    
    returnToTopLabel: "返回顶部",
    
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium"
      }
    },
    
    docFooter: {
      prev: "上一页",
      next: "下一页"
    },
    
    footer: {
      message: `<a href="https://beian.miit.gov.cn" target="_blank" style="text-decoration: none">赣ICP备2024033222号-2</a>`,
      copyright: `Copyright © 2024 <a href="https://github.com/CholezYu" target="_blank">俞文健</a>`
    },
    
    search: {
      provider: "local"
    },
    
    // 是否在 markdown 中的外部链接旁显示外部链接图标
    externalLinkIcon: true
  },
  
  head: [
    ["meta", { name: "author", content: "Cholez.Yu" }],
    ["meta", { name: "keywords", content: "Cholez, Web, Front-end, Vue, React, Algorithm" }],
    
    ["link", { rel: "icon", href: "/favicon.ico" }],
    
    ["meta", { property: "og:site_name", content: "Cholez" }],
    ["meta", { property: "og:title", content: "Cholez | Front-end King" }],
    ["meta", { property: "og:description", content: "前端文档、算法、深入解析 Vue.js、记录生活" }],
    ["meta", { property: "og:url", content: "http://cholez.cn" }]
  ],
  
  // 是否显示最后更新时间
  lastUpdated: true,
  
  // 删除 .html, 会有刷新 404 的 bug
  // cleanUrls: true,
  
  // 提取 meta, 减少服务器带宽
  metaChunk: true
})
