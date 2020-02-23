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
// import { BudgetModule } from '../projects/budget/src/app/budget.module';
import { BudgetModule } from './budget/budget.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TransactionsModule } from './transactions/transactions.module';
import { Transactions2Module } from './transactions2/transactions2.module';

const routes: Routes = [
  // { path: '', component: RecipeListComponent },
  // { path: 'recipes', component: RecipeListComponent },
  // { path: 'recipe/new', component: RecipeNewComponent },
  // { path: 'recipe/:id', component: RecipeComponent },
  // { path: 'recipe/:id/edit', component: RecipeEditComponent }
  { path: 'budget', loadChildren: () => import('./budget/budget.module').then(m => m.BudgetModule) }

]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BudgetModule,
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
    TransactionsModule,
    MealPlanningModule,
    NgxSpinnerModule,
    Transactions2Module
  ],
  exports : [
    RouterModule
  ],
  providers: [ HttpClient ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
