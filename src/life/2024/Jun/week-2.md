# 第二周

## 周一 Mon. <Badge type="info" text="06-03" />

### 偶遇难题

遇到一个比较困难的需求，需要导出 Excel 表格，并且每条数据中都包含图片，也就是需要将 url 转成 base64 并插入到表格中，然后导出。

经过几个小时的摸索，最终使用 Exceljs 实现了这个需求。

> [!warning] 有几个注意点
>
> 1. url 转 base64 是异步的，所以需要使用 await 等待；
>
> 2. 将这些 base64 插入到表格中也是异步任务。如下列代码所示，我对 urlToBase64 所在的匿名自执行函数使用了 await 进行等待；
>
> 3. 最后，将工作簿对象 workbook 生成的 buffer 转为 blob 也是异步任务，也需要使用 await。即使它在最后一步，如果不使用 await 的话，loading
     会提前结束，页面会呈现几秒钟的卡死状态。
>
> 经过反复尝试，少一个 **await** 都不能成功导出带图片的 Excel。

> [!tip] 继续优化
>
> 如果导出的数据过多，那么导出过程就会持续很久。即使使用了 loading 并监听进度，用户的体验也不是很好，因为页面处于 “阻塞” 状态。后续我会尝试使用 webwoker
> 将导出的过程交给分线程处理，这样用户在等待的同时可以继续使用页面。

```ts
import { Workbook } from "exceljs"
import { saveAs } from "file-saver/dist/FileSaver"
import { urlToBase64 } from "@/utils/urlToBase64"

async function toExcel(data, headers, title) {
  const workbook = new Workbook()
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
      sheet.getCell(`B${ row + 1 }`).value = ""
      
      sheet.addImage(imageId, {
        tl: { row, col: 1 },
        ext: { width: 120, height: 120 }
      })
    }
  })()
  
  await workbook.xlsx.writeBuffer().then(buffer => {
    const _file = new Blob([buffer], { type: "application/octet-stream" })
    saveAs(_file, `${ title }.xlsx`)
  })
}
```

### 挑灯夜读

了解了二叉搜索树可能因为一些操作变成 “非平衡树”，目前很好的解决方案是使用**红黑树**。

看很多资料都说红黑树学起来很困难，势必拿下 😁😎！
