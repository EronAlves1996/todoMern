import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { createHandler } from "graphql-http";
import { sha256 } from "js-sha256";
import mongoose from "mongoose";
import { userInput, userModel, userOutput } from "./user";

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    createUser: {
      args: {
        user: {
          type: userInput,
        },
      },
      type: userOutput,
      resolve: async (_, { user }) => {
        const hashedPassword = sha256(user.password);
        const userToSave = new userModel({
          _id: new mongoose.Types.ObjectId(),
          email: user.email,
          password: hashedPassword,
          name: user.name,
        });
        const userSaved = await userToSave.save();
        return userSaved.toObject();
      },
    },
  },
});

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    login: {
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      type: userOutput,
      resolve: async (_, { email, password }) => {
        const hashedPassword = sha256(password);
        const userFinded = await userModel.findOne({ email, hashedPassword });
        return userFinded?.toObject();
      },
    },
  },
});

export const graphqlMiddleware = createHandler({
  schema: new GraphQLSchema({
    types: [userInput, userOutput],
    mutation,
    query,
  }),
});
