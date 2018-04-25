
/**
 * TypeFall Standard Library
 * @description These functions are implemented in Lua.
 */
declare namespace std {

	/**
	 * A helper function used to determine if a given array contains
	 * 	a specific value
	 * @param array Array to check
	 * @param value Value to check for
	 */
	function contains<T>(array: Array<T>, value: any): boolean;
}
