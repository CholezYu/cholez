---
outline: 2
---

# 六月 June

## 二叉搜索树

详见 [二叉搜索树 | Docs.Algorithm](http://docs.yuwenjian.com/algorithm/tree.html#二叉搜索树)。
实现了 **插入**、 **查找**、 **删除** 操作。

::: code-group

```ts [插入]
BinarySearchTree.insert = function (pair: Pair<T>) {
  const node = new TreeNode(pair)
  // 根节点为 null，直接插入到根节点
  if (!this.root) {
    this.root = node
    return
  }
  recursion(node, this.root)
  
  /**
   * 递归比较节点
   * @param current - 当前节点
   * @param target - 目标节点
   */
  function recursion(current: TreeNode<T>, target: TreeNode<T>) {
    if (current.pair.key < target.pair.key) { // 目标节点更大，向左子树插入
      // 左子树为 null，直接插入
      if (!target.left) target.left = current
      // 左子树存在节点，继续比较
      else recursion(current, target.left)
    }
    else { // 目标节点小于插入的节点，向右子树插入
      // 右子树为 null，直接插入
      if (!target.right) target.right = current
      // 右子树存在节点，继续比较
      else recursion(current, target.right)
    }
  }
}
```

```ts [查找]
BinarySearchTree.search = function (target: number) {
  return recursion(this.root, target)
  
  /**
   * 递归查找节点
   * @param current - 当前节点
   * @param target - 目标节点
   */
  function recursion(current: TreeNode<T> | null, target: number) {
    if (!current) return null
    if (current.pair.key > target) return recursion(current.left, target)
    if (current.pair.key < target) return recursion(current.right, target)
    if (current.pair.key === target) return current
  }
  
  /* 循环实现 */
  // let current = this.root
  // while (current) {
  //   if (current.pair.key > target) {
  //     current = current.left
  //     continue
  //   }
  //   if (current.pair.key < target) {
  //     current = current.right
  //     continue
  //   }
  //   if (current.pair.key === target) return current
  // }
  // return null
}
```

```ts [删除]
BinarySearchTree.remove = function (target: number) {
  let type: "left" | "right" = "left"
  let parent: TreeNode<T> | null = null
  let current = this.root
  
  while (current && target !== current.pair.key) {
    type = target < current.pair.key ? "left" : "right"
    parent = current
    current = parent[type]
  }
  if (!current) return console.warn(`target: ${target} is not found`)
  /* 找到目标节点 */
  
  // current => both (left & right)
  if (current.left && current.right) {
    // 查找后继节点，并用后继节点替换目标节点的位置
    const successor = getSuccessor(current, parent)
    if (!parent) { // 根节点（没有父节点）
      this.root = successor
    }
    else { // 非根节点
      parent[type] = successor
    }
    return
  }
  
  // current => only left | only right | none
  if (!parent) { // 根节点（没有父节点）
    this.root = current.left || current.right
  }
  else { // 非根节点
    parent[type] = current.left || current.right
  }
  
  /**
   * 查找后继节点
   * @description 也就是找 > 目标节点的下一个节点（右节点的最后一个左子节点）
   * @param target - 目标节点
   * @param parent - 目标节点的父节点
   */
  function getSuccessor(target: TreeNode<T>, parent: TreeNode<T> | null) {
    let successorParent = parent
    let successor = target
    let current = target.right
    
    while (current) {
      successorParent = successor
      successor = current
      current = current.left
    }
    // 将目标节点的左子节点赋值给后继节点的 left 指针
    successor.left = target.left
    // 如果后继节点不是目标节点的右子节点，可能是 target.right.left.left...
    // 也就是隔层替换目标节点
    // 需要改变后继节点的父节点的 left 指针和后继节点的 right 指针
    if (successor !== target.right) {
      // 将后继节点的右子节点（可能为 null，但不影响）赋值给它的父节点的 left 指针
      // 不需要考虑后继节点的左子节点，因为后继节点是最后一个左子节点
      successorParent!.left = successor.right
      // 将目标节点的右子节点赋值给后继节点的 right 指针
      successor.right = target.right
    }
    return successor
  }
}
```

:::

## Excel 导出

详见 [导出函数 | Docs.Exceljs](http://docs.yuwenjian.com/tools/exceljs.html#导出函数)。

之前用 Exceljs 做表格导出，在处理图片这块遇到点问题，url 转 base64
的过程中会阻塞页面，当时没有很好的解决办法，只能用 loading 解决。今天使用 Web Worker
解决了阻塞的问题。

::: code-group

```ts [useExport.ts]
import { ref } from "vue"
import Exceljs from "exceljs"
import FileSaver from "file-saver"

// 进度
const progress = ref(0)

const worker = new Worker("worker.js")

const listener = ref<((event: MessageEvent) => void) | null>(null)

export default function useExport<T, K>() {
  const toExcel = async ({ data, headers }: {
    data: T
    headers: K
  }) => {
    progress.value = data.length
    
    const workbook = new Exceljs.Workbook()
    const sheet = workbook.addWorksheet("sheet")
    sheet.columns = headers
    sheet.addRows(data)
    for (let i = 1; i <= headers.length; i++) { // 列
      for (let j = 1; j <= data.length + 1; j++) { // 行
        // 设置单元格样式
      }
      // 设置行样式
    }
    // [empty, "图片", url, url, url ...]
    const urls = sheet.getColumn(2).values.slice(2)
    
    worker.postMessage({ workbook, sheet, urls })
    
    listener.value = async (event: MessageEvent) => {
      const { row, base64 } = event.data
      
      progress.value--
      
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
      if (row === urls.length) {
        await workbook.xlsx.writeBuffer().then(buffer => {
          const _file = new Blob([buffer], { type: "application/octet-stream" })
          FileSaver.saveAs(_file, "Excel.xlsx")
        })
        
        worker.removeEventListener("message", listener.value!)
      }
    }
    
    worker.addEventListener("message", listener.value)
  }
  
  return { progress, toExcel }
}
```

```ts [worker.ts]
self.addEventListener("message", async event => {
  const { urls } = event.data
  for (let row = 1; row <= urls.length; row++) {
    const base64 = await urlToBase64(urls[row - 1])
    self.postMessage({ row, base64 })
  }
})
```

:::

## 红黑树 <Badge type="warning" text="pending" />

详见 [红黑树 | Docs.Algorithm](http://docs.yuwenjian.com/algorithm/tree.html#红黑树)。

看了两天红黑树，翻了些资料，都还是没太看懂。目前只掌握了 **变色**、**左旋转**、**右旋转** 的原理，对于一些复杂情况，还是不知道从哪开始下手。
虽然遇到了困难，但是不会止步于红黑树。学习的步伐不会停止，所以，我决定先学点其他技术，换换思维，也正好消化一下之前学的数据结构。

## React Hooks

详见 [Hooks | Docs.React](http://docs.yuwenjian.com/core/react.html#hooks)。

### useState

`useState` 需要注意的是，它是异步的，所以不应该在执行 `setState` 后立即获取最新的状态。以及相同 `setState` 的合并处理，并且组件只会重新渲染**一次**。

### useEffect

`useEffect` 是 React 一个比较重要并且难理解的 hook。我们需要注意 `setup` 和 `cleanup` 函数的执行时机，以及受到依赖项的控制。
最重要的是，如何正确使用 `useEffect`，这里就需要知道哪些操作是 **副作用**。

### useRef

ref 与 state 的区别：

- state 是不可变的，需要使用 `setState` 来更新 state，并且它会触发组件的重新渲染；

- ref 是可变的，通过 `ref.current` 可以访问它的值。ref 的改变不会触发重新渲染。

`useRef` 可以用来创建一个不受组件重新渲染影响的数据。

为 HTML 元素注册 ref，就可以直接访问这个 DOM 元素；为自定义组件注册 ref，需要使用 `forwardRef` 转发，才能访问它注册了 ref 的元素。

### useContext

`useContext` 与 Vue `Provider` 和 `Inject` 的用处相似。很多时候，对比 Vue API 会更好理解。

### useReducer

当初学得一脸懵逼，因为没有 Redux 和 Vuex 的基础。它其实就是 React 管理数据的一种方案。

我们需要提前设计好数据变化的场景以及处理方式。然后根据规则（参数）写出 reducer 函数。
将它传递给 `useReducer`，就会返回一个 state 和 `dispatch`，该函数就是用来统一处理状态的。
我们不能直接操作这些状态，而必须使用统一的方式：`dispatch` 函数来处理。

下面简单地实现了一个 `useReducer`。

```tsx
interface Action<T = any> {
  type: string
  payload?: T
}

function useReducer<T = any>(
  reducer: (state: T, action: Action<T>) => T,
  initialState: T
): [
  state: T,
  dispatch: (action: Action<T>) => void
] {
  const [state, setState] = useState(initialState)
  const dispatch = (action: Action<T>) => setState(reducer(state, action))
  
  return [state, dispatch]
}
```

### 其他 Hooks

`useMemo` 和 `useCallback` 都是优化性能的 API，用法其实很简单，只需要考虑使用的场景。而且 React 19 有 “自动” 的 `memo`，我们不需要再写很多的优化代码，希望早日上线正式版。

## React 高阶组件

详见 [React HOC | Docs.React](http://docs.yuwenjian.com/core/react.html#hoc)。

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

## React Router v6

详见 [Router | Docs.React](http://docs.yuwenjian.com/core/react.html#router)。

### 路由配置

在阅读 React Router 官方文档的时候，发现路由配置和我之前写的不一样了，然后我查阅了很多文档，发现它们对路由配置的写法几乎都不一样。

最终，总结出了几种比较典型的 [路由配置 | Docs.React](http://docs.yuwenjian.com/core/react.html#路由配置)。 下面是我觉得最优雅的一种写法。

```tsx
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom"

const App = () => {
  return <RouterProvider router={router} />
}

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route path="home" element={<Home />} />
    <Route path="about" element={<About />} />
  </Route>
))
```

### 路由导航

React 使用 `<Link>` 或 `<NavLink>` 进行导航，它们的区别是 `<NavLink>` 会提供路由状态，我们可以利用这一点来设置动态样式。
当然它也有默认类名，例如激活状态下默认类名为 `active`。

也可以使用 `useNavigate` 通过编程的方式进行导航。

### 路由传参

我们可以使用 `useNavigate` 传递三种路由参数：search、state、params。

```tsx
const navigate = useNavigate()

// 传递 search 参数
navigate({ pathname: "/user", search: "?id=1&name=minji" })

// 传递 state 参数
navigate("/user", { state: { id: 1, name: "minji" } })

//传递 params 参数，还需要设置动态路由参数
navigate("/user/1/minji")
```

React Router 提供了不同的 Hook 来接收这些参数。

`useLocation` 接收 search 参数。

```tsx
import qs from "query-string"

const location = useLocation()

location.search // ?id=1&name=minji
qs.parse(location.search) // { id: '1', name: 'minji' }
```

`useSearchParams` 接收 search 参数。

```tsx
const [searchParams, setSearchParams] = useSearchParams()

searchParams.get("id") // 1
searchParams.get("name") // minji
```

`useLocation` 接收 state 参数。

```tsx
const location = useLocation()

location.state // { id: '1', name: 'minji' }
```

`useParams` 接收 params 参数。

```tsx
const params = useParams() // { id: '1', name: 'minji' }
```

## Redux Toolkit

详见 [Redux Toolkit | Docs.React](http://docs.yuwenjian.com/core/react.html#redux-toolkit)。

### 基本使用

Redux Toolkit 很大程度地简化了 Redux 的操作，并且 React 官方也推荐使用。

写一个最简单的案例。为了简化代码，就不定义类型了。

```ts
import { configureStore, createSlice } from "@reduxjs/toolkit"

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0
  },
  reducers: {
    increment(state, { payload }) {
      state.value += payload.value
    },
    decrement(state, { payload }) {
      state.value -= payload.value
    }
  }
})

export const { increment, decrement } = counterSlice.actions

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
})

export default store
```

在组件中引入，需要使用 `useSelector` 和 `useDispatch` 这两个 Hook。

```tsx
import { useSelector, useDispatch } from "react-redux"
import { increment, decrement } from "@/store"

const counterState = useSelector(state => state.counter)

const dispatch = useDispatch()

const increase = () => {
  dispatch(increment({ value: 1 }))
}

const decrease = () => {
  dispatch(decrement({ value: 1 }))
}
```

### 异步操作

Redux 相比于 Pinia，进行异步处理的时候非常复杂，可能还需要使用中间件。而 Pinia 处理异步操作与同步并无区别，只是简单地写一个异步函数而已。

RTK 处理异步操作的方式也有很多种（也许只是 API 不同）。但我不是很感兴趣，只尝试了其中一种方式，等到项目中用到的时候再去深入研究。

下面依然是写一个简单的案例。服务端是使用 Express 快速搭建的，只是方便测试。

```ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchUserInfo = createAsyncThunk("fetchUserInfo", async () => {
  const response = await (await fetch("/api/user")).json()
  return { userInfo: response.data }
})

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUserInfo.fulfilled, (state, { payload }) => {
      state.userInfo = payload.userInfo
    })
  }
})
```

## Zustand

详见 [Zustand | Docs.React](http://docs.yuwenjian.com/core/react.html#zustand)。

Zustand 简直就是 React 生态中的 Pinia。不说了，直接看示例。

```ts
import { create } from "zustand"

type CounterState = {
  count: number
}

type CounterAction = {
  increment: () => void
  decrement: () => void
  update: (value: number) => void
  reset: () => void
}

const useCounterStore = create<CounterState & CounterAction>(set => ({
  count: 0,
  increment: () => {
    set(state => ({ count: state.count + 1 }))
  },
  decrement: () => {
    set(state => ({ count: state.count - 1 }))
  },
  update: value => {
    set({ count: value })
  },
  reset: () => {
    set({ count: 0 })
  }
}))
```

在组件中使用。不能说跟 Pinia 没有区别，简直就是一模一样。

```tsx
import useCounterStore from "@/store/counterStore"

const { count, increment, decrement, update, reset } = useCounterStore()

const random = Math.ceil(Math.random() * 100)

return (
  <>
    <button onClick={increment}>increment</button>
    <button onClick={decrement}>decrement</button>
    <button onClick={() => update(random)}>update</button>
    <button onClick={reset}>reset</button>
  </>
)
```

简直不要太香了，这还用啥 Redux 😲？

## React CSS

详见 [CSS 解决方案 | Docs.React](http://docs.yuwenjian.com/core/react.html#css-解决方案)。

React 与 Vue 不同，使用 CSS 不是特别方便，我们常常需要制定一套 CSS 的解决方案。

目前主流的方案有 CSS Modules、CSS in JS、CSS 原子化等。

在 Vue 中，我一般使用 Sass + Tailwind。对于复杂的样式，使用传统写法；对于简单的样式，使用更加简便的方式。并且 Vue 提供了 scoped 特性，我们不需要过多关注 CSS
的污染问题。

而 React 想要解决 CSS 污染问题会相对繁琐一点。

## Hybrid or SSR ？

React 的学习告一段落。但是前端的学习并未停止，接下来是选择 Hybrid 还是 SSR 呢？

Hybrid 主要从移动端入手，包括 Web App、微信小程序、uni-app、React Native，并且已经有一部分的基础，上手应该会很快。

而 SSR 相对来说比较陌生，虽然了解过它的优势：提升性能和 SEO 优化，主要用于 C 端项目。但是对它的认知还只是在概念上。

还是先从简单的入手吧。React Native 本身就基于 React，同样是使用 JSX 语法，只不过需要再学习一些移动端的组件和特性。

尤雨溪在采访中推荐跨平台开发优先选择 React Native；如果要兼容小程序，推荐使用 uni-app
[直播回放 | 5月30日「JetBrains码上道」| 重新发明 Vue：经验和教训（嘉宾：尤雨溪）](https://www.bilibili.com/video/BV1fb421e7Y1/?spm_id_from=333.999.0.0&vd_source=e24dcfda7a8ec45e20149c78840119e8)。

## RN 核心组件

详见 [核心组件 | Docs.React Native](http://docs.yuwenjian.com/hybrid/react-native.html#核心组件)。

- 图片：可以引入静态图片、网络图片、base64，访问相册等。

- 文本输入框：与 React 的输入框用法相似。

- 按钮：`<Button>` 不能设置样式，推荐使用 `<Pressable>`。

- 滚动视图：`<ScrollView>` 会在内容超出屏幕时生成滚动条。

- 长列表：`<FlatList>` 用于渲染基本长列表，`<SectionList>` 用于渲染分组长列表。

## RN 长列表

详见 [FlatList | Docs.React Native](http://docs.yuwenjian.com/hybrid/react-native.html#flatlist)。

### 下拉刷新

```tsx
const [list, setList] = useState(initialList)

const [isFreshing, setFreshing] = useState(false)

const refresh = async () => {
  setFreshing(true)
  const response = await (await fetch(url)).json()
  setList(response.data)
  setFreshing(false)
}

return <FlatList
  data={list}
  renderItem={({ item }) => <Text>{item.desc}</Text>}
  keyExtractor={item => item.id}
  onRefresh={refresh}
  refreshing={isFreshing}
/>
```

### 上拉加载

```tsx
const [list, setList] = useState(initialList)

const [isReached, setReached] = useState(false)

const reach = async () => {
  setReached(true)
  const response = await (await fetch(url)).json()
  setList([...list, ...response.data])
  setReached(false)
}

return (
  <View>
    <FlatList
      data={list}
      renderItem={({ item }) => <Text>{item.desc}</Text>}
      keyExtractor={item => item.id}
      onEndReached={reach}
      onEndReachedThreshold={0.1}
    />
    {isReached && <ActivityIndicator />}
  </View>
)
```
