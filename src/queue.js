const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.heap.size() == this.maxSize) {
			throw new Error('Max queue size is exceeded');
		}
		this.heap.push(data, priority);
	}

	shift() {
		if (this.heap.size() == 0) {
			throw new Error('The queue is empty, can not shift');
		}
		return this.heap.pop();
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
