import { response } from "express";
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import { model, Schema } from "mongoose";
import { createUser, login, userInput, userOutput } from "./user";

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

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: Schema.Types.String,
  password: Schema.Types.String,
  name: Schema.Types.String,
});

export const userModel = model("user", userSchema);

const graphqlMiddleware = createHandler({
  schema,
  context: (req, params) => {
    return { loaders: { user: userModel } };
  },
});

export default graphqlMiddleware;
