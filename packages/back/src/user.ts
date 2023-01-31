import {
  GraphQLFieldConfig,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  ThunkObjMap,
} from "graphql";
import { sha256 } from "js-sha256";
import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: Schema.Types.String,
  password: Schema.Types.String,
  name: Schema.Types.String,
});

const userModel = model("user", userSchema);

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

export const loginQuery: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
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
};

export const createUserMutation: ThunkObjMap<
  GraphQLFieldConfig<any, any, any>
> = {
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
};
