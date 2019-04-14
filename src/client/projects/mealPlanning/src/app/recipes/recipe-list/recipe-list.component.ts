import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../../../../../models/recipe.model';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'mp-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  constructor(
    private _recipeService: RecipeService,
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
