// Here is where we import modules
// We begin by loading Express
const dotenv = require("dotenv"); 
dotenv.config(); // Loads the environment variables from .env file
const express = require("express");
const mongoose = require("mongoose"); 

const app = express();
app.set('view engine', 'ejs')

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
})

const Fruit = require("./models/fruit.js")

app.use(express.urlencoded({ extended: false }));

// GET /
app.get("/", async (req, res) => {
  res.send("hello, friend!");
});

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET '/fruits'
app.get('/fruits', async (req, res) => {
  const allFruits = await Fruit.find()
  console.log(allFruits)
  res.render('fruits/index.ejs', { fruits: allFruits })
})


// GET '/fruits/new'
app.get('/fruits/new', (req, res) => {
  res.render('fruits/new')
})

// POST '/fruits'
app.post('/fruits', async (req, res) => {
  if (req.body.isReadyToEat === 'on') {
    req.body.isReadyToEat = true
  } else {
    req.body.isReadyToEat = false
  }
  res.redirect("/fruits");

  await Fruit.create(req.body);
});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});
