import {
  GraphQLFieldConfig,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { Schema } from "mongoose";
import hashString from "../utils/hash";
import Ischema from "./schemaType";

export const userMongooseSchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: Schema.Types.String,
  password: Schema.Types.String,
  name: Schema.Types.String,
});

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
  resolve: async (
    _,
    { email, password },
    {
      loaders: {
        user: { findOneBy },
      },
    }
  ) => {
    const hashedPassword = hashString(password);
    const userFinded = await findOneBy({ email, password: hashedPassword });
    return userFinded;
  },
};

export const createUser: GraphQLFieldConfig<any, any, any> = {
  args: {
    user: {
      type: userInput,
    },
  },
  type: userOutput,
  resolve: async (
    _,
    { user: { email, password, name } },
    {
      loaders: {
        user: { create },
      },
    }
  ) => {
    const hashedPassword = hashString(password);
    const userSaved = await create({
      email,
      password: hashedPassword,
      name,
    });
    return userSaved;
  },
};

const userSchema: Ischema = {
  types: [userInput, userOutput],
  mutations: { createUser },
  queries: { login },
  mongooseSchema: {
    name: "user",
    schema: userMongooseSchema,
  },
};

export default userSchema;
