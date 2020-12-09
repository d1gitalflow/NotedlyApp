# NotedlyApp API
- With this fullstack app you can Create, Edit, Remove and Read Notes.
- Favorite and Unfavorite Notes.
- Securely create an account and login.
- See a public Note's feed 
- See favorited Notes 
- See own user Notes
- Persist all data in MongoDB



## Install & run API
Run the commands inside /api folder
```
npm install #install nodejs modules
npm run dev #kickstart nodejs server

```
Update .env.example to .env and add mongodb db access string & JWT Token
```
## Database
DB_HOST=<Your MongoDB URL>
TEST_DB=<A MongoDB URL for Running Tests>

## Authentication
JWT_SECRET=<Your json web token secret>

``` 
Access GraphQL playground to mess with API on:
```
http://localhost:4001/api
```


## API details:

### Server side ( nodejs ) is using:
- Node.js
- Express.js
- Apollo-Server
- MongoDB (mongoose.js module)

### Other modules ( security ):
- Helmet
- Cors
- JWT - JSON Web Token





## Related Repositories (NotedlyApp)

- [API](https://github.com/d1gitalflow/NotedlyApp/tree/master/api)
- [WEB](https://github.com/d1gitalflow/NotedlyApp/tree/master/web)

