import {
  GraphQLFieldConfig,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { sha256 } from "js-sha256";
import mongoose from "mongoose";

export const userInput = new GraphQLInputObjectType({
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

export const userOutput = new GraphQLObjectType({
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

export const login: GraphQLFieldConfig<any, any, any> = {
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  type: userOutput,
  resolve: async (_, { email, password }, { loaders }) => {
    const userLoader = loaders.user;
    const hashedPassword = sha256(password);
    const userFinded = await userLoader.findOne({
      email,
      password: hashedPassword,
    });
    return userFinded?.toObject();
  },
};

export const createUser: GraphQLFieldConfig<any, any, any> = {
  args: {
    user: {
      type: userInput,
    },
  },
  type: userOutput,
  resolve: async (_, { user }, { loaders }) => {
    const userLoader = loaders.user;
    const hashedPassword = sha256(user.password);
    const userToSave = new userLoader({
      _id: new mongoose.Types.ObjectId(),
      email: user.email,
      password: hashedPassword,
      name: user.name,
    });
    const userSaved = await userToSave.save();
    return userSaved.toObject();
  },
};
