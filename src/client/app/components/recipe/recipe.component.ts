import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { RecipesService } from 'src/client/app/services/recipes.service';
import { Recipe } from '../../../../models/recipe.model'
import { Subscription, Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'common';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipe: Recipe;
  recipe$: Observable<Recipe>;
  recipeId: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _recipeService: RecipesService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.recipe$ = this._route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.recipeId = params.get('id');
        return this._recipeService.getRecipe(this.recipeId);
      })
    );//.subscribe(response => this.recipe = response);

    this.recipe$.subscribe(response => this.recipe = response);
  }

  deleteRecipe(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { title: 'Are you sure you want to delete this recipe?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._recipeService.deleteRecipe(this.recipeId).subscribe(response => {
          this._router.navigate(['/recipes']);
        }, error => {
          console.error(error);
        })
      }
    });
  }
}
