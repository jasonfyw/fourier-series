
/**
 * Return an array of numbers from <start> to <stop> in increments of <step>
 * @param start starting index
 * @param stop ending index (not included)
 * @param step increment
 * @returns Array<number>
 */
const arange = (start: number, stop: number, step: number): Array<number> => {
    step = step || 1
    let arr = []
    for (let i = start; i < stop; i += step) {
        arr.push(i)
    }
    return arr
}


/**
 * Return the Riemann sum of a function f(x) with step size of <dx>. 
 * f(x) is assumed to be integrable and defined on a ≤ x ≤ b
 * @param a 
 * @param b 
 * @param f 
 * @param dx 
 * @returns 
 */
const integral = (
    a: number,
    b: number,
    f: (x: number) => number,
    dx: number
): number => {
    let sum = 0

    for (const x of arange(a, b, dx)) {
        sum += f(x) * dx
    }

    return sum
}

export default integral