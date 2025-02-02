import t from "node:test";
import assert from "node:assert/strict";

import { Types } from "mongoose";

import * as service from "../service.mjs";
import { UserModel } from "../../user/model.mjs";

t.beforeEach(async function () {
  await UserModel.deleteMany({});
});

t.describe("TaskService.create", function () {
  t.it("creates a task and returns it", async function () {
    const user = await UserModel.create({ email: "hey@mail.com" });

    const taskArgs = {
      userId: user.id,
      title: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    };

    const task = await service.create(taskArgs);

    assert.ok(task.id);
    assert.ok(task.createdAt);
    assert.equal(task.title, taskArgs.title);
    assert.equal(task.userId, taskArgs.userId);
    assert.equal(task.description, taskArgs.description);
  });
});

t.describe("TaskService.getAllForUser", function () {
  t.it("returns all the tasks for a user", async function () {
    const user1 = await UserModel.create({ email: "hey_1@mail.com" });
    const user2 = await UserModel.create({ email: "hey_2@mail.com" });

    for (let i = 0; i < 4; i++) {
      const userId = i % 2 == 0 ? user1.id : user2.id;
      const taskArgs = {
        userId,
        title: `Task ${i} for ${userId}`,
      };

      await service.create(taskArgs);
    }

    const user1Tasks = await service.getAllForUser(user1.id);
    const user2Tasks = await service.getAllForUser(user2.id);

    assert.equal(user1Tasks.length, 2);
    assert.equal(user2Tasks.length, 2);

    assert.equal(
      user1Tasks.every((t) => t.userId, user1.id),
      true,
    );
    assert.equal(
      user2Tasks.every((t) => t.userId, user2.id),
      true,
    );
  });
});

t.describe("TaskService.getOneWithUser", function () {
  t.it("throws an error if task is not found", async function () {
    return assert.rejects(service.getOneWithUser(`${new Types.ObjectId()}`));
  });

  t.it("returns a task with the user details", async function () {
    const user = await UserModel.create({ email: "hey@mail.com" });

    const taskArgs = {
      userId: user.id,
      title: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    };

    const { id: taskId } = await service.create(taskArgs);
    const found = await service.getOneWithUser(taskId);

    assert.ok(found.id);
    assert.ok(found.createdAt);
    assert.equal(found.title, taskArgs.title);
    assert.equal(found.userId, taskArgs.userId);
    assert.equal(found.title, taskArgs.description);
    assert.equal(found.user.id, user.id);
    assert.equal(found.user.email, user.email);
  });
});
