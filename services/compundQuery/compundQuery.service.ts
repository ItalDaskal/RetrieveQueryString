import Entity from '../../store/store.interface';
import {CompundOperators} from '../queryString/queryString.interface';

const intersectArrays = <T>(arrays: Array<T[]>) => {
    const intersection : any[] = [];

    if(arrays.length == 1){
        return arrays
    }

    return arrays[0].filter(x => arrays[1].indexOf(x) !== -1);
}

const populateCompundData = (compundOperator: CompundOperators, stagingData: Array<Entity[]>) => {
    switch (compundOperator) {
        case CompundOperators.AND:
            return intersectArrays<Entity>(stagingData);
    } 
}

const splittedCompund = (query: string): string[] => {
    const count = query.indexOf('(')+1;
    return query.slice(count, -1).split(', ')
}

export default {splittedCompund, populateCompundData}