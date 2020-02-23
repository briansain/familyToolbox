import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ft-budget-section',
  templateUrl: './budget-section.component.html',
  styleUrls: ['./budget-section.component.css']
})
export class BudgetSectionComponent implements OnInit {

  sectionHeader = "Utilities";
  budgetItems: BudgetItem[] = [
      {
        itemHeader: "Gas",
        notes: "I have gas",
        budgetAmounts: [
          {
            amount: 80,
            isPaid: false,
            isCash: false,
            isAutoPay: false
          },
          {
            amount: 0,
            isPaid: false,
            isCash: false,
            isAutoPay: false
          }
        ]
      },
      {
        itemHeader: "Phone",
        notes: "Can you hear me now?",
        budgetAmounts: [
          {
            amount: 0,
            isPaid: false,
            isCash: false,
            isAutoPay: false
          },
          {
            amount: 60,
            isPaid: false,
            isCash: false,
            isAutoPay: false
          }
        ]
      }
    ];
  displayColumns = [
    'header','budgeted'//,'budgetAmount1','budgetAmount2'
  ]
  constructor() { }

  ngOnInit() {
  }

  getBudgetedAmount(budgetAmounts: BudgetAmount[]): number {
    let total = 0;
    budgetAmounts.forEach(budgetAmount => total += budgetAmount.amount);
    return total;
  }

  getGrandBudgetTotal(): number {
    let total = 0;
    this.budgetItems.forEach(budgetItem => {
      budgetItem.budgetAmounts.forEach(budgetAmount => total += budgetAmount.amount);
    });
    return total;
  }

  getPaycheckIndex(index: number): string {
    let paycheck: string;
    if (index == 0) {
      paycheck = "1st Paycheck";
    } else if (index == 1) {
      paycheck = "2nd Paycheck";
    } else if (index == 2) {
      paycheck = "3rd Paycheck";
    } else {
      paycheck = (index + 1).toString() + "th Paycheck";
    }
    return paycheck
  }

  getPaycheckTotalByIndex(index: number): number {
    var total = 0;
    this.budgetItems.forEach(budgetItem => total += budgetItem.budgetAmounts[index].amount);
    return total;
  }

}

export interface Section {
  sectionHeader: string;
  budgetItems: any[];
}

export interface BudgetItem {
  itemHeader: string;
  notes: string;
  budgetAmounts: BudgetAmount[];
}

export interface BudgetAmount {
  amount: number;
  isPaid: boolean;
  isCash: boolean;
  isAutoPay: boolean;
}

