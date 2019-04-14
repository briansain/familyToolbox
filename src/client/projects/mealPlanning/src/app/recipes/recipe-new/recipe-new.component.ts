import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'mp-recipe-new',
  templateUrl: './recipe-new.component.html',
  styleUrls: ['./recipe-new.component.css']
})
export class RecipeNewComponent implements OnInit {

  recipe$: Observable<any>;
  recipeId: string;
  recipeForm = this._formBuilder.group({
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
    
  }

  saveRecipe() {
    console.log(this.recipeForm.value);
    this._recipeService.createRecipe(this.recipeForm.value)
      .subscribe(response => {
        console.log(response._id);
        this._router.navigate(['/recipe', response._id]);
      });
  }
}
