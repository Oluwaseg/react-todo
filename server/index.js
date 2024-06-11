const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todo = require("./model/todo");

const app = express();
app.use(cors());
app.use(express.json());

//* Database
mongoose.connect("mongodb://127.0.0.1:27017/test");

//! End-points

app.get("/", (req, res) => {
  todo
    .find()
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

app.post("/creates", (req, res) => {
  const { task } = req.body;
  todo
    .create({
      task: task,
    })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

app.put("/updates/:id", (req, res) => {
  const { id } = req.params;
  todo
    .findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  todo
    .findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

app.listen(3050, () => {
  console.log("Server is running on port 3050");
});
