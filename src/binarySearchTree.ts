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

  includes(val: number, node: Node | null = this.root): boolean {
    if (node === null || node === undefined) {
      return false;
    }

    if (node.data === val) return true;

    let result: boolean =
      val < node.data
        ? this.includes(val, node.leftNode)
        : this.includes(val, node.rightNode);

    return result;
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

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(tree.root);
console.log(tree.includes(10));
