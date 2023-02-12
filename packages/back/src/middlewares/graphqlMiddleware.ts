import {
  GraphQLFieldConfig,
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLSchema,
  ThunkObjMap,
} from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import { verify } from "jsonwebtoken";
import { model, Model, Types } from "mongoose";
import configuration from "../config";
import userDbAccess from "../dbAccess/user";
import dateSchema from "../schema/date";
import Ischema, { mongooseSchemaDef } from "../schema/schemaType";
import taskSchema from "../schema/task";
import userSchema from "../schema/user";

const graphqlMiddleware = mountHandler(taskSchema, userSchema, dateSchema);

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
  const context = mountContext(
    ...schemas
      .filter((s) => s.mongooseSchema != undefined)
      .map((s) => s.mongooseSchema!)
  );
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

function mountContext(...mongooseSchemas: mongooseSchemaDef[]) {
  return async (req: any, params: any) => {
    let returnObject: any = { loaders: createLoaders(mongooseSchemas) };
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
  };
}

type loaderDefsType = {
  [key: string]: {
    [key: string]: (arg: any) => Promise<any>;
  };
};

function createLoaders(mongooseSchemas: mongooseSchemaDef[]) {
  const models: Model<any, unknown, unknown, unknown, any>[] =
    mongooseSchemas.map((mongoSchema) =>
      model(mongoSchema.name, mongoSchema.schema)
    );
  return models.reduce((loaderDefs: loaderDefsType, model) => {
    const modelName = model.name;
    loaderDefs[modelName] = {
      findOneBy: async (criteria: any) => {
        const result = await model.findOne(criteria);
        return result.toObject();
      },
      findManyBy: async (criteria: any) => {
        const result = await model.find(criteria);
        return result.map((r) => r.toObject());
      },
      create: async (entity: any) => {
        const _id = new Types.ObjectId();
        const createdDoc = new Model({ ...entity, _id });
        const docSaved = await createdDoc.save();
        return docSaved.toObject();
      },
    };
    return loaderDefs;
  }, {});
}
export default graphqlMiddleware;
