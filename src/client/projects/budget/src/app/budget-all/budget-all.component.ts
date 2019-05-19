import { Component, OnInit } from '@angular/core';
import { BudgetSection } from '../budget-section/budget-section.component';
import { DeepCopyService } from 'common';

@Component({
  selector: 'ft-budget-all',
  templateUrl: './budget-all.component.html',
  styleUrls: ['./budget-all.component.css']
})
export class BudgetAllComponent implements OnInit {

  budgetSection: BudgetSection = {
    id: "abc-123",
    sectionHeader: "Utilities",
    budgetItems: [{
      id: '1234',
      itemHeader: "Gas",
      notes: "Hello Notes",
      budgetAmounts: [{
        amount: 80,
        isPaid: false,
        isCash: false,
        isAutoPay: false
      }, {
        amount: 0,
        isPaid: false,
        isCash: false,
        isAutoPay: false
      }]
    },{
      id: '5678',
      itemHeader: "Phone",
      notes: "",
      budgetAmounts: [{
        amount: 0,
        isPaid: false,
        isCash: false,
        isAutoPay: false
      }, {
        amount: 60,
        isPaid: false,
        isCash: false,
        isAutoPay: false
      }]
    }]
  };

  editPaycheck: Paycheck;

  paychecks: Paycheck[] = [{
    id: "123abc",
    source: "Job 1",
    amount: 1800,
    startDate: new Date(2019, 5, 1),
    endDate: new Date(2019, 5, 14)
  },{
    id: "456def",
    source: "Job 2",
    amount: 1800,
    startDate: new Date(2019, 5, 15),
    endDate: new Date(2019, 5, 31)
  }];

  dateFormat = 'MM/dd';
  constructor(private _deepClone: DeepCopyService) { }

  ngOnInit() {
    this.editPaycheck = new Paycheck();
  }

  clickEditPaycheck(paycheck: Paycheck): void {
    this.editPaycheck = this._deepClone.copy(paycheck);
  }

  clickSavePaycheck(index: number): void {
    this.paychecks[index] = this._deepClone.copy(this.editPaycheck);
    this.editPaycheck = new Paycheck();
  }

  clickCancelPaycheck(): void {
    this.editPaycheck = new Paycheck();
  }
}

export class Paycheck {
  id = "";
  source = "";
  amount = 0;
  startDate = new Date();
  endDate = new Date();
}
