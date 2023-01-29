import express from "express";
import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { createHandler } from "graphql-http/lib/use/node";
import { sha256 } from "js-sha256";
import mongoose, { model, Schema } from "mongoose";

const app = express();

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: Schema.Types.String,
  password: Schema.Types.String,
  name: Schema.Types.String,
});

const userModel = model("user", userSchema);

const userInput = new GraphQLInputObjectType({
  name: "UserInput",
  fields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

const userOutput = new GraphQLObjectType({
  name: "UserOutput",
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

const createUserMutation = new GraphQLObjectType({
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

const queryUser = new GraphQLObjectType({
  name: "Query",
  fields: {
    getTest: {
      type: GraphQLString,
      resolve: () => "Test",
    },
  },
});

const graphqlHandler = createHandler({
  schema: new GraphQLSchema({
    types: [userInput, userOutput],
    mutation: createUserMutation,
    query: queryUser,
  }),
});

(async () => {
  await mongoose.connect("mongodb://localhost:27017/todo");
  console.log("Connected to database");
  app.use("/graphql", graphqlHandler);
  app.listen(3001);
  console.log("App listening on 3001");
})();
