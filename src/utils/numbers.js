/**
 * Adds comma separators to a number.
 * @example
 * // returns 123،456
 * formatNumber(123456)
 * @param {number} number
 * @returns {string} formatted number
 */
export function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "،");
}