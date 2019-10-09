import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { MatDividerModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatButtonModule, MatDialogModule, MatProgressBarModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from 'common';
import { MealPlanningModule } from '../projects/mealPlanning/src/app/mealPlanning.module';
import { BudgetModule } from '../projects/budget/src/app/budget.module';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  // { path: '', component: RecipeListComponent },
  // { path: 'recipes', component: RecipeListComponent },
  // { path: 'recipe/new', component: RecipeNewComponent },
  // { path: 'recipe/:id', component: RecipeComponent },
  // { path: 'recipe/:id/edit', component: RecipeEditComponent }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDividerModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    CommonModule,
    MealPlanningModule,
    BudgetModule,
    NgxSpinnerModule
  ],
  exports : [
    RouterModule
  ],
  providers: [ HttpClient ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
