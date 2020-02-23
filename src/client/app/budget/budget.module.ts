import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetTableComponent } from './budget-table/budget-table.component';
import { BudgetSectionComponent } from './budget-section/budget-section.component';


@NgModule({
  declarations: [BudgetTableComponent, BudgetSectionComponent],
  imports: [
    CommonModule,
    BudgetRoutingModule
  ]
})
export class BudgetModule { }
