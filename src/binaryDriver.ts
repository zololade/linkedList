import { Tree, prettyPrint } from "./binarySearchTree";

function binaryDriver(
  arr: number[] = Array.from(
    { length: 20 },
    () => Math.floor(Math.random() * 100) + 1,
  ),
) {
  let tree = new Tree(arr);
  if (!tree.isBalanced()) throw new Error("something went wrong");
  tree.levelOrderForEachRecur(console.log);
  console.log("\n");
  tree.preOrderForEach(console.log);
  console.log("\n");
  tree.postOrderForEach(console.log);
  console.log("\n");
  tree.inOrderForEach(console.log);
  console.log("\n");

  Array.from(
    { length: 6 },
    () => Math.floor(Math.random() * 100) + 100,
  ).forEach((val) => tree.insert(val));

  if (!tree.isBalanced()) console.log("unbalanced\n");

  tree.rebalance();
  if (!tree.isBalanced()) throw new Error("something went wrong");
  tree.levelOrderForEachRecur(console.log);
  console.log("\n");
  tree.preOrderForEach(console.log);
  console.log("\n");
  tree.postOrderForEach(console.log);
  console.log("\n");
  tree.inOrderForEach(console.log);
  console.log("\n");
}

binaryDriver();
