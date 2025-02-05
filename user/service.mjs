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
export async function create(email) {}

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
export async function getById(userId) {}
