import { DefaultTheme } from "vitepress"

const sidebar: DefaultTheme.Sidebar = {
  "/": [
    {
      text: "开始",
      items: [
        { text: "简介", link: "/intro" }
      ]
    },
    {
      text: "🗓 我的 2024",
      link: "/life/2024/",
      items: [
        {
          text: "六月 June",
          link: "/life/2024/Jun"
        },
        {
          text: "七月 July",
          link: "/life/2024/Jul"
        },
        {
          text: "八月 August",
          link: "/life/2024/Aug"
        }
      ]
    }
  ],
  
  "/algorithm/": [
    {
      text: "<b>为什么学习算法？</b>",
      link: "/algorithm/"
    },
    {
      text: "数组",
      collapsed: false,
      items: [
        { text: "#1. 两数之和", link: "/algorithm/array-list/1.两数之和" }
      ]
    }
  ]
}

export default sidebar
