import { defineConfig } from "vitepress"
import { title, titleTemplate, description, logo } from "./meta"
import sidebar from "./sidebar"
import nav from "./nav"
import head from "./head"

export default defineConfig({
  title,
  
  titleTemplate,
  
  description,
  
  // 打包目录
  outDir: "./dist",
  
  // 是否显示最后更新时间
  lastUpdated: true,
  
  // 删除 .html, 会有刷新 404 的 bug
  // cleanUrls: true,
  
  // 提取 meta, 减少服务器带宽
  metaChunk: true,
  
  themeConfig: {
    logo,
    
    sidebar,
    
    nav,
    
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
      message: `<a href="https://beian.miit.gov.cn" target="_blank" style="text-decoration: none">赣ICP备2024033222号-1</a>`,
      copyright: `Copyright © 2024 <a href="https://github.com/CholezYu" target="_blank">俞文健</a>`
    },
    
    search: {
      provider: "local"
    },
    
    // 是否在 markdown 中的外部链接旁显示外部链接图标
    externalLinkIcon: true
  },
  
  head
})
