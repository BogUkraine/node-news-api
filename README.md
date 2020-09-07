# node-news-api

## How to run in dev mode
copy ```.env.defaults``` to ```.env``` with your data passed
```npm i```
```npm run dev```

## To run tests
```npm run test```

## About project
It is a project, that uses news-api for feeds as template. Project contains next features:
1. Register user with email and password
2. Register and login via google api (OAuth2)
3. Login and get jwt token as response
4. Show feeds with pagination
5. Post feed (only for auth user)
6. Delete feed (only for auth user, that created this feed)
7. Add feed to favorites (only for auth user)
8. Show favorites (only for auth user)
9. Delete favorites (only for auth user)
10. Project has cron operation, that get feeds from news-api every day at 2 p.m. and insert it into mongoDB
11. Caching some favorites for better user experience.

### Use postman documentation
Import collection ```News-api Lysov Bohdan.postman.json``` to your postman and use project functionality.

### Architecture
I keeps MVC pattern with 3 layer architecture.
There are controllers, service layer, data access layer. Whole bussines logic placed into model.

### Validation
I use LIVR validator. It is simple, lightweight without external bundle. Every request data will be passing through validator and services have access only to validated data.

### Dumps
Data returns only after going through dump object. So external or secure data will never returns to client.

## Things, that were done wrong
Not right OAuth2.0 usage. There were some difficults with refreshing token, so server doesn't get you opportunity
to refresh jwt. It means you need to login every hour (expiry time). And there are no possibility to logout.
As I see, in this case frontend can just delete token, but it is steel unsecure. The decision is to store it in cookie on the client side. We steel need to store our tokens and have possibility to refresh, remove it.

Only several endpoints are covered with unit tests.