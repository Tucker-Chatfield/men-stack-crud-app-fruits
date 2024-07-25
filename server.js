// Here is where we import modules
// We begin by loading Express
const dotenv = require("dotenv"); 
dotenv.config(); // Loads the environment variables from .env file
const express = require("express");
const mongoose = require("mongoose"); 

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
})

// GET /
app.get("/", async (req, res) => {
  res.send("hello, friend!");
});

app.get("/", async (req, res) => {
  res.render("index.ejs");
});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});
