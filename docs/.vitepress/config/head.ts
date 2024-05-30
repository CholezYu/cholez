import { HeadConfig } from "vitepress"

const head: HeadConfig[] = [
  ["meta", { name: "author", content: "Cholez.Yu" }],
  ["meta", { name: "keywords", content: "Cholez, Web, Front-end, Vue, React, Algorithm" }],
  
  ["link", { rel: "icon", href: "/favicon.ico" }],
  
  ["meta", { property: "og:site_name", content: "Cholez" }],
  ["meta", { property: "og:title", content: "Cholez | Front-end King" }],
  ["meta", { property: "og:description", content: "前端文档、算法、深入解析 Vue.js、记录生活" }],
  ["meta", { property: "og:url", content: "http://cholez.cn" }]
]

export default head
