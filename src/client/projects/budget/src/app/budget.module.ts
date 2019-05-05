import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BudgetAllComponent } from './budget-all/budget-all.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: BudgetAllComponent },
  { path: 'budget', component: BudgetAllComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    BudgetAllComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(routes)
  ],
  providers: []// ,
  // bootstrap: [AppComponent]
})
export class BudgetModule { }
