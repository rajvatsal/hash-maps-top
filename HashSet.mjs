export default function HashSet(bs) {
	const bucketSize = bs || 16;
	const buckets = Array(bucketSize).fill(null);
	const loadFactor = 0.8;

	function hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
			hashCode %= bucketSize;
		}

		hashCode %= bucketSize;
		return hashCode;
	}

	function length() {
		let count = 0;
		for (let i = 0; i < bucketSize; i++) {
			const bucket = buckets[i];
			if (bucket === null) continue;

			let node = bucket;
			while (node !== null) {
				++count;
				node = node[1];
			}
		}
		return count;
	}

	function incBuckets() {
		if (loadFactor * bucketSize < length()) bucketSize ** 2;
	}

	function set(key) {
		const hashCode = hash(key);
		const bucket = buckets[hashCode];
		if (bucket === null) buckets[hashCode] = [key, null];
		else {
			let node = bucket;
			while (true) {
				// break loop if key exists
				if (node[0] === key) break;
				// just append key if it's the last node and key still doesn't exist
				else if (node[1] === null) {
					node[i] = [key, null];
					break;
				}
				node = node[1];
			}
		}
		incBuckets();
	}

	function get(key) {
		const hashCode = hash(key);

		if (hashCode > bucketSize || hashCode < 0) {
			throw new Error("Trying to access index that is out of bounds");
			return;
		}

		const bucket = buckets[hashCode];
		if (bucket === null) return null;
		let node = bucket;

		while (node !== null) {
			if (node[0] === key) return node[0];
			node = node[1];
		}
		// return null if doesn't exist
		return null;
	}

	function has(key) {
		const hashCode = hash(key);
		if (hashCode > bucketSize || hashCode < 0) {
			throw new Error("Trying to access index that is out of bounds");
			return;
		}
		const bucket = buckets[hashCode];
		if (bucket === null) return false;
		let node = bucket;
		while (node !== null) {
			if (node[0] === key) return true;
			else if (node[1] === null) return false;
			node = node[1];
		}
	}

	const removeNode = (node) => {
		const next = node[1][1];
		node[1][1] = null;
		node[1] = next;
		return true;
	};

	function remove(key) {
		const hashCode = hash(key);
		const bucket = buckets[hashCode];
		if (bucket === null) return false;

		let node = bucket;
		if (node[1] === null) {
			buckets[hashCode] = null;
			return true;
		} else if (node[0] === key) return removeNode();
		while (true) {
			if (key === node[1][0]) {
				return removeNode(node);
			} else if (node[1] === null) return false;
			node = node[1];
		}
	}

	function clear() {
		for (let i = 0; i < bucketSize; i++) buckets[i] = null;
	}

	function keys() {
		const list = [];
		for (let i = 0; i < bucketSize; i++) {
			const bucket = buckets[i];
			if (bucket === null) continue;

			let node = bucket;
			while (node !== null) {
				list.push(node[0]);
				node = node[1];
			}
		}
		return list;
	}

	function entries() {
		const entries = [];
		for (let i = 0; i < bucketSize; i++) {
			const bucket = buckets[i];
			if (bucket === null) continue;

			let node = bucket.getHead();
			while (node !== null) {
				entries.push([node[0], node[1]]);
				node = node.next;
			}
		}
		return entries;
	}

	return { hash, set, get, has, remove, length, clear, keys, entries };
}
