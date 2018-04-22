// @ts-ignore
if (CLIENT) return;

function f(x: number) {
	const str = `f-d a thing: ${toString(x)}`;
	print(str);

	const arr: Primative[] = [];

	arr.push(5);
	arr.push("five");
	arr.push(true);

	return arr;
}

const str = f(6);

const ar: IColor[] = [Color(2, 2, 2, 1)];

const colorsOnly = (color: IColor): void => {
	print(color.r);
};


ar.forEach(colorsOnly);

// @ts-ignore
str.forEach(print); // ! Error => check output
str.forEach(() => print);
str.forEach(_x => print);
// str.forEach(x => print);


if (1 + 3 / 2 === 2.5) throw "testError1";
if (2 + 1 / 2 === 2.9) throw Error("testError2");

const div0 = 1 / 0;
// tslint:disable-next-line:use-isnan
// if (div0 === NaN) print("nan");
// if (isNaN(div0)) print('fnan'); // See the resulting screen too

// print(new MyClass().member);

class MyClass {
	// private readonly memba: string;
	public member: string;
}

// // Test parsing
// let x = "6.66";
// let y = parseInt(x);

// let z = Number(6);

