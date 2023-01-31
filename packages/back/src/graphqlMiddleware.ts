
const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    login: {
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      type: userOutput,
      resolve: async (_, { email, password }) => {
        const hashedPassword = sha256(password);
        const userFinded = await userModel.findOne({ email, hashedPassword });
        return userFinded?.toObject();
      },
    },
  },
});

