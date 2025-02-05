import { Schema, model } from "mongoose";

interface Task {
  id: string;
  title: string;
  description: string;
  userId: string;
  status: "NOT_DONE" | "IN_PROGRESS" | "COMPLETED";
  createdAt: Date;
  user?: {
    id: string;
    email: string;
  };
}

const schema = new Schema<Task>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["NOT_DONE", "IN_PROGRESS", "COMPLETED"],
      default: "NOT_DONE",
    },
    // @ts-expect-error this works because of the return value of the `get` function
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      get: (v: Schema.Types.ObjectId) => `${v}`,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
      getters: true,
      useProjection: true,
    },
    toJSON: {
      virtuals: true,
      getters: true,
      useProjection: true,
    },
    selectPopulatedPaths: false,
  },
);

schema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

export const TaskModel = model("Task", schema);
