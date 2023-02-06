import cookieParser from "cookie-parser";
import express from "express";
import graphqlMiddleware from "./middlewares/graphqlMiddleware";
import loginMiddleware from "./middlewares/loginMiddleware";
import verifyMiddlware from "./middlewares/verifyMiddleware";

const app = express();

app.use(cookieParser());

app.post("/login", loginMiddleware);
app.get("/verify", verifyMiddlware);
app.all("/graphql", graphqlMiddleware);

export default app;
