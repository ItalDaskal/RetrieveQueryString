import Entity from '../../store/store.interface';

export enum Operators {
    NAN = "",
    EQUAL = "===",
    GREATER_THAN = ">",
    AND = "&&"
}
export enum CompundOperators {
    AND = 'AND',
    NOT = 'NOT'
}

export interface QueryObj {
    operator: Operators;
    property: keyof Entity;
    value: string | number;
};

