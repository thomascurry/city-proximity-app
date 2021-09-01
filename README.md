This is a solution to the following problem: Using the language of your choice please build your own API which calls the API at bpdts-test-app.herokuapp.com, and returns people who are listed as either living in London, or whose current coordinates are within 50 miles of London.

# Technologies:

- NodeJS
- Typescript
- Express
- Axios
- Jest
- Geopoint
- Lodash
- OpenApiValidator
- Yarn

# Running

```bash
$ yarn install
$ yarn dev
```

# Tests

```bash
yarn test
```

# Querying

```
$ curl -X GET "http://localhost:3000/cities/london/users"
```

or with a different radius

```
$ curl -X GET "http://localhost:3000/cities/london/users?radius=10"
```
