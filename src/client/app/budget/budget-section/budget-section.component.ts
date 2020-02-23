import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'ft-budget-section',
  templateUrl: './budget-section.component.html',
  styleUrls: ['./budget-section.component.css']
})
export class BudgetSectionComponent implements OnInit, AfterViewInit {
  sectionHeader = "Utilities";
  paycheckArray: Array<any>;
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
    'header','budgeted'
  ]
  constructor() { }

  ngOnInit() {
    const countOfPaychecks = 2; // TODO: fix this to be dynamic
    this.paycheckArray = new Array(countOfPaychecks);
    for (let i = 0; i < countOfPaychecks; i++) this.displayColumns.push(i.toString());
  }

  ngAfterViewInit() {
  }

  addColumn() {
    this.displayColumns.push('0');
  }

  getHeader(index: number): string{
    console.log(index);
    return 'budgetAmount' + index;
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

  getPaycheck(index: number): string {
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

