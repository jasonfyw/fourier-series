import {
    complex,
    pi,
    sin,
    // exp,
    // subtract,
    // divide,
    // Complex
} from "mathjs"
import { PresetFunctionEntry } from "../types"

export const presetFunctions: { [k: string]: PresetFunctionEntry } = {
    'sin': {
        displayName: 'Sine wave',
        function: (t: number) => {
            return complex(100 * sin(t * 2 * pi), 0)
        }
    },
    'square': {
        displayName: 'Square wave',
        function: (t: number) => {
            return (t > 0.25 && t <= 0.5) || (t > 0.75 && t <= 1) ? complex(100, 0) : complex(-100, 0)
        }
    },
    'sawtooth': {
        displayName: 'Sawtooth wave',
        function: (t: number) => {
            return complex(100 * ((2*t) - Math.floor(2*t)), 0)
        }
    },
    // 'exponential': {
    //     displayName: 'Complex square wave',
    //     function: (t: number) => {
    //         let z = divide(subtract(exp(complex(0, t)), exp(complex(0, -t))), complex(0, 2)) as Complex
    //         return complex(z.re, z.im)
    //     }
    // },
}