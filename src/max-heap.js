const Node = require('./node');

class MaxHeap {
	constructor() {
		this.clear();
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
	}

	pop() {

	}

	detachRoot() {

	}

	restoreRootFromLastInsertedNode(detached) {

	}

	size() {

	}

	isEmpty() {
		this.root == null;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.nodes = [];
	}

	insertNode(node) {
		if (this.root == null) {
			this.root = node;
		} else {
			this.parentNodes[this.parentNodes.l]
		
		}

		this.parentNodes.push(node);
		this.nodes.push(node);
	}

	shiftNodeUp(node) {
		while (
			node.parent != null &&
			node.priority > node.parent.priority) {
			node.swapWithParent();
		}
	}

	shiftNodeDown(node) {

	}

	_getLastParentNode() {
		return this.parentNodes[this.parentNodes.length - 1];
	}

	get root() { return this._root; }
	set root(value) { this._root = value; }

	get parentNodes() { return this._parentNodes; }
	set parentNodes(value) { this._parentNodes = value; }

	get nodes() { return this._nodes; }
	set nodes(value) { this._nodes = value; }
}

module.exports = MaxHeap;
