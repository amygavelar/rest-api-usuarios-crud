import express from "express";
import usersRouter from "./routes/users";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Welcome to my API REST");
});

app.use("/users", usersRouter);

export default app;
