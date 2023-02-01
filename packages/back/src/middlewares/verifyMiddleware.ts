import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import configuration from "../config";
import userDbAccess from "../dbAccess/user";
import { erasePasswordInformation } from "../utils/userUtils";
import { send403 } from "./utils";

const { userExistsById, findById } = userDbAccess;

function invalidateCookie(res: Response) {
  res.cookie(configuration.COOKIE_NAME, "", { maxAge: 0 });
}

async function verifyMiddlware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cookie = req.cookies[configuration.COOKIE_NAME];
    const userId = verify(cookie, configuration.JWT_SECRET) as string;
    if (!userExistsById(userId)) {
      throw new Error("Invalid cookie/user");
    }
    const user = await findById(userId);
    const userWithoutPassword = erasePasswordInformation(user?.toObject());
    res.status(200);
    res.send(userWithoutPassword);
  } catch (err) {
    invalidateCookie(res);
    send403(res);
  }
}

export default verifyMiddlware;
