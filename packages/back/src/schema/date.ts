import { GraphQLScalarType } from "graphql";
import Ischema from "./schemaType";

export const dateType = new GraphQLScalarType(Date);

const dateSchema: Ischema = {
  types: [dateType],
};

export default dateSchema;
