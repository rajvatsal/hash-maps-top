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

	function getEntries() {
		const count = 0;
		for (let i = 0; i < buckets; i++) {
			const node = buckets[i];
			while (node !== null) {
				++count;
				node = node.next;
			}
		}
		return count;
	}

	function incBuckets() {
		if (loadFactor * bucketSize < getEntries()) bucketSize ** 2;
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

	return { hash, set, get, has };
}
