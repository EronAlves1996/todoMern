import { GraphQLFieldConfig, GraphQLNamedType } from "graphql";
import { Schema } from "mongoose";

export type mongooseSchemaDef = { name: string; schema: Schema };

interface Ischema {
  types?: GraphQLNamedType[];
  queries?: { [queryName: string]: GraphQLFieldConfig<any, any, any> };
  mutations?: { [mutationName: string]: GraphQLFieldConfig<any, any, any> };
  mongooseSchema?: mongooseSchemaDef;
}

export default Ischema;
