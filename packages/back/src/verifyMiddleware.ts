import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import configuration from "./config";
import { userModel } from "./graphqlMiddleware";
import { send403 } from "./httpUtils";
import { erasePasswordInformation } from "./userUtils";

function userExistsById(userId: any) {
  return userModel.exists({ _id: userId });
}

function invalidateCookie(res: Response) {
  res.cookie(configuration.COOKIE_NAME, "", { maxAge: 0 });
}

async function verifyMiddlware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookie = req.cookies[configuration.COOKIE_NAME];
  const userId = verify(cookie, configuration.JWT_SECRET);
  if (!userExistsById(userId)) {
    invalidateCookie(res);
    send403(res);
  }
  const user = await userModel.findOne({ _id: userId });
  const userWithoutPassword = erasePasswordInformation(user?.toObject());
  res.status(200);
  res.send(userWithoutPassword);
}

export default verifyMiddlware;
