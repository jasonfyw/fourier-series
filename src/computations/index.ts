import { t } from '@chakra-ui/styled-system/dist/declarations/src/utils'
import { complex, Complex, multiply, exp, pi } from 'mathjs'
import integral from './integral'

export const functionFromPoints = (points: Array<[number, number]>): (t: number) => Complex => {
    return (t: number) => {
        const [re, im] = points[Math.round(t * (points.length - 1))]
        return complex(re, im)
    }
}


const computeFourierCoefficient = (n: number, f: (t: number) => Complex): Complex => {
    const n_t = (t: number): Complex => (
        multiply(
            f(t),
            exp(
                multiply(n * 2 * pi * t, complex(0, 1)) as Complex
        )) as Complex
    )
    
    const dx = 0.0001
    return integral(0, 1, n_t, dx)
}

export const computeFourierSeries = (n_total: number, f: (t: number) => Complex) => {
    let constants: { [n: number]: Complex; } = {}

    for (
        let n = Math.round(-n_total / 2);
        n < Math.round(n_total / 2) + n_total % 2;
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