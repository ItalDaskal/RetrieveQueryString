import {QueryObj, Operators, CompundOperators} from './queryString.interface';
import compundQueryService from '../compundQuery/compundQuery.service';
import Entity from '../../store/store.interface';
import storeService from '../../store/store.service';

const isComoundOperator = (str: string) => Object.values(CompundOperators).findIndex(s => s === str) > -1;

const getParams = (params: string) => params.split(/[\s,]+/);

const translateNonCompundQueryToQueryObject = (query: string) => {
    const splitted = query.split(/[\s()]+/);
    let params: any[] = []
    params = getParams(splitted[1])

    switch(splitted[0]){
        case "EQUAL":
            const equalObj = {
                operator : Operators.EQUAL,
                property : params[0],
                value : params[1].replace(/"/g, '')
            }
            return equalObj
        case "GREATER_THAN":
            const gtObj = {
                operator : Operators.GREATER_THAN,
                property : params[0],
                value : parseInt(params[1])
            }
            return gtObj
    }
    return null
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

const initiatedFlow = (query: string) => {
    const queryObj: QueryObj | null = translateNonCompundQueryToQueryObject(query)
    const pridicate: Predicate | null = getNonCompundPredictat(queryObj);
    return populateData(pridicate);
}

export const getDataByQuery = (query: string) => {
    const splitted = query.split(/[\s()]+/);
    const isCompund = isComoundOperator(splitted[0]);
    
    if (!isCompund) {
        return initiatedFlow(query);
    }
    if (isCompund) {
        const compundOperator = splitted[0] as CompundOperators;
        const querysArray: string[] = compundQueryService.splittedCompund(query)
        const stagingData: Array<Entity[] | any> = querysArray.map(m => initiatedFlow(m)).filter(function (elem) {
            return elem !== undefined;
        });
        return compundQueryService.populateCompundData(compundOperator, stagingData)
    }
}

export default {getDataByQuery};