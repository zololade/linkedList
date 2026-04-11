import { Tree, prettyPrint } from "./binarySearchTree";

function binaryDriver(
  arr: number[] = Array.from(
    { length: 20 },
    () => Math.floor(Math.random() * 100) + 1,
  ),
) {
  const tree = new Tree(arr);

  console.log("=== Initial tree ===");
  prettyPrint(tree.root);

  if (!tree.isBalanced())
    throw new Error("Tree should be balanced after build");

  const levelVals: number[] = [];
  const preVals: number[] = [];
  const postVals: number[] = [];
  const inVals: number[] = [];

  tree.levelOrderForEach((v) => levelVals.push(v));
  tree.preOrderForEach((v) => preVals.push(v));
  tree.postOrderForEach((v) => postVals.push(v));
  tree.inOrderForEach((v) => inVals.push(v));

  console.log("Level order :", levelVals.join(", "));
  console.log("Pre-order   :", preVals.join(", "));
  console.log("Post-order  :", postVals.join(", "));
  console.log("In-order    :", inVals.join(", "));

  const inserted = Array.from(
    { length: 6 },
    () => Math.floor(Math.random() * 100) + 100,
  );
  inserted.forEach((v) => tree.insert(v));
  console.log("\nInserted:", inserted.join(", "));

  if (!tree.isBalanced()) {
    console.log("Status: unbalanced");
    console.log("Rebalancing...");
    tree.rebalance();
  }

  if (!tree.isBalanced()) throw new Error("Rebalance failed");
  console.log("Status: balanced\n");

  console.log("=== Rebalanced tree ===");
  prettyPrint(tree.root);

  const levelVals2: number[] = [];
  const preVals2: number[] = [];
  const postVals2: number[] = [];
  const inVals2: number[] = [];

  tree.levelOrderForEach((v) => levelVals2.push(v));
  tree.preOrderForEach((v) => preVals2.push(v));
  tree.postOrderForEach((v) => postVals2.push(v));
  tree.inOrderForEach((v) => inVals2.push(v));

  console.log("Level order :", levelVals2.join(", "));
  console.log("Pre-order   :", preVals2.join(", "));
  console.log("Post-order  :", postVals2.join(", "));
  console.log("In-order    :", inVals2.join(", "));
}

binaryDriver();
