import ll from "./LinkedList.mjs";

export default function HashMap(bs) {
	const bucketSize = bs || 16;
	const buckets = Array(bucketSize).fill(null);
	const loadFactor = 0.8;

	function hash(key) {
		const hashCode = 0;

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
		if (bucket === null) bucket = ll(key, value);
		else bucket.append(key, value);
		incBuckets();
	}

	return { hash, set };
}
