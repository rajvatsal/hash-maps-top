#!/bin/env node

export default function Node(key = "key", value = null, next = null) {
	const node = {};
	node[key] = value;
	node.next = next;
	return node;
}
