import { Schema, model } from "mongoose";

const schema = new Schema(
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
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      get: (v) => `${v}`,
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

schema.virtual("expert", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

export const TaskModel = model("Task", schema);
