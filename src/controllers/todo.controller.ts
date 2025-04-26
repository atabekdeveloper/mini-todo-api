import { NextFunction, Request, Response } from "express";
import TodoModel, { ITodoModel } from "../models/todo.model.js";

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, dueDate, priority }: ITodoModel = req.body;

    // Validate the inputs
    if (!title || !dueDate || !priority) {
      res
        .status(400)
        .json({ message: "Title, dueDate, and priority are required" });
      return;
    }

    // Convert dueDate to Date object
    const parsedDueDate = new Date(dueDate);

    // Create new Todo object
    const newTodo: ITodoModel = new TodoModel({
      title,
      description,
      dueDate: parsedDueDate,
      priority,
      completed: false,
    });

    // Save to database
    await newTodo.save();

    res.status(201).send({
      success: true,
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    next(error); // Pass error to error handler middleware
  }
};

export const fetchAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allTodos: ITodoModel[] = await TodoModel.find();

    res.status(200).send({
      success: true,
      message: "Todo fetched successfully",
      data: allTodos,
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    next(error); // Pass error to error handler middleware
  }
};

// Fetch a single todo by ID
export const fetchTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params; // Extract todo ID from URL params

    const todo = await TodoModel.findById(id); // Find the todo by ID

    if (!todo) {
      res.status(404).json({
        success: false,
        message: "Todo not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Todo fetched successfully",
      data: todo,
    });
  } catch (error) {
    console.error("Error fetching todo:", error);
    next(error); // Pass error to the error handler middleware
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todoId: string = req.params.id;
    const { title, description, dueDate, priority, completed }: ITodoModel =
      req.body;

    const todo = await TodoModel.findById(todoId);
    if (!todo) {
      res.status(404).json({ success: false, message: "Todo not found" });
      return;
    }

    const updatedTodo = await TodoModel.findByIdAndUpdate(
      todoId,
      { title, description, dueDate, priority, completed },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    console.error("Error updating todos:", error);
    next(error); // Pass error to error handler middleware
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const todoId: string = req.params.id;

    // Find the todo by its ID
    const todo = await TodoModel.findById(todoId);
    if (!todo) {
      res.status(404).json({ success: false, message: "Todo not found" });
      return;
    }

    // Delete the todo
    const deletedTodo = await TodoModel.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      res.status(404).json({ success: false, message: "Todo deletion failed" });
      return;
    }

    res.status(200).send({
      success: true,
      message: "Todo deleted successfully",
      data: deletedTodo,
    });
  } catch (error) {
    next(error);
  }
};

export const getCompletedTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const completedTodos: ITodoModel[] = await TodoModel.find({
      completed: true,
    });
    res.status(200).json({
      success: true,
      message: "List of completed todos",
      data: completedTodos,
    });
  } catch (error) {
    next(error);
  }
};

// Get Pending Todos
export const getPendingTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const pendingTodos: ITodoModel[] = await TodoModel.find({
      completed: false,
    });
    res.status(200).json({
      success: true,
      message: "List of pending todos",
      data: pendingTodos,
    });
  } catch (error) {
    next(error);
  }
};
