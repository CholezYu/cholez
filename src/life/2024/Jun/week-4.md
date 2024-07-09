# 第四周

## 周一 Mon. <Badge type="info" text="06-17" />

### Redux Toolkit

Redux Toolkit 很大程度地简化了 Redux 的操作，并且 React 官方也推荐使用。

写一个最简单的案例。为了简化代码，就不定义类型了。详见 [Redux Toolkit | Docs.React](http://docs.yuwenjian.com/front-end/react.html#redux-toolkit)。

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

## 周二 Tue. <Badge type="info" text="06-18" />

### Redux 异步操作

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

## 周三 Wed. <Badge type="info" text="06-19" />

### Zustand

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

## 周五 Fri. <Badge type="info" text="06-21" />

### Hybrid or SSR ？

React 的学习告一段落。但是前端的学习并未停止，接下来是选择 Hybrid 还是 SSR 呢？

Hybrid 主要从移动端入手，包括 Web App、微信小程序、uni-app、React Native，并且已经有一部分的基础，上手应该会很快。

而 SSR 相对来说比较陌生，虽然了解过它的优势：提升性能和 SEO 优化，主要用于 C 端项目。但是对它的认知还只是在概念上。

还是先从简单的入手吧。React Native 本身就基于 React，同样是使用 JSX 语法，只不过需要再学习一些移动端的组件和特性。

尤雨溪在采访中推荐跨平台开发优先选择 React Native；如果要兼容小程序，推荐使用 uni-app
[直播回放 | 5月30日「JetBrains码上道」| 重新发明 Vue：经验和教训（嘉宾：尤雨溪）](https://www.bilibili.com/video/BV1fb421e7Y1/?spm_id_from=333.999.0.0&vd_source=e24dcfda7a8ec45e20149c78840119e8)。

## 周六 Sat. <Badge type="info" text="06-22" />

### 使用 Expo 构建 RN 项目

```bash
npx create-expo-app@latest

# or
yarn create expo-app
```

### RN 的基本组件

- 图片：可以引入静态图片、网络图片、base64，访问相册等。

- 文本输入框：与 React 的输入框用法相似。

- 按钮：`<Button>` 不能设置样式，推荐使用 `<Pressable>`。

- 滚动视图：`<ScrollView>` 会在内容超出屏幕时生成滚动条。

- 长列表：`<FlatList>` 用于渲染基本长列表，`<SectionList>` 用于渲染分组长列表。

## 周日 Sun. <Badge type="info" text="06-23" />

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
