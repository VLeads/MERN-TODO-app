import {Router} from "express";
import { getTodos, addTodo, deleteTodo, updateTodo } from "../controllers/todo.controllers.js";

const router = Router();

router.route("/").get(getTodos);
router.route("/add").post(addTodo);
router.route("/delete/:id").delete(deleteTodo);
router.route("/update/:id").put(updateTodo);

export default router;
