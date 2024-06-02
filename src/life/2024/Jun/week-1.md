# 第一周

## 周日 Sun. <Badge type="info" text="06-02" />

学习了[二叉搜索树 (BinarySearchTree)](http://docs.yuwenjian.com/algorithm/Tree.html#二叉搜索树)。并实现了 **插入**、 **查找**、 **删除** 操作。

插入操作。

```ts
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

查找操作

```ts
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

删除操作。

```ts
BinarySearchTree.remove = function (target: number) {
  let type: "left" | "right" = "left"
  let parent: TreeNode<T> | null = null
  let current = this.root
  
  while (current && target !== current.pair.key) {
    type = target < current.pair.key ? "left" : "right"
    parent = current
    current = parent[type]
  }
  if (!current) return console.warn(`target: ${ target } is not found`)
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
