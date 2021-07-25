import apiService from './api.service'

describe('api module', () => {
    describe('store data', () => {
        test.only('should return empty obj in happy case', async () => {
            const mockreq = [{id: "firs-post", title: "My third Post", content: "Hello World!", views: 115, timestamp: 1555832341}]
            const mockres = [[]]
            expect(await apiService.storeData(mockreq)).toEqual(mockres)
        });
        test('should return empty obj in case of empty array', async () => {
            expect(await apiService.storeData([])).toEqual({})
        });
    });

    describe('retriev data - get query string and return data', () => {
        
    });

    
  });