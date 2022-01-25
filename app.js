// DEPENDENCIES
const express = require("express");
const app = express();
const transactionsController = require("./controllers/transactionsController.js");
const cors = require("cors");

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.get("/", (req,res) => {
    res.send("Welcome to my Budget App");
});

app.use("/transactions", transactionsController);

app.get("*", (req, res) => {
    res.status(404).json({error: "Page not found"});
});

module.exports = app;