import {QueryObj, Operators, CompundOperators} from './queryString.interface';
import compundQueryService from '../compundQuery/compundQuery.service';
import Entity from '../../store/store.interface';
import storeService from '../../store/store.service';

const isComoundOperator = (str: string) => Object.values(CompundOperators).findIndex(s => s === str) > -1;

const getOperator = (op: string) => {
    switch(op){
        case "EQUAL":
            return Operators.EQUAL
        case "GREATER_THAN":
            return Operators.GREATER_THAN
    }
    return Operators.NAN
}

const translateNonCompundQueryToQueryObject = (splittedQuery: any[]) => {
    return {
        operator: getOperator(splittedQuery[0]),
        property : splittedQuery[1],
        value : splittedQuery[2]
    }
}

type Predicate = (d: Entity) => boolean;
const getNonCompundPredictat = (queryObj: QueryObj | null): Predicate | null => {
    if(queryObj){
        switch(queryObj.operator) {
            case Operators.EQUAL:
                return (d: Entity) => d[queryObj.property] === queryObj.value
            case Operators.GREATER_THAN:
                return (d: Entity) => d[queryObj.property] > queryObj.value
        }
    }
    return null;
}

const populateData = (predictat: Predicate | null) => {
    if(predictat == null){
        return null
    }
    return storeService.data.filter(predictat);
}


const getStagingData = (querysArray: string[]) => {
    return querysArray.map(m => initiatedFlow(getSplittedQuery(m)))
    .filter(function (elem) {
        return elem !== undefined;
    });
}

const initiatedFlow = (query: any[]) => {
    const queryObj: QueryObj | null = translateNonCompundQueryToQueryObject(query)
    const pridicate: Predicate | null = getNonCompundPredictat(queryObj);
    return populateData(pridicate);
}

const getSplittedQuery = (query: string) => query.split(/[(\s)()\"\,]/).filter(w => w);

export const getDataByQuery = (query: string) => {
    const splitted : any[] = getSplittedQuery(query);
    const isCompund = isComoundOperator(splitted[0]);
    
    if (!isCompund) {
        return initiatedFlow(splitted);
    }
    if (isCompund) {
        const compundOperator = splitted[0] as CompundOperators;
        const querysArray: string[] = compundQueryService.splittedCompund(query)
        const stagingData: Array<Entity[] | any> = getStagingData(querysArray);
        return compundQueryService.populateCompundData(compundOperator, stagingData)
    }
}

export default {getDataByQuery};