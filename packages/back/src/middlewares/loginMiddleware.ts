import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import configuration from "../config";
import hashString from "../utils/hash";
import { erasePasswordInformation } from "../utils/userUtils";
import { loaders } from "./graphqlMiddleware";
import { send403 } from "./utils";

const WEEK = 1000 * 60 * 60 * 24 * 7;

const { findOneBy } = loaders.user;

function unencodeCredentials(authorization: string) {
  const encodedCredentials = authorization?.split(" ")[1];
  return Buffer.from(encodedCredentials!, "base64")
    .toString("ascii")
    .split(":");
}

const loginMiddleware = async (req: Request, res: Response) => {
  const authorization = req.headers.authorization;
  if (!authorization?.startsWith("Basic")) {
    send403(res);
  }

  const [email, password] = unencodeCredentials(authorization!);
  const hashedPassword = hashString(password);

  const findedUser = await findOneBy({ email, password: hashedPassword });

  if (findedUser == null) {
    send403(res);
  }

  const userAsObject = erasePasswordInformation(findedUser?.toObject());

  res.cookie(
    configuration.COOKIE_NAME,
    jwt.sign(userAsObject._id?.toString() as string, configuration.JWT_SECRET),
    { httpOnly: true, maxAge: 1 * WEEK }
  );
  res.status(200);
  res.send(userAsObject);
};

export default loginMiddleware;
