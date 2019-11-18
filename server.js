// Initialize Knex and connect it to Objection

const Knex = require("knex");
const connection = require("./knexfile");
const { Model } = require("objection");

// connect to knexfile database
const knexConnection = Knex(connection);

// attach objection
Model.knex(knexConnection);

const express = require("express");
const cors = require("cors");
const parser = require("body-parser");

const tour_requests = require("./controllers/tour-requests");
const tour_proposals = require("./controllers/tour-proposals");
const signup = require("./controllers/signup");
const login = require("./controllers/login");

// Loads enviroment variables from a .env file into process.env
require("dotenv").config();

const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");

app.use(cors());
app.use("/api/tour-requests", tour_requests);
app.use("/api/tour-proposals", tour_proposals);
app.use("/api/signup", signup);
app.use("/api/login", login);

app.listen(app.get("port"), () => {
  console.log("Hello world!");
});

// Need to run 'npx knex init'
