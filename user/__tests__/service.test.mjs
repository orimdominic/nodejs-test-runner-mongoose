import t from "node:test";
import assert from "node:assert/strict";

import { Types } from "mongoose";

import * as service from "../service.mjs";
import { UserModel } from "../model.mjs";
import { TaskModel } from "../../task/model.mjs";

t.beforeEach(async function () {
  await UserModel.deleteMany({});
  await TaskModel.deleteMany({});
});

const email = "Hey@Mail.com";

t.describe("UserService.create", function () {
  t.it("creates and returns a user", async function () {
    const user = await service.create(email);

    assert.ok(user.id);
    assert.ok(user.createdAt);
    assert.ok(user.email, user.email.toLowerCase());
  });

  t.it("throws an error when email exists already", async function () {
    await service.create(email);

    return assert.rejects(service.create(email));
  });
});

t.describe("UserService.getById", function () {
  t.it("throws an error if user is not found", async function () {
    return assert.rejects(service.getById(`${new Types.ObjectId()}`));
  });

  t.it("returns a user with their total tasks", async function () {
    await UserModel.deleteMany();

    const email = "Hey@Mail.com";
    const { id: userId } = await service.create(email);

    for (let i = 0; i < 3; i++) {
      const taskArgs = {
        userId: userId,
        title: "Lorem ipsum",
      };

      await service.create(taskArgs);
    }

    const user = await service.getById(userId);

    assert.equal(user.id, userId);
    assert.ok(user.createdAt);
    assert.equal(user.totalTasks, 3);
    assert.equal(user.email, email.toLowerCase());
  });
});
