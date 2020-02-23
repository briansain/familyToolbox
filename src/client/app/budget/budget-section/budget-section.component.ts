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
        "itemHeader": "Gas",
        "notes": "I have gas",
        "budgetAmounts": [
          {
            "amount": 80,
            "isPaid": false,
            "isCash": false,
            "isAutoPay": false
          },
          {
            "amount": 0,
            "isPaid": false,
            "isCash": false,
            "isAutoPay": false
          }
        ]
      },
      {
        "itemHeader": "Phone",
        "notes": "Can you hear me now?",
        "budgetAmounts": [
          {
            "amount": 0,
            "isPaid": false,
            "isCash": false,
            "isAutoPay": false
          },
          {
            "amount": 60,
            "isPaid": false,
            "isCash": false,
            "isAutoPay": false
          }
        ]
      }
    ];
  constructor() { }

  ngOnInit() {
  }

  getBudgetedAmount(budgetAmounts: BudgetAmount[]): number {
    let total;
    budgetAmounts.forEach(budgetAmount => total += budgetAmount.amount);
    return total;
  }

  getGrandBudgetTotal(budgetItems: BudgetItem[]): number {
    let total;
    budgetItems.forEach(budgetItem => total += this.getBudgetedAmount(budgetItem.budgetAmounts));
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

