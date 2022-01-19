// DEPENDENCIES
const express = require("express");
const budgetRoutes = express.Router();
const budgetsArr = require("../models/budget.js");

// CONTROLLER ROUTES

// Contains entire "models" index
budgetRoutes.get("/", (req,res) => {
    res.json(budgetsArr);
});

// Shows only the indiviual index from the "models" 
budgetRoutes.get("/:index", (req, res) => {
    const { index } = req.params;
    if(budgetsArr[index]){
        return res.json(budgetsArr[index]);
    }
    res.status(404).json({message: "Bookmark not found"});
});

// Adds a new indiviual index into the existing "models"
budgetRoutes.post("/", (req, res) => {
    budgetsArr.push(req.body);
    res.json(budgetsArr[budgetsArr.length -1]);
});

// Deletes a indiviual index from the existing "models"
budgetRoutes.delete("/:index", (req, res) => {
    const { index } = req.params;
    let removed = budgetsArr.splice(index, 1);
    budgetsArr[index] ? res.json(removed[0]) : res.status(404).json({error: "Not found"});
});

// Allows you to update an existing index from the "models"
budgetRoutes.put("/:index", (req, res) => {
    const { index } = req.params;
    if(!budgetsArr[index]){
        return res.status(422).json({error: "Not found"});
    }

    let { item_name, amount, date, from, category } = req.body;
    if(item_name && amount && date && from !== undefined && category){
        budgetsArr[index] = {
            item_name, amount, date, from, category
        };
        return res.json(budgetsArr[index]);
    }
    res.status(422).json({error: "Please provide all fields"});
});

module.exports = budgetRoutes;