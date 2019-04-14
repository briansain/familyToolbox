import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/client/app/services/recipes.service';
import { Recipe } from '../../../../models/recipe.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit {

  constructor(
    private _recipeService: RecipesService,
    private _router: Router  
  ) { }
  recipes: Recipe[];
  ngOnInit() {
    this._recipeService.getRecipes().subscribe(response => {
      console.log('get recipes');
      console.log(response);
      this.recipes = response
    });
  }

  navigateToRecipe(recipe: Recipe) {
    this._router.navigate(['/recipe', recipe.id]);
  }

  addRecipe() {
    this._router.navigate(['/recipe/new']);
  }
}
