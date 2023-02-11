import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import { createUser, login, userInput, userOutput } from "../schema/user";
import userDbAccess from "../dbAccess/user";
import taskDbAccess from "../dbAccess/task";
import { taskInput, taskOutput, createTask, dateType } from "../schema/task";
import { verify } from "jsonwebtoken";
import configuration from "../config";

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser,
    createTask,
  },
});

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    login,
  },
});

const schema = new GraphQLSchema({
  types: [userInput, userOutput, taskInput, taskOutput, dateType],
  mutation,
  query,
});

const graphqlMiddleware = createHandler({
  schema,
  context: async (req, params) => {
    let returnObject: any = { loaders: { userDbAccess, taskDbAccess } };
    try {
      const headers = req.headers as any;
      const cookie: string | null = headers["cookie"];
      const [cookieName, encodedJwt] = cookie?.split("=") as string[];
      if (cookieName != configuration.COOKIE_NAME)
        throw new Error("Invalid cookie");
      const userId = verify(encodedJwt!, configuration.JWT_SECRET).toString();
      if (await userDbAccess.userExistsById(userId)) {
        returnObject["userId"] = userId;
      }
    } catch (err) {
    } finally {
      return returnObject;
    }
  },
});

export default graphqlMiddleware;
