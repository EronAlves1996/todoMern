import mongoose, { model, Schema } from "mongoose";

const userModel = model("user", userSchema);

async function findUserByEmailAndPassword(email: string, password: string) {
  return await userModel.findOne({ email, password });
}

function userExistsById(userId: string) {
  return userModel.exists({ _id: userId });
}

async function findById(_id: string) {
  return userModel.findOne({ _id });
}

async function createUser({
  name,
  password,
  email,
}: {
  name: string;
  password: string;
  email: string;
}) {
  const document = new userModel({
    _id: new mongoose.Types.ObjectId(),
    name,
    password,
    email,
  });
  return await document.save();
}

const userDbAccess = {
  findUserByEmailAndPassword,
  userExistsById,
  findById,
  createUser,
};

export default userDbAccess;
