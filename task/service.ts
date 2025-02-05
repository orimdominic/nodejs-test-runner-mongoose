import { TaskModel } from "./model";

type CreateTaskParams = {
  title: string;
  userId: string;
  description?: string;
};

export async function create(task: CreateTaskParams) {
  const t = await TaskModel.create(task);

  return t.toObject();
}

export async function getAllForUser(userId: string) {
  const tasks = await TaskModel.find({ userId }, null, { lean: true });

  return tasks;
}

export async function getOneWithUser(taskId: string) {
  const task = await TaskModel.findById(taskId, null, {
    populate: "user",
  });

  if (!task) {
    throw new Error("Task not found");
  }

  return task.toObject();
}
