/// <reference no-default-lib="true"/>

// tslint:disable:interface-name
// tslint:disable:no-empty-interface
// tslint:disable:max-file-line-count

/**
 * * ES2015 Core
 */

// Object's property keys
declare type PropertyKey = string | number | symbol;


interface Function {
	/**
	 * Returns the name of the function. Function names are read-only and can not be changed.
	 */
	readonly name: string;
}

// ! Barebones / unsupported (prefer es5)
// interface Array<T> {
// 	/**
// 	 * Returns the value of the first element in the array where predicate is true, and undefined
// 	 * otherwise.
// 	 * @param predicate find calls predicate once for each element of the array, in ascending
// 	 * order, until it finds one where predicate returns true. If such an element is found, find
// 	 * immediately returns that element value. Otherwise, find returns undefined.
// 	 * @param thisArg If provided, it will be used as the this value for each invocation of
// 	 * predicate. If it is not provided, undefined is used instead.
// 	 */
// 	find<S extends T>(predicate: (this: void, value: T, index: number, obj: T[])
// 		=> value is S, thisArg?: any): S | undefined;
// 	find(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): T | undefined;

// 	/**
// 	 * Returns the index of the first element in the array where predicate is true, and -1
// 	 * otherwise.
// 	 * @param predicate find calls predicate once for each element of the array, in ascending
// 	 * order, until it finds one where predicate returns true. If such an element is found,
// 	 * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
// 	 * @param thisArg If provided, it will be used as the this value for each invocation of
// 	 * predicate. If it is not provided, undefined is used instead.
// 	 */
// 	findIndex(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): number;

// 	/**
// 	 * Returns the this object after filling the section identified by start and end with value
// 	 * @param value value to fill array section with
// 	 * @param start index to start filling the array at. If start is negative, it is treated as
// 	 * length+start where length is the length of the array.
// 	 * @param end index to stop filling the array at. If end is negative, it is treated as
// 	 * length+end.
// 	 */
// 	fill(value: T, start?: number, end?: number): this;

// 	/**
// 	 * Returns the this object after copying a section of the array identified by start and end
// 	 * to the same array starting at position target
// 	 * @param target If target is negative, it is treated as length+target where length is the
// 	 * length of the array.
// 	 * @param start If start is negative, it is treated as length+start. If end is negative, it
// 	 * is treated as length+end.
// 	 * @param end If not specified, length of the this object is used as its default value.
// 	 */
// 	copyWithin(target: number, start: number, end?: number): this;
// }

interface RegExp {
	/**
	 * Returns a string indicating the flags of the regular expression in question. This field is read-only.
	 * The characters in this string are sequenced and concatenated in the following order:
	 *
	 *    - "g" for global
	 *    - "i" for ignoreCase
	 *    - "m" for multiline
	 *    - "u" for unicode
	 *    - "y" for sticky
	 *
	 * If no flags are set, the value is the empty string.
	 */
	readonly flags: string;

	/**
	 * Returns a Boolean value indicating the state of the sticky flag (y) used with a regular
	 * expression. Default is false. Read-only.
	 */
	readonly sticky: boolean;

	/**
	 * Returns a Boolean value indicating the state of the Unicode flag (u) used with a regular
	 * expression. Default is false. Read-only.
	 */
	readonly unicode: boolean;
}

interface RegExpConstructor {
	new (pattern: RegExp, flags?: string): RegExp;
	(pattern: RegExp, flags?: string): RegExp;
}

interface ConcatArray<T> {
	readonly length: number;
	readonly [n: number]: T;
	join(separator?: string): string;
	slice(start?: number, end?: number): T[];
}

interface Array<T> {
	/**
		* Gets or sets the length of the array. This is a number one higher than the highest element defined in an array.
		*/
	length: number;
	/**
		* Returns a string representation of an array.
		*/
	toString(): string;
	/**
		* Returns a string representation of an array. The elements are converted to string using their toLocalString methods.
		*/
	toLocaleString(): string;
	/**
		* Appends new elements to an array, and returns the new length of the array.
		* @param items New elements of the Array.
		*/
	push(...items: T[]): number;
	/**
		* Removes the last element from an array and returns it.
		*/
	pop(): T | undefined;
	/**
		* Combines two or more arrays.
		* @param items Additional items to add to the end of array1.
		*/
	concat(...items: ConcatArray<T>[]): T[];
	/**
		* Combines two or more arrays.
		* @param items Additional items to add to the end of array1.
		*/
	concat(...items: (T | ConcatArray<T>)[]): T[];
	/**
		* Adds all the elements of an array separated by the specified separator string.
		* @param separator A string used to separate one element of an array from the next in the resulting String.
			If omitted, the array elements are separated with a comma.
		*/
	join(separator?: string): string;
	/**
		* @description Reverses the elements in an Array.
		*/
	reverse(): T[];
	/**
		* @description Removes the first element from an array and returns it.
		*/
	shift(): T | undefined;
	/**
		* @description Returns a section of an array.
		* @param start The beginning of the specified portion of the array.
		* @param end The end of the specified portion of the array.
		*/
	slice(start?: number, end?: number): T[];
	/**
		* Sorts an array.
		* @param compareFn The name of the function used to determine the order of the elements.
			If omitted, the elements are sorted in ascending, ASCII character order.
		*/
	sort(compareFn?: (a: T, b: T) => number): this;
	/**
		* @description Removes elements from an array and, if necessary, inserts new elements in their place,
			returning the deleted elements.
		* @param start The zero-based location in the array from which to start removing elements.
		* @param deleteCount The number of elements to remove.
		*/
	splice(start: number, deleteCount?: number): T[];
	/**
		* @description Removes elements from an array and, if necessary,
			inserts new elements in their place, returning the deleted elements.
		* @param start The zero-based location in the array from which to start removing elements.
		* @param deleteCount The number of elements to remove.
		* @param items Elements to insert into the array in place of the deleted elements.
		*/
	splice(start: number, deleteCount: number, ...items: T[]): T[];
	/**
		* Inserts new elements at the start of an array.
		* @param items  Elements to insert at the start of the Array.
		*/
	unshift(...items: T[]): number;
	/**
		* Returns the index of the first occurrence of a value in an array.
		* @param searchElement The value to locate in the array.
		* @param fromIndex The array index at which to begin the search.
			If fromIndex is omitted, the search starts at index 0.
		*/
	indexOf(searchElement: T, fromIndex?: number): number;
	/**
		* Returns the index of the last occurrence of a specified value in an array.
		* @param searchElement The value to locate in the array.
		* @param fromIndex The array index at which to begin the search.
			If fromIndex is omitted, the search starts at the last index in the array.
		*/
	lastIndexOf(searchElement: T, fromIndex?: number): number;
	/**
		* Determines whether all the members of an array satisfy the specified test.
		* @param callbackfn A function that accepts up to three arguments.
			The every method calls the callbackfn function for each element in array1
			until the callbackfn returns false, or until the end of the array.
		* @param thisArg An object to which the this keyword can refer in the callbackfn function.
			If thisArg is omitted, undefined is used as the this value.
		*/
	every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
	/**
		* Determines whether the specified callback function returns true for any element of an array.
		* @param callbackfn A function that accepts up to three arguments.
			The some method calls the callbackfn function for each element in array1 until
			the callbackfn returns true, or until the end of the array.
		* @param thisArg An object to which the this keyword can refer in the callbackfn function.
			If thisArg is omitted, undefined is used as the this value.
		*/
	some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
	/**
		* Performs the specified action for each element in an array.
		* @param callbackfn  A function that accepts up to three arguments.
		forEach calls the callbackfn function one time for each element in the array.
		* @param thisArg  An object to which the this keyword can refer in the callbackfn function.
		If thisArg is omitted, undefined is used as the this value.
		*/
	forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
	/**
		* Calls a defined callback function on each element of an array, and returns an array that contains the results.
		* @param callbackfn A function that accepts up to three arguments.
		The map method calls the callbackfn function one time for each element in the array.
		* @param thisArg An object to which the this keyword can refer in the callbackfn function.
		If thisArg is omitted, undefined is used as the this value.
		*/
	map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
	/**
	 * Returns the elements of an array that meet the condition specified in a callback function.
	 * @param callbackfn A function that accepts up to three arguments.
	 * The filter method calls the callbackfn function one time for each element in the array.
	 * @param thisArg An object to which the this keyword can refer in the callbackfn function.
	 * If thisArg is omitted, undefined is used as the this value.
	 */
	filter<S extends T>(callbackfn: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
	/**
		* Returns the elements of an array that meet the condition specified in a callback function.
		* @param callbackfn A function that accepts up to three arguments.
		The filter method calls the callbackfn function one time for each element in the array.
		* @param thisArg An object to which the this keyword can refer in the callbackfn function.
		If thisArg is omitted, undefined is used as the this value.
		*/
	filter(callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any): T[];
	/**
		* Calls the specified callback function for all the elements in an array.
		The return value of the callback function is the accumulated result,
		and is provided as an argument in the next call to the callback function.
		* @param callbackfn A function that accepts up to four arguments.
		The reduce method calls the callbackfn function one time for each element in the array.
		* @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation.
		The first call to the callbackfn function provides this value as an argument instead of an array value.
		*/
	reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
		// Unified here ^
	// reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
	/**
		* Calls the specified callback function for all the elements in an array.
		The return value of the callback function is the accumulated result,
		and is provided as an argument in the next call to the callback function.
		* @param callbackfn A function that accepts up to four arguments.
		The reduce method calls the callbackfn function one time for each element in the array.
		* @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation.
		The first call to the callbackfn function provides this value as an argument instead of an array value.
		*/
	reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
	/**
		* Calls the specified callback function for all the elements in an array, in descending order.
			The return value of the callback function is the accumulated result,
			and is provided as an argument in the next call to the callback function.
		* @param callbackfn A function that accepts up to four arguments.
		The reduceRight method calls the callbackfn function one time for each element in the array.
		* @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation.
		The first call to the callbackfn function provides this value as an argument instead of an array value.
		*/
	reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
	reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) =>
		T, initialValue: T): T;
	/**
		* Calls the specified callback function for all the elements in an array, in descending order.
		The return value of the callback function is the accumulated result,
		and is provided as an argument in the next call to the callback function.
		* @param callbackfn A function that accepts up to four arguments.
		The reduceRight method calls the callbackfn function one time for each element in the array.
		* @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation.
		The first call to the callbackfn function provides this value as an argument instead of an array value.
		*/
	reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[])
		=> U, initialValue: U): U;

	[n: number]: T;
}

interface ArrayConstructor {
	readonly prototype: Array<any>;
	new(arrayLength?: number): any[];
	new <T>(arrayLength: number): T[];
	new <T>(...items: T[]): T[];
	(arrayLength?: number): any[];
	<T>(arrayLength: number): T[];
	<T>(...items: T[]): T[];
	isArray(arg: any): arg is Array<any>;
}

declare const Array: ArrayConstructor;

interface ReadonlyArray<T> {
	/**
	 * Returns the value of the first element in the array where predicate is true, and undefined
	 * otherwise.
	 * @param predicate find calls predicate once for each element of the array, in ascending
	 * order, until it finds one where predicate returns true. If such an element is found, find
	 * immediately returns that element value. Otherwise, find returns undefined.
	 * @param thisArg If provided, it will be used as the this value for each invocation of
	 * predicate. If it is not provided, undefined is used instead.
	 */
	find<S extends T>(predicate: (this: void, value: T, index: number, obj: ReadonlyArray<T>)
		=> value is S, thisArg?: any): S | undefined;
	find(predicate: (value: T, index: number, obj: ReadonlyArray<T>) => boolean, thisArg?: any): T | undefined;

	/**
	 * Returns the index of the first element in the array where predicate is true, and -1
	 * otherwise.
	 * @param predicate find calls predicate once for each element of the array, in ascending
	 * order, until it finds one where predicate returns true. If such an element is found,
	 * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
	 * @param thisArg If provided, it will be used as the this value for each invocation of
	 * predicate. If it is not provided, undefined is used instead.
	 */
	findIndex(predicate: (value: T, index: number, obj: ReadonlyArray<T>) => boolean, thisArg?: any): number;
}

interface Math {
	/** The mathematical constant e. This is Euler's number, the base of natural logarithms. */
	readonly E: number;
	/** The natural logarithm of 10. */
	readonly LN10: number;
	/** The natural logarithm of 2. */
	readonly LN2: number;
	/** The base-2 logarithm of e. */
	readonly LOG2E: number;
	/** The base-10 logarithm of e. */
	readonly LOG10E: number;
	/** Pi. This is the ratio of the circumference of a circle to its diameter. */
	readonly PI: number;
	/** The square root of 0.5, or, equivalently, one divided by the square root of 2. */
	readonly SQRT1_2: number;
	/** The square root of 2. */
	readonly SQRT2: number;
	/**
	  * Returns the absolute value of a number (the value without regard to whether it is positive or negative).
	  * For example, the absolute value of -5 is the same as the absolute value of 5.
	  * @param x A numeric expression for which the absolute value is needed.
	  */
	abs(x: number): number;
	/**
	  * Returns the arc cosine (or inverse cosine) of a number.
	  * @param x A numeric expression.
	  */
	acos(x: number): number;
	/**
	  * Returns the arcsine of a number.
	  * @param x A numeric expression.
	  */
	asin(x: number): number;
	/**
	  * Returns the arctangent of a number.
	  * @param x A numeric expression for which the arctangent is needed.
	  */
	atan(x: number): number;
	/**
	  * Returns the angle (in radians) from the X axis to a point.
	  * @param y A numeric expression representing the cartesian y-coordinate.
	  * @param x A numeric expression representing the cartesian x-coordinate.
	  */
	atan2(y: number, x: number): number;
	/**
	  * Returns the smallest integer greater than or equal to its numeric argument.
	  * @param x A numeric expression.
	  */
	ceil(x: number): number;
	/**
	  * Returns the cosine of a number.
	  * @param x A numeric expression that contains an angle measured in radians.
	  */
	cos(x: number): number;
	/**
	  * Returns e (the base of natural logarithms) raised to a power.
	  * @param x A numeric expression representing the power of e.
	  */
	exp(x: number): number;
	/**
	  * Returns the greatest integer less than or equal to its numeric argument.
	  * @param x A numeric expression.
	  */
	floor(x: number): number;
	/**
	  * Returns the natural logarithm (base e) of a number.
	  * @param x A numeric expression.
	  */
	log(x: number): number;
	/**
	  * Returns the larger of a set of supplied numeric expressions.
	  * @param values Numeric expressions to be evaluated.
	  */
	max(...values: number[]): number;
	/**
	  * Returns the smaller of a set of supplied numeric expressions.
	  * @param values Numeric expressions to be evaluated.
	  */
	min(...values: number[]): number;
	/**
	  * Returns the value of a base expression taken to a specified power.
	  * @param x The base value of the expression.
	  * @param y The exponent value of the expression.
	  */
	pow(x: number, y: number): number;
	/** Returns a pseudorandom number between 0 and 1. */
	random(): number;
	/**
	  * Returns a supplied numeric expression rounded to the nearest number.
	  * @param x The value to be rounded to the nearest number.
	  */
	round(x: number): number;
	/**
	  * Returns the sine of a number.
	  * @param x A numeric expression that contains an angle measured in radians.
	  */
	sin(x: number): number;
	/**
	  * Returns the square root of a number.
	  * @param x A numeric expression.
	  */
	sqrt(x: number): number;
	/**
	  * Returns the tangent of a number.
	  * @param x A numeric expression that contains an angle measured in radians.
	  */
	tan(x: number): number;
}

/** An intrinsic object that provides basic mathematics functionality and constants. */
declare const Math: Math;

interface Boolean {
	/** Returns the primitive value of the specified object. */
	valueOf(): boolean;
}

interface BooleanConstructor {
	readonly prototype: Boolean;
	new(value?: any): Boolean;
	(value?: any): boolean;
}

declare const Boolean: BooleanConstructor;

interface Number {
	/**
	  * Returns a string representation of an object.
	  * @param radix Specifies a radix for converting numeric values to strings. This value is only used for numbers.
	  */
	// toString(radix?: number): string;

	/**
	  * Returns a string representing a number in fixed-point notation.
	  * @param fractionDigits Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
	  */
	// toFixed(fractionDigits?: number): string;

	/**
	  * Returns a string containing a number represented in exponential notation.
	  * @param fractionDigits Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
	  */
	// toExponential(fractionDigits?: number): string;

	/**
	  * Returns a string containing a number represented either in exponential or
	  * 	fixed-point notation with a specified number of digits.
	  * @param precision Number of significant digits. Must be in the range 1 - 21, inclusive.
	  */
	// toPrecision(precision?: number): string;

	/** Returns the primitive value of the specified object. */
	// valueOf(): number;
}

interface NumberConstructor {
	(value?: any): number;
	readonly prototype: Number;

	/** The largest number that can be represented in JavaScript. Equal to approximately 1.79E+308. */
	readonly MAX_VALUE: number;

	/**
	  * A value that is not a number.
	  * In equality comparisons, NaN does not equal any value,
	  * 	including itself. To test whether a value is equivalent to NaN, use the isNaN function.
	  */
	readonly NaN: number;

	/**
	  * A value that is less than the largest negative number that can be represented in JavaScript.
	  * JavaScript displays NEGATIVE_INFINITY values as -infinity.
	  */
	readonly NEGATIVE_INFINITY: number;

	/**
	  * A value greater than the largest number that can be represented in JavaScript.
	  * JavaScript displays POSITIVE_INFINITY values as infinity.
	  */
	readonly POSITIVE_INFINITY: number;

	/** The closest number to zero that can be represented in JavaScript. Equal to approximately 5.00E-324. */
	readonly MIN_VALUE: number;

	new(value?: any): Number;
}

/** An object that represents a number of any kind. All JavaScript numbers are 64-bit floating-point numbers. */
declare const Number: NumberConstructor;

// ! Error object (for stracktrace) unsupported
// interface Error {
// 	name: string;
// 	message: string;
// 	stack?: string;
// }

// interface ErrorConstructor {
// 	readonly prototype: Error;
// 	new(message?: string): Error;
// 	(message?: string): Error;
// }

// declare const Error: ErrorConstructor;


/**
 * * ES2015 Collections
 */

interface ArrayLike<T> {
	readonly length: number;
	readonly [n: number]: T;
}

interface Map<K, V> {
	readonly size: number;
	clear(): void;
	delete(key: K): boolean;
	forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
	get(key: K): V | undefined;
	has(key: K): boolean;
	set(key: K, value: V): this;
}


interface MapConstructor {
	readonly prototype: Map<any, any>;
	new (): Map<any, any>;
	new <K, V>(entries?: ReadonlyArray<[K, V]>): Map<K, V>;
}

declare const Map: MapConstructor;


interface ReadonlyMap<K, V> {
	readonly size: number;
	forEach(callbackfn: (value: V, key: K, map: ReadonlyMap<K, V>) => void, thisArg?: any): void;
	get(key: K): V | undefined;
	has(key: K): boolean;
}


// interface WeakMap<K extends object, V> {
// 	delete(key: K): boolean;
// 	get(key: K): V | undefined;
// 	has(key: K): boolean;
// 	set(key: K, value: V): this;
// }


// interface WeakMapConstructor {
// 	readonly prototype: WeakMap<object, any>;
// 	new (): WeakMap<object, any>;
// 	new <K extends object, V>(entries?: ReadonlyArray<[K, V]>): WeakMap<K, V>;
// }
// declare let WeakMap: WeakMapConstructor;


interface Set<T> {
	readonly size: number;
	add(value: T): this;
	clear(): void;
	delete(value: T): boolean;
	forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void;
	has(value: T): boolean;
}


interface SetConstructor {
	readonly prototype: Set<any>;
	new (): Set<any>;
	new <T>(values?: ReadonlyArray<T>): Set<T>;
}

declare const Set: SetConstructor;


interface ReadonlySet<T> {
	readonly size: number;
	forEach(callbackfn: (value: T, value2: T, set: ReadonlySet<T>) => void, thisArg?: any): void;
	has(value: T): boolean;
}

interface WeakSet<T extends object> {
	add(value: T): this;
	delete(value: T): boolean;
	has(value: T): boolean;
}

interface WeakSetConstructor {
	readonly prototype: WeakSet<object>;
	new (): WeakSet<object>;
	new <T extends object>(values?: ReadonlyArray<T>): WeakSet<T>;
}
declare let WeakSet: WeakSetConstructor;

/**
 * * Symbol
 */
interface Symbol {
	/** Returns a string representation of an object. */
	toString(): string;

	/** Returns the primitive value of the specified object. */
	valueOf(): symbol;
}

interface SymbolConstructor {
	/**
	 * A reference to the prototype.
	 */
	readonly prototype: Symbol;

	/**
	 * Returns a new unique Symbol value.
	 * @param  description Description of the new Symbol object.
	 */
	(description?: string | number): symbol;

	/**
	 * Returns a Symbol object from the global symbol registry matching the given key if found.
	 * Otherwise, returns a new symbol with this key.
	 * @param key key to search for.
	 */
	for(key: string): symbol;

	/**
	 * Returns a key from the global symbol registry matching the given Symbol if found.
	 * Otherwise, returns a undefined.
	 * @param sym Symbol to find the key for.
	 */
	keyFor(sym: symbol): string | undefined;
}

declare const Symbol: SymbolConstructor;


/**
 * * Iterable
 */

interface SymbolConstructor {
	/**
	 * A method that returns the default iterator for an object. Called by the semantics of the
	 * for-of statement.
	 */
	readonly iterator: symbol;
}

interface IteratorResult<T> {
	done: boolean;
	value: T;
}

interface Iterator<T> {
	next(value?: any): IteratorResult<T>;
	return?(value?: any): IteratorResult<T>;
	throw?(e?: any): IteratorResult<T>;
}

interface Iterable<T> {
	[Symbol.iterator](): Iterator<T>;
}

interface IterableIterator<T> extends Iterator<T> {
	[Symbol.iterator](): IterableIterator<T>;
}

interface Array<T> {
	/** Iterator */
	[Symbol.iterator](): IterableIterator<T>;

	/**
	 * Returns an iterable of key, value pairs for every entry in the array
	 */
	entries(): IterableIterator<[number, T]>;

	/**
	 * Returns an iterable of keys in the array
	 */
	keys(): IterableIterator<number>;

	/**
	 * Returns an iterable of values in the array
	 */
	values(): IterableIterator<T>;
}

interface ArrayConstructor {
	/**
	 * Creates an array from an iterable object.
	 * @param iterable An iterable object to convert to an array.
	 */
	from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];

	/**
	 * Creates an array from an iterable object.
	 * @param iterable An iterable object to convert to an array.
	 * @param mapfn A mapping function to call on every element of the array.
	 * @param thisArg Value of 'this' used to invoke the mapfn.
	 */
	from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
}

interface ReadonlyArray<T> {
	/** Iterator of values in the array. */
	[Symbol.iterator](): IterableIterator<T>;

	/**
	 * Returns an iterable of key, value pairs for every entry in the array
	 */
	entries(): IterableIterator<[number, T]>;

	/**
	 * Returns an iterable of keys in the array
	 */
	keys(): IterableIterator<number>;

	/**
	 * Returns an iterable of values in the array
	 */
	values(): IterableIterator<T>;
}

interface IArguments {
	/** Iterator */
	[Symbol.iterator](): IterableIterator<any>;
}

interface Map<K, V> {
	/** Returns an iterable of entries in the map. */
	[Symbol.iterator](): IterableIterator<[K, V]>;

	/**
	 * Returns an iterable of key, value pairs for every entry in the map.
	 */
	entries(): IterableIterator<[K, V]>;

	/**
	 * Returns an iterable of keys in the map
	 */
	keys(): IterableIterator<K>;

	/**
	 * Returns an iterable of values in the map
	 */
	values(): IterableIterator<V>;
}

interface ReadonlyMap<K, V> {
	/** Returns an iterable of entries in the map. */
	[Symbol.iterator](): IterableIterator<[K, V]>;

	/**
	 * Returns an iterable of key, value pairs for every entry in the map.
	 */
	entries(): IterableIterator<[K, V]>;

	/**
	 * Returns an iterable of keys in the map
	 */
	keys(): IterableIterator<K>;

	/**
	 * Returns an iterable of values in the map
	 */
	values(): IterableIterator<V>;
}

interface MapConstructor {
	new <K, V>(iterable: Iterable<[K, V]>): Map<K, V>;
}

interface WeakMap<K extends object, V> { }

interface WeakMapConstructor {
	new <K extends object, V>(iterable: Iterable<[K, V]>): WeakMap<K, V>;
}

interface Set<T> {
	/** Iterates over values in the set. */
	[Symbol.iterator](): IterableIterator<T>;
	/**
	 * Returns an iterable of [v,v] pairs for every value `v` in the set.
	 */
	entries(): IterableIterator<[T, T]>;
	/**
	 * Despite its name, returns an iterable of the values in the set,
	 */
	keys(): IterableIterator<T>;

	/**
	 * Returns an iterable of values in the set.
	 */
	values(): IterableIterator<T>;
}

interface ReadonlySet<T> {
	/** Iterates over values in the set. */
	[Symbol.iterator](): IterableIterator<T>;

	/**
	 * Returns an iterable of [v,v] pairs for every value `v` in the set.
	 */
	entries(): IterableIterator<[T, T]>;

	/**
	 * Despite its name, returns an iterable of the values in the set,
	 */
	keys(): IterableIterator<T>;

	/**
	 * Returns an iterable of values in the set.
	 */
	values(): IterableIterator<T>;
}

interface SetConstructor {
	new <T>(iterable: Iterable<T>): Set<T>;
}

interface WeakSet<T extends object> { }

interface WeakSetConstructor {
	new <T extends object>(iterable: Iterable<T>): WeakSet<T>;
}

interface String {
	/** Iterator */
	[Symbol.iterator](): IterableIterator<string>;
}

interface Int8Array {
	[Symbol.iterator](): IterableIterator<number>;
	/**
	 * Returns an array of key, value pairs for every entry in the array
	 */
	entries(): IterableIterator<[number, number]>;
	/**
	 * Returns an list of keys in the array
	 */
	keys(): IterableIterator<number>;
	/**
	 * Returns an list of values in the array
	 */
	values(): IterableIterator<number>;
}

interface Int8ArrayConstructor {
	new (elements: Iterable<number>): Int8Array;

	/**
	 * Creates an array from an array-like or iterable object.
	 * @param arrayLike An array-like or iterable object to convert to an array.
	 * @param mapfn A mapping function to call on every element of the array.
	 * @param thisArg Value of 'this' used to invoke the mapfn.
	 */
	from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Int8Array;
}


interface Uint8Array {
	[Symbol.iterator](): IterableIterator<number>;
	/**
	 * Returns an array of key, value pairs for every entry in the array
	 */
	entries(): IterableIterator<[number, number]>;
	/**
	 * Returns an list of keys in the array
	 */
	keys(): IterableIterator<number>;
	/**
	 * Returns an list of values in the array
	 */
	values(): IterableIterator<number>;
}


interface Uint8ArrayConstructor {
	new (elements: Iterable<number>): Uint8Array;

	/**
	 * Creates an array from an array-like or iterable object.
	 * @param arrayLike An array-like or iterable object to convert to an array.
	 * @param mapfn A mapping function to call on every element of the array.
	 * @param thisArg Value of 'this' used to invoke the mapfn.
	 */
	from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
}


interface Uint8ClampedArray {
	[Symbol.iterator](): IterableIterator<number>;
	/**
	 * Returns an array of key, value pairs for every entry in the array
	 */
	entries(): IterableIterator<[number, number]>;

	/**
	 * Returns an list of keys in the array
	 */
	keys(): IterableIterator<number>;

	/**
	 * Returns an list of values in the array
	 */
	values(): IterableIterator<number>;
}


interface Uint8ClampedArrayConstructor {
	new (elements: Iterable<number>): Uint8ClampedArray;


	/**
	 * Creates an array from an array-like or iterable object.
	 * @param arrayLike An array-like or iterable object to convert to an array.
	 * @param mapfn A mapping function to call on every element of the array.
	 * @param thisArg Value of 'this' used to invoke the mapfn.
	 */
	from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8ClampedArray;
}

interface Int16Array {
	[Symbol.iterator](): IterableIterator<number>;
	/**
	 * Returns an array of key, value pairs for every entry in the array
	 */
	entries(): IterableIterator<[number, number]>;

	/**
	 * Returns an list of keys in the array
	 */
	keys(): IterableIterator<number>;

	/**
	 * Returns an list of values in the array
	 */
	values(): IterableIterator<number>;
}

interface Int16ArrayConstructor {
	new (elements: Iterable<number>): Int16Array;

	/**
	 * Creates an array from an array-like or iterable object.
	 * @param arrayLike An array-like or iterable object to convert to an array.
	 * @param mapfn A mapping function to call on every element of the array.
	 * @param thisArg Value of 'this' used to invoke the mapfn.
	 */
	from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Int16Array;
}


interface Uint16Array {
	[Symbol.iterator](): IterableIterator<number>;
	/**
	 * Returns an array of key, value pairs for every entry in the array
	 */
	entries(): IterableIterator<[number, number]>;
	/**
	 * Returns an list of keys in the array
	 */
	keys(): IterableIterator<number>;
	/**
	 * Returns an list of values in the array
	 */
	values(): IterableIterator<number>;
}


interface Uint16ArrayConstructor {
	new (elements: Iterable<number>): Uint16Array;

	/**
	 * Creates an array from an array-like or iterable object.
	 * @param arrayLike An array-like or iterable object to convert to an array.
	 * @param mapfn A mapping function to call on every element of the array.
	 * @param thisArg Value of 'this' used to invoke the mapfn.
	 */
	from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint16Array;
}

interface Int32Array {
	[Symbol.iterator](): IterableIterator<number>;
	/**
	 * Returns an array of key, value pairs for every entry in the array
	 */
	entries(): IterableIterator<[number, number]>;
	/**
	 * Returns an list of keys in the array
	 */
	keys(): IterableIterator<number>;
	/**
	 * Returns an list of values in the array
	 */
	values(): IterableIterator<number>;
}

interface Int32ArrayConstructor {
	new (elements: Iterable<number>): Int32Array;

	/**
	 * Creates an array from an array-like or iterable object.
	 * @param arrayLike An array-like or iterable object to convert to an array.
	 * @param mapfn A mapping function to call on every element of the array.
	 * @param thisArg Value of 'this' used to invoke the mapfn.
	 */
	from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Int32Array;
}


interface Uint32Array {
	[Symbol.iterator](): IterableIterator<number>;
	/**
	 * Returns an array of key, value pairs for every entry in the array
	 */
	entries(): IterableIterator<[number, number]>;
	/**
	 * Returns an list of keys in the array
	 */
	keys(): IterableIterator<number>;
	/**
	 * Returns an list of values in the array
	 */
	values(): IterableIterator<number>;
}


interface Uint32ArrayConstructor {
	new (elements: Iterable<number>): Uint32Array;

	/**
	 * Creates an array from an array-like or iterable object.
	 * @param arrayLike An array-like or iterable object to convert to an array.
	 * @param mapfn A mapping function to call on every element of the array.
	 * @param thisArg Value of 'this' used to invoke the mapfn.
	 */
	from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint32Array;
}


interface Float32Array {
	[Symbol.iterator](): IterableIterator<number>;
	/**
	 * Returns an array of key, value pairs for every entry in the array
	 */
	entries(): IterableIterator<[number, number]>;
	/**
	 * Returns an list of keys in the array
	 */
	keys(): IterableIterator<number>;
	/**
	 * Returns an list of values in the array
	 */
	values(): IterableIterator<number>;
}


interface Float32ArrayConstructor {
	new (elements: Iterable<number>): Float32Array;

	/**
	 * Creates an array from an array-like or iterable object.
	 * @param arrayLike An array-like or iterable object to convert to an array.
	 * @param mapfn A mapping function to call on every element of the array.
	 * @param thisArg Value of 'this' used to invoke the mapfn.
	 */
	from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Float32Array;
}


interface Float64Array {
	[Symbol.iterator](): IterableIterator<number>;
	/**
	 * Returns an array of key, value pairs for every entry in the array
	 */
	entries(): IterableIterator<[number, number]>;
	/**
	 * Returns an list of keys in the array
	 */
	keys(): IterableIterator<number>;
	/**
	 * Returns an list of values in the array
	 */
	values(): IterableIterator<number>;
}


interface Float64ArrayConstructor {
	new (elements: Iterable<number>): Float64Array;

	/**
	 * Creates an array from an array-like or iterable object.
	 * @param arrayLike An array-like or iterable object to convert to an array.
	 * @param mapfn A mapping function to call on every element of the array.
	 * @param thisArg Value of 'this' used to invoke the mapfn.
	 */
	from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Float64Array;

}
