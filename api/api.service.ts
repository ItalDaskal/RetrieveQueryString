import {QueryObj, Entity, Operators, CompundOperators} from "./api.interface";

const data: Entity[] = [];

const storeData = (entity: Entity[]) => {
    entity.forEach((e: Entity) => {
        data.push(e);
    });
    return {};
}

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

const isComoundOperator = (str: string) => Object.values(CompundOperators).findIndex(s => s === str) > -1;

const splittedCompund = (query: string): string[] => {
    let count:number =1;
    for(let i=0; i < query.length; i++){
        if(query[i] == '('){
            break;
        }
        count++
    }
    return query.slice(count, -1).split(', ')
}

const getParams = (params: string) => params.split(/[\s,]+/);

// NonCompundQuery - EQUAL(id,"first-post")
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
    return data.filter(predictat);
}

const initiatedFlow = (query: string) => {
    const queryObj: QueryObj | null = translateNonCompundQueryToQueryObject(query)
    const pridicate: Predicate | null = getNonCompundPredictat(queryObj);
    return populateData(pridicate);
}

export const initQuery = (query: string) => {
    const splitted = query.split(/[\s()]+/);
    const isCompund = isComoundOperator(splitted[0]);
    
    if (!isCompund) {
        return initiatedFlow(query);
    }
    if (isCompund) {
        const compundOperator = splitted[0] as CompundOperators;
        const querysArray: string[] = splittedCompund(query)
        const stagingData: Array<Entity[] | any> = querysArray.map(m => initiatedFlow(m)).filter(function (elem) {
            return elem !== undefined;
        });
        return populateCompundData(compundOperator, stagingData)
    }
}

export default {storeData, initQuery};