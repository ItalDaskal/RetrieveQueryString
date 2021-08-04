import Entity from '../../store/store.interface';

export enum Operators {
    NAN = '',
    EQUAL = '===',
    NOTEQUAL = '!=',
    GREATER_THAN = '>',
    LESS_THAN = '<',
    AND = '&&',
    OR = '||',
    NOT = '!'
}
export enum CompundOperators {
    AND = 'AND',
    OR = 'OR',
    NOT = 'NOT'
}

export interface QueryObj {
    operator: Operators;
    property: keyof Entity;
    value: string | number;
};

