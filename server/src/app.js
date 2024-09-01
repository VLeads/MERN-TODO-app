import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// import routes
import todoRouter from "./routes/todo.routes.js";

app.use("/todo", todoRouter)

export {app}