const Budget = require('../models/budget.model');
const seedData = require('./budget.seed.json')

function getBudget(budgetMonth, response) {
  Budget.findOne({ month: budgetMonth }, (error, budget) => {
    if (checkServerError(error)) return;

    if (budget) {
      response.status(200).json(budget);
    } else {
      response.status(400);
    }
  });
}

function getBudgetById(budgetId, response) {
  Budget.findById(budgetId, (error, budget) => {
    if (checkServerError(error)) return;

    if (budget) {
      response.status(200).json(budget);
    } else {
      response.status(404);
    }
  });
}

// function postRecipe(requestBody, res) {
//   const originalRecipe = {
//     title: requestBody.title,
//     ingredients: requestBody.ingredients,
//     directions: requestBody.directions
//   };

//   const recipe = new Recipe(originalRecipe);
//   recipe.save(error => {
//     if (checkServerError(res, error)) return;
//     res.status(201).json(recipe);
//   })
// }

// function putRecipe(recipeId, requestBody, resp) {
//   const originalRecipe = {
//     id: recipeId,
//     title: requestBody.title,
//     description: requestBody.description,
//     ingredients: requestBody.ingredients,
//     directions: requestBody.directions
//   };

//   Recipe.findOne({ _id: originalRecipe.id }, (error, recipe) => {
//     if (checkServerError(resp, error)) return;
//     if (!checkFound(resp, recipe)) return;

//     recipe.title = originalRecipe.title;
//     recipe.description = originalRecipe.description;
//     recipe.ingredients = originalRecipe.ingredients;
//     recipe.directions = originalRecipe.directions;
//     recipe.save(error => {
//       if (checkServerError(resp, error)) return;
//       resp.status(200).json(recipe);
//     })
//   });
// }

// function deleteRecipe(recipeId, response) {
//   Recipe.findOneAndDelete({ _id: recipeId }, (error, recipe) => {
//     if (checkServerError(response, error)) return;
//     if (!checkFound(response, recipe)) return;

//     response.status(200).json();
//   })
// }

function checkServerError(res, error) {
  if (error) {
    console.log(error);
    res.status(500).send(error);
    return error;
  }
}

function seedDatabase() {
  console.log('running seed');
  Budget.find({}, (err, res) => {
    if (err) {
      console.log('error running seed');
      console.error(err);
      return;
    }
    if (res.length === 0) {
      console.log('no records found, running seed');
      Budget.insertMany(seedData);
    }
  });
}

module.exports = {
  getBudget,
  getBudgetById,
  // postRecipe,
  // putRecipe,
  // deleteRecipe,
  seedDatabase
};

/*
const recipeSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    title: String,
    ingredients: [String],
    directions: [String]
});
*/