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
        isCash: false
      }, {
        amount: 0,
        isPaid: false,
        isCash: false
      }]
    },{
      id: '5678',
      itemHeader: "Phone",
      budgetAmounts: [{
        amount: 0,
        isPaid: false,
        isCash: false
      }, {
        amount: 60,
        isPaid: false,
        isCash: false
      }]
    }]
  };

  constructor() { }

  ngOnInit() {
  }

}
