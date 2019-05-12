import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ft-budget-section',
  templateUrl: './budget-section.component.html',
  styleUrls: ['./budget-section.component.css']
})
export class BudgetSectionComponent implements OnInit {
  @Input() budgetSection: BudgetSection;

  paycheckCount = 2;
  paychecks: Array<number>;
  editorItem: BudgetItem;

  constructor() { 
  }

  ngOnInit() {
    this.paychecks = new Array(this.paycheckCount).fill(1);
    this.editorItem = new BudgetItem();
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

  showItemEditor(item: any): void {
    if (!this.editorItem.id) {    
      this.editorItem = JSON.parse(JSON.stringify(item));
      // this.editorItem = item;
    } else {
      // toast editor is already open
    }
  }

  cancel() {
    this.editorItem = new BudgetItem();
  }

  saveEditor(index: number): void {
    this.budgetSection.budgetItems[index] = this.copy(this.editorItem);
    this.editorItem = new BudgetItem();
  }

  private copy<T>(source: T): T {
    return JSON.parse(JSON.stringify(source));
  }
}

export class BudgetSection {
  id = "";
  sectionHeader = "";
  budgetItems = Array<BudgetItem>();

}

export class BudgetItem {
  id = "";
  itemHeader = "";
  budgetAmounts = Array<BudgetAmount>();
}

export class BudgetAmount {
  amount = 0;
  isPaid = false;
  isCash = false;
}