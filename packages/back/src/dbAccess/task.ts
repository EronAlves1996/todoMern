import mongoose, { model, Schema } from "mongoose";

type Task = {
  deadline: Date;
  description: string;
  userId: string;
};

const taskSchema = new Schema({
  _id: Schema.Types.ObjectId,
  description: Schema.Types.String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  creationDate: Schema.Types.Date,
  deadline: Schema.Types.Date,
  isCompleted: Schema.Types.Boolean,
});

const taskModel = model("task", taskSchema);

async function createTask(partialTaskObj: Task) {
  const task = new taskModel({
    _id: new mongoose.Types.ObjectId(),
    creationDate: new Date(),
    isCompleted: false,
    ...partialTaskObj,
    userId: new mongoose.Types.ObjectId(partialTaskObj.userId),
  });
  const taskSaved = await task.save();
  return taskSaved.toObject();
}

const taskDbAccess = {
  createTask,
};

export default taskDbAccess;
