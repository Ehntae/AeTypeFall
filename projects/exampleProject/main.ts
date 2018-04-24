// @ts-ignore
if (CLIENT) return;

import { sqr } from "./utility/util";

function test(...a: number[]) {
	const x = a.map(sqr);

	if (x !== null)
		printTable(x);
}

test(1, 2, 3, 4, 5, 6);
