import { Complex, complex, multiply, add } from "mathjs"
import _ from "lodash"
import { ComplexFunction } from "../types"

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
    f: ComplexFunction,
    dx: number
): Complex => {
    let sum = complex(0, 0)

    for (const x of _.range(a, b, dx)) {
        sum = add(sum, multiply(f(x), dx)) as Complex
    }

    return sum
}

export default integral