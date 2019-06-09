import { Component, OnInit } from '@angular/core';
import { DeepCopyService, ConfirmDialogComponent } from 'common';
import { Budget, Paycheck } from '../../budget.model';
import { BudgetService } from '../../budget.service';
import { MatDialog } from '@angular/material';
import { getDebugNode__POST_R3__ } from '@angular/core/src/debug/debug_node';
import { HttpErrorResponse } from '@angular/common/http';
import { TagContentType } from '@angular/compiler';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ft-budget-all',
  templateUrl: './budget-all.component.html',
  styleUrls: ['./budget-all.component.css']
})
export class BudgetAllComponent implements OnInit {
  editPaycheck: Paycheck;
  budget: Budget;
  dateFormat = 'MM/dd';
  budgetRetryCount = 0;
  readonly maxRetryCount = 6;

  constructor(private _deepClone: DeepCopyService,
    private _budgetService: BudgetService,
    public dialog: MatDialog,
    private _ngxSpinner: NgxSpinnerService) { }

  ngOnInit() {
    
    this._ngxSpinner.show();
    let searchBudgetMonth = new Date();
    searchBudgetMonth.setUTCDate(1);
    searchBudgetMonth.setUTCHours(0,0,0,0);
    //searchBudgetMonth.setUTCMonth(4);

    this.getBudget(searchBudgetMonth);

    this.editPaycheck = new Paycheck();
  }

  getBudget(budgetMonth: Date): void {
    console.log('getBudget');
    this._budgetService.getBudget(budgetMonth).subscribe(resp => {
        this._ngxSpinner.hide();
        this.budget = resp;  
    }, (error: HttpErrorResponse)  => {
      console.log(error);
      if (error.status === 404) {
        if (this.budgetRetryCount < this.maxRetryCount) {
          console.log('Retry Count: ' + this.budgetRetryCount + ' out of ' + this.maxRetryCount);
          this.budgetRetryCount++;
          budgetMonth.setUTCMonth(budgetMonth.getUTCMonth() - 1);
          this.getBudget(budgetMonth);
        } else {
          this._ngxSpinner.hide();
          alert('There are no budget within the past ' + this.maxRetryCount + ' months');
        }
      }
    });
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

  clickDuplicateBudget(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Are you sure you want to duplicate this budget for the next month?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.budget) {
        this._ngxSpinner.show();
        let duplicateBudget = this.copyBudget(this.budget);
        duplicateBudget.month.setUTCMonth(duplicateBudget.month.getUTCMonth() + 1);
        duplicateBudget._id = null;
        this._budgetService.addBudget(duplicateBudget).subscribe(response => {
          this._ngxSpinner.hide();
        });
      }
    });
  }

  private copyBudget(budget: Budget): Budget {
    let target = this._deepClone.copy(budget);
    target.month = new Date(target.month);
    return target;
  }
}