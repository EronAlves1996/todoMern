import { Request, Response } from "express";
import { sha256 } from "js-sha256";
import { userModel } from "./graphqlMiddleware";
import * as jwt from "jsonwebtoken";
import { LeanDocument, Types } from "mongoose";

type leanUserMongooseDoc =
  | (LeanDocument<{
      _id?: Types.ObjectId | undefined;
      email?: string | undefined;
      password?: string | undefined;
      name?: string | undefined;
    }> &
      Required<{
        _id: Types.ObjectId;
      }>)
  | undefined;

function send403(res: Response) {
  res.status(403);
  res.header(
    "WWW-Authenticate",
    'Basic realm="Access to private resources" charset="UTF-8"'
  );
  res.send();
}

function unencodeCredentials(authorization: string) {
  const encodedCredentials = authorization?.split(" ")[1];
  return Buffer.from(encodedCredentials!, "base64")
    .toString("ascii")
    .split(":");
}

async function findUser(email: string, password: string) {
  return await userModel.findOne({ email, password });
}

function erasePasswordInformation(user: leanUserMongooseDoc) {
  return { _id: user?._id, name: user?.name, email: user?.email };
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
    "jwt-login",
    jwt.sign(userAsObject._id?.toString() as string, "MERN")
  );
  res.status(200);
  res.send(userAsObject);
};

export default loginMiddleware;
