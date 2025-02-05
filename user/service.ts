import { UserModel } from "./model";

export async function create(email: string) {
  const emailExists = await UserModel.exists({ email: email.toLowerCase() });
  if (emailExists) {
    throw new Error("Duplicate email");
  }

  const user = await UserModel.create({ email });

  return user.toObject();
}

/**
 * @param {string} userId
 *
 * @returns {Promise<DBUserWithTotalTasks>}
 */
export async function getById(userId: string) {
  // TODO
}
