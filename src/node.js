class Node {
	constructor(data, priority) {
		this._data = data;
		this._priority = priority;
		this._parent = null;
		this._left = null;
		this._right = null;
	}

	appendChild(node) {
		if (!node) {
			throw new Error('Can not append null node');
		}

		if (!this.left) {
			this.left = node;
			node.parent = this;
		}
		else if (!this._right) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (!node) {
			throw new Error('Can not remove null node');
		}

		if (this.left === node) {
			this.left.parent = null;
			this.left = null;
		}
		else if (this.right === node) {
			this.right.parent = null;
			this.right = null;
		}
		else {
			throw new Error('Node is not a child');
		}
	}

	remove() {
		if (!this.parent) return;
		this.parent.removeChild(this);
	}

	swapWithParent() {
		if (!this.parent) return;

		let g = this;
		let gl = g.left;
		let gr = g.right;

		let c = g.parent;
		let p = g.parent.parent;

		if (p) {
			p.removeChild(c);
			p.appendChild(g);
		} else {
			g.parent = null;
		}

		if (g.left) g.left.remove();
		if (c.left) {
			if (g == c.left) {
				g.appendChild(c);
			} else {
				g.appendChild(c.left);
			}
		}

		if (g.right) g.right.remove();
		if (c.right) {
			if (g == c.right) {
				g.appendChild(c);
			} else {
				g.appendChild(c.right);
			}
		}

		c.left = null;
		if (gl) c.appendChild(gl);
		c.right = null;
		if (gr) c.appendChild(gr);
	}

	get data() { return this._data; }
	set data(value) { this._data = value; }

	get priority() { return this._priority; }
	set priority(value) { this._priority = value; }

	get parent() { return this._parent; }
	set parent(value) { this._parent = value; }

	get left() { return this._left; }
	set left(value) { this._left = value; }

	get right() { return this._right; }
	set right(value) { this._right = value; }
}

module.exports = Node;
