import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetSectionComponent } from './budget-section/budget-section.component';


const routes: Routes = [
  { path: 'asdf', component: BudgetSectionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
