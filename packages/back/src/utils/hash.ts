import { sha256 } from "js-sha256";

function hashString(string: string) {
  return sha256(string);
}

export default hashString;
