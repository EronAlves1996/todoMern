import { Response } from "express";

export function send403(res: Response) {
  res.status(403);
  res.header(
    "WWW-Authenticate",
    'Basic realm="Access to private resources" charset="UTF-8"'
  );
  res.send();
}
