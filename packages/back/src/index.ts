import express from "express";
import mongoose from "mongoose";
import { graphqlMiddleware } from "./graphqlMiddleware";

const app = express();

(async () => {
  await mongoose.connect("mongodb://localhost:27017/todo");
  console.log("Connected to database");
  app.use("/graphql", graphqlMiddleware);
  app.listen(3001);
  console.log("App listening on 3001");
})();
