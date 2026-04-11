import { Tree, prettyPrint } from "./binarySearchTree";

/*
Create a binary search tree from an array of random numbers with each element having a value less than 100. You can create a function that returns an array of random numbers every time you call it if you wish.
Confirm that the tree is balanced by calling isBalanced().
Print out all elements in level, pre, post, and in order.
Unbalance the tree by adding several numbers whose value is more than 100.
Confirm that the tree is unbalanced by calling isBalanced().
Balance the tree by calling rebalance().
Confirm that the tree is balanced by calling isBalanced().
Print out all elements in level, pre, post, and in order.

*/

function binaryDriver(
  arr: number[] = Array.from(
    { length: 20 },
    () => Math.floor(Math.random() * 100) + 1,
  ),
) {
  let tree = new Tree(arr);
  let balanced = tree.isBalanced();
  prettyPrint(tree.root);
}

binaryDriver();
