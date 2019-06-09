const express = require('express');
const router = express.Router();
const budgetService = require('../services/budget.services');

router.get('/budget', (req, res) => {
  if (req.query && req.query.budgetMonth) {
    const budgetMonth = new Date(req.query.budgetMonth);
    budgetMonth.setUTCHours(0, 0, 0, 0);
    budgetService.getBudget(budgetMonth.toISOString(), res);
  }
});

router.get('/budget/:id', (req, res) => {
  budgetService.getBudgetById(req.params.id, res);
});

router.post('/budget', (req, res) => {
  budgetService.addBudget(req.body, res);
});

// router.put('/recipes/:id', (req, res) => {
//   recipeService.putRecipe(req.params.id, req.body, res);
// });

// router.delete('/recipes/:id', (req, res) => {
//   recipeService.deleteRecipe(req.params.id, res);
// })

module.exports = router;