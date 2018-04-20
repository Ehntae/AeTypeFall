// @ts-ignore
if (CLIENT) { return; }

function f(x: number) {
    const str = `f-d a thing: ${toString(x)}`;

    const ar: Array<string> = [];

    return str;
}

print(f(6));

export class C1 {

}

// This should error
export class C2 {}