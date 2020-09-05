class Node {
  constructor(data, subArrayIndex, parentNode) {
    this.array = data;
    this.left = null;
    this.right = null;
    this.parentNode = parentNode;
    this.subArrayIndex = subArrayIndex;
    this.isMerged = false;
    if (this.array && this.array.length > 0)
      this.arrayColor = this.array[0].getBgColor();
  }
}

/** A binary tree design to be used to animate Merge Sort */
export class MergeTree {
  //rootArray should be an array with a length greater than 1
  constructor(rootArray) {
    this.root = new Node(rootArray, 0);
    this.newestStem = this.root;
    this.mergingNode = null;
  }

  grow = () => {
    return this.groweR(this.newestStem);
  };

  groweR = (node) => {
    if (node.array.length <= 1 || (node.right && node.left)) {
      if (node === this.root) {
        return null;
      } else {
        return this.groweR(node.parentNode);
      }
    } else if (!node.left) {
      node.left = new Node(
        node.array.slice(0, Math.trunc(node.array.length / 2)),
        node.subArrayIndex,
        node
      );
      this.newestStem = node.left;
    } else if (node.left) {
      let localIndex = Math.trunc(node.array.length / 2);
      node.right = new Node(
        node.array.slice(localIndex),
        node.subArrayIndex + localIndex,
        node
      );
      this.newestStem = node.right;
    }
    this.newestStem.isMerged = this.newestStem.array.length === 1;
    this.newestStem.parentNode = node;
    return {
      subArrayIndex: this.newestStem.subArrayIndex,
      endingIndex: this.newestStem.subArrayIndex + this.newestStem.array.length,
    };
  };

  findMerge = () => {
    this.mergingNode = this.findMergeR(this.root);
    return this.mergingNode
      ? {
          subArrayIndex: this.mergingNode.subArrayIndex,
          endingIndex:
            this.mergingNode.subArrayIndex + this.mergingNode.array.length,
        }
      : null;
  };

  findMergeR = (node) => {
    if ((!node.left && !node.right) || node.isMerged) return null;
    else if (
      node.left &&
      node.left.isMerged &&
      node.right &&
      node.right.isMerged
    ) {
      return node;
    } else if (node.left && !node.left.isMerged)
      return this.findMergeR(node.left);
    else if (node.right && !node.right.isMerged)
      return this.findMergeR(node.right);
  };

  merge = (node, compare) => {
    let leftArray = node.left.array;
    let rightArray = node.right.array;
    let mergeArray = [];
    let continueComparing = true;
    let sortedNewIdx;
    for (let i = 0; i < leftArray.length; i++) {
      if (continueComparing && compare(leftArray[i], rightArray[0])) {
        continueComparing = false;
        mergeArray.push(rightArray.shift());
        sortedNewIdx = i + node.subArrayIndex;
        i--;
      } else mergeArray.push(leftArray[i]);
    }
    if (mergeArray.length === leftArray.length && rightArray.length > 0) {
      mergeArray.push(rightArray.shift());
      sortedNewIdx = node.right.subArrayIndex;
    }
    node.left.array = mergeArray.slice();
    for (let i = 0; i < rightArray.length; i++) mergeArray.push(rightArray[i]);
    node.array = mergeArray.slice();
    node.isMerged = rightArray.length === 0;
    return {
      sortedOldIdx: node.right.subArrayIndex++,
      sortedNewIdx: sortedNewIdx,
      isMergeDone: node.isMerged,
    };
  };

  autoMerge = (compare) => {
    return this.merge(this.mergingNode, compare);
  };
}

export default MergeTree;
