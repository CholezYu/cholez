<script setup lang="ts">
  import { VPTeamPage, VPTeamPageTitle, VPTeamMembers } from "vitepress/theme"
  
  const members = [
    {
      avatar: "https://www.github.com/CholezYu.png",
      name: "Cholez.Yu",
      title: "Front-end King",
      desc: "🌈 仰望星空的人，不应该被嘲笑",
      links: [
        { icon: "github", link: "https://github.com/CholezYu" },
        {
          icon: { svg: `<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M937.395 423.91a387.61 387.61 0 0 1-232.883-77.824v352.308c0 179.942-138.624 325.606-309.606 325.606-171.008 0-309.607-145.69-309.607-325.606 0-179.892 138.599-325.581 309.607-325.581 17.1 0 33.69 1.485 49.894 4.275v186.624a132.787 132.787 0 0 0-48.589-9.216c-76.288 0-138.214 65.024-138.214 145.306 0 80.204 61.9 145.305 138.214 145.305 76.186 0 138.087-65.1 138.087-145.305V0h172.697c0 134.502 103.68 243.507 231.603 243.507v180.301l-1.203 0.102z" /></svg>` },
          link: "https://v.douyin.com/i2THwY7e"
        }
      ]
    },
    {
      avatar: "https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-i-0813_ooI98CkABJNjr6oonAEeWqeCLAAC0gbODHAAzz~c5_300x300.jpeg?from=2956013662",
      name: "小丸子",
      title: "清清不开心",
      desc: "FE Developer",
      links: [
        {
          icon: { svg: `<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M937.395 423.91a387.61 387.61 0 0 1-232.883-77.824v352.308c0 179.942-138.624 325.606-309.606 325.606-171.008 0-309.607-145.69-309.607-325.606 0-179.892 138.599-325.581 309.607-325.581 17.1 0 33.69 1.485 49.894 4.275v186.624a132.787 132.787 0 0 0-48.589-9.216c-76.288 0-138.214 65.024-138.214 145.306 0 80.204 61.9 145.305 138.214 145.305 76.186 0 138.087-65.1 138.087-145.305V0h172.697c0 134.502 103.68 243.507 231.603 243.507v180.301l-1.203 0.102z" /></svg>` },
          link: "https://v.douyin.com/ij2Q7eeF"
        }
      ]
    }
  ]
</script>

<template>
  <VPTeamPage>
    <VPTeamPageTitle>
      <template #title>
        核心成员介绍
      </template>
    </VPTeamPageTitle>
    <VPTeamMembers :members="members" />
  </VPTeamPage>
</template>
