# Wix Assignment

> Backend API for store and retrieve data

## Run App
```
# Run in dev mode
npm run dev

- Version: 1.0.0
- License: MIT

## Postman Example
 post endpoint >> http://localhost:5000/api/post/store

 body example >>
 [{
  "id": "first-post",
  "title": "My third Post",
  "content": "Hello World!",
  "views": 4,
  "timestamp": 1555832341
},
{
  "id": "second-post",
  "title": "My third Post",
  "content": "Hello World!",
  "views": 123,
  "timestamp": 1555832341
},
{
  "id": "first-post",
  "title": "My third Post",
  "content": "Hello World!",
  "views": 111,
  "timestamp": 1555832341
}]

get endpoint >> 
    http://localhost:5000/api/get/retrive?query=AND(EQUAL(id,"first-post"), GREATER_THAN(views,100))
    http://localhost:5000/api/get/retrive?query=EQUAL(id,"second-post")
    http://localhost:5000/api/get/retrive?query=GREATER_THAN(views,100)

