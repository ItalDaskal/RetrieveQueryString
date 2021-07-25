export enum Operators {
    EQUAL = "===",
    GREATER_THAN = ">",
    AND = "&&"
}
export enum CompundOperators {
    AND = 'AND',
    NOT = 'NOT'
}

export interface Entity {
    id: string
    title: string
    content: string
    views: number
    timestamp: number
};

export interface QueryObj {
    operator: Operators;
    property: keyof Entity;
    value: string | number;
};

