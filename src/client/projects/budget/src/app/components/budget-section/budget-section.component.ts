import { Component, OnInit, Input } from '@angular/core';
import { DeepCopyService } from 'common';
import { BudgetItem, BudgetSection, BudgetAmount } from '../../budget.model';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'ft-budget-section',
  templateUrl: './budget-section.component.html',
  styleUrls: ['./budget-section.component.css']
})
export class BudgetSectionComponent implements OnInit {
  @Input() budgetSection: BudgetSection;
  @Input() paycheckCount: number;

  paychecks: Array<number>;
  editorItem: BudgetItem;
  budgetForm = this._formBuilder.group({
    sectionHeader: [''],
    budgetItems: this._formBuilder.array([])
  });
  
  constructor(private _deepCopy: DeepCopyService,
    private _formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    this.paychecks = new Array(this.paycheckCount).fill(1);
    this.editorItem = new BudgetItem();
    console.log(this.budgetSection);
    this.budgetForm.patchValue({
      sectionHeader: this.budgetSection.sectionHeader
    });
    this.budgetSection.budgetItems.forEach(value => {
      this.addBudgetItem(value);
      const budgetItemIndex = this.budgetItems.length - 1;
      value.budgetAmounts.forEach(budgetAmount => {
        this.addBudgetAmount(budgetItemIndex, budgetAmount);
      });
    });
    console.log(this.budgetItems);
  }

  get budgetItems(): FormArray {
    return this.budgetForm.get('budgetItems') as FormArray;
  }

  getBudgetAmount(budgetItemIndex: number): FormArray {
    return this.budgetForm.get('budgetItems.'+budgetItemIndex+'.budgetAmount') as FormArray;
  }

  addBudgetItem(budgetItem: BudgetItem) {
    this.budgetItems.push(this._formBuilder.group({
      itemHeader: [budgetItem.itemHeader],
      notes: [budgetItem.notes],
      budgetAmount: this._formBuilder.array([])
    }));
  }

  addBudgetAmount(budgetItemIndex: number, budgetAmount: BudgetAmount) {
    this.getBudgetAmount(budgetItemIndex).push(this._formBuilder.group({
      amount: [budgetAmount.amount],
      isPaid: [budgetAmount.isPaid],
      isCash: [budgetAmount.isCash],
      isAutoPay: [budgetAmount.isAutoPay]
    }))
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
    if (!this.editorItem._id) {    
      this.editorItem = this._deepCopy.copy(item);
      // this.editorItem = item;
    } else {
      // toast editor is already open
    }
  }

  cancel() {
    this.editorItem = new BudgetItem();
  }

  saveEditor(index: number): void {
    this.budgetSection.budgetItems[index] = this._deepCopy.copy(this.editorItem);
    this.editorItem = new BudgetItem();
  }

}
