import express from "express";
import { createHandler } from "graphql-http/lib/use/node";

const app = express();
const graphqlHandler = createHandler({});

app.use("/graphql", graphqlHandler);

app.listen(3001);
console.log("App listening on 3001");
