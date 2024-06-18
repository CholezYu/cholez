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
