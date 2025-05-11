import { Schema, model, Document, Types } from "mongoose";

export interface ITodo extends Document {
  userId: Types.ObjectId;
  title: string;
  description: string;
  completed: boolean;
  status: "ongoing" | "completed" | "pending";
  end_date: Date
}

const todoSchema = new Schema<ITodo>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false, required: true },
  status: {
    type: String,
    enum: ["ongoing", "completed", "pending"],
    default: "pending",
    required: true,
  },
  end_date : {type: Date, required: true}
});

export const TodoModel = model<ITodo>("Todo", todoSchema);
