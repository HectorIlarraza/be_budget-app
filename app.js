// DEPENDENCIES
const express = require("express");
const cors = require("cors");
const budgetController = require("./controllers/budgetControllers.js");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/budget", budgetController);

// ROUTES
app.get("/", (req,res) => {
    res.send("Hello World");
});

app.get("*", (req, res) => {
    res.status(404).json({error: "Page not found"});
});

module.exports = app;