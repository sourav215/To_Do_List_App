import { Schema, model, Document, Types } from "mongoose";

export interface ITodo extends Document {
  userId: Types.ObjectId;
  title: string;
  completed: boolean;
  status: "ongoing" | "completed" | "pending";
}

const todoSchema = new Schema<ITodo>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false, required: true },
  status: {
    type: String,
    enum: ["ongoing", "completed", "pending"],
    default: "pending",
    required: true,
  },
});

export const TodoModel = model<ITodo>("Todo", todoSchema);
