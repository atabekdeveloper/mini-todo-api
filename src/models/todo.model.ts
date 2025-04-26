import mongoose, { Document, Model, Schema } from "mongoose";
import { ITodo } from "../types/todo.types.js";

export interface ITodoModel extends ITodo, Document {}

const todoSchema:Schema = new Schema<ITodoModel>(
  {
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, required: true },
    dueDate: { type: Date, required: true },
    priority: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  {
    strict: true,
  }
);

const TodoModel: Model<ITodoModel> =
  mongoose.models.Todo || mongoose.model<ITodoModel>("Todo", todoSchema);

export default TodoModel;

//can use pre hooks for mongodb
