import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLString,
} from "graphql";

export const dateType = new GraphQLScalarType(Date);

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
        taskDbAccess: { createTask },
      },
      userId,
    }
  ) =>
    ensureIdentification(userId, async () => {
      const createdTask = await createTask({ deadline, description, userId });
      return createdTask;
    }),
};
