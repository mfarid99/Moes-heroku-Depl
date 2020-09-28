///////////////////////////
// Environmental Variables
///////////////////////////
// REMEMBER TO CREATE .env file
require("dotenv").config();
const { PORT, SECRET } = process.env;

///////////////////////////
// Dependencies
//////////////////////////

// Bringing in Express
const express = require("express");
const app = express();

// IMPORT DATABASE CONNECTIONS
const mongoose = require("./db/dbconn");

// ROUTERS
const authRouter = require("./controllers/auth");
const testRouter = require("./controllers/test");

// OTHER IMPORTS
const session = require("express-session");
const methodOverride = require("method-override");
const morgan = require("morgan");

///////////////////////////////
// Set View Engine
///////////////////////////////

//set view engine to express-react-views

const Metallica = require("./models/metallicafanpage.js");

app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

////////////
//MIDDLEWARE
////////////
// SESSIONS, this allows you to use req.session for tracking session data
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //comment if not using forms
app.use(methodOverride("_method"));
// app.use(express.json()) uncomment if using json
app.use(morgan("tiny")); //logging

///////////////
//Routes and Routers
//////////////

//INDEX..
app.get("/metallicafanpage", (req, res) => {
  Metallica.find({}, (error, allMetallicas) => {

  res.render("index.jsx", { metallicas: allMetallicas });
});

app.use("/auth", authRouter);
app.use("/test", testRouter);

//NEW

app.get("/metallicafanpage/new", (req, res) => {
  res.render("New")
})

//DESTROY
app.delete("/metallicafanpage/:id", (req, res) => {
  Metallica.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/metallicafanpage");
  });
});
})

//UPDATE

app.put("/metallicafanpage/:id", (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }

  Metallica.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedModel) => {
      res.redirect("/metallicafanpage");
    }
  );
});

// CREATE
app.post("/metallicafanpage/", (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  Metallica.create(req.body, (error, metallica) => {
    // res.send(fruit);
    res.redirect("/metallicafanpage");
  });
});

// EDIT
app.get("/metallicafanpage/:id/edit", (req, res) => {
  Metallica.findById(req.params.id, (err, foundMetallica) => {
    res.render("edit.jsx", { metallica: foundMetallica });
  });
});


////////////////////////
//APP LISTENER
////////////////////////
app.listen(PORT, () => {
  console.log(`Your are listening on port ${PORT}`);
});
