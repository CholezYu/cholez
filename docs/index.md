---
layout: home

title: Cholez
titleTemplate: Front-end King

hero:
  name: Cholez
  text: Front-end King
  tagline: 我曾踏足山巅，也曾跌入低谷，二者都让我受益良多
  
  image:
    src: /icon.png
    alt: Cholez
  
  actions:
    - theme: brand
      text: 开始阅读
      link: /intro
    
    - theme: alt
      text: 在 GitHub 上查看
      link: https://github.com/choIez/cholez

features:
  - icon: 📖
    title: 前端文档
    details: 我会不断学习，并实时更新任何前端的知识。
    link: http://docs.yuwenjian.com
    linkText: Cholez Web Docs
  
  - icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 256 220.8"><path fill="#41B883" d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36Z"/><path fill="#41B883" d="m0 0 128 220.8L256 0h-51.2L128 132.48 50.56 0H0Z"/><path fill="#35495E" d="M50.56 0 128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56Z"/></svg>
    title: 深入解析 Vue.js
    details: 响应系统、渲染器、组件化、编译器究竟是如何实现的呢？
    link: /
    linkText: 解读《Vue.js 设计与实现》
  
  - icon: ✏️
    title: 算法
    details: 算法对于前端来说重要吗？思考这个问题的时间，不如写一道算法题。
    link: /
    linkText: 每日 LeetCode
  
  - icon: 🏠
    title: 记录生活
    details: 今天，也是充满希望的一天。
    link: /
    linkText: 下班后的我是这样的
---

<script setup>
  import { VPTeamPage, VPTeamPageTitle, VPTeamMembers } from "vitepress/theme"
  import icons from "./.vitepress/theme/icons/index.ts"
  
  const members = [
    {
      avatar: "https://www.github.com/choIez.png",
      name: "Cholez.Yu",
      title: "Front-end King",
      desc: `🌈 我曾踏足山巅，也曾跌入低谷，二者都让我受益良多`,
      links: [
        { icon: "github", link: "https://github.com/choIez" },
        { icon: { svg: icons.tiktok }, link: "https://v.douyin.com/i2THwY7e" },
      ]
    },
    {
      avatar: "https://tvax2.sinaimg.cn/crop.0.0.1080.1080.180/005RX5vhly8h38p5mm9muj30u00u0jud.jpg?KID=imgbed,tva&Expires=1717071014&ssig=35XSeMU61L",
      name: "小丸子",
      title: "清清不开心",
      desc: `FE Developer <br /> My Honey`,
      links: [
        { icon: { svg: icons.tiktok }, link: "https://v.douyin.com/ij2Q7eeF" }
      ]
    }
  ]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      核心成员介绍
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="members" />
</VPTeamPage>
