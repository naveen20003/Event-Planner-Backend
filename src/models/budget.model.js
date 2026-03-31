const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
   userId:{
   type: mongoose.Schema.Types.ObjectId,
   ref: "User"},
   category: String,
   budgets: Number,
   spent: Number,
   remaining: Number
});

const Budget = mongoose.model("budget", BudgetSchema)
module.exports = Budget;