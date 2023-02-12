import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { Schema } from "mongoose";
import { ensureIdentification } from "../utils/ensureIdentification";
import { dateType } from "./date";
import Ischema from "./schemaType";

const taskMongooseSchema = new Schema({
  _id: Schema.Types.ObjectId,
  description: Schema.Types.String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  creationDate: Schema.Types.Date,
  deadline: Schema.Types.Date,
  isCompleted: Schema.Types.Boolean,
});

const task = {
  description: { type: new GraphQLNonNull(GraphQLString) },
  creationDate: { type: new GraphQLNonNull(dateType) },
  deadline: { type: new GraphQLNonNull(dateType) },
  isCompleted: { type: new GraphQLNonNull(GraphQLBoolean) },
};

export const taskOutput = new GraphQLObjectType({
  name: "taskOutput",
  fields: {
    _id: { type: GraphQLString },
    ...task,
  },
});

export const taskInput = new GraphQLInputObjectType({
  name: "taskInput",
  fields: {
    ...task,
  },
});

export const createTask: GraphQLFieldConfig<any, any, any> = {
  type: taskOutput,
  args: {
    deadline: { type: new GraphQLNonNull(dateType) },
    description: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (
    _,
    { deadline, description },
    {
      loaders: {
        task: { create },
      },
      userId,
    }
  ) =>
    ensureIdentification(userId, async () => {
      const createdTask = await create({ deadline, description, userId });
      return createdTask;
    }),
};

const taskSchema: Ischema = {
  types: [taskOutput, taskInput],
  mutations: [createTask],
  mongooseSchema: {
    name: "task",
    schema: taskMongooseSchema,
  },
};

export default taskSchema;
