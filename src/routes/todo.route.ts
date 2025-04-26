import express from "express";
import {
  createTodo,
  deleteTodo,
  fetchAllTodos,
  fetchTodoById,
  getCompletedTodos,
  getPendingTodos,
  updateTodo,
} from "../controllers/todo.controller.js";
const router = express.Router();

router.route("/create").post(createTodo);
router.route("/").get(fetchAllTodos);
router.route("/:id").put(updateTodo);
router.route("/:id").delete(deleteTodo);
router.route("/:id").get(fetchTodoById);

router.get("/completed", getCompletedTodos);
router.get("/pending", getPendingTodos);

export default router;
