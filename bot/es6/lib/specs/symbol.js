// @flow


export type SymbolType = "string" | "number" | "collection" | "klass" | "null" | "method"  ;
//export type ValueType = number | string | Klass | Klass[] | null;
export type Symbol = {
    name: string,
    type: SymbolType,
    value: string 
};

export const NULL_SYMBOL={
    name: '',
    type: "null",
    value: "null"
}