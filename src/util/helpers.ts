/**
 * Delay a function for a certain amount of time before executing it.
 * @param fn {Function}
 * @param ms {number}
 * @returns {Function}
 */
export function debounce(fn: Function, ms: number = 300) {
	let timeout: ReturnType<typeof setTimeout>;

	return function (this: any, ...args: any[]) {
		clearTimeout(timeout);
		timeout = setTimeout(() => fn.apply(this, args), ms);
	};
}

/**
 * Generate a random string of a certain length.
 * @param length {number}
 * @returns {string} The generated random string.
 */
export function generateRandomString(length: number): string {
	let result = '';
	let characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let charactersLength = characters.length;

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

/**
 *	Format a raw join date string into a more readable format.
 * @param rawJoinDate {string} The raw join date string.
 * @returns {string} The formatted join date string.
 */
export function formatJoinedDate(rawJoinDate: string): string {
	const date = new Date(rawJoinDate);
	const month = date.toLocaleString('default', { month: 'short' });
	const day = date.getDate();
	const year = date.getFullYear();

	return `${month} ${day}, ${year}`;
}
