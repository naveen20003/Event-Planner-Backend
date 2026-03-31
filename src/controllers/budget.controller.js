const Budget = require('../models/budget.model')


async function HandleCreateBudget(req, res) {
    try {
     const { category, budgets, spent, remaining } = req.body;
     const ctdBudget = await Budget.create({
       userId: req.user.id,
       category,
       budgets,
       spent,
       remaining
     });
     res.send(ctdBudget);
   } catch (error) {
     console.error(error)
   }
};

async function HandleGetAllBudget(req, res) {
    try {
     const readbudget = await Budget.find({userId: req.user.id});
     res.send(readbudget);
   } catch (error) {
     console.error(error)
   }
};

async function HandleGetBudgetById(req, res) {
    try {
     const { id } = req.params;
     const rbubyid = await Budget.findOne({_id: id, userId: req.user.id});
     res.json(rbubyid)
   } catch (error) {
     console.error(error);
   }
};

async function HandleUpdatebudget(req, res) {
    try {
     const { id } = req.params;
     const updatebud = req.body;
     const updatedbudget = await Budget.findOneAndUpdate({_id: id, userId: req.user.id},updatebud, {returnDocument: "after"});
     res.send(updatedbudget)
   } catch (error) {
     console.error(error)
   }
};

async function HandleDeleteBudget(req, res) {
   try {
     const { id } = req.params;
     const deletedbudget = await Budget.findOneAndDelete({ _id: id, userId: req.user.id});
     res.json(deletedbudget)
   } catch (error) {
     console.error(error)
   }
};

module.exports = {
    HandleCreateBudget,
    HandleGetAllBudget,
    HandleGetBudgetById,
    HandleUpdatebudget,
    HandleDeleteBudget
}