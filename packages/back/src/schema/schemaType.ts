import {
  GraphQLFieldConfig,
  GraphQLInputType,
  GraphQLOutputType,
} from "graphql";
import mongoose from "mongoose";

interface schema {
  types: Array<GraphQLInputType | GraphQLOutputType>;
  queries: GraphQLFieldConfig<any, any, any>;
  mutations: GraphQLFieldConfig<any, any, any>;
  mongooseSchema: mongoose.Schema;
}
