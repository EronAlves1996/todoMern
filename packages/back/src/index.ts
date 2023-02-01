import express from "express";
import mongoose from "mongoose";
import graphqlMiddleware from "./middlewares/graphqlMiddleware";
import loginMiddleware from "./middlewares/loginMiddleware";
import verifyMiddlware from "./middlewares/verifyMiddleware";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.post("/login", loginMiddleware);
app.get("/verify", verifyMiddlware);
app.all("/graphql", graphqlMiddleware);

(async () => {
  await mongoose.connect("mongodb://localhost:27017/todo");
  console.log("Connected to database");
  app.listen(3001);
  console.log("App listening on 3001");
})();
