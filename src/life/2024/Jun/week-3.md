# 第三周

## 周一 Mon. <Badge type="info" text="06-10" />

### 端午节

今天是端午节。当其他人还在为 “咸粽” 还是 “甜粽” 争吵时，我选择全都要 🥰🥰😍😍！
但是三天的假期就要结束咯 😔，明天又要成为打工人。好在这周已经过去一天啦 😄。

### 其他 Hooks

**useRef**

ref 与 state 的区别：

- state 是不可变的，需要使用 `setState` 来更新 state，并且它会触发组件的重新渲染；
- ref 是可变的，通过 `ref.current` 可以访问它的值。ref 的改变不会触发重新渲染。

`useRef` 可以用来创建一个不受组件重新渲染影响的数据。

为 HTML 元素注册 ref，就可以直接访问这个 DOM 元素；为自定义组件注册 ref，需要使用 `forwardRef` 转发，才能访问它注册了 ref 的元素。

**useContext**

`useContext` 与 Vue `Provider` 和 `Inject` 的用处相似。很多时候，对比 Vue API 会更好理解。

**useReducer**

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

## 周二 Tue. <Badge type="info" text="06-11" />

### 性能优化 Hooks

`useMemo` 和 `useCallback` 都是优化性能的 API，用法其实很简单，只需要考虑使用的场景。而且 React 19 有 “自动” 的 `memo`，我们不需要再写很多的优化代码，希望早日上线正式版。

## 周三 Wed. <Badge type="info" text="06-12" />

### v6 路由配置

在阅读 React Router 官方文档的时候，发现路由配置和我之前写的不一样了，然后我查阅了很多文档，发现它们对路由配置的写法几乎都不一样，我在想也许是版本的原因。
不管怎样，一定要把它搞明白。

最终，我总结出四套随着版本递进的 [路由配置](http://docs.yuwenjian.com/front-end/React.html#路由配置)。 下面是我觉得最优雅的一种写法。

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

v6 是个兼容的版本，一些旧的 API 都还可以使用，不过它新增了很多用法，还是需要研究一下。
