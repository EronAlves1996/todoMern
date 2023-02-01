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

export function erasePasswordInformation(user: leanUserMongooseDoc) {
  return { _id: user?._id, name: user?.name, email: user?.email };
}
