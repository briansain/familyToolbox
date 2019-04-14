import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { RecipesService } from 'src/client/app/services/recipes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe$: any;
  recipeId: string;
  recipeForm = this._formBuilder.group( {
    title: [''],
    description: [''],
    ingredients: this._formBuilder.array([
      this._formBuilder.control('')
    ]),
    directions: this._formBuilder.array([
      this._formBuilder.control('')
    ])
  });
  
  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get directions() {
    return this.recipeForm.get('directions') as FormArray;
  }
  
  addIngredient(value: string = '') {
    this.ingredients.push(this._formBuilder.control(value));
  }

  addDirection(value: string = '') {
    this.directions.push(this._formBuilder.control(value));
  }

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _recipeService: RecipesService) { }

  ngOnInit() {
    this.recipe$ = this._route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.recipeId = params.get('id');
        return this._recipeService.getRecipe(this.recipeId);
      })
    );

    this.recipe$.subscribe(response => {
      this.recipeForm.patchValue(response);
      for (let i = 0; i < response.ingredients.length; i++) {
        if (!this.ingredients.at(i)) {
          this.addIngredient(response.ingredients[i]);
        }
      }

      for (let d = 0; d < response.directions.length; d++) {
        if (!this.directions.at(d)) {
          this.addDirection(response.directions[d]);
        }
      }
    });
  }

  saveRecipe() {
    if (this.recipeId) {
      console.log(this.recipeForm.value);
      this._recipeService.putRecipe(this.recipeId, this.recipeForm.value)
        .subscribe(response => {
          this._router.navigate(['/recipe', this.recipeId]);
        });
    }
  }

}
