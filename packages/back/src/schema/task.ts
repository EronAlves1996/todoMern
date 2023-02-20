import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLInputObjectType,
  GraphQLList,
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

const taskOutput = new GraphQLObjectType({
  name: "TaskOutput",
  fields: {
    _id: { type: GraphQLString },
    ...task,
  },
});

const taskInput = new GraphQLInputObjectType({
  name: "TaskInput",
  fields: {
    ...task,
  },
});

const createTask: GraphQLFieldConfig<any, any, any> = {
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
      const createdTask = await create({
        deadline,
        description,
        userId,
        creationDate: new Date(),
        isCompleted: false,
      });
      return createdTask;
    }),
};

const loadTasks: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLList(taskOutput),
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, { userId }, ctx) =>
    ensureIdentification(ctx.userId, async () => {
      if (userId !== ctx.userId)
        throw new Error("You don't have access to the tasks of other user");
      return await ctx.loaders.task.findManyBy({ userId });
    }),
};

const loadTask: GraphQLFieldConfig<any, any, any> = {
  type: taskOutput,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, { id }, ctx) =>
    ensureIdentification(ctx.userId, async () => {
      const task = await ctx.loaders.task.findOneBy({ _id: id });
      if (task.userId != ctx.userId)
        throw new Error("You don't have access on this task");
      return task;
    }),
};

const updateTask: GraphQLFieldConfig<any, any, any> = {
  type: taskOutput,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    task: { type: taskInput },
  },
  resolve: async (_, { id, task }, ctx) =>
    ensureIdentification(ctx.userId, async () => {
      return await ctx.loaders.task.updateWhere(
        { _id: id, userId: ctx.userId },
        { _id: id, ...task }
      );
    }),
};

const deleteTask: GraphQLFieldConfig<any, any, any> = {
  type: taskOutput,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, { id }, ctx) =>
    ensureIdentification(ctx.userId, async () => {
      return await ctx.loaders.task.delete({ _id: id, userId: ctx.userId });
    }),
};

const taskSchema: Ischema = {
  types: [taskOutput, taskInput],
  mutations: { createTask, updateTask, deleteTask },
  queries: { loadTasks, loadTask },
  mongooseSchema: {
    name: "task",
    schema: taskMongooseSchema,
  },
};

export default taskSchema;
