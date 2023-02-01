import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import { createUser, login, userInput, userOutput } from "../schema/user";
import userDbAccess from "../dbAccess/user";

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser,
  },
});

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    login,
  },
});

const schema = new GraphQLSchema({
  types: [userInput, userOutput],
  mutation,
  query,
});

const graphqlMiddleware = createHandler({
  schema,
  context: (req, params) => {
    return { loaders: { userDbAccess } };
  },
});

export default graphqlMiddleware;
