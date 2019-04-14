const express = require('express');
const router = express.Router();
const recipeService = require('../services/recipe.services');

router.get('/recipes', (req, res) => {
    recipeService.getRecipes(req, res);
});

router.get('/recipes/:id', (req, res) => {
    recipeService.getRecipe(req.params.id, res);
});

router.post('/recipes', (req, res) => {
    recipeService.postRecipe(req.body, res);
});

router.put('/recipes/:id', (req, res) => {
    recipeService.putRecipe(req.params.id, req.body, res);
});

router.delete('/recipes/:id', (req, res) => {
    recipeService.deleteRecipe(req.params.id, res);
})

module.exports = router;