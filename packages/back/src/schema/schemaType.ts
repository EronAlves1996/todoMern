import {
  GraphQLFieldConfig,
  GraphQLInputType,
  GraphQLOutputType,
} from "graphql";
import { Schema } from "mongoose";

interface schema {
  types?: Array<GraphQLInputType | GraphQLOutputType>;
  queries?: Array<GraphQLFieldConfig<any, any, any>>;
  mutations?: Array<GraphQLFieldConfig<any, any, any>>;
  mongooseSchema?: { name: string; schema: Schema };
}

export default schema;
