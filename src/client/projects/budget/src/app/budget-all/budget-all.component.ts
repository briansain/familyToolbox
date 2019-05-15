import { Component, OnInit } from '@angular/core';
import { BudgetSection } from '../budget-section/budget-section.component';

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

  editPaycheck = false;

  paychecks = [{
    source: "Job 1",
    amount: "1800",
    startDate: new Date(2019, 5, 1),
    endDate: new Date(2019, 5, 14)
  },{
    source: "Job 2",
    amount: "1800",
    startDate: new Date(2019, 5, 15),
    endDate: new Date(2019, 5, 31)
  }];

  dateFormat = 'MM/dd';
  constructor() { }

  ngOnInit() {
  }

}
