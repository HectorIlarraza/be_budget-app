// DEPENDENCIES
const express = require("express");
const transactionRoutes = express.Router();
const transactionsArr = require("../models/transaction.js");

// CONTROLLER ROUTES

// Contains entire "models" index
transactionRoutes.get("/", (req,res) => {
    res.json(transactionsArr);
});

transactionRoutes.get("/error", (req,res) => {
    res.send(`<h1>404! Page not found</h1>`);
});

// Shows only the indiviual index from the "models" 
transactionRoutes.get("/:index", (req, res) => {
    const { index } = req.params;
    if(transactionsArr[index]){
        return res.json(transactionsArr[index]);
    }
    res.status(404).redirect("/error");
});

// Adds a new indiviual index into the existing "models"
transactionRoutes.post("/", (req, res) => {
    transactionsArr.push(req.body);
    res.json(transactionsArr[transactionsArr.length - 1]);
});

// Deletes a indiviual index from the existing "models"
transactionRoutes.delete("/:index", (req, res) => {
    const { index } = req.params;
    let removed = transactionsArr.splice(index, 1);
    transactionsArr[index] ? res.json(removed[0]) : res.status(404).redirect("/error");
});

// Allows you to update an existing index from the "models"
transactionRoutes.put("/:index", (req, res) => {
    const { index } = req.params;
    if(!transactionsArr[index]){
        return res.status(422).json({error: "Not found"});
    } 

    let { date, itemName, amount, from, category } = req.body;
    if(date && itemName && amount && from && category){
        transactionsArr[index] = {
            date, itemName, amount, from, category
        };
        return res.json(transactionsArr[index]);
    }
    res.status(422).json({error: "Please provide all fields"
});
});

module.exports = transactionRoutes;