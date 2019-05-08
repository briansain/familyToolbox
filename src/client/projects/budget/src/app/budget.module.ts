import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BudgetAllComponent } from './budget-all/budget-all.component';
import { Routes, RouterModule } from '@angular/router';
import { BudgetSectionComponent } from './budget-section/budget-section.component';

const routes: Routes = [
  { path: '', component: BudgetAllComponent },
  { path: 'budget', component: BudgetSectionComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    BudgetAllComponent,
    BudgetSectionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(routes)
  ],
  providers: []// ,
  // bootstrap: [AppComponent]
})
export class BudgetModule { }
