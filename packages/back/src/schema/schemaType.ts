import {
  GraphQLFieldConfig,
  GraphQLInputType,
  GraphQLOutputType,
} from "graphql";
import { Schema } from "mongoose";

interface schema {
  types: Array<GraphQLInputType | GraphQLOutputType>;
  queries: GraphQLFieldConfig<any, any, any>;
  mutations: GraphQLFieldConfig<any, any, any>;
  mongooseSchema: Schema;
}

export default schema;
