import { DefaultTheme } from "vitepress"

const nav: DefaultTheme.NavItem[] = [
  { text: "Home", link: "/" },
  {
    text: "前端生态",
    items: [
      {
        text: "Vue 生态",
        items: [
          { text: "Element UI", link: "https://element.eleme.cn/#/zh-CN" },
          { text: "Element Plus", link: "https://element-plus.org/zh-CN" },
          { text: "Arco Design", link: "https://arco.design" },
          { text: "Vuetify", link: "https://vuetifyjs.com/zh-Hans" },
          { text: "VueUse", link: "https://vueuse.org" },
          { text: "Nuxt.js", link: "https://nuxt.com" }
        ]
      },
      {
        text: "React 生态",
        items: [
          { text: "Ant Design", link: "https://ant.design/index-cn" },
          { text: "Shadcn UI", link: "https://ui.shadcn.com" },
          { text: "Zustand", link: "https://zustand-demo.pmnd.rs" },
          { text: "Next.js", link: "https://nextjs.org" }
        ]
      },
      {
        text: "CSS 生态",
        items: [
          { text: "UnoCSS", link: "https://unocss.dev" },
          { text: "Tailwind", link: "https://tailwindcss.com" },
          { text: "Bootstrap", link: "https://v5.bootcss.com" }
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
  {
    text: "其他项目",
    items: [
      { text: "Web Docs", link: "http://docs.yuwenjian.com" },
      { text: "Blog", link: "http://blog.yuwenjian.com" }
    ]
  }
]

export default nav
