# Todo MERN Application

This application was intented to produce a simples PoW by building a MERN Application, doing a graphql API integration, end-to-end.

## Tecnologies used

- MongoDB
- Express
- React
- Node.JS
- Relay
- Graphql-http

## Actual Schema

```graphql
"""
Exposes a URL that specifies the behavior of this scalar.
"""
directive @specifiedBy(
  """
  The URL that specifies the behavior of this scalar.
  """
  url: String!
) on SCALAR

scalar Date

type Mutation {
  createUser(user: UserInput): UserOutput
  createTask(deadline: Date!, description: String!): taskOutput
}

type Query {
  login(email: String!, password: String!): UserOutput
}

input taskInput {
  description: String!
  creationDate: Date!
  deadline: Date!
  isCompleted: Boolean!
}

type taskOutput {
  _id: String
  description: String!
  creationDate: Date!
  deadline: Date!
  isCompleted: Boolean!
}

input UserInput {
  email: String!
  password: String!
  name: String!
}

type UserOutput {
  _id: String!
  email: String!
  name: String!
}
```

## Running application locally

For running this project, `pnpm` is required.

```sh
$ docker run -p 27017:27017 -d mongo
$ pnpm install
$ pnpm start
```

The `start` script will run the application end-to-end. Point your web browser to `http://localhost:3000` to access it. Make calls to the API on `http://localhost:3001`. Please refer to the documentation of each package for details of application.
