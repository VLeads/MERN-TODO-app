import { Todo } from "../models/todo.models.js";

export const getTodos = async (req, res) => {
  const todos = await Todo.find();
  return res.status(200).json(todos);
};

export const addTodo = async (req, res) => {
  const { todo } = req.body;
  Todo.create({ todo })
    .then((data) => {
      console.log("saved todo");
      res.status(201).send(data);
    })
    .catch((err) => {
        console.log("err", err);
        res.send({ error: err, msg: "Something went wrong" });
      });
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;
  Todo.findByIdAndUpdate(id, { todo })
    .then((data) => {
      console.log("updated todo");
      res.send(data)
    })
    .catch((err) => {
        console.log("err", err);
        res.send({ error: err, msg: "Something went wrong" });
      });
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  Todo.findByIdAndDelete(id)
    .then((data) => {
      res.send("deleted todo");
    })
    .catch((err) => {
      console.log("err", err);
      res.send({ error: err, msg: "Something went wrong" });
    });
};
