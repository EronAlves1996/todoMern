import {
  GraphQLFieldConfig,
  GraphQLInputType,
  GraphQLNamedType,
  GraphQLOutputType,
} from "graphql";
import { Schema } from "mongoose";

interface Ischema {
  types?: GraphQLNamedType[];
  queries?: Array<GraphQLFieldConfig<any, any, any>>;
  mutations?: Array<GraphQLFieldConfig<any, any, any>>;
  mongooseSchema?: { name: string; schema: Schema };
}

export default Ischema;
