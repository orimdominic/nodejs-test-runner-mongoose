import { UserModel } from "./model.mjs";

/**
 * @typedef {Object} DBUser
 * @property {string} DBTask.email
 * @property {string} DBUser.id
 * @property {Date} DBUser.createdAt
 */

/**
 * @param {string} email
 *
 * @returns {Promise<DBUser>}
 */
export async function create(email) {
  const emailExists = await UserModel.exists({ email: email.toLowerCase() });
  if (emailExists) {
    throw new Error("Duplicate email");
  }

  const user = await UserModel.create({ email });

  return user.toObject();
}

/**
 * @typedef {Object} DBUserWithTotalTasks
 * @property {string} DBTask.email
 * @property {string} DBUser.id
 * @property {number} DBUser.totalTasks
 * @property {Date} DBUser.createdAt
 */
/**
 * @param {string} userId
 *
 * @returns {Promise<DBUserWithTotalTasks>}
 */
export async function getById(userId) {
  // TODO
}
