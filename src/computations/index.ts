import { complex, Complex, multiply, exp, pi } from 'mathjs'
import integral from './integral'

/**
 * Converts an array of 2d points in the form [x, y] to a function that takes a real number t, 0 ≤ t ≤ 1
 * and outputs a complex number of the form x+iy according to the point [x, y] at the 100t% index in <points>
 * @param points array of tuples of [number, number]
 * @returns a function with domain t in the reals and 0 ≤ t ≤ 1, with codomain in the complex  numbers
 */
export const functionFromPoints = (points: Array<[number, number]>): (t: number) => Complex => {
    return (t: number) => {
        const [re, im] = points[Math.round(t * (points.length - 1))]
        return complex(re, im)
    }
}

/**
 * Computes the complex coefficient of the nth term in the Fourier series (determines the initial magnitude and angle)
 * give by the formula c_n = \int_0^1 f(t)e^{2πitn} dt
 * @param n integer
 * @param f a function from the reals to the complex plane
 * @returns a complex number
 */
const computeFourierCoefficient = (n: number, f: (t: number) => Complex): Complex => {
    const n_t = (t: number): Complex => (
        multiply(
            f(t),
            exp(
                multiply(n * 2 * pi * t, complex(0, 1)) as Complex
        )) as Complex
    )
    
    const dt = 0.001
    return integral(0, 1, n_t, dt)
}

/**
 * Computes the Fourier series of a given complex function up to <n_total> terms and returns an unsummed array
 * of the value of each term (which allows for individual rendering of the value of each term)
 * @param n_total number of terms of the Fourier series to compute
 * @param f function from reals to complex plane
 * @returns an array of complex values representing the value of each term in the series at <t>
 */
export const computeFourierSeries = (n_total: number, f: (t: number) => Complex) => {
    let constants: { [n: number]: Complex; } = {}

    for (
        let n = Math.round(-n_total / 2);
        n < Math.round(n_total / 2);
        n++
    ) {
        constants[n] = computeFourierCoefficient(n, f)
    }

    return (t: number): Complex[] => (
        Object.entries(constants).map(([n, c]: [string, Complex]): Complex => (
            multiply(
                c,
                exp(
                    multiply(Number(n) * 2 * pi * t, complex(0, 1)) as Complex
                )
            )
        ) as Complex)
    )
}