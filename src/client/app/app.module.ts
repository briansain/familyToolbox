import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from 'common';
import { MealPlanningModule } from '../projects/mealPlanning/src/app/mealPlanning.module';
import { BudgetModule } from './budget/budget.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TransactionsModule } from './transactions/transactions.module';
import { Transactions2Module } from './transactions2/transactions2.module';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // { path: '', component: RecipeListComponent },
  // { path: 'recipes', component: RecipeListComponent },
  // { path: 'recipe/new', component: RecipeNewComponent },
  // { path: 'recipe/:id', component: RecipeComponent },
  // { path: 'recipe/:id/edit', component: RecipeEditComponent }
  { path: 'budget', loadChildren: () => import('./budget/budget.module').then(m => m.BudgetModule) },
  { path: '', component: HomeComponent },

]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LayoutModule,
    
    // Material
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,

    // 3rd Party
    NgxSpinnerModule,

    // Family Toolbox
    CommonModule,
    TransactionsModule,
    MealPlanningModule,
    RouterModule.forRoot(routes),
  ],
  exports : [
    RouterModule
  ],
  providers: [ HttpClient ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }