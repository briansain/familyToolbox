import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeNewComponent } from './recipes/recipe-new/recipe-new.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule, MatFormFieldModule, MatButtonModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipe/new', component: RecipeNewComponent },
  { path: 'recipe/:id', component: RecipeComponent },
  { path: 'recipe/:id/edit', component: RecipeEditComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeComponent,
    RecipeEditComponent,
    RecipeNewComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class MealPlanningModule { }
