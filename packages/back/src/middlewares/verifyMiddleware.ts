import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import configuration from "../config";
import { erasePasswordInformation } from "../utils/userUtils";
import { loaders } from "./graphqlMiddleware";
import { send403 } from "./utils";

const { existsBy, findOneBy } = loaders.user;

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
    if (!existsBy({ _id: userId })) {
      throw new Error("Invalid cookie/user");
    }
    const user = await findOneBy({ _id: userId });
    const userWithoutPassword = erasePasswordInformation(user);
    res.status(200);
    res.send(userWithoutPassword);
  } catch (err) {
    invalidateCookie(res);
    send403(res);
  }
}

export default verifyMiddlware;
