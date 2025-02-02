import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
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

schema.virtual("totalTasks", {
  localField: "_id",
  foreignField: "userId",
  ref: "Task",
  justOne: false,
  count: true,
});

export const UserModel = model("User", schema);
