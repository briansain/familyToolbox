import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ft-budget-section',
  templateUrl: './budget-section.component.html',
  styleUrls: ['./budget-section.component.css']
})
export class BudgetSectionComponent implements OnInit {
  budgetSection: any = {
    sectionHeader: "Utilities",
    budgetItems: [{
      itemHeader: "Gas",
      budgetAmounts: [{
        amount: 80
      }, {
        amount: 0
      }]
    },{
      itemHeader: "Phone",
      budgetAmounts: [{
        amount: 0
      }, {
        amount: 60
      }]
    }]
  };

  paycheckCount = 2;
  paychecks: Array<number>;

  constructor() { 
    this.paychecks = new Array(this.paycheckCount).fill(1);
  }

  ngOnInit() {
  }

  getPaycheckDescription(index: number): string {
    index++;
    return index === 1 ? "1st Paycheck" :
          index === 2 ? "2nd Paycheck" :
          index === 3 ? "3rd Paycheck" : 
          index + "th Paycheck";
  }

  getItemSum(items: any[]): number {
    let total = 0;
    items.forEach(value => {
      total += value.amount;
    })
    return total;
  }

  getPaycheckTotal(index: number): number {
    let total = 0;

    this.budgetSection.budgetItems.forEach(value => {
      total += value.budgetAmounts[index].amount;
    })

    return total;
  }

  getAllPaycheckTotal(): number {
    let total = 0;

    this.paychecks.forEach((value, index) => {
      total += this.getPaycheckTotal(index);
    })

    return total;
  }
}
