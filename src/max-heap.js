const Node = require('./node');

class MaxHeap {
	constructor() {
		this.clear();
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this._size++;
	}

	pop() {
		if (this.isEmpty()) return null;

		let lastRoot = this.detachRoot();
		if (this.parentNodes.length > 0) {
			this.restoreRootFromLastInsertedNode(lastRoot);
			this.shiftNodeDown(this.root);
		}

		this._size--;
		return lastRoot.data;
	}

	detachRoot() {
		let root = this.root;
		this.root = null;

		if (!root.left || !root.right) this.parentNodes.shift();

		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		let newRoot = this.parentNodes.pop();
		if (newRoot.parent != detached && this.parentNodes.indexOf(newRoot.parent) == -1) {
			this.parentNodes.unshift(newRoot.parent);
		}
		newRoot.remove();

		let left = detached.left;
		if (left) {
			detached.removeChild(left);
			newRoot.appendChild(left);
		}

		let right = detached.right;
		if (right) {
			detached.removeChild(right);
			newRoot.appendChild(right);
		}

		if (!newRoot.left || !newRoot.right) {
			this.parentNodes.unshift(newRoot);
		}

		this.root = newRoot;
	}

	size() {
		return this._size;
	}

	isEmpty() {
		return this._size == 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this._size = 0;
	}

	insertNode(node) {
		if (this.root == null) {
			this.root = node;
			this.parentNodes.push(node);
			return;
		}

		let p = this.parentNodes[0];
		p.appendChild(node);
		if (p.left != null && p.right != null) {
			this.parentNodes.shift();
		}

		this.parentNodes.push(node);
	}

	shiftNodeUp(node) {
		if (node.parent == null) {
			this.root = node;
			return;
		}

		if (node.priority > node.parent.priority) {
			this._changeParentNodesOrder(node);
			node.swapWithParent();
			this.shiftNodeUp(node);
		}

		return;
	}

	shiftNodeDown(node) {
		let leftPriority = node.priority;
		if (node.left) leftPriority = node.left.priority;

		let rightPriority = node.priority;
		if (node.right) rightPriority = node.right.priority;

		if (node.priority >= leftPriority &&
			node.priority >= rightPriority) return;

		let maxChildNode = leftPriority > rightPriority
			? node.left
			: node.right;

		this._changeParentNodesOrder(maxChildNode);
		maxChildNode.swapWithParent();
		if (maxChildNode.parent == null) this.root = maxChildNode;

		this.shiftNodeDown(node);
	}

	_changeParentNodesOrder(node) {
		let nodeIndex = this.parentNodes.indexOf(node);
		let parentIndex = this.parentNodes.indexOf(node.parent);
		if (nodeIndex >= 0) this.parentNodes[nodeIndex] = node.parent;
		if (parentIndex >= 0) this.parentNodes[parentIndex] = node;
	}
}

module.exports = MaxHeap;
