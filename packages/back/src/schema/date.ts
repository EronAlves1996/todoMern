import { GraphQLScalarType } from "graphql";
import schema from "./schemaType";

export const dateType = new GraphQLScalarType(Date);

const dateSchema: schema = {
  types: [dateType],
};

export default dateSchema;
