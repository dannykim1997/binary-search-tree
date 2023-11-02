class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        const uniqueSortedArray = Array.from(new Set(array)).sort((a, b) => a - b);

        const buildTreeHelper = (array, start, end) => {
            if (start > end) return null;

            const mid = Math.floor((start + end) / 2);
            const node = new Node(uniqueSortedArray[mid]);

            node.left = buildTreeHelper(array, start, mid - 1);
            node.right = buildTreeHelper(array, mid + 1, end);

            return node;
        };

        return buildTreeHelper(uniqueSortedArray, 0, uniqueSortedArray.length - 1);
    }

    insert(value) {
        const insertHelper = (node, value) => {
          if (!node) return new Node(value);
          if (value < node.data) {
            node.left = insertHelper(node.left, value);
          } else if (value > node.data) {
            node.right = insertHelper(node.right, value);
          }
          return node;
        };
    
        this.root = insertHelper(this.root, value);
      }
    
      delete(value) {
        const findMin = (node) => {
          while (node.left) {
            node = node.left;
          }
          return node;
        };
    
        const deleteHelper = (node, value) => {
          if (!node) return node;
          if (value < node.data) {
            node.left = deleteHelper(node.left, value);
          } else if (value > node.data) {
            node.right = deleteHelper(node.right, value);
          } else {
            if (!node.left) return node.right;
            if (!node.right) return node.left;
            const temp = findMin(node.right);
            node.data = temp.data;
            node.right = deleteHelper(node.right, temp.data);
          }
          return node;
        };
    
        this.root = deleteHelper(this.root, value);
      }
    
      find(value) {
        const findHelper = (node, value) => {
          if (!node) return null;
          if (value < node.data) return findHelper(node.left, value);
          if (value > node.data) return findHelper(node.right, value);
          return node;
        };
    
        return findHelper(this.root, value);
      }
    
      levelOrder(callback) {
        if (!this.root) return [];
    
        const result = [];
        const queue = [this.root];
    
        while (queue.length > 0) {
          const node = queue.shift();
          result.push(node.data);
          if (node.left) queue.push(node.left);
          if (node.right) queue.push(node.right);
    
          if (callback) {
            callback(node);
          }
        }
    
        if (callback) return undefined;
        return result;
      }
    
      inOrder(callback) {
        const inOrderHelper = (node) => {
          if (node) {
            inOrderHelper(node.left);
            if (callback) {
              callback(node);
            }
            result.push(node.data);
            inOrderHelper(node.right);
          }
        };
    
        const result = [];
        inOrderHelper(this.root);
    
        if (callback) return undefined;
        return result;
      }
    
      preOrder(callback) {
        const preOrderHelper = (node) => {
          if (node) {
            if (callback) {
              callback(node);
            }
            result.push(node.data);
            preOrderHelper(node.left);
            preOrderHelper(node.right);
          }
        };
    
        const result = [];
        preOrderHelper(this.root);
    
        if (callback) return undefined;
        return result;
      }
    
      postOrder(callback) {
        const postOrderHelper = (node) => {
          if (node) {
            postOrderHelper(node.left);
            postOrderHelper(node.right);
            if (callback) {
              callback(node);
            }
            result.push(node.data);
          }
        };
    
        const result = [];
        postOrderHelper(this.root);
    
        if (callback) return undefined;
        return result;
      }
    
      height(node) {
        if (!node) return -1;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return 1 + Math.max(leftHeight, rightHeight);
      }
    
      depth(node) {
        if (!node) return 0;
        return 1 + this.depth(node.parent);
      }
    
      isBalanced() {
        const isBalancedHelper = (node) => {
          if (!node) return true;
          const leftHeight = this.height(node.left);
          const rightHeight = this.height(node.right);
          if (Math.abs(leftHeight - rightHeight) <= 1 && isBalancedHelper(node.left) && isBalancedHelper(node.right)) {
            return true;
          }
          return false;
        };
    
        return isBalancedHelper(this.root);
      }
    
      rebalance() {
        const data = this.inOrder();
        this.root = this.buildTree(data);
      }
}

const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(data);
tree.insert(42);

// Delete a value
tree.delete(5);

// Find a node
const foundNode = tree.find(23);
console.log(foundNode);

// Level order traversal
const levelOrderResult = tree.levelOrder();
console.log('Level Order:', levelOrderResult);

// In-order traversal
const inOrderResult = tree.inOrder();
console.log('In-Order:', inOrderResult);

// Pre-order traversal
const preOrderResult = tree.preOrder();
console.log('Pre-Order:', preOrderResult);

// Post-order traversal
const postOrderResult = tree.postOrder();
console.log('Post-Order:', postOrderResult);

// Height of the tree
const treeHeight = tree.height(tree.root);
console.log('Tree Height:', treeHeight);

// Depth of a node
const nodeDepth = tree.depth(foundNode);
console.log('Node Depth:', nodeDepth);

// Check if the tree is balanced
const isBalanced = tree.isBalanced();
console.log('Is Balanced:', isBalanced);

// Rebalance the tree
tree.rebalance();
const rebalancedInOrder = tree.inOrder();
console.log('Rebalanced In-Order:', rebalancedInOrder);