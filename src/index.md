---
layout: home

title: Cholez
titleTemplate: 仰望星空的人，不应该被嘲笑

hero:
  name: Cholez
  text: Front-End King
  tagline: 🌈 仰望星空的人，不应该被嘲笑
  
  image:
    src: /icon.png
    alt: Cholez
  
  actions:
    - theme: brand
      text: 开始阅读
      link: /intro
    
    - theme: alt
      text: 在 GitHub 上查看
      link: https://github.com/CholezYu/cholez

features:
  - icon: 📖
    title: 前端文档
    details: 我会不断学习，并实时更新任何前端的知识。
    link: http://docs.yuwenjian.com
    linkText: Cholez Web Docs
  
  - icon: ✏️
    title: 算法
    details: 算法对于前端来说重要吗？思考这个问题的时间，不如直接开始吧。
    link: /algorithm/
    linkText: LeetCode
  
  - icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 256 220.8"><path fill="#41B883" d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36Z"/><path fill="#41B883" d="m0 0 128 220.8L256 0h-51.2L128 132.48 50.56 0H0Z"/><path fill="#35495E" d="M50.56 0 128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56Z"/></svg>
    title: 深入解析 Vue.js
    details: Vue 3 的响应系统、渲染器、组件化究竟是如何实现的呢？
    link: /
    linkText: 解读《Vue.js 设计与实现》
  
  - icon: 🏠
    title: 日常动态
    details: 记录一下工作中遇到的问题，每天的学习与成长，以及其他兴趣爱好。
    link: /life/2024/
    linkText: 今天也是充满希望的一天
---

<script setup>
  import Members from "./components/Members.vue"
</script>

<Members />
