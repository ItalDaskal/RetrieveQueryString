import queryStringServies from '../services/queryString/queryString.service';

export const initQuery = (query: string) => {
    return queryStringServies.getDataByQuery(query);
}

export default {initQuery};