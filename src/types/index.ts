import { Complex } from "mathjs";

export type ComplexFunction = (t: number) => Complex

export interface PresetFunctionEntry {
    displayName: string,
    function: ComplexFunction
}
