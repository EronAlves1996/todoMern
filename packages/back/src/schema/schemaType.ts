import { GraphQLFieldConfig, GraphQLNamedType } from "graphql";
import { Schema } from "mongoose";

export type mongooseSchemaDef = { name: string; schema: Schema };

interface Ischema {
  types?: GraphQLNamedType[];
  queries?: Array<GraphQLFieldConfig<any, any, any>>;
  mutations?: Array<GraphQLFieldConfig<any, any, any>>;
  mongooseSchema?: mongooseSchemaDef;
}

export default Ischema;
