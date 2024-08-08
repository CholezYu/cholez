import { DefaultTheme } from "vitepress"

const nav: DefaultTheme.NavItem[] = [
  {
    text: "🏠 学习动态",
    items: [
      { text: "2024", link: "/life/2024/" }
    ]
  },
  { text: "📖 前端文档", link: "http://docs.yuwenjian.com" },
  { text: "✏️ LeetCode", link: "/algorithm/" },
  {
    text: "🔥 生态系统",
    items: [
      {
        text: "Vue 生态",
        items: [
          { text: "VueUse", link: "https://vueuse.org" },
          { text: "Element Plus", link: "https://element-plus.org/zh-CN" },
          { text: "Nuxt", link: "https://nuxt.com" }
        ]
      },
      {
        text: "React 生态",
        items: [
          { text: "Zustand", link: "https://zustand-demo.pmnd.rs" },
          { text: "Umi", link: "https://umijs.org" },
          { text: "Ant Design", link: "https://ant.design/index-cn" },
          { text: "Next", link: "https://nextjs.org" }
        ]
      },
      {
        text: "移动端",
        items: [
          { text: "React Native", link: "https://reactnative.dev" },
          { text: "Flutter", link: "https://flutter.dev" },
          { text: "Kotlin", link: "https://kotlinlang.org" }
        ]
      },
      {
        text: "CSS",
        items: [
          { text: "Tailwind", link: "https://tailwindcss.com" },
          { text: "UnoCSS", link: "https://unocss.dev" }
        ]
      },
      {
        text: "静态站点",
        items: [
          { text: "VitePress", link: "https://vitepress.dev/zh" },
          { text: "Astro", link: "https://docs.astro.build/zh-cn/getting-started" }
        ]
      }
    ]
  }
]

export default nav
