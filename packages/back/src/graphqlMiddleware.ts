import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { createHandler } from "graphql-http";
import { createUserMutation, loginQuery, userInput, userOutput } from "./user";

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    ...createUserMutation,
  },
});

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...loginQuery,
  },
});

const graphqlMiddleware = createHandler({
  schema: new GraphQLSchema({
    types: [userInput, userOutput],
    mutation,
    query,
  }),
});

export default graphqlMiddleware;
