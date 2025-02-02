import { TaskModel } from "./model.mjs";

/**
 * @typedef {Object} DBTask
 * @property {string} DBTask.title
 * @property {string} DBTask.description
 * @property {string} DBTask.userId
 * @property {"NOT_DONE" | "IN_PROGRESS" | "COMPLETED"} DBTask.status
 * @property {Date} DBTask.createdAt
 */

/**
 * @param {Object} task
 * @param {string} task.title
 * @param {string} task.description
 * @param {string} task.userId
 *
 * @returns {Promise<DBTask>}
 */
export async function create(task) {
  const t = await TaskModel.create(task);

  return t.toObject();
}

/**
 * @param {string} userId
 *
 * @returns {Promise<Array<DBTask>>}
 */
export async function getAllForUser(userId) {
  const tasks = await TaskModel.find({ userId }, null, { lean: true });

  return tasks;
}

/**
 * @typedef {Object} DBTaskWithUser
 * @property {string} DBTaskWithUser.title
 * @property {string} DBTaskWithUser.description
 * @property {string} DBTaskWithUser.userId
 * @property {"NOT_DONE" | "IN_PROGRESS" | "COMPLETED"} DBTaskWithUser.status
 * @property {string} DBTaskWithUser.user.email
 * @property {string} DBTaskWithUser.user.id
 * @property {Date} DBTaskWithUser.createdAt
 */

/**
 * @param {string} taskId
 *
 * @returns {Promise<DBTaskWithUser>}
 */
export async function getOneWithUser(taskId) {
  const task = await TaskModel.findById(taskId, null, {
    populate: "user",
  });

  if (!task) {
    throw new Error("Task not found");
  }

  return task.toObject();
}
