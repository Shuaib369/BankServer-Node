const express = require("express");
const app = express();

// GET   Read
app.get("/", (req, res) => {
  res.send("This is a get method");
});

// POST  Create
app.post("/", (req, res) => {
  res.send("This is a post method");
});

// PUT   Update/Modify whole
app.put("/", (req, res) => {
  res.send("This is a put method");
});

// PATCH   Update/Modify Partially
app.patch("/", (req, res) => {
  res.send("This is a patch method");
});

// DELETE  Delete
app.delete("/", (req, res) => {
  res.send("This is a delete method");
});

app.listen(3000, () => {
  console.log("Server Started at port:3000");
});
