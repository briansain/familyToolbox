import { Component, OnInit } from '@angular/core';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { RecipeService } from '../recipe.service';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'mp-recipe-edit',
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
    private _recipeService: RecipeService) { }

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
