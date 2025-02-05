import mongoose from "mongoose";
import { TaskModel } from "./task/model";
import { UserModel } from "./user/model";

console.log(`You are running Node.js ${process.version}`);

async function main() {
  await mongoose.connect("mongodb://localhost:27017/nodejs-test-runner");

  const user = await UserModel.create({ email: "hey@world.com" });
  console.log(`Created user with id ${user.id}`);

  const task = await TaskModel.create({
    title: "Task title",
    description: "Task description",
    userId: user.id,
  });
  console.log(`Created task "${task.title}" for user with id "${task.userId}"`);

  await mongoose.disconnect();
}

main();
