import { Request, Response } from "express";
import { sha256 } from "js-sha256";
import { userModel } from "./graphqlMiddleware";
import * as jwt from "jsonwebtoken";
import { LeanDocument, Types } from "mongoose";
import configuration from "./config";
import { send403 } from "./httpUtils";
import { erasePasswordInformation } from "./userUtils";

const WEEK = 60 * 60 * 24 * 7;

function unencodeCredentials(authorization: string) {
  const encodedCredentials = authorization?.split(" ")[1];
  return Buffer.from(encodedCredentials!, "base64")
    .toString("ascii")
    .split(":");
}

async function findUser(email: string, password: string) {
  return await userModel.findOne({ email, password });
}

const loginMiddleware = async (req: Request, res: Response) => {
  const authorization = req.headers.authorization;
  if (!authorization?.startsWith("Basic")) {
    send403(res);
  }

  const [email, password] = unencodeCredentials(authorization!);
  const hashedPassword = sha256(password);

  const findedUser = await findUser(email, hashedPassword);

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
