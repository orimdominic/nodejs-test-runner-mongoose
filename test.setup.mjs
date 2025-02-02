import t from "node:test";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

/** @type {MongoMemoryServer} */
let dbServer;

export const connect = async () => {
  dbServer = await MongoMemoryServer.create();
  const uri = dbServer.getUri();
  await mongoose.connect(uri);
};

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close(true);
  await dbServer.stop({ force: true, doCleanup: true });
};

t.before(async () => {
  await connect();
});

t.after(async () => {
  await closeDatabase();
});
