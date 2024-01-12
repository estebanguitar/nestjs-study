type TreeNode = {
  order: number
  children?: TreeNode[]
  parent?: TreeNode
}

/* 테스트용 데이터 만들기 */
const maxDepth = 3
const random = () => Math.floor(Math.random() * 5)

function randomTree(depth = 0): TreeNode[] {
  const nodes: TreeNode[] = []

  for (let i = 0; i < random(); i++) {
    const node: TreeNode = {
      order: i + 1,
    }
    if (depth < maxDepth) {
      node.children = randomTree(depth + 1)
    }
    nodes.push(node)
  }
  nodes.sort(() => Math.random() - 0.5)
  return nodes
}

/* 테스트용 데이터 만들기 끝 */

// 재귀 사용
function recursiveSort(nodes: TreeNode[]) {
  nodes.sort((a, b) => a.order - b.order)
  for (const node of nodes) {
    if (!Array.isArray(node.children)) {
      continue
    }
    recursiveSort(node.children)
  }
}

class Stack<T> {
  private data: T[] = []
  push = (data: T) => this.data.push(data)
  arrayPush = (data: T[]) => {
    if (data === undefined) {
      return
    }
    for (const d of data) {
      this.data.push(d)
    }
  }
  pop = () => this.data.pop() // 나중에 넣은게 빠짐
  get = () => this.data
  size = () => this.data.length
}

function deepSort(nodes: TreeNode[]) {
  // 재귀 안 쓰고 해보세욤
  nodes.sort((a, b) => a.order - b.order)
  const stack = new Stack<TreeNode>()
  const root: TreeNode = {
    order: 1,
    children: nodes,
  }

  stack.arrayPush(root.children)
  while (true) {
    if (stack.size() === 0) break
    let children = stack.pop()?.children

    if (children === undefined) continue

    children.sort((a, b) => a.order - b.order)

    stack.arrayPush(children)
  }
}

/* 테스트 코드 */
const trees = randomTree()

const log = (msg: any, nodes: TreeNode[]) => console.log(msg, JSON.stringify(nodes, null, 2))
log(1, trees)
// 재귀 사용
// recursiveSort(trees)
// 재귀 미사용
deepSort(trees)
log(2, trees)
