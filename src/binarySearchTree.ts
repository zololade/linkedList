// what does node do,
// it takes in an array and set set the left and right to a value or another array

interface NodeDetail {
  data: number;
  leftNode: NodeDetail | null;
  rightNode: NodeDetail | null;
}

class Node implements NodeDetail {
  public data: number;
  public leftNode: NodeDetail | null;
  public rightNode: NodeDetail | null;

  constructor(
    data: number,
    leftNode: NodeDetail | null,
    rightNode: NodeDetail | null,
  ) {
    this.data = data;
    this.leftNode = leftNode;
    this.rightNode = rightNode;
  }
}

class Tree {
  public root: Node | null;

  constructor(arr: number[]) {
    this.root = Tree.buildTree(Tree.sortArray(arr));
  }

  private static buildTree(array: number[]): Node | null {
    if (array.length === 0) return null;

    let index = Math.floor(array.length / 2);
    let rootData = array[index]!;
    let leftArray = array.slice(0, index);
    let rightArray = array.slice(index + 1);
    let leftNode, rightNode;

    leftNode = Tree.buildTree(leftArray);
    rightNode = Tree.buildTree(rightArray);
    return new Node(rootData, leftNode, rightNode);
  }

  private static sortArray(array: number[]): number[] {
    let sorted: number[] = [];
    for (let val of array.sort((a, b) => a - b)) {
      if (sorted[sorted.length - 1] === val) continue;
      sorted.push(val);
    }
    return sorted;
  }

  private find(val: number, node: Node | null = this.root): Node | null {
    if (node === null || node === undefined) {
      return null;
    }

    if (node.data === val) return node;

    let result: Node | null =
      val < node.data
        ? this.find(val, node.leftNode)
        : this.find(val, node.rightNode);

    return result;
  }

  includes(val: number) {
    return this.find(val) !== null ? true : false;
  }

  depth(
    val: number,
    node: Node | null = this.root,
    depth: number = 0,
  ): number | undefined {
    if (node === null || node === undefined) {
      return undefined;
    }

    if (node.data === val) return depth;

    if (val < node.data) {
      let sum = this.depth(val, node.leftNode, depth);
      return sum === undefined ? undefined : sum + 1;
    } else {
      let sum = this.depth(val, node.rightNode, depth);
      return sum === undefined ? undefined : sum + 1;
    }
  }

  height(val: number) {
    let root = this.find(val);
    if (root === null) return undefined;

    function recurse(node: Node | null, height = 0): number {
      if (node === null) return -1;

      return Math.max(
        recurse(node.leftNode, height) + 1,
        recurse(node.rightNode, height) + 1,
      );
    }
    return recurse(root);
  }

  insert(val: number, root: Node | null = this.root): Node | null {
    if (this.root === null) {
      this.root = new Node(val, null, null);
      return this.root;
    }
    if (root === null) return new Node(val, null, null);

    if (val < root.data) root.leftNode = this.insert(val, root.leftNode);
    else if (val > root.data) root.rightNode = this.insert(val, root.rightNode);

    return root;
  }

  insertLoop(val: number, root: Node | null = this.root) {
    if (this.root === null) {
      this.root = new Node(val, null, null);
      return;
    }

    let currNode: Node | null = root;

    while (currNode) {
      if (val === currNode.data) break;
      if (val > currNode.data) {
        if (currNode.rightNode === null) {
          currNode.rightNode = new Node(val, null, null);
          break;
        }
        currNode = currNode.rightNode;
      } else if (val < currNode.data) {
        if (currNode.leftNode === null) {
          currNode.leftNode = new Node(val, null, null);
          break;
        }
        currNode = currNode.leftNode;
      }
    }
  }

  delete(val: number, root: Node | null = this.root) {
    if (this.root === null) {
      return null;
    }

    //base case, when we reach the end of visible path for val
    if (root === null) return null;

    if (root.data === val) {
      if (root.leftNode === null && root.rightNode === null) {
        return null;
      } else if (root.leftNode === null || root.rightNode === null) {
        return root.leftNode || root.rightNode;
      } else if (root.leftNode && root.rightNode) {
        let successor = Tree.fdSuccessor(root.rightNode);
        root.rightNode = this.delete(successor, root.rightNode);
        root.data = successor;
      }
    }

    if (val < root.data) root.leftNode = this.delete(val, root.leftNode);
    else if (val > root.data) root.rightNode = this.delete(val, root.rightNode);
    return root;
  }

  private static fdSuccessor(root: Node): number {
    if (root.leftNode === null) return root.data;
    return Tree.fdSuccessor(root.leftNode);
  }

  levelOrderForEach(callback: (data: number) => void) {
    if (!callback)
      throw new Error("please provide a callback for this function");

    let queue: (Node | null)[] = [],
      node = this.root;
    queue.push(node);

    while (queue.length > 0) {
      node = queue.shift()!;
      callback(node.data);
      if (node.leftNode !== null) queue.push(node.leftNode);
      if (node.rightNode !== null) queue.push(node.rightNode);
    }
  }

  levelOrderForEachRecur(callback: (data: number) => void) {
    if (!callback)
      throw new Error("please provide a callback for this function");

    let queue: (Node | null)[] = [],
      root = this.root;
    queue.push(root);

    function recurse(q: (Node | null)[]) {
      if (q.length === 0) return;
      let newQueue: (Node | null)[] = [];

      q.forEach((node) => {
        if (node) {
          if (node.leftNode !== null) newQueue.push(node.leftNode);
          if (node.rightNode !== null) newQueue.push(node.rightNode);
          callback(node.data);
        }
      });
      recurse(newQueue);
    }
    recurse(queue);
  }

  inOrderForEach(callback: (data: number) => void) {
    if (!callback)
      throw new Error("please provide a callback for this function");
    let initialNode = this.root;

    function recurse(root: Node | null) {
      if (root === null) return;

      recurse(root.leftNode);
      callback(root.data);
      recurse(root.rightNode);
    }
    recurse(initialNode);
  }

  preOrderForEach(callback: (data: number) => void) {
    if (!callback)
      throw new Error("please provide a callback for this function");
    let initialNode = this.root;

    function recurse(root: Node | null) {
      if (root === null) return;

      callback(root.data);
      recurse(root.leftNode);
      recurse(root.rightNode);
    }
    recurse(initialNode);
  }

  postOrderForEach(callback: (data: number) => void) {
    if (!callback)
      throw new Error("please provide a callback for this function");
    let initialNode = this.root;

    function recurse(root: Node | null) {
      if (root === null) return;

      recurse(root.leftNode);
      recurse(root.rightNode);
      callback(root.data);
    }
    recurse(initialNode);
  }

  isBalanced(root: Node | null = this.root): boolean {
    if (root === undefined || root === null) return true;

    let rootResult = this.isBalHelper(root);
    let rightResult = this.isBalanced(root.rightNode);
    let leftResult = this.isBalanced(root.leftNode);

    return rootResult && rightResult && leftResult;
  }

  private isBalHelper(root: Node | null) {
    if (root === undefined || root === null) return true;

    let leftHeight =
      root.leftNode !== null ? this.height(root.leftNode.data) : -1;
    let rightHeight =
      root.rightNode !== null ? this.height(root.rightNode.data) : -1;

    if (leftHeight === undefined || rightHeight === undefined) return true;

    if (
      leftHeight - rightHeight === 0 ||
      leftHeight - rightHeight === -1 ||
      leftHeight - rightHeight === 1
    ) {
      return true;
    } else {
      return false;
    }
  }

  rebalance() {
    let newArray: number[] = [];
    this.inOrderForEach((val) => newArray.push(val));
    this.root = Tree.buildTree(newArray);
  }
}

//what does this node do

const prettyPrint = (node: Node | null, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 6347, 324]);

tree.insert(6348);
tree.insert(6349);
tree.insert(6350);
// let tree = new Tree([1, 2, 3]);

// prettyPrint(tree.root);
// tree.delete(2);
tree.rebalance();

prettyPrint(tree.root);

console.log(tree.isBalanced());
// tree.levelOrderForEachRecur(console.log);
// tree.postOrderForEach();
