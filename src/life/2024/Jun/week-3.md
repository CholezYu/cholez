# 第三周

## 周一 Mon. <Badge type="info" text="06-10" />

### 端午节

今天是端午节。当其他人还在为 “咸粽” 还是 “甜粽” 争吵时，我选择全都要 🥰🥰😍😍！
但是三天的假期就要结束咯 😔，明天又要成为打工人。好在这周已经过去一天啦 😄。

### 收获满满

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
将它传给 `useReducer`，会返回一个**状态**和 `dispatch` 函数，该函数就是用来统一处理状态的。
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
