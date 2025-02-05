/**
 * @typedef {Object} DBTask
 * @property {string} DBTask.title
 * @property {string} DBTask.description
 * @property {string} DBTask.userId
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
export async function create(task) {}

/**
 * @param {string} userId
 *
 * @returns {Promise<Array<DBTask>>}
 */
export async function getAllForUser(userId) {}

/**
 * @typedef {Object} DBTaskWithUser
 * @property {string} DBTaskWithUser.title
 * @property {string} DBTaskWithUser.description
 * @property {string} DBTaskWithUser.userId
 * @property {string} DBTaskWithUser.user.email
 * @property {string} DBTaskWithUser.user.id
 * @property {Date} DBTaskWithUser.createdAt
 */

/**
 * @param {string} taskId
 *
 * @returns {Promise<DBTaskWithUser>}
 */
export async function getOneWithUser(taskId) {}
