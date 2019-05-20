import { Component, OnInit } from '@angular/core';
import { DeepCopyService } from 'common';
import { Budget, Paycheck } from '../../budget.model';
import { BudgetService } from '../../budget.service';

@Component({
  selector: 'ft-budget-all',
  templateUrl: './budget-all.component.html',
  styleUrls: ['./budget-all.component.css']
})
export class BudgetAllComponent implements OnInit {
  editPaycheck: Paycheck;
  budget: Budget;
  budgetMonth: Date;
  dateFormat = 'MM/dd';

  constructor(private _deepClone: DeepCopyService,
    private _budgetService: BudgetService) { }

  ngOnInit() {
    this.budgetMonth = new Date();
    this.budgetMonth.setUTCDate(1);
    this.budgetMonth.setUTCHours(0,0,0,0);

    this._budgetService.getBudget(this.budgetMonth).subscribe(resp => {
      console.log(resp);
      this.budget = resp;
    });

    this.editPaycheck = new Paycheck();
  }

  clickEditPaycheck(paycheck: Paycheck): void {
    this.editPaycheck = this._deepClone.copy(paycheck);
  }

  clickSavePaycheck(index: number): void {
    this.budget.paychecks[index] = this._deepClone.copy(this.editPaycheck);
    this.editPaycheck = new Paycheck();
  }

  clickCancelPaycheck(): void {
    this.editPaycheck = new Paycheck();
  }
}