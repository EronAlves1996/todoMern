# Back-end MERN Todo

This is the back-end for MERN todo application.

## .env

The environment variables is defined by default as following details:

```env
COOKIE_NAME=jwt-login
JWT_SECRET=MERN
DB_URL=localhost:27017/todo
```

Make sure to create a .env file in the root dir to customize the configuration.

## Running tests

** It's strongly recommended that you create a `.env.test` following the conventions above for testing **

```sh
$ pnpm test
```

## Running the backend application

`pnpm` is required for running the application.

```sh
$ pnpm install
$ pnpm start
```

## Endpoints

- `POST /graphql` - You can make graphql calls against this endpoint.
- `POST /login` - You can send the credentials for login making a REST call against this endpoint. It follows the Basic Authentication specification.
- `GET /verify` - You can verify if you have a valid cookie by making a REST call against this endpoint. It gonna returns the associated user data.
