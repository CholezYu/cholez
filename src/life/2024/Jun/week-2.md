# 第二周

## 周一 Mon. <Badge type="info" text="06-03" />

### 导出 Excel

遇到一个比较复杂的需求，需要导出 Excel 表格，并且每条数据中都包含图片，也就是需要将 url 转成 base64 并插入到表格中，然后导出。

经过几个小时的摸索，最终使用 Exceljs 实现了这个需求。

> [!warning] 有几个注意点
>
> 1. url 转 base64 是异步的；
>
> 2. 将这些 base64 插入到表格也是异步的；
>
> 3. 将工作簿对象 workbook 生成的 buffer 转为 blob 也是异步任务。即使它在最后一步，如果不进行异步处理的话，loading
     会提前结束，页面会呈现几秒的卡死状态。
>
> 经过反复尝试，上述异步任务都需要进行处理，缺少任何一个都不能成功导出带图片的 Excel。

```ts
import ExcelJS from "exceljs"
import FileSaver from "file-saver"
import urlToBase64 from "@/utils"

async function toExcel(data, headers, title) {
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet("sheet")
  sheet.columns = headers
  sheet.addRows(data)
  
  for (let i = 1; i <= headers.length; i++) { // 列
    for (let j = 1; j <= data.length + 1; j++) { // 行
      if (j > 1) sheet.getRow(j).height = 120
      sheet.getRow(j).getCell(i).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true
      }
      sheet.getRow(j).getCell(i).font = {
        name: "Arial Unicode MS",
        size: 10
      }
    }
    sheet.getRow(1).getCell(i).font.bold = true
  }
  
  // [empty, "图片", url, url, url ...]
  const urls = sheet.getColumn(2).values.slice(2)
  
  await (async function () {
    for (let row = 1; row <= urls.length; row++) {
      const base64 = await urlToBase64(urls[row - 1])
      const imageId = workbook.addImage({
        base64: base64.toString(),
        extension: "jpeg"
      })
      
      // 清空 url 文本，只显示图片
      sheet.getCell(`B${row + 1}`).value = ""
      
      sheet.addImage(imageId, {
        tl: { row, col: 1 },
        ext: { width: 120, height: 120 }
      })
    }
  })()
  
  await workbook.xlsx.writeBuffer().then(buffer => {
    const _file = new Blob([buffer], { type: "application/octet-stream" })
    FileSaver.saveAs(_file, `${title}.xlsx`)
  })
}
```

> [!tip] 继续优化
>
> 如果导出的数据过多，那么导出过程就会持续很久。即使使用了 loading 并监听进度，用户的体验也不是很好，因为页面处于 “阻塞” 状态。后续我会尝试使用 webwoker
> 将导出的过程交给分线程处理，这样用户在等待的同时可以继续使用页面。

### 非平衡树

了解了二叉搜索树可能因为一些操作变成 “非平衡树”，目前很好的解决方案是使用**红黑树**。

看很多资料都说红黑树学起来很困难，势必拿下 😁😎！

## 周五 Fri. <Badge type="info" text="06-07" />

### 红黑树 <Badge type="warning" text="pending" />

看了两天红黑树，翻了些资料，都还是没太看懂。目前只掌握了 **变色**、**左旋转**、**右旋转** 的原理，对于一些复杂情况，还是不知道从哪开始下手。
虽然遇到了困难，但是不会止步于红黑树。学习的步伐不会停止，所以，我决定先学点其他技术，换换思维，也正好消化一下之前学的数据结构。

## 周六 Sat. <Badge type="info" text="06-08" />

### 重启 React

经过深思熟虑，我决定开始对 React 系列下手，因为之前已经学过 React，有一定的基础。 这次的目标是 [React Native](https://reactnative.dev)
和 [Next.js](https://nextjs.org)。但是太长时间没写 React 了，所以还是先回顾一下。

现在 React 的开发基本上都是使用函数式组件，类式组件的部分就略过了。

### 核心 Hooks

`useState` 需要注意的是，它是异步的，所以不应该在执行 `setState` 后立即获取最新的状态。以及相同 `setState` 的合并处理，并且组件只会重新渲染**一次**。

`useEffect` 是 React 一个比较重要并且难理解的 hook。我们需要注意 `setup` 和 `cleanup` 函数的执行时机，以及受到依赖项的控制。
最重要的是，如何正确使用 `useEffect`，这里就需要知道哪些操作是 **副作用**。

## 周日 Sun. <Badge type="info" text="06-09" />

### 丞相走好

今天看到《新三国》94集，上方谷的一场大雨浇灭了丞相北伐的希望，“天不助我，助尔曹” 😭 虽然已经看过无数遍，还是会被感动。一定要去一次武侯祠。

还有最近一直在抖音刷到一首歌，已经单曲循环一下午了，“假如爱有天意”——李健。

### 高阶组件

之前学习 React 的时候直接跳过了高阶组件，以为是很高深的技术，现在再来看感觉很好理解。跟 Vue Hooks 的作用其实差不多，都是抽离代码，进行逻辑复用。

写一个小案例。它可以赋予目标组件输出日志的功能。

```tsx
const WithLog = (Component: FC<any>) => {
  return (props: any) => {
    useEffect(() => {
      console.log(`${Component.name} 组件已挂载 ${now()}`)
      
      return () => {
        console.log(`${Component.name} 组件已卸载 ${now()}`)
      }
    }, [])
    
    return <Component {...props} />
  }
}
```

下面是一个我非常喜欢使用的 Pagination Hook。

```ts
function usePagination(config: {
  callback: Function,
  initTotal?: number,
  initCurrent?: number,
  initSize?: number
}) {
  const { callback, initTotal, initCurrent, initSize } = config
  
  // 总条数
  const total = ref(initTotal ?? 0)
  
  // 当前页
  const current = ref(initCurrent ?? 1)
  
  // 每页条数
  const size = ref(initSize ?? 10)
  
  // 当前页改变时
  const onCurrentChange = (nowCurrent: number) => {
    current.value = nowCurrent
    callback()
  }
  
  // 每页条数改变时
  const onSizeChange = (nowSize: number) => {
    size.value = nowSize
    if (current.value > Math.ceil(total.value / size.value)) {
      current.value = Math.ceil(total.value / size.value)
    }
    callback()
  }
  
  return {
    pagination: { total, current, size },
    onCurrentChange,
    onSizeChange
  }
}
```

这么看来，不管是 React HOC 还是 Vue Hooks，它们本质上都是一个函数，React HOC 会返回一个组件，而 Vue Hooks 则是返回一些响应式数据和方法。
