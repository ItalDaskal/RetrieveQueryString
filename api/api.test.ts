import apiService from './api.service'

describe('api module', () => {
    describe('store data', () => {
        test.only('should return empty obj in happy case', async () => {
            const mockreq = [{id: "firs-post", title: "My third Post", content: "Hello World!", views: 115, timestamp: 1555832341}]
            const mockres = [[]]
            expect( apiService.storeData(mockreq)).toEqual(mockres)
        });
        test('should return empty obj in case of empty array', async () => {
            expect( apiService.storeData([])).toEqual({})
        });
    });

    describe('retriev data - get query string and return data', () => {
        test.only('should data from db empty obj in happy case', async () => {
            const mockreq = 'EQUAL(id,"first-post")'
            const mockres = [[
                {
                    "id": "first-post",
                    "title": "My third Post",
                    "content": "Hello World!",
                    "views": 4,
                    "timestamp": 1555832341
                },
                {
                    "id": "first-post",
                    "title": "My third Post",
                    "content": "Hello World!",
                    "views": 111,
                    "timestamp": 1555832341
                }
            ]]
            expect( apiService.initQuery(mockreq)).toEqual(mockres)
        });
        test('should return error in case of empty query', async () => {
            const mockreq = ''
            const mockres = 'bad query'
            expect(apiService.initQuery(mockreq)).toEqual(mockres)
        }); 
    });

    
  });