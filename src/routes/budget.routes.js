const express = require('express');
const router = express.Router()
const Auth = require('../middlewares/auth.middleware');

const { 
  HandleCreateBudget,
  HandleGetAllBudget,
  HandleGetBudgetById,
  HandleUpdatebudget,
  HandleDeleteBudget } = require('../controllers/budget.controller');

// create budget
router.post('/', Auth, HandleCreateBudget);

// read budget route
router.get('/', Auth, HandleGetAllBudget);

// read budget by id
router.get('/:id', Auth, HandleGetBudgetById);

// update budget route
router.put('/:id', Auth, HandleUpdatebudget);

// delete budget route
router.delete('/:id', Auth, HandleDeleteBudget);

module.exports = router;