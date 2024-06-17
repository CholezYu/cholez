import { DefaultTheme } from "vitepress"

const nav: DefaultTheme.NavItem[] = [
  { text: "🗓 我的 2024", link: "/life/2024/" },
  { text: "📖 前端文档", link: "http://docs.yuwenjian.com" },
  { text: "✏️ LeetCode", link: "/algorithm/" },
  {
    text: "🔥 生态系统",
    items: [
      {
        text: "Vue 生态",
        items: [
          { text: "Arco Design", link: "https://arco.design" },
          { text: "Element Plus", link: "https://element-plus.org/zh-CN" },
          { text: "PrimeVue", link: "https://primevue.org" },
          { text: "VueUse", link: "https://vueuse.org" },
          { text: "Nuxt", link: "https://nuxt.com" }
        ]
      },
      {
        text: "React 生态",
        items: [
          { text: "Ant Design", link: "https://ant.design/index-cn" },
          { text: "Material UI", link: "https://mui.com" },
          { text: "Shadcn UI", link: "https://ui.shadcn.com" },
          { text: "Zustand", link: "https://zustand-demo.pmnd.rs" },
          { text: "React Native", link: "https://reactnative.dev" },
          { text: "Expo", link: "https://expo.dev" },
          { text: "Next", link: "https://nextjs.org" }
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
  },
  { text: "博客", link: "http://blog.yuwenjian.com" }
]

export default nav
