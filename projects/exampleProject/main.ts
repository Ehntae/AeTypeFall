// @ts-ignore
if (CLIENT) return;

function printer(...texts: string[]) {
	for (let i = 0; i < texts.length; i++)
		print(`printing [${i}/${texts.length}]: ${texts[i]}`);
}


printer("a", "b", "c", "d", "e");



let savage = 6;

if (savage === null || savage === undefined)
	print("Savage is undefined");

