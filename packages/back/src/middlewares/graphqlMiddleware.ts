import {
  GraphQLFieldConfig,
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLSchema,
  ThunkObjMap,
} from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import { verify } from "jsonwebtoken";
import configuration from "../config";
import dateSchema from "../schema/date";
import Ischema from "../schema/schemaType";
import taskSchema from "../schema/task";
import userSchema from "../schema/user";
import createLoaders from "../utils/createLoaders";

const schemas = [taskSchema, userSchema, dateSchema];

export const loaders = createLoaders(
  schemas
    .filter((s) => s.mongooseSchema != undefined)
    .map((s) => s.mongooseSchema!)
);
const graphqlMiddleware = mountHandler(...schemas);

function mountHandler(...schemas: Ischema[]) {
  const types: GraphQLNamedType[] = schemas.reduce((acc, sch) => {
    if (sch.types) return acc.concat(sch.types);
    return acc;
  }, [] as GraphQLNamedType[]);

  const mutationFields = schemas.reduce((acc, sch) => {
    return { ...acc, ...sch.mutations };
  }, {}) as ThunkObjMap<GraphQLFieldConfig<any, any, any>>;

  const queryFields: ThunkObjMap<GraphQLFieldConfig<any, any, any>> =
    schemas.reduce((acc, sch) => {
      return { ...acc, ...sch.queries };
    }, {}) as ThunkObjMap<GraphQLFieldConfig<any, any, any>>;

  const schema = mountSchema({ types, mutationFields, queryFields });
  const context = mountContext();
  return createHandler({
    schema,
    context,
  });
}

function mountSchema({
  types,
  mutationFields,
  queryFields,
}: {
  types: GraphQLNamedType[];
  mutationFields: ThunkObjMap<GraphQLFieldConfig<any, any, any>>;
  queryFields: ThunkObjMap<GraphQLFieldConfig<any, any, any>>;
}) {
  return new GraphQLSchema({
    types,
    mutation: new GraphQLObjectType({
      name: "Mutation",
      fields: { ...mutationFields },
    }),
    query: new GraphQLObjectType({
      name: "Query",
      fields: { ...queryFields },
    }),
  });
}

function mountContext() {
  return async (req: any, params: any) => {
    let returnObject: any = { loaders };
    try {
      const headers = req.headers as any;
      const cookie: string | null = headers["cookie"];
      const [cookieName, encodedJwt] = cookie?.split("=") as string[];
      if (cookieName != configuration.COOKIE_NAME)
        throw new Error("Invalid cookie");
      const userId = verify(encodedJwt!, configuration.JWT_SECRET).toString();
      if (await returnObject.loaders.user.findOneBy({ _id: userId })) {
        returnObject["userId"] = userId;
      }
    } catch (err) {
    } finally {
      return returnObject;
    }
  };
}

export default graphqlMiddleware;
