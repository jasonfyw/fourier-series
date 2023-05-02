import { complex, pi, sin } from "mathjs"
import { PresetFunctionEntry } from "../types"

export const presetFunctions: { [k: string]: PresetFunctionEntry } = {
    'sin': {
        displayName: 'Sine',
        function: (t: number) => {
            return complex(100 * sin(t * 2 * pi), 0)
        }
    },
    'step': {
        displayName: 'Step',
        function: (t: number) => {
            return t > 0.5 ? complex(100, 0) : complex(-100, 0)
        }
    },
}