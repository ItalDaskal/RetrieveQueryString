import Entity from '../../store/store.interface';
import {CompundOperators, Operators} from '../queryString/queryString.interface';
import { SwitchOperatorMap } from './compundQuery.interface';

const intersectArrays = <T>(arrays: Array<T[]>) => arrays[0].filter(x => arrays[1].indexOf(x) !== -1);

const concatArrays = <T>(arrays: Array<T[]>) => arrays[0].concat(arrays[1]);

const populateCompundData = (compundOperator: CompundOperators, stagingData: Array<Entity[]>) => {
    if(stagingData.length == 1){
        return stagingData
    }

    switch (compundOperator) {
        case CompundOperators.AND:
            return intersectArrays<Entity>(stagingData);
        case CompundOperators.OR:
            return concatArrays<Entity>(stagingData);
        case CompundOperators.NOT:
            return intersectArrays<Entity>(stagingData);
    } 
}

const switchOperators = (query: string) => {
    const re = new RegExp(Object.keys(SwitchOperatorMap).join("|"),"gi");
    return query.replace(re, (matched: string) => SwitchOperatorMap[matched]);
}

const splittedCompund = (compundOperator: CompundOperators, query: string): string[] => {
    const count = query.indexOf('(')+1;
    if(compundOperator == 'NOT'){
        query = switchOperators(query);
    }
    const queryArray : string[] = query.slice(count, -1).split(', ');
    return queryArray
}

export default {splittedCompund, populateCompundData}