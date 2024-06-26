import ll from "./LinkedList.mjs";

export default function HashMap(bs) {
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

			let node = bucket.getHead();
			while (node !== null) {
				++count;
				node = node.next;
			}
		}
		return count;
	}

	function incBuckets() {
		if (loadFactor * bucketSize < length()) bucketSize ** 2;
	}

	function set(key, value) {
		const hashCode = hash(key);
		const bucket = buckets[hashCode];
		if (bucket === null) buckets[hashCode] = ll(key, value);
		else {
			let node = bucket.getHead();
			while (true) {
				// break loop if key exists
				if (key in node) {
					node[key] = value;
					break;
				}
				// just append key if it's the last node and key still doesn't exist
				else if (node.next === null) {
					bucket.append(key, value);
					break;
				}
				node = node.next;
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
		let node = bucket.getHead();

		while (node !== null) {
			if (key in node) return node[key];
			node = node.next;
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
		return bucket.contains(key);
	}

	const removeNode = (node) => {
		const next = node.next.next;
		node.next.next = null;
		node.next = next;
		return true;
	};

	function remove(key) {
		const hashCode = hash(key);
		const bucket = buckets[hashCode];
		if (bucket === null) return false;

		let node = bucket.getHead();
		if (node.next === null) {
			buckets[hashCode] = null;
			return true;
		} else if (key in node) return removeNode();
		while (true) {
			if (key in node.next) {
				return removeNode(node);
			} else if (node.next === null) return false;
			node = node.next;
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

			let node = bucket.getHead();
			while (node !== null) {
				for (let key in node) {
					if (key === "next") continue;
					list.push(key);
				}
				node = node.next;
			}
		}
		return list;
	}

	function values() {
		const values = [];
		for (let i = 0; i < bucketSize; i++) {
			const bucket = buckets[i];
			if (bucket === null) continue;

			let node = bucket.getHead();
			while (node !== null) {
				for (let key in node) {
					if (key === "next") continue;
					values.push(node[key]);
				}
				node = node.next;
			}
		}
		return values;
	}

	function entries() {
		const entries = [];
		for (let i = 0; i < bucketSize; i++) {
			const bucket = buckets[i];
			if (bucket === null) continue;

			let node = bucket.getHead();
			while (node !== null) {
				for (let key in node) {
					if (key === "next") continue;
					entries.push([key, node[key]]);
				}
				node = node.next;
			}
		}
		return entries;
	}

	return { hash, set, get, has, remove, length, clear, keys, values, entries };
}
